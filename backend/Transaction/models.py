from django.db import models

class Transaction(models.Model):
    user_id = models.IntegerField()
    ac_name_payee = models.CharField(max_length=255)
    ac_no_payee = models.IntegerField()
    ac_type_payer = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date_of_transaction = models.DateField()
