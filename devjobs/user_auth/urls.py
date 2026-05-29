from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.LoginAPIView.as_view(), name='auth-login'),
    path('logout/', views.LogoutAPIView.as_view(), name='auth-logout'),
    path('register/', views.RegisterAPIView.as_view(), name='auth-register'),
]