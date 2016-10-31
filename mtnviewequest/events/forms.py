from django import forms


class EventRegisterForm(forms.Form):

	phone_num = forms.RegexField(
		label='Confirm Phone Number',
		regex='^(\(?(\d{3})\)?)?(\d{3})\-?(\d{4})$', 
		error_messages={
			'required': 'Please enter your phone number', 
			'invalid': 'The phone number entered appears to be invalid, example 5305555787'
		}
	)

	deposit_agreement = forms.BooleanField(
		label="I understand that my deposit is non-refundable",
		initial=False,
		required=True
	)

