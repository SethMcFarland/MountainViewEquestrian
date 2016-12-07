from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Address(models.Model):
	
	street = models.CharField(max_length=250)

	city = models.CharField(max_length=250)

	state = models.CharField(max_length=250)

	zip_code = models.CharField(max_length=250)

	def __str__(self):
		return self.street + "\n" + self.city + ", " + self.state + " " + self.zip_code


def get_default_address():
	address = Address.objects.filter(street="Address Pending", city="Chico", state="CA", zip_code="95928")
	
	if address.exists():
		return address[0]

	address = Address(street="Address Pending", city="Chico", state="CA", zip_code="95928")
	address.save()
	return address 


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

	address = models.ForeignKey(Address, on_delete=models.SET_DEFAULT, default=get_default_address)

	name = models.CharField(max_length=100)

	start_date = models.DateTimeField()

	end_date = models.DateTimeField()

	backup_start_date = models.DateTimeField()

	backup_end_date = models.DateTimeField()

	users = models.ManyToManyField(User, related_name="enrolled_events", blank=True)

	waitlist = models.ManyToManyField(User, related_name="waitlisted_events", blank=True)

	description = models.TextField()

	location = models.CharField(max_length=100)

	capacity = models.IntegerField()

	cost = models.IntegerField()

	deposit = models.IntegerField()

	status = models.IntegerField(choices=status_choices, default=ACTIVE)

	def __str__(self):
		return self.name + " at " + self.location