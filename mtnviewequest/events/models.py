from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Event(models.Model):

	ACTIVE = 1
	FULL = 2
	CANCELLED = 3
	EXPIRED = 4
	status_choices = (
		(ACTIVE, 'Active'),
		(FULL, 'Full'),
		(CANCELLED, 'Cancelled'),
		(EXPIRED, 'Expired'),
	)

	name = models.CharField(max_length=100)

	date = models.DateTimeField()

	backup_date = models.DateTimeField()

	users = models.ManyToManyField(User)

	description = models.TextField()

	location = models.CharField(max_length=100)

	capacity = models.IntegerField()

	status = models.IntegerField(choices=status_choices, default=ACTIVE)

	def __str__(self):
		return self.name + " at " + self.location