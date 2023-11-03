from django.db import models

class Loan(models.Model):
    user_id = models.IntegerField()
    loan_type = models.CharField(max_length=255)
    id_proof = models.CharField(max_length=255)
    due_date = models.DateField()
    loan_amount = models.DecimalField(max_digits=10, decimal_places=2)
    loan_id = models.IntegerField()
    loan_status = models.CharField(max_length=255)
