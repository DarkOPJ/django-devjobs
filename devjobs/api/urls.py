from django.urls import path
from . import views

urlpatterns = [
    path('jobs/', views.JobListAPIView.as_view(), name='job-list'),
    path('jobs/<uuid:id>/', views.JobDetailAPIView.as_view(), name='job-detail'),
]