$(document).ready(function() {
	$(document).on("change", '#id_reason', function() {
		console.log($('#id_reason').val());
		extend_form($('#id_reason').val());
	});
});

function extend_form(value) {
	if(value == 1) {
		$('.hidden_field_wrapper').show();
		$('#id_horse_name').prop('required', true);
		$('#id_horse_age').prop('required', true);
		$('#id_horse_breed').prop('required', true);
		$('#id_horse_description').prop('required', true);
	}
	else {
		$('.hidden_field_wrapper').hide();
		$('#id_horse_name').prop('required', false);
		$('#id_horse_age').prop('required', false);
		$('#id_horse_breed').prop('required', false);
		$('#id_horse_description').prop('required', false);
	}
}

function profile_or_home() {
	$('#login_or_reg_modal_contents').html("<h5><a href='/'>Profile</a> OR <a href='/'>Home</a>")
}

$(document).on('submit', '#registration_form', function(e) {
	e.preventDefault();

	$.ajax({
		type: 'POST',
		url: '/user/registration/',
		data:{
			first_name: $('#id_first_name').val(),
			last_name: $('#id_last_name').val(),
			username: $('#id_username').val(),
			email: $('#id_email').val(),
			password: $('#id_password').val(),
			password2: $('#id_password2').val(),
			phone_num: $('#id_phone_num').val(),
			reason: $('#id_reason').val(),
			horse_name: $('#id_horse_name').val(),
			horse_age: $('#id_horse_age').val(),
			horse_breed: $('#id_horse_breed').val(),
			horse_description: $('#id_horse_description').val(),
			csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
		},
		success: function(response, status_text, xhr){
			if(xhr.status == 202) {
				window.location.replace('/user/' + response.uid);
				//profile_or_home();
			}
			else if(xhr.status == 201) {
				console.log("no such luck");
				$('#login_or_reg_modal_contents').html(response);
				extend_form($('#id_reason').val());
			}
		},
		error: function(response){
			console.log("Returned error code");
		}
	});
});

$('#modal_register_link').click(function() {
	$.ajax({
		type: 'GET',
		url: '/user/registration',
		success: function(response) {
			$('#login_or_reg_modal_contents').html(response);
			$('#login_or_reg_modal').foundation('close');
			$('#login_or_reg_modal').foundation('open');
		}
	});
});

$(document).on('submit', '#login_form', function(e) {
	e.preventDefault();

	$.ajax({
		type: 'POST',
		url: '/user/login/',
		data:{
			email: $('#id_email').val(),
			password: $('#id_password').val(),
			csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
		},
		success: function(response, status_text, xhr){
			if(xhr.status == 202) {
				window.location.replace('/user/' + response.uid);
			}
			else if(xhr.status == 201) {
				console.log("no such luck");
				$('#login_or_reg_modal_contents').html(response);
			}
		},
		error: function(response){
			console.log("Returned error code");
		}
	});
});

$('#modal_login_link').click(function() {
	$.ajax({
		type: 'GET',
		url: '/user/login',
		success: function(response) {
			$('#login_or_reg_modal_contents').html(response);
			$('#login_or_reg_modal').foundation('close');
			$('#login_or_reg_modal').foundation('open');
		}
	});
});


$(document).on('submit', '#horse_registration_form', function(e) {
	e.preventDefault();
	var myurl = '/user/horse_registration/?uid=' + uid;

	$.ajax({
		type: 'POST',
		url: myurl,
		dataType: 'json',
		data:{
			name: $('#id_name').val(),
			age: $('#id_age').val(),
			breed: $('#id_breed').val(),
			description: $('#id_description').val(),
			csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
		},
		success: function(response, status_text, xhr){
			if(xhr.status == 202) {
				update_horse_list($.parseJSON(response));
				$('#horse_registration_form')[0].reset();
				$('#register_horse_modal').foundation('close');
				console.log("success");
			}
			else if(xhr.status == 201) {
				console.log("no such luck");
				$('#register_horse_modal_contents').html(response);
			}
		},
		error: function(response){
			console.log("Returned error code");
		}
	});
});


function update_horse_list(response) {

	$('#no_horses').hide();

	$("<li>" + response[0]["fields"]["name"] + "</li>").appendTo("#horse_list");

}
