$(document).ready(function() {

	var calendar = $('#event_calendar').fullCalendar({

		header:
		{
			left: 'seth',
			right: ''
		},

		events: '/event/get_all',

		eventClick: function(event, js_event, view) {

			if(event.backgroundColor == "grey") {
				$('#event_details_modal').html("<h3>Sorry, this event has expired</h3>").foundation('open');
			}

			else {
				$.ajax({

					type: 'GET',
					url: event.url,

					success: function(response) {

						$('#event_details_modal').html(response).foundation('open');

						var enroll_status = $('#event_details_button').text();

						if(enroll_status == "Sign Up")
							$('#event_details_button').click({id: event.id, type: 1}, signup_handler);

						else if(enroll_status == "Unenroll")
							$('#event_details_button').click({id: event.id, type: 0}, signup_handler);

						else if(enroll_status == "Join Waitlist")
							$('#event_details_button').click({id: event.id, type: 1}, waitlist_handler);

						else if(enroll_status == "Drop Waitlist")
							$('#event_details_button').click({id: event.id, type: 0}, waitlist_handler);

						else
							$('#event_details_button').click(open_login);

					},

					error: function(response) {

						console.log("Error at event_details_handler ajax call");

					}

				});

			}

			return false;
		},

		loading: function( isLoading, view) {

			if(isLoading) {
				console.log("loading");
			}
			else {
				console.log("done");
			}

		},

		defaultView: 'listYear'

	});

});


function open_login() {

	reset_modal();
	$('#login_or_reg_modal').foundation('open');
	
}


function waitlist_handler(e) {

	waitlist_handler_url = '/event/waitlist/?eid=' + e.data.id + '&type=' + e.data.type;

	$.ajax({

		type: 'GET',
		url: waitlist_handler_url,

		success: function(response) {

			$('#event_details_modal').html(response)

		},

		error: function(response) {

			console.log("Error at waitlist_handler ajax call");

		}

	});

}


function signup_handler(e) {

	signup_handler_url = '/event/signup/?eid=' + e.data.id + '&type=' + e.data.type;

	$.ajax({

		type: 'GET',
		url: signup_handler_url,

		success: function(response) {

			$('#event_details_modal').html(response)

			if(e.data.type == 1)
				$('#continue_signup_button').click(event_continue_handler);

		},

		error: function(response) {

			console.log("Error at signup_handler ajax call");

		}

	});

}


function event_continue_handler() {

	$('#deposit_or_full_section').attr("hidden", "true");
	$('#payment_section').removeAttr("hidden");

}