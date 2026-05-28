from rest_framework import serializers
from .models import Company,Job

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['name', 'description', 'contact_email', 'contact_phone']
        

class JobSerializer(serializers.ModelSerializer):
    company = CompanySerializer()  # this nests the full company object inside job
    class Meta:
        model = Job
        fields = ['id', 'company', 'title', 'job_type', 'description', 'location', 'salary', 'created_at']
        
    def create(self, validated_data):
        company_data = validated_data.pop('company')  # pull out company data
        company = Company.objects.create(**company_data)  # create the company first
        job = Job.objects.create(company=company, **validated_data)  # then create job
        return job

    def update(self, instance, validated_data):
        company_data = validated_data.pop('company', None)
        
        if company_data:
            # update the existing company fields instead of creating a new one
            company = instance.company
            company.name = company_data.get('name', company.name)
            company.description = company_data.get('description', company.description)
            company.contact_email = company_data.get('contact_email', company.contact_email)
            company.contact_phone = company_data.get('contact_phone', company.contact_phone)
            company.save()

        instance.title = validated_data.get('title', instance.title)
        instance.job_type = validated_data.get('job_type', instance.job_type)
        instance.description = validated_data.get('description', instance.description)
        instance.location = validated_data.get('location', instance.location)
        instance.salary = validated_data.get('salary', instance.salary)
        instance.save()
        return instance