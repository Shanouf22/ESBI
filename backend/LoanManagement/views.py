from django.shortcuts import render
from rest_framework.decorators import api_view
from datetime import datetime, timedelta
from rest_framework import status

import random
from django.http import JsonResponse
from AccountManagement.models import Account
from LoanManagement.models import Loan
from Registration.models import User

@api_view(['POST'])
def handle_loan(request):
    if request.method == 'POST':
        user_id = request.data.get('user_id')
        loan_type = request.data.get('loan_type')
        id_proof = request.data.get('id_proof')
        due_date_str = request.data.get('due_date')
        ac_no = request.data.get('ac_no')
        ac_pin = request.data.get('ac_pin')
        loan_amount = float(request.data.get('loan_amount'))
        loan_id = int(str(user_id) + str(random.randint(100, 999)))
        due_date = datetime.strptime(due_date_str, '%d-%m-%Y').date()

        userAccount = Account.objects.filter(ac_no=int(ac_no)).first()
        if not userAccount:
            return JsonResponse({'message':'Entered account number does not exist'})

        if userAccount.ac_pin != int(ac_pin):
            return JsonResponse({'message':'Entered pin in invalid'})

        today = datetime.now().date()
        if due_date == today:
            due_date = today + timedelta(days=365*2)
            loan_status = 'active'
        else:
            loan_status = 'appointment'

        loan = Loan(
            user_id=user_id,
            loan_type=loan_type,
            id_proof=id_proof,
            due_date=due_date,
            loan_amount=loan_amount,
            loan_id=loan_id,
            loan_status=loan_status
        )

        loan.save()
        return JsonResponse({'message':'Loan request was processed successfully'})
    return JsonResponse({'message':'Some error occured'})


@api_view(['POST'])
def get_loan_details(request):
    user_id = request.data.get('user_id')
    user = User.objects.filter(id=user_id).first()
    loans = Loan.objects.filter(user_id=user_id)
    active_loans = []
    appointment_loans = []
    for loan in loans:
        if loan.loan_status == "active":
            active_loans.append(loan)
        else:
            appointment_loans.append(loan)
    if user:
        json_response = {
            'activeLoans': [{'id': loan.id, 'type': loan.loan_type, 'loanId': loan.loan_id, 'loanAmount': float(str(loan.loan_amount)), 'dueDate': loan.due_date.strftime('%d-%m-%Y')} for loan in active_loans],
            'appointments': [{'id': loan.id, 'type': loan.loan_type, 'loanId': loan.loan_id, 'loanAmount': float(str(loan.loan_amount)), 'dueDate': loan.due_date.strftime('%d-%m-%Y')} for loan in appointment_loans],
        }
        return JsonResponse(json_response, status=status.HTTP_200_OK)
    return JsonResponse({'message': 'No such user found'}, status=status.HTTP_401_UNAUTHORIZED)
