from django.core.mail import EmailMessage

def send_email(email):
	email.send(fail_silently=False)