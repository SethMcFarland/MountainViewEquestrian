from django.conf.urls import url

from . import views

app_name = 'users'
urlpatterns = [
	url(r'^(?P<uid>[0-9]+)', views.user_profile, name='profile'),
	url(r'^registration/', views.user_registration, name='registration'),
	url(r'^horse_registration/', views.horse_registration, name='horse_registration'),
	url(r'^horse_details/', views.horse_details, name='horse_details'),
	url(r'^horse_re_enroll/', views.re_enroll_horse, name='re_enroll_horse'),
	url(r'^login/', views.user_login, name='login'),
	url(r'^logout/', views.user_logout, name='logout'),
]