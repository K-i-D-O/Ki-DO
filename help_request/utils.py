import firebase_admin
from firebase_admin import messaging
from django.contrib.auth.models import User
from .models import HelperProfile

def send_push_notification(device_token, title, body, data):
    """
    FCM을 통해 푸시 알림을 보내는 함수
    """
    message = messaging.Message(
        notification=messaging.Notification(
            title=title,
            body=body,
        ),
        token=device_token,
        data=data,
    )

    try:
        response = messaging.send(message)
        return {'success': True, 'response': response}
    except Exception as e:
        return {'success': False, 'error': str(e)}

def send_push_notification_to_helpers(help_request):
    """
    도움 요청을 헬퍼에게 푸시 알림으로 보내는 함수
    """
    helpers = User.objects.filter(helperprofile__is_helper=True)  # 헬퍼로 설정된 사용자 필터링
    for helper in helpers:
        if helper.helperprofile.device_token:
            send_push_notification(
                helper.helperprofile.device_token,
                'New Help Request',
                f'New help request from {help_request.requester.username}',
                {'request_id': str(help_request.id)}
            )

def send_push_notification_to_requester(help_request):
    """
    헬퍼가 도움 요청을 수락했을 때 요청자에게 푸시 알림을 보내는 함수
    """
    if help_request.requester.helperprofile.device_token:
        send_push_notification(
            help_request.requester.helperprofile.device_token,
            'Help Request Accepted',
            f'Your help request was accepted by {help_request.helper.username}.',
            {'helper_phone': help_request.helperprofile.phone_number}
        )
