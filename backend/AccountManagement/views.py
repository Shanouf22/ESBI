from django.shortcuts import render
from rest_framework.decorators import api_view
from decimal import Decimal

import random
from django.http import JsonResponse
from AccountManagement.models import Account

@api_view(['POST'])
def create_account(request):
    if request.method == 'POST':
        try:
            ac_type = request.data.get('ac_type')
            id_proof = request.data.get('id_proof')
            ac_pin = request.data.get('ac_pin')
            user_id = request.data.get('user_id')
            balance = float(request.data.get('balance'))
            ac_no = int(f"{user_id}{random.randint(10000, 99999)}")

            account = Account(
                user_id=user_id,
                ac_type=ac_type,
                ac_no=ac_no,
                balance=balance,
                es_tokens=0,
                ac_status='active',
                ac_pin=ac_pin,
                id_proof=id_proof
            )

            account.save()
            return JsonResponse({'message': 'Account was created successfully.'})
        except Exception as e:
            return JsonResponse({'message': str(e)})
    return JsonResponse({'message': 'Invalid request method.'})


@api_view(['POST'])
def deactivate_account(request):
    if request.method == 'POST':
        accountId = request.data.get('accountId')
        account = Account.objects.filter(id=accountId).first()
        account.ac_status = 'deactive'
        account.balance = Decimal(account.balance.to_decimal())
        account.save()
        return JsonResponse({'message':'Account was deactivated successfully.'})
    return JsonResponse({'message':'Some error occured.'})


@api_view(['POST'])
def activate_account(request):
    if request.method == 'POST':
        accountId = request.data.get('accountId')
        account = Account.objects.filter(id=accountId).first()
        account.ac_status = 'active'
        account.balance = Decimal(account.balance.to_decimal())
        account.save()
        return JsonResponse({'message':'Account was activated successfully.'})
    return JsonResponse({'message':'Some error occured.'})

