from django.urls import path
from Authorization import views

urlpatterns = [
    path('api/drive_auth', views.google_drive_auth),
    path('google_drive_callback/', views.google_drive_callback),
]