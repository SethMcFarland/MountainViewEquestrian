$(document).ready(function() {

	var calendar = $('#event_calendar').fullCalendar({

		header:
		{
			left: 'title',
			right: 'prev,next today'
		},

		events: '/event/get_all',

		eventClick: function(event, js_event, view) {

			$.ajax({

				type: 'GET',
				url: event.url,

				success: function(response) {

					$('#event_details_modal').html(response).foundation('open');

				},

				error: function(response) {

					console.log("Error at event_details_handler ajax call");

				}

			});

			return false;
		},

		defaultView: 'listMonth'

	});

});