from django.conf.urls import url
from django.contrib import admin

from . import views

app_name = 'users'
urlpatterns = [
	url(r'^registration/', views.user_registration, name='registration'),
	url(r'^login/', views.user_login, name='login'),
	url(r'^logout/', views.user_logout, name='logout'),
	url(r'^api/', views.usersapi, name='api'),
]