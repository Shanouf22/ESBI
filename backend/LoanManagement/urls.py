from django.urls import path
from LoanManagement import views

urlpatterns = [
    path('api/handleloan', views.handle_loan),
    path('api/loandetails', views.get_loan_details),
]