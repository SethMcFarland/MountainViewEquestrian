from django import forms

class ContactForm(forms.Form):

	email = forms.EmailField(
		label='Email Address', 
		error_messages={
			'required': 'Please enter your email address', 
			'invalid': 'The email address entered appears to be invalid'
		}
	)

	name = forms.CharField(
		label="Name",
		max_length=100,
		error_messages={
			'required': 'Please enter your name',
			'invalid': 'The name you entered appears to be invalid'
		}
	)

	message = forms.CharField(
		widget=forms.Textarea,
		error_messages={
			'required': 'Please enter a message',
			'invalid': 'The message you entered appears to be invalid'
		}
	)