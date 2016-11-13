from django.shortcuts import render, redirect, get_object_or_404
from django.template.loader import render_to_string
from django.http import HttpResponse, JsonResponse
from django.core import serializers
import dateutil.parser, datetime, json

from .models import Event, Address
from django.contrib.auth.models import User


def event_details(request):
	event = get_object_or_404(Event, pk=request.GET.get('eid'))
	event_date = event.start_date.strftime("%B %d, %Y at %-I:%-M %p")
	event_time = event.start_date.strftime("%-I:%-M %p to ") + event.end_date.strftime("%-I:%-M %p")
	event_backup_date = event.backup_start_date.strftime("%B %d, %Y at %-I:%-M %p")

	enrolled = 0
	print("before conditional")
	if request.user.is_authenticated():
		if event in request.user.enrolled_events.all():
			print("event found")
			enrolled = 1

		elif event in request.user.waitlisted_events.all():
			print("event waitlist")
			enrolled = 2

	html = render_to_string('events/partials/event_details.html', {'event': event, 'event_date': event_date, 'event_time': event_time, 'event_backup_date': event_backup_date, 'address': event.address, 'enrolled': enrolled}, request=request)
	return HttpResponse(html)


def event_signup(request):
	if request.GET.get('type') == '1':
		event = get_object_or_404(Event, pk=request.GET.get('eid'))
		html = render_to_string('events/partials/event_signup.html', {'event': event}, request=request)
		
		return HttpResponse(html)

	else:
		event = get_object_or_404(Event, pk=request.GET.get('eid'))
		user = get_object_or_404(User, pk=request.user.id)
		event.users.remove(user)
		html = render_to_string('events/partials/event_unenroll.html', {'event': event}, request=request)

		return HttpResponse(html)


def unenroll_event(request):
	event = get_object_or_404(Event, pk=request.GET.get('eid'))
	user = get_object_or_404(User, pk=request.GET.get('uid'))

	event.users.remove(user)

	return HttpResponse(status=200)


def get_all(request):
	start = dateutil.parser.parse(request.GET.get('start'))
	end = dateutil.parser.parse(request.GET.get('end'))

	events_in_period = Event.objects.filter(start_date__gte=start, start_date__lte=end)

	events_list = []

	for event in events_in_period:
		#item = {'id': event.id, 'title': event.name, 'start': event.start_date.isoformat(), 'end': event.end_date.isoformat(), 'allDay': False, 'url': '/event/details/?enrolled=0&eid=' + str(event.id)}
		item = {'id': event.id, 'title': event.name, 'start': event.start_date.isoformat(), 'end': event.end_date.isoformat(), 'allDay': False, 'url': '/event/details/?eid=' + str(event.id)}

		if event.status == 1:
			item['backgroundColor'] = 'green'

		elif event.status == 2:
			item['backgroundColor'] = 'red'

		else:
			item['backgroundColor'] = 'grey'

		events_list.append(item)

	return JsonResponse(events_list, safe=False, status=202)