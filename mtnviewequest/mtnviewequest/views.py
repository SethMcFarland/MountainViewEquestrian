from django.shortcuts import render

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