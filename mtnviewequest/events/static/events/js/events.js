$(document).ready(function() {

	get_events();

	var calendar = $('#event_calendar').fullCalendar({

		header:
		{
			left: 'title',
			right: 'prev,next today'
		}

		events: '/event/get_all'

	});

});


function get_events() {

	$.ajax({
		type: 'GET',
		url: '/event/all',
		dataType: 'json',

		success: function(response) {

			return $.parseJSON(response);

		},

		error: function(response) {

			console.log("Error code from get_events ajax call");

		}

	});
}