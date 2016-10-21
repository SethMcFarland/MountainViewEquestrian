$(document).ready(function() {
	
	$(document).on('submit', '#horse_registration_form', horse_registration);

	$('.horse_details_table_item').click(horse_details_handler);

});

function horse_details_handler(e) {
	
	var horse_details_url = '/user/horse_details/?hid=' + $(this).attr('id');
	console.log(horse_details_url);
	$.ajax({

		type: 'GET',
		url: horse_details_url,

		success: function(response, status_text, xhr){
			if(xhr.status == 202) {

				$('#horse_details_modal').html(response).foundation('open');
				//$('#horse_details_modal_contents').html(response);
				//$('#horse_details_modal').foundation('open');
				$('#horse_details_accordion').foundation();
				console.log("success");

			}

		},

		error: function(response){

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

		success: function(response, status_text, xhr){
			if(xhr.status == 202) {

				$('#no_horses').hide();
				var parsed_response = $.parseJSON(response);
				$("<tr>" + parsed_response[0]["fields"]["name"] + "</tr>").appendTo("#horse_list");
				$('#horse_registration_form')[0].reset();
				$('#register_horse_modal').foundation('close');
				console.log("success");

			}

			else if(xhr.status == 201) {

				console.log("no such luck");
				$('#register_horse_modal_contents').html(response);

			}

		},

		error: function(response){

			console.log("Error code from horse_registration ajax call");

		}

	});

}