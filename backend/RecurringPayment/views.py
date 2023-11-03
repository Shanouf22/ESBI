from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status

from django.http import JsonResponse
from AccountManagement.models import Account
from RecurringPayment.models import PaymentPlan
from Registration.models import User

@api_view(['POST'])
def start_plan(request):
    if request.method == 'POST':
        user_id = request.data.get('user_id')
        ac_name_payee = request.data.get('ac_name_payee')
        ac_no_payee = request.data.get('ac_no_payee')
        amount = request.data.get('amount')
        duration = request.data.get('duration')
        account_type = request.data.get('account_type')
        ac_pin = request.data.get('ac_pin')

        payeeAccount = Account.objects.filter(ac_no=int(ac_no_payee)).first()
        if not payeeAccount:
            return JsonResponse({'message':'Entered account number does not exit'})
        
        payee = User.objects.filter(id=payeeAccount.user_id).first()
        if ac_name_payee != payee.firstname + " "+ payee.lastname:
            return JsonResponse({'message':'Account name entered is not associated with concerned account number'})

        payerAccount = Account.objects.filter(user_id=user_id)
        payerAccountSpecific = None
        for account in payerAccount:
            if account.ac_type == account_type:
                payerAccountSpecific = account
        if not payerAccountSpecific:
            return JsonResponse({'message':'An account is required to start a payment plan'})

        if payerAccountSpecific.ac_pin != int(ac_pin):
            return JsonResponse({'message':'Entered pin is incorrect'})

        payment = PaymentPlan(
            user_id=user_id,
            ac_name_payee=ac_name_payee,
            ac_no_payee=ac_no_payee,
            amount=amount,
            duration=duration
        )

        payment.save()
        return JsonResponse({'message':'Payment plan was successfully added to your account'})
    return JsonResponse({'message':'Some error occured'})


@api_view(['POST'])
def get_payment_plans(request):
    user_id = request.data.get('user_id')
    user = User.objects.filter(id=user_id).first()
    paymentPlans = PaymentPlan.objects.filter(user_id=user_id)
    if user:
        json_response = {
            'paymentPlans': [{'id': plan.id, 'payeeName': plan.ac_name_payee, 'payeeNo': plan.ac_no_payee, 'amount': float(str(plan.amount)), 'duration': plan.duration} for plan in paymentPlans],
        }
        return JsonResponse(json_response, status=status.HTTP_200_OK)
    return JsonResponse({'error': 'no such user found'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def cancel_plan(request):
    plan_id = request.data.get('plan_id')
    plan = PaymentPlan.objects.filter(id=plan_id).first()
    plan.delete()
    return JsonResponse({'message':'Payment plan was cancelled successfully'})
