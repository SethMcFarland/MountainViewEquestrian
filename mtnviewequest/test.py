import django, os
os.environ['DJANGO_SETTINGS_MODULE'] = 'mtnviewequest.settings'
django.setup()


from events.models import Event

event = Event.objects.all()[0]
print(event.name)