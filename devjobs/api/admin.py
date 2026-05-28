from django.contrib import admin
from .models import Job, Company

# Register your models here.
@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ('name', 'contact_email', 'contact_phone')

@admin.register(Job)
class JobsAdmin(admin.ModelAdmin):
    list_display = ('title', 'company', 'location', 'salary')
