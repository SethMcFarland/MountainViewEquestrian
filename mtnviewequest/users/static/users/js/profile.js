$(document).ready(function() {
	
	$(document).on('submit', '#horse_registration_form', horse_registration);

	$('.horse_details_table_item').click(horse_details_handler);

	$('.event_table_item').click(event_details_handler);

});

function event_details_handler() {

	window.current_eid = $(this).attr('id');
	var event_details_url = '/event/details/?eid=' + window.current_eid;

	$.ajax({

		type: 'GET',
		url: event_details_url,

		success: function(response, status_text, xhr) {

			$('#event_details_modal').html(response).foundation('open');

		},

		error: function(response) {

			console.log("Error at event_details_handler ajax call");

		}

	});

}

function re_enroll_horse_handler() {

	var re_enroll_horse_url = '/user/horse_re_enroll/?hid=' + window.current_hid;

	$.ajax({

		type: 'GET',
		url: re_enroll_horse_url,
		
		success: function(response, status_text, xhr) {

			$('#enrollment_status').html(response);
			$('#re_enroll_horse_button').hide();

		},

		error: function() {

			console.log("Error at re_enroll_horse_handler ajax call");

		}

	});

}

function horse_details_handler(e) {
	
	window.current_hid = $(this).attr('id');
	var horse_details_url = '/user/horse_details/?hid=' + window.current_hid;

	$.ajax({

		type: 'GET',
		url: horse_details_url,

		success: function(response, status_text, xhr) {

			$('#horse_details_modal').html(response).foundation('open');
			$('#horse_details_accordion').foundation();
			$('#re_enroll_horse_button').click(re_enroll_horse_handler);
			console.log("success");

		},

		error: function(response) {

			console.log("Error code from horse_details_handler ajax call");

		}

	});

}

function horse_registration(e) {
	
	e.preventDefault();
	var horse_registration_url = '/user/horse_registration/?uid=' + uid;

	$.ajax({

		type: 'POST',
		url: horse_registration_url,
		dataType: 'json',
		data:{

			name: $('#id_name').val(),
			age: $('#id_age').val(),
			breed: $('#id_breed').val(),
			description: $('#id_description').val(),
			csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()

		},

		success: function(response, status_text, xhr) {
			if(xhr.status == 202) {

				$('#no_horses').hide();
				var parsed_response = $.parseJSON(response);
				$("<tr class='horse_details_table_item' id='" + parsed_response[0]["pk"] + "'><td>" + parsed_response[0]["fields"]["name"] + "</td></tr>").appendTo("#horse_list");
				$('.horse_details_table_item').click(horse_details_handler);
				$('#horse_registration_form')[0].reset();
				$('#register_horse_modal').foundation('close');
				console.log("success");

			}

			else if(xhr.status == 201) {

				console.log("no such luck");
				$('#register_horse_modal').html(response);

			}

		},

		error: function(response) {

			console.log("Error code from horse_registration ajax call");

		}

	});

}