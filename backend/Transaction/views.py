from django.shortcuts import render
from rest_framework.decorators import api_view
from datetime import datetime, timedelta
from decimal import Decimal
from rest_framework import status

from django.http import JsonResponse
from AccountManagement.models import Account
from Registration.models import User
from Transaction.models import Transaction

@api_view(['POST'])
def handle_transaction(request):
    if request.method == 'POST':
        user_id = request.data.get('user_id')
        ac_name_payee = request.data.get('ac_name_payee')
        ac_no_payee = request.data.get('ac_no_payee')
        ac_type_payer = request.data.get('ac_type_payer')
        ac_pin = request.data.get('ac_pin')
        amount = float(request.data.get('amount'))
        date_of_transaction = datetime.now().date()

        payeeAccount = Account.objects.filter(ac_no=int(ac_no_payee)).first()
        if not payeeAccount:
            return JsonResponse({'message':'Entered account number does not exist'})
        
        payee = User.objects.filter(id=payeeAccount.user_id).first()
        if ac_name_payee != payee.firstname + " "+ payee.lastname:
            return JsonResponse({'message':'Account name entered is not associated with concerned account number'})

        payerAccounts = Account.objects.filter(user_id=user_id)
        specificPayerAccount = None
        for account in payerAccounts:
            if account.ac_type == ac_type_payer:
                specificPayerAccount = account
                break
        if not specificPayerAccount:
            return JsonResponse({'message':'You do not have such an account or it is deactive'})
        
        if specificPayerAccount.ac_pin != int(ac_pin):
            return JsonResponse({'message':'Entered pin in incorrect'})

        if float(str(specificPayerAccount.balance)) < amount:
            return JsonResponse({'message':'You do not have enough balance to carry out this transaction'})

        payer = User.objects.filter(id=user_id).first()

        payeeBalance = float(str(payeeAccount.balance))
        payerBalance =float(str(specificPayerAccount.balance))
        payeeBalance += amount
        payerBalance -= amount
        payeeAccount.balance = Decimal(payeeBalance)
        specificPayerAccount.balance = Decimal(payerBalance)
        payeeAccount.save()
        specificPayerAccount.save()

        transaction1 = Transaction(
            user_id = user_id,
            ac_name_payee = ac_name_payee,
            ac_no_payee = ac_no_payee,
            ac_type_payer = ac_type_payer,
            amount = (-1)*amount,
            date_of_transaction = date_of_transaction
        )
        transaction2 = Transaction(
            user_id = payeeAccount.user_id,
            ac_name_payee = payer.firstname + " " + payer.lastname,
            ac_no_payee = specificPayerAccount.ac_no,
            ac_type_payer = payeeAccount.ac_type,
            amount = amount,
            date_of_transaction = date_of_transaction
        )
        transaction1.save()
        transaction2.save()

        return JsonResponse({'message':'Transaction was completed successfully'})
    return JsonResponse({'message':'Some error occured'})


@api_view(['POST'])
def get_statements(request):
    if request.method == 'POST':
        user_id = request.data.get('user_id')
        start_date = datetime.strptime(request.data.get('start_date'), '%d-%m-%Y')
        end_date = datetime.strptime(request.data.get('end_date'), '%d-%m-%Y')
        ac_type = request.data.get('ac_type')
        ac_pin = request.data.get('ac_pin')

        payerAccounts = Account.objects.filter(user_id=user_id)
        specificPayerAccount = None
        for account in payerAccounts:
            if account.ac_type == ac_type:
                specificPayerAccount = account
                break
        if not specificPayerAccount:
            return JsonResponse({'message':'You do not have such an account or it is deactive'})
        
        if specificPayerAccount.ac_pin != int(ac_pin):
            return JsonResponse({'message':'Entered pin is incorrect'})

        transactions = Transaction.objects.filter(date_of_transaction__range=(start_date, end_date))
        specific_transactions = []
        for transaction in transactions:
            if transaction.ac_type_payer == ac_type and transaction.user_id == user_id:
                specific_transactions.append(transaction)

        if len(specific_transactions) == 0:
            json_response = {
                'transactions': [],
                'balance': 0,
                'message': 'No records found within the mentioned range of dates',
            }
            return JsonResponse(json_response, status=status.HTTP_200_OK)

        json_response = {
            'transactions': [{'id': sTransaction.id, 'ac_name_payee': sTransaction.ac_name_payee, 'ac_no_payee': sTransaction.ac_no_payee, 'ac_type_payer': sTransaction.ac_type_payer, 'amount': float(str(sTransaction.amount)), 'date_of_transaction': sTransaction.date_of_transaction.strftime('%d-%m-%Y')} for sTransaction in specific_transactions],
            'balance': float(str(specificPayerAccount.balance)),
            'message': 'Mini-statement was successfully generated',
        }

        return JsonResponse(json_response, status=status.HTTP_200_OK)
    return JsonResponse({'message':'Some error occured'}) 


@api_view(['POST'])
def credit_tokens(request):
    if request.method == 'POST':
        user_id = request.data.get('user_id')
        tokens = int(request.data.get('tokens'))
        pin = int(request.data.get('pin'))

        accounts = Account.objects.filter(user_id=user_id)

        isValidated = False
        for account in accounts:
            if account.ac_pin == pin:
                isValidated = True
                break
        if not isValidated:
            return JsonResponse({'message':'Entered pin in incorrect'})

        if tokens > accounts.first().es_tokens:
            return JsonResponse({'message':'You do not have enough tokens to credit'})
        for account in accounts:
            account.es_tokens -= tokens
            account.balance = Decimal(account.balance.to_decimal())
            account.save()

        targetAccount = Account.objects.filter(user_id=user_id).first()
        tempBalance = float(str(targetAccount.balance))
        tempBalance += float(tokens)
        targetAccount.balance = Decimal(tempBalance)
        targetAccount.save()

        return JsonResponse({'message':f'ES Tokens were credited successfully to your {accounts.first().ac_type} Account'})
    return JsonResponse({'message':'Some error occured'}) 
