from rest_framework import serializers 
from Registration.models import User

class UserSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = User
        fields = ('id',
                  'firstname',
                  'lastname',
                  'age',
                  'phone',
                  'address',
                  'email',
                  'username',
                  'password')