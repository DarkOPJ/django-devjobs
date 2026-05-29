from django.shortcuts import render
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserModelSerializer

# Create your views here.
class LoginAPIView(APIView):
    # if you set the authentication globally but want to exclude specific routes, eg. login/, then specify these classes as empty to overide it here
    authentication_classes = []
    permission_classes = []

    def post(self,request):
        username = request.data.get('username')
        password = request.data.get('password')

        # this will check if the credentials are correct and sends the user object else returns None.
        user = authenticate(username=username, password=password)

        # returns a tuple. checks if the token is already created and if not it creates one
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key, 
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                }})

        return Response({'error':'Username or password is incorrect.'}, status=status.HTTP_401_UNAUTHORIZED)

class RegisterAPIView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        deserialized_data = UserModelSerializer(data=request.data)
        deserialized_data.is_valid(raise_exception=True)
        user = deserialized_data.save()
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
            }
        }, status=status.HTTP_201_CREATED)

class LogoutAPIView(APIView):
    # Explicitly require token auth so request.auth is always populated
    # when a valid token is sent, regardless of global defaults.
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # request.auth is the Token object — delete it from the DB
        request.auth.delete()
        return Response({'msg': 'User logged out.'}, status=status.HTTP_200_OK)

