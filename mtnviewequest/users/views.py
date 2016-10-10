from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.core import serializers
from django.contrib.auth import authenticate, get_user_model, login, logout
from django.urls import reverse
from django.template.loader import render_to_string

from .forms import UserRegistrationForm, UserLoginForm
from .models import Profile
from django.contrib.auth.models import User

# Create your views here.

def login_view(request):

	if request.method == 'POST':
		form = UserLoginForm(request.POST)

		if form.is_valid():
			user = authenticate(username=form.cleaned_data['username'], password=form.cleaned_data['password'])
			login(request, user)

			return HttpResponseRedirect("/")

	else:
		form = UserLoginForm()

	return render(request, 'users/login.html', {'form': form})


def logout_view(request):
	logout()
	return HttpResponseRedirect(reverse('base:index'))


def registration(request):

	if request.method == 'POST':
		form = UserRegistrationForm(request.POST)

		if form.is_valid():
			user = form.save(commit=False)
			password = form.cleaned_data.get('password')
			user.set_password(password)
			user.save()

			profile = Profile(user=user, phone_num=form.cleaned_data.get('phone_num'), reason=form.cleaned_data.get('reason'))
			profile.save()

			user = authenticate(username=user.username, password=password)
			login(request, user)

			return HttpResponse("Success", status=202)

	else:
		form = UserRegistrationForm()
	
	html = render_to_string('users/partials/user_registration_form.html', {'form': form}, request=request)
	return HttpResponse(html, status=201)

			#user = User(first_name=form.cleaned_data['first_name'], last_name=form.cleaned_data['last_name'], email=form.cleaned_data['email'], username=form.cleaned_data['username'])
			#user.set_password(form.cleaned_data['password1'])

			#profile = Profile(user=user, phone_num=form.cleaned_data['phone_num'], reason=form.cleaned_data['reason'])
			
			#user.save()
			#profile.save()

			#form = UserRegistrationForm()

			#return render(request, 'users/registration.html', {'form': form})

	#else:
	#	form = UserRegistrationForm()

	#return render(request, 'users/registration.html', {'form': form})

def usersapi(request):

	users = User.objects.all()
	users_serialized = serializers.serialize('json', users)

	return JsonResponse(users_serialized, safe=False)