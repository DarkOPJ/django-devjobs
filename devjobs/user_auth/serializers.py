from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password

class UserModelSerializer(serializers.ModelSerializer):
    # we dont want to send the password in the response, so we add this line
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

    def validate_password(self, value):
        validate_password(value)  # triggers all Django's password validators
        return value