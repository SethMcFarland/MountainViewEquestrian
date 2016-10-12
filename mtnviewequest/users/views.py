from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.core import serializers
from django.contrib.auth import authenticate, get_user_model, login, logout
from django.urls import reverse
from django.template.loader import render_to_string

from .forms import UserRegistrationForm, UserLoginForm
from .models import Profile, Horse
from django.contrib.auth.models import User

# Create your views here.

def user_login(request):

	if request.method == 'POST':
		form = UserLoginForm(request.POST)

		if form.is_valid():
			user = User.objects.filter(email=form.cleaned_data.get("email"))

			if user.exists() and len(user) == 1:
				user = authenticate(username=user[0].username, password=form.cleaned_data['password'])
				login(request, user)
				return HttpResponse("Success", status=202)

			else:
				return HttpResponse("Failure", status=500)

	else:
		form = UserLoginForm()

	html = render_to_string('users/partials/user_login_form.html', {'form': form}, request=request)
	return HttpResponse(html, status=201)


def user_logout(request):
	logout(request)
	return HttpResponseRedirect('/')


def user_registration(request):

	if request.method == 'POST':
		form = UserRegistrationForm(request.POST)

		if form.is_valid():
			user = form.save(commit=False)
			password = form.cleaned_data.get('password')
			user.set_password(password)
			user.save()

			profile = Profile(
							user=user,
							phone_num=form.cleaned_data.get('phone_num'),
							reason=form.cleaned_data.get('reason')
						)
			profile.save()
			print("horse name: " + form.cleaned_data.get('horse_name') + form.cleaned_data.get('reason'))
			if(form.cleaned_data.get('reason') == '1'):
				print("horse name: " + form.cleaned_data.get('horse_name'))
				horse = Horse(
							owner=user, 
							name=form.cleaned_data.get('horse_name'),
							age=form.cleaned_data.get('horse_age'),
							breed=form.cleaned_data.get('horse_breed'),
							description=form.cleaned_data.get('horse_description')
						)
				horse.save()
			else:
				print("no horse found in post")

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