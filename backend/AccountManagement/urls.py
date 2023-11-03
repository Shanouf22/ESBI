from django.urls import path
from AccountManagement import views

urlpatterns = [
    path('api/createaccount', views.create_account),
    path('api/deactivateaccount', views.deactivate_account),
    path('api/activateaccount', views.activate_account),
]