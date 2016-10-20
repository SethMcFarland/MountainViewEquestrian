from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.core import serializers
from django.contrib.auth import authenticate, get_user_model, login, logout
from django.urls import reverse
from django.template.loader import render_to_string
import json

from .forms import UserRegistrationForm, UserLoginForm, HorseRegistrationForm
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
				response = {'uid': user.id}

				return HttpResponse(json.dumps(response), content_type='application/json', status=202)

			else:
				return HttpResponse("Failure", status=500)

	else:
		form = UserLoginForm()

	html = render_to_string('users/partials/user_login_form.html', {'form': form}, request=request)
	return HttpResponse(html, status=201)


def user_logout(request):
	logout(request)
	return HttpResponseRedirect('/')


def user_profile(request, uid):
	user = get_object_or_404(User, pk=uid)
	users_horses = Horse.objects.filter(owner=user)
	horse_form = HorseRegistrationForm()
	return render(request, 'users/profile.html', {'user': user, 'horse_form': horse_form, 'users_horses': users_horses})


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
							reason=form.cleaned_data.get('reason'),
							email_prefs=form.cleaned_data.get('email_prefs')
						)
			profile.save()

			if(form.cleaned_data.get('reason') == '1'):
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

			response = {'uid': user.id}
			return HttpResponse(json.dumps(response), content_type='application/json', status=202)

		else:
			html = render_to_string('users/partials/user_registration_form.html', {'form': form}, request=request)
			return HttpResponse(html, status=201)

	else:
		return HttpResponse(status=500)


def horse_registration(request):
	if request.method == 'POST':
		form = HorseRegistrationForm(request.POST)
		if form.is_valid():
			horse = form.save(commit=False)
			print("This -->" + str(request.GET.get('uid')))
			horse.owner = User.objects.filter(pk=request.GET.get('uid'))[0] #get_object_or_404(User, pk=request.POST.get('uid'))
			horse.save()

			new_horse_serialized = serializers.serialize('json', [horse])
			#users_horses_serialized = serializers.serialize('json', users_horses)

			return JsonResponse(new_horse_serialized, safe=False, status=202)

		else:
			html = render_to_string('users/partials/horse_registration_form.html', {'horse_form': form}, request=request)
			return HttpResponse(html, status=201)

	else:
		return HttpResponse(status=500)
		


'''
def usersapi(request):

	users = User.objects.all()
	users_serialized = serializers.serialize('json', users)

	return JsonResponse(users_serialized, safe=False)


def users_horses(request):
	uid = request.GET.get('uid')
	user = get_object_or_404(User, pk=uid)
	horses = Horse.objects.filter(owner=user)
	horses_serialized = serializers.serialize('json', horses)
	
	return JsonResponse(horses_serialized, safe=False)
	'''