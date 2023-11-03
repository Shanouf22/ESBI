from django.shortcuts import render

from django.http.response import JsonResponse
from django.http import HttpRequest
from rest_framework.parsers import JSONParser 
from rest_framework import status

from Registration.models import User
from AccountManagement.models import Account
from Registration.serializers import UserSerializer
from rest_framework.decorators import api_view

from rest_framework_simplejwt.tokens import RefreshToken

@api_view(['POST'])
def register_user(request):
    user_data = JSONParser().parse(request)
    user_serializer = UserSerializer(data=user_data)
    if user_serializer.is_valid():
        user_serializer.save()
        # return JsonResponse(user_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse({'message':'You were successfully registered'}) 
    # return JsonResponse(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return JsonResponse({'message':'Fill all the details properly to get registered'})  

@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = User.objects.filter(username=username).first()
    if user and user.password == password:
        refresh = RefreshToken.for_user(user)
        json_response = {
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'message': 'Login was successful',
        }
        return JsonResponse(json_response, status=status.HTTP_200_OK)
    return JsonResponse({'message': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def get_user_details(request):
    user_id = request.data.get('user_id')
    user = User.objects.filter(id=user_id).first()
    accounts = Account.objects.filter(user_id=user_id)
    active_accounts = []
    deactive_accounts = []
    estokens = 0
    for account in accounts:
        if account.ac_status == "active":
            active_accounts.append(account)
        else:
            deactive_accounts.append(account)
        estokens = account.es_tokens
    if user:
        json_response = {
            'firstname': user.firstname,
            'lastname': user.lastname,
            'phone': user.phone,
            'email': user.email,
            'estokens': estokens,
            'activeAccounts': [{'id': acc.id, 'type': acc.ac_type, 'acno': acc.ac_no, 'balance': float(str(acc.balance))} for acc in active_accounts],
            'deactiveAccounts': [{'id': acc.id, 'type': acc.ac_type, 'acno': acc.ac_no, 'balance': float(str(acc.balance))} for acc in deactive_accounts],
        }
        return JsonResponse(json_response, status=status.HTTP_200_OK)
    return JsonResponse({'message': 'No such user found'}, status=status.HTTP_401_UNAUTHORIZED)
