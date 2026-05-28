from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Company, Job
from .serializers import JobSerializer

# Create your views here.
class JobListAPIView(APIView):
    def get(self, request):
        data = Job.objects.all().order_by('-created_at')
        serialized_data = JobSerializer(data, many=True)
        return Response({'data':serialized_data.data})

    def post(self, request):
        parsed_data = request.data
        deserialized_data = JobSerializer(data=parsed_data)
        deserialized_data.is_valid(raise_exception=True)
        deserialized_data.save()
        return Response({'msg':'Job created successfully.', 'data':deserialized_data.data}, status=status.HTTP_201_CREATED)

class JobDetailAPIView(APIView):
    def get(self, request, id):
        try:
            data = Job.objects.get(id=id)
        except Job.DoesNotExist:
            return Response({"error": "Job not found."}, status=status.HTTP_404_NOT_FOUND)

        serialized_data = JobSerializer(data)
        return Response(serialized_data.data)

    def put(self, request, id):
        try:
            data = Job.objects.get(id=id)
        except Job.DoesNotExist:
            return Response({"error": "Job not found."}, status=status.HTTP_404_NOT_FOUND)

        parsed_data = request.data
        deserialized_data = JobSerializer(data, data=parsed_data)
        deserialized_data.is_valid(raise_exception=True)
        deserialized_data.save()
        return Response({'msg':'Job updated successfully.', 'data':deserialized_data.data})

    def delete(self, request, id):
        try:
            data = Job.objects.get(id=id)
        except Job.DoesNotExist:
            return Response({"error": "Job not found."}, status=status.HTTP_404_NOT_FOUND)
        
        data.delete()
        return Response({'msg':'Job deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
