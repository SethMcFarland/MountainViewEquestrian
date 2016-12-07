from django.contrib import admin

# Register your models here.
from .models import Event, Address

admin.site.register(Event)
admin.site.register(Address)