$(document).ready(function() {

	$('.back_arrow').click(function() { $('#event_details_modal').foundation('close'); });

	var calendar = $('#event_calendar').fullCalendar({

		title: 'Upcoming Events',

		header: false,

		height: 'auto',

		events: '/event/get_all',

		eventClick: event_details_handler,

		loading: function( isLoading, view) {

			if(isLoading) {
				//console.log("loading");
			}
			else {
				//console.log("done");
			}

		},

		defaultView: 'listYear'

	});

});


function event_details_handler(event, js_event, view) {

	if(event.backgroundColor == "grey") {
		$('#event_details_modal_contents').html("<h3>Sorry, this event has expired</h3>")
		$('#event_details_modal').foundation('open');
	}

	else {
		$.ajax({

			type: 'GET',
			url: event.url,

			success: function(response) {

				$('#event_details_modal_contents').html(response)
				$('#event_details_modal').foundation('open');

				window.event_details_content = response;

				set_details_button_listener(event.id);

			},

			error: function(response) {

				//console.log("Error at event_details_handler ajax call");

			}

		});

	}

	return false;
}


function set_details_button_listener(eid) {

	var enroll_status = $('#event_details_button').text();

	if(enroll_status == "Sign Up")
		$('#event_details_button').click({id: eid, type: 1}, signup_handler);

	else if(enroll_status == "Unenroll")
		$('#event_details_button').click({id: eid, type: 0}, signup_handler);

	else if(enroll_status == "Join Waitlist")
		$('#event_details_button').click({id: eid, type: 1}, waitlist_handler);

	else if(enroll_status == "Drop Waitlist")
		$('#event_details_button').click({id: eid, type: 0}, waitlist_handler);

	else
		$('#event_details_button').click(open_login);

	$('.back_arrow').unbind("click");
	$('.back_arrow').click(function() { $('#event_details_modal').foundation('close'); });

}


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

/*
			$('.back_arrow').unbind("click");

			$('#event_details_modal_contents').html(response)

			$('.back_arrow').click(function() {

				$('#event_details_modal_contents').html(window.event_details_content);
				set_details_button_listener(e.data.id);

			});*/

			$('#event_details_button').unbind('click');

			if(e.data.type == 1) {
				$('#event_details_button').text('Drop Waitlist');
				$('#event_details_button').click({id: e.data.id, type: 0}, waitlist_handler);
			}

			else if(e.data.type == 0) {
				$('#event_details_button').text('Join Waitlist');
				$('#event_details_button').click({id: e.data.id, type: 1}, waitlist_handler);
			}
			//console.log("joined waitlist")

		},

		error: function(response) {

			//console.log("Error at waitlist_handler ajax call");

		}

	});

}


function signup_handler(e) {

	signup_handler_url = '/event/signup/?eid=' + e.data.id + '&type=' + e.data.type;

	$.ajax({

		type: 'GET',
		url: signup_handler_url,

		success: function(response) {

			$('.back_arrow').unbind("click");

			$('#event_details_modal_contents').html(response)

			$('.back_arrow').click(function() {

				$('#event_details_modal_contents').html(window.event_details_content);
				set_details_button_listener(e.data.id);
				
			});

		},

		error: function(response) {

			//console.log("Error at signup_handler ajax call");

		}

	});

}