from django.shortcuts import render, redirect, get_object_or_404
from django.template.loader import render_to_string
from django.http import HttpResponse

from .models import Event

def event_details(request):
	event = get_object_or_404(Event, pk=request.GET.get('eid'))
	event_date = event.date.strftime("%B %d, %Y at %-I:%-M %p")
	event_backup_date = event.backup_date.strftime("%B %d, %Y at %-I:%-M %p")

	html = render_to_string('events/partials/event_details.html', {'event': event, 'event_date': event_date, 'event_backup_date': event_backup_date}, request=request)
	return HttpResponse(html)