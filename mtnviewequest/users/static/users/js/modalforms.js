$(document).ready(function() {
	
	$(document).on("change", '#id_reason', function() {
		console.log($('#id_reason').val());
		extend_form($('#id_reason').val());
	});

	$(document).on('submit', '#registration_form', register_form_submit);

	$('#modal_register_link').click(register_handler);

	$(document).on('submit', '#login_form', login_form_submit);

	$('#modal_login_link').click(login_handler);

	$('.back_arrow').click(function() { $('#login_or_reg_modal').foundation('close'); });

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


function register_form_submit(e) {
	
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

				window.location.replace('/');

			}

			else if(xhr.status == 201) {

				console.log("no such luck");
				$('#login_or_reg_modal_contents').html(response);
				extend_form($('#id_reason').val());

			}

		},

		error: function(response){

			console.log("Error code from register_form_submit ajax call");

		}

	});

}

function register_handler() {

	$.ajax({

		type: 'GET',
		url: '/user/registration',

		success: function(response) {

			$('#login_or_reg_modal_contents').html(response);
			$('#login_or_reg_modal').foundation('close');
			$('#login_or_reg_modal').foundation('open');
			$('.back_arrow').unbind("click");
			$('.back_arrow').click(reset_modal);

		},

		error: function(response) {

			console.log("Error code from register_handler ajax call");
		}

	});

}

function login_form_submit(e) {

	e.preventDefault();
	console.log("posting login uname: " + $('#id_email').val() + "   pword: " + $('#id_password').val());

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

				window.location.replace('/');

			}

			else if(xhr.status == 201) {

				console.log("no such luck");
				$('#login_or_reg_modal_contents').html(response);

			}

		},

		error: function(response){

			console.log("Error code from login_form_submit ajax call");

		}

	});

}


function login_handler() {

	$.ajax({
		type: 'GET',
		url: '/user/login',

		success: function(response) {

			$('#login_or_reg_modal_contents').html(response);
			$('#login_or_reg_modal').foundation('close');
			$('#login_or_reg_modal').foundation('open');
			$('.back_arrow').unbind("click");
			$('.back_arrow').click(reset_modal);

		},

		error: function(response) {

			console.log("Error code from login_handler ajax call");
		}

	});

}


function reset_modal() {

	$('#login_or_reg_modal_contents').html('<p class="text-center"><a id="modal_login_link">Login</a> or <a id="modal_register_link">Register</a></p>')
	$('#modal_register_link').click(register_handler);
	$('#modal_login_link').click(login_handler);
	$('.back_arrow').unbind("click");
	$('.back_arrow').click(function() { $('#login_or_reg_modal').foundation('close'); });

}