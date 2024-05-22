import json
import random
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt 
from django.contrib.auth import login
from django.contrib.auth.models import User
from .models import HelpRequest, HelperProfile
from .utils import send_push_notification_to_helpers, send_push_notification_to_requester

def generate_random_phone_number():
    return f'010-{random.randint(1000,9999)}-{random.randint(1000,9999)}'

@csrf_exempt
@login_required
def save_token(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        token = data.get('token')
        if token:
            profile = request.user.profile
            profile.device_token = token
            profile.save()
            return JsonResponse({'status': 'success'}, status=200)
        return JsonResponse({'status': 'error', 'message': 'No token provided'}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)

@csrf_exempt
def guest_login(request):
    if request.method == 'POST':
        username = f'guest_{random.randint(1000,9999)}'
        user, created = User.objects.get_or_create(username=username)
        if created:
            user.set_unusable_password()
            user.save()
            HelperProfile.objects.create(user=user)
            print(user)
        login(request, user)
        return JsonResponse({'status': 'success', 'username': username}, status=200)
    return JsonResponse({'status': 'error'}, status=400)

@csrf_exempt
def become_helper(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        is_helper = data.get('is_helper')
        username = data.get('username')
        print(is_helper)
        if not username:
            return JsonResponse({'status': 'error', 'message': 'No username provided'}, status=400)
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'User does not exist'}, status=404)
        
        if user.username.startswith('guest_'):
            print("This is a guest user")
        
        if is_helper is not None:
            profile = user.helperprofile
            profile.is_helper = is_helper
            profile.save()
            return JsonResponse({'status': 'success', 'message': f'Helper status set to {is_helper}'}, status=200)
        return JsonResponse({'status': 'error', 'message': 'Invalid data'}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=400)

@csrf_exempt
@login_required
def request_help(request):
    if request.method == "POST":
        help_request = HelpRequest(requester=request.user)
        help_request.save()
        send_push_notification_to_helpers(help_request)
        return JsonResponse({'status': 'success'}, status=200)
    return JsonResponse({'status': 'error'}, status=400)

@login_required
@csrf_exempt
def respond_to_request(request, request_id, response):
    try:
        help_request = HelpRequest.objects.get(id=request_id)
        if response == 'accept':
            help_request.helper = request.user
            help_request.is_accepted = True
            help_request.save()
            send_push_notification_to_requester(help_request)
        else:
            # 요청 거절 처리 (예: 알림 전송 등)
            pass
        return JsonResponse({'status': 'success'}, status=200)
    except HelpRequest.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Request not found'}, status=404)
