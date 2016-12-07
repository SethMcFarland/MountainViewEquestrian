from django.conf.urls import url

from . import views

app_name = 'events'
urlpatterns = [

	url(r'^details/', views.event_details, name='event_details'),
	url(r'^unenroll/', views.unenroll_event, name='event_unenroll'),
	url(r'^get_all/', views.get_all, name='get_all'),
	url(r'^signup/', views.event_signup, name='signup'),
	url(r'^signup_complete/', views.event_signup_complete, name='signup_complete'),
	url(r'^calendar/', views.event_calendar, name='calendar'),
	url(r'^waitlist/', views.event_waitlist, name='event_waitlist'),
	
]