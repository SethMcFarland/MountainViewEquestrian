from django.conf.urls import url

from . import views

app_name = 'events'
urlpatterns = [

	url(r'^details/', views.event_details, name='event_details'),
	
]