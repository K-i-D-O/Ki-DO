from django.urls import path
from . import views

app_name = 'help_request'

urlpatterns = [
    path('api/guest-login/', views.guest_login, name='guest_login'),
    path('api/become-helper/', views.become_helper, name='become_helper'),
    path('api/request-help/', views.request_help, name='request_help'),
    path('api/respond-to-request/<int:request_id>/<str:response>/', views.respond_to_request, name='respond_to_request'),
    path('api/save-token/', views.save_token, name='save_token'),
]
