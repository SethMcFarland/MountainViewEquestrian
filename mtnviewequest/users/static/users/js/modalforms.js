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
			csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
		},
		success: function(response, status_text, xhr){
			if(xhr.status == 202) {
				$('#login_or_reg_modal').foundation('close');
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
				$('#login_or_reg_modal').foundation('close');
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
		}
	});
});
