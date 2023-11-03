from django.urls import path
from Registration import views

urlpatterns = [
    path('api/register', views.register_user),
    path('api/login', views.login_user),
    path('api/userdetails', views.get_user_details),
]