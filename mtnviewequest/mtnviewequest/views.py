from django.shortcuts import render
from django.conf import settings
from django.core.mail import EmailMessage
import os
import django_rq

from .forms import ContactForm
from .helpers import send_email

def index(request):
	return render(request, 'base/index.html')

def about(request):
	return render(request, 'base/about.html')

def services(request):
	return render(request, 'base/services.html')

def contact(request):
	if request.method == 'POST':
		form = ContactForm(prefix="contact", data=request.POST);

		if form.is_valid():
			queue = django_rq.get_queue('default')
			
			email = EmailMessage(
				subject='New Message From ' + form.cleaned_data.get('name'),
				body=form.cleaned_data.get('message'),
				from_email='mountainviewequest@outlook.com',
				to=['sethmcfarland@outlook.com',],
				reply_to=[form.cleaned_data.get('email'),],
			)
			
			queue.enqueue(send_email, email)

			message = "Success"
			form = ContactForm();
			return render(request, 'base/contact.html', {'form': form, 'message': message})

	else:
		form = ContactForm(prefix="contact");

	return render(request, 'base/contact.html', {'form': form})

def gallery(request):
	orbit_pic_set = os.listdir(os.path.join(settings.BASE_DIR, "static/base/img/gallery"))
	
	gallery_path = "base/img/gallery/"
	orbit_pic_set = [gallery_path + picpath for picpath in orbit_pic_set]

	return render(request, 'base/gallery.html', {'orbit_pic_set': orbit_pic_set})