$(document).ready(function() {
	
	$(document).on('submit', '#horse_registration_form', horse_registration);

});

function horse_registration(e) {
	
	e.preventDefault();
	var myurl = '/user/horse_registration/?uid=' + uid;

	$.ajax({

		type: 'POST',
		url: myurl,
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
				$("<li>" + parsed_response[0]["fields"]["name"] + "</li>").appendTo("#horse_list");
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

			console.log("Returned error code");

		}

	});
	
}