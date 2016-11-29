from django.shortcuts import render
from django.conf import settings
import os

from .forms import ContactForm

def index(request):
	return render(request, 'base/index.html')

def about(request):
	return render(request, 'base/about.html')

def services(request):
	return render(request, 'base/services.html')

def contact(request):
	if request.method == 'POST':
		form = ContactForm(request.POST);

		if form.is_valid():
			message = "Success"
			form = ContactForm();
			return render(request, 'base/contact.html', {'form': form, 'message': message})

	else:
		form = ContactForm();

	return render(request, 'base/contact.html', {'form': form})

def gallery(request):
	orbit_pic_set = os.listdir(os.path.join(settings.BASE_DIR, "static/base/img/gallery"))
	
	gallery_path = "base/img/gallery/"
	orbit_pic_set = [gallery_path + picpath for picpath in orbit_pic_set]

	return render(request, 'base/gallery.html', {'orbit_pic_set': orbit_pic_set})