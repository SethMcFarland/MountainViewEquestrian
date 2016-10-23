from django.shortcuts import render, redirect, get_object_or_404
from django.template.loader import render_to_string
from django.http import HttpResponse, JsonResponse
from django.core import serializers

from .models import Event, Address
from django.contrib.auth.models import User


def event_details(request):
	event = get_object_or_404(Event, pk=request.GET.get('eid'))
	event_date = event.start_date.strftime("%B %d, %Y at %-I:%-M %p")
	event_time = event.start_date.strftime("%-I:%-M %p to ") + event.end_date.strftime("%-I:%-M %p")
	event_backup_date = event.backup_date.strftime("%B %d, %Y at %-I:%-M %p")

	html = render_to_string('events/partials/event_details.html', {'event': event, 'event_date': event_date, 'event_time': event_time, 'event_backup_date': event_backup_date, 'address': event.address}, request=request)
	return HttpResponse(html)


def unenroll_event(request):
	event = get_object_or_404(Event, pk=request.GET.get('eid'))
	user = get_object_or_404(User, pk=request.GET.get('uid'))

	event.users.remove(user)

	return HttpResponse(status=200)


def get_all(request):
	start = dateutil.parser.parse(request.GET.get('start'))
	end = dateutil.parser.parse(request.GET.get('end'))

	events_in_period = Event.objects.filter(date__gte=start, date__lte=end)

	events_list = []

	for event in events_in_period:
		events_list.append({'title': event.name, 'start': event.start_date.isoformat(), 'end': event.end_date.isoformat(), 'allDay': False})

	events_list = serializers.serialize('json', events_list)

	return JsonResponse(events_list, safe=False, status=202)