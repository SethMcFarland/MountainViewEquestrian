from django import forms
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.core.validators import MaxValueValidator, MinValueValidator

from .models import Horse


class UserLoginForm(forms.Form):
	email = forms.EmailField(
		label='Email Address', 
		error_messages={
			'required': 'Please enter your email address', 
			'invalid': 'The email address entered appears to be invalid'
		}
	)

	password = forms.CharField(
		label='Password', 
		widget=forms.PasswordInput,
	)

	def clean(self):
		user = User.objects.filter(email=self.cleaned_data.get("email"))

		if user.exists() and len(user) == 1:
			username = user[0].username
			password = self.cleaned_data["password"]
			user = authenticate(username=username, password=password)

			if username and password:
				if not user:
					raise forms.ValidationError("Username not found")

				if not user.check_password(password):
					raise forms.ValidationError("Incorrect Password")

				if not user.is_active:
					raise forms.ValidationError("This user is no longer active")

			return super(UserLoginForm, self).clean()

		else:
			raise forms.ValidationError("User not found")


class HorseRegistrationForm(forms.ModelForm):
	name = forms.CharField(
		label="Horse Name",
		max_length=100
	)

	age = forms.IntegerField(
		validators=[
			MaxValueValidator(50), 
			MinValueValidator(1)
		]
	)

	breed = forms.CharField(
		label="Horse Breed",
		max_length=250
	)

	description = forms.CharField(
		label="A brief description of your horse",
		widget=forms.Textarea
	)

	class Meta:
		model = Horse
		fields = [
			'name',
			'age',
			'breed',
			'description'
		]

class UserRegistrationForm(forms.ModelForm):

	reason_choices = (
		('', '--- Select One --- '),
		(1, 'I would like to register my horse for training'),
		(2, 'I would list to register for an event'),
		(3, 'Other'),
	)

	first_name = forms.SlugField(
		label='First Name', 
		max_length=100, 
		error_messages={
			'required': 'Please enter your first name', 
			'invalid': 'The first name entered appears to be invalid (use hyphens instead of spaces)'
		}
	)

	last_name = forms.SlugField(
		label='Last Name', 
		max_length=100, 
		error_messages={
			'required': 'Please enter your last name', 
			'invalid': 'The last name entered appears to be invalid (use hyphens instead of spaces)'
		}
	)

	email = forms.EmailField(
		label='Email Address', 
		error_messages={
			'required': 'Please enter your email address', 
			'invalid': 'The email address entered appears to be invalid'
		}
	)

	password = forms.CharField(
		label='Password', 
		widget=forms.PasswordInput,
	)

	password2 = forms.CharField(
		label='Confirm Password', 
		widget=forms.PasswordInput,
	)
	
	phone_num = forms.RegexField(
		label='Phone Number',
		regex='^(\(?(\d{3})\)?)?(\d{3})\-?(\d{4})$', 
		error_messages={
			'required': 'Please enter your phone number', 
			'invalid': 'The phone number entered appears to be invalid, example 5305555787'
		}
	)

	reason = forms.ChoiceField(
		label='Reason For Registering', 
		error_messages={
			'required': 'Please choose a reason for registration', 
			'invalid_choice': 'Invalid choice selected'
		},
		choices=reason_choices
	)

	email_prefs = forms.BooleanField(
		label="Would you like to be kept up to date? (shows, events, etc.)",
		initial=True,
		required=False
	)

	horse_name = forms.CharField(
		label="Horse Name",
		max_length=100,
		required=False
	)

	horse_age = forms.IntegerField(
		validators=[
			MaxValueValidator(50), 
			MinValueValidator(1)
		],
		required=False
	)

	horse_breed = forms.CharField(
		label="Horse Breed",
		max_length=250,
		required=False
	)

	horse_description = forms.CharField(
		label="A brief description of your horse",
		widget=forms.Textarea,
		required=False
	)

	class Meta:
		model = User
		fields = [
			'first_name',
			'last_name',
			'username',
			'email',
			'password',
			'password2',
			'phone_num',
			'reason',
			'email_prefs',
			'horse_name',
			'horse_age',
			'horse_breed',
			'horse_description'
		]


	def clean_username(self):
		username = self.cleaned_data.get('username')

		if User.objects.filter(username=username).exists():
			raise forms.ValidationError("This username is already in use")

		return username

	def clean_password2(self):
		password = self.cleaned_data.get('password')
		password2 = self.cleaned_data.get('password2')
		
		if len(password) < 8:
			raise forms.ValidationError("Password must be at least 8 characters long")

		if password != password2:
			raise forms.ValidationError("Passwords must match")

		return password

	def clean_email(self):
		email = self.cleaned_data.get('email')
		
		if User.objects.filter(email=email).exists():
			raise forms.ValidationError("This email has already been registered")

		return email