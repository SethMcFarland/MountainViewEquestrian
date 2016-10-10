from django import forms
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class UserLoginForm(forms.Form):
	username = forms.CharField(
		max_length=50
	)

	password = forms.CharField(
		widget=forms.PasswordInput
	)

	def clean(self):
		username = self.cleaned_data["username"]
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



class UserRegistrationForm(forms.ModelForm):

	reason_choices = (
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
		choices=reason_choices,
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
			'reason'
		]


	def clean_username(self):
		username = self.cleaned_data.get('username')

		if User.objects.filter(username=username).exists():
			raise forms.ValidationError("This username is already in use")

		return username

	def clean_password2(self):
		print(self.cleaned_data)
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