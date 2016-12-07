from django.contrib import admin

# Register your models here.
from .models import Profile, Horse
from django.contrib.auth.models import User

admin.site.register(Profile)
admin.site.register(Horse)