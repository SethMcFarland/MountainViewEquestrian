$(document).ready(function() {

	var calendar = $('#event_calendar').fullCalendar({

		header:
		{
			left: 'title',
			right: 'prev,next today'
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
						$('#event_details_button').click({id: event.id}, signup_handler);

					},

					error: function(response) {

						console.log("Error at event_details_handler ajax call");

					}

				});

			}

			return false;
		},

		defaultView: 'listMonth'

	});

});

function signup_handler(e) {

	signup_handler_url = '/event/signup/?eid=' + e.data.id;

	$.ajax({

		type: 'GET',
		url: signup_handler_url,

		success: function(response) {

			$('#event_details_modal').html(response)

		},

		error: function(response) {

			console.log("Error at signup_handler ajax call");

		}

	});

}