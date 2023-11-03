from django.db import models

class Account(models.Model):
    user_id = models.IntegerField()
    ac_type = models.CharField(max_length=255)
    ac_no = models.IntegerField()
    balance = models.DecimalField(max_digits=10, decimal_places=2)
    es_tokens = models.IntegerField()
    ac_status = models.CharField(max_length=255)
    ac_pin = models.IntegerField()
    id_proof = models.CharField(max_length=255)