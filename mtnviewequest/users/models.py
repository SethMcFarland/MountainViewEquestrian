from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
# Create your models here.

class Profile(models.Model):
	
	TRAINING = 1
	EVENT = 2
	OTHER = 3
	reason_choices = (
		(TRAINING, 'training'),
		(EVENT, 'event'),
		(OTHER, 'other'),
	)
	
	user = models.OneToOneField(User, on_delete=models.CASCADE)

	phone_num = models.IntegerField()

	reason = models.IntegerField(choices=reason_choices, default=OTHER)

	def __str__(self):
		return self.user.first_name + " " + self.user.last_name


class Horse(models.Model):

	owner = models.OneToOneField(User, on_delete=models.CASCADE)

	name = models.CharField(max_length=100)

	age = models.IntegerField(validators=[MaxValueValidator(50), MinValueValidator(1)])

	breed = models.CharField(max_length=250)

	description = models.TextField()

	def __str__(self):
		return self.name + " (" + self.owner.first_name + " " + self.owner.last_name + ")"