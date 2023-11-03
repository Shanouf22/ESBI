from django.db import models

class PaymentPlan(models.Model):
    user_id = models.IntegerField()
    ac_name_payee = models.CharField(max_length=255)
    ac_no_payee = models.IntegerField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    duration = models.CharField(max_length=255)
