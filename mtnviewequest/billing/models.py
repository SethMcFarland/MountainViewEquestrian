from django.db import models

from django.contrib.auth.models import User
from users.models import Horse
from events.models import Event

class Invoice(models.Model):

	OUTSTANDING = 1
	LATE = 2
	PAID = 3
	status_choices = (
		(OUTSTANDING, 'Outstanding'),
		(LATE, 'Late'),
		(PAID, 'PAID'),
	)

	TRAINING = 1
	EVENT = 2
	service_choices = (
		(TRAINING, 'Training'),
		(EVENT, 'Event'),
	)

	user = models.OneToOneField(User, on_delete=models.PROTECT, related_name="invoices")

	horses = models.ManyToManyField(Horse, related_name="invoices")

	date_billed = models.DateTimeField()

	date_due = models.DateTimeField()

	status = models.IntegerField(choices=status_choices, default=OUTSTANDING)

	service = models.IntegerField(choices=service_choices, default=TRAINING)

	event = models.OneToOneField(Event, on_delete=models.PROTECT, blank=True)

