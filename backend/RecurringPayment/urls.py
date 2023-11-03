from django.urls import path
from RecurringPayment import views

urlpatterns = [
    path('api/startplan', views.start_plan),
    path('api/getpaymentplans', views.get_payment_plans),
    path('api/cancelplan', views.cancel_plan),
]