$(document).ready(function() {
	
	$(document).on('submit', '#horse_registration_form', horse_registration);

	$('.horse_details_table_item').click(horse_details_handler);

	$('.event_table_item').click({enrolled: 1}, event_details_handler);

	$('.waitlist_table_item').click({enrolled: 2}, event_details_handler);

});

function unenroll_event_handler() {

	var unenroll_event_url = '/event/unenroll/?eid=' + window.current_eid + '&uid=' + uid;

	$.ajax({

		type: 'GET',
		url: unenroll_event_url,

		success: function(response) {

			$('#' + window.current_event_row).remove();
			$('#event_details_modal').foundation('close');

		},

		error: function(response) {

			//console.log("Error at unenroll_event_handler ajax call");

		}

	});

}

function drop_waitlist_handler(e) {

	var drop_waitlist_url = '/event/waitlist/?eid=' + window.current_eid + '&uid=' + uid + '&type=' + e.data.type;

	$.ajax({

		type: 'GET',
		url: drop_waitlist_url,

		success: function(response) {

			$('#' + window.current_event_row).remove();
			$('#event_details_modal').foundation('close');

		},

		error: function(response) {

			//console.log("Error at unenroll_event_handler ajax call");

		}

	});

}

function event_details_handler(e) {

	window.current_event_row = $(this).attr('id');
	window.current_eid = window.current_event_row.split('_')[1];
	var event_details_url = '/event/details/?enrolled=' + e.data.enrolled + '&eid=' + window.current_eid;

	$.ajax({

		type: 'GET',
		url: event_details_url,

		success: function(response) {

			$('#event_details_modal').html(response).foundation('open');

			if(e.data.enrolled == 1)
				$('#event_details_button').click(unenroll_event_handler);

			else if(e.data.enrolled == 2)
				$('#event_details_button').click({type: 2}, drop_waitlist_handler);

		},

		error: function(response) {

			//console.log("Error at event_details_handler ajax call");

		}

	});

}

function re_enroll_horse_handler() {

	var re_enroll_horse_url = '/user/horse_re_enroll/?hid=' + window.current_hid;

	$.ajax({

		type: 'GET',
		url: re_enroll_horse_url,
		
		success: function(response) {

			$('#enrollment_status').html("Pending");
			$('#re_enroll_horse_button').hide();

		},

		error: function() {

			//console.log("Error at re_enroll_horse_handler ajax call");

		}

	});

}

function horse_details_handler(e) {
	
	window.current_horse_row = $(this).attr('id');
	window.current_hid = window.current_horse_row.split('_')[1];
	var horse_details_url = '/user/horse_details/?hid=' + window.current_hid;

	$.ajax({

		type: 'GET',
		url: horse_details_url,

		success: function(response) {

			$('#horse_details_modal').html(response).foundation('open');
			$('#horse_details_accordion').foundation();
			$('#re_enroll_horse_button').click(re_enroll_horse_handler);
			//console.log("success");

		},

		error: function(response) {

			//console.log("Error code from horse_details_handler ajax call");

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
				$("<tr class='horse_details_table_item' id='horse_" + parsed_response[0]["pk"] + "'><td>" + parsed_response[0]["fields"]["name"] + "</td></tr>").appendTo("#horse_list");
				$('.horse_details_table_item').click(horse_details_handler);
				$('#horse_registration_form')[0].reset();
				$('#register_horse_modal').foundation('close');
				//console.log("success");

			}

			else if(xhr.status == 201) {

				//console.log("no such luck");
				$('#register_horse_modal').html(response);

			}

		},

		error: function(response) {

			//console.log("Error code from horse_registration ajax call");

		}

	});

}