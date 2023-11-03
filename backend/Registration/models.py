from django.db import models

class User(models.Model):
    firstname = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)
    age = models.IntegerField()
    phone = models.CharField(max_length=20)
    address = models.TextField()
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=255)
