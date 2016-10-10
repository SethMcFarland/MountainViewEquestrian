from django.conf.urls import url
from django.contrib import admin

from . import views

app_name = 'users'
urlpatterns = [
	url(r'^registration/', views.registration, name='registration'),
	url(r'^login/', views.login_view, name='login'),
	url(r'^logout/', views.logout_view, name='logout'),
	url(r'^api/', views.usersapi, name='api'),
]