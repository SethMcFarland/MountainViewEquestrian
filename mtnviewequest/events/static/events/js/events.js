$(document).ready(function() {

	var calendar = $('#event_calendar').fullCalendar({

		header:
		{
			left: 'title',
			right: 'prev,next today'
		},

		events: '/event/get_all'

	});

});