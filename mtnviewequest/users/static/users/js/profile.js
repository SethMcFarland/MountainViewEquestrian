var HorseList = React.createClass({

	registerHorse: function() {
		var myurl = '/user/horse_registration/?uid=' + uid;
		console.log(myurl)
		$.ajax({
			type: 'POST',
			url: myurl,
			data:{
				name: $('#id_name').val(),
				age: $('#id_age').val(),
				breed: $('#id_breed').val(),
				description: $('#id_description').val(),
				csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
			},
			success: function(response, status_text, xhr){
				if(xhr.status == 202) {
					this.setState({data: JSON.parse(response)});
					$('#register_horse_modal').foundation('close');
					console.log(success);
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
	},

	getInitialState: function() {
		return {data: this.props.data};
	},

	render: function() {

		if(!this.state.data) {
			return (
				<div><i className="fa fa-spinner fa-spin fa-2x fa-fw" style={{marginTop: '1em', marginLeft: '1em'}}></i></div>
			)
		}

		var horses = this.state.data.map(function(horse) {
			return (
				<b key={horse.pk}><Horse name={horse.fields.name}></Horse></b>
			);
		});

		return (
			<div>
				{horses}
			</div>
		);
	}
});


var Horse = React.createClass({
	render: function() {
		return (
			<div><b>{this.props.name}</b></div>
		);
	}
})

/*
ReactDOM.render(
	<HorseList name="seth"/>,
	document.getElementById('horse_list')
);


$(document).on('submit', '#horse_registration_form', function(e) {
	e.preventDefault();
	var myurl = '/user/horse_registration/?uid=' + uid;
	console.log(myurl)
	$.ajax({
		type: 'POST',
		url: myurl,
		data:{
			name: $('#id_name').val(),
			age: $('#id_age').val(),
			breed: $('#id_breed').val(),
			description: $('#id_description').val(),
			csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
		},
		success: function(response, status_text, xhr){
			if(xhr.status == 202) {
				ReactDOM.render(
					<HorseList name="seth" data={JSON.parse(response)} />,
					document.getElementById('horse_list')
				);
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
});


var FormSubmit = React.createClass({
	submitHorseRegister: function() {
		$.ajax({
			type: "POST",
			url: url,
			data: {
				name: 
			},
		});
	},
})
$.ajax({
		type: 'POST',
		url: '/user/login/',
		data:{
			email: $('#id_email').val(),
			password: $('#id_password').val(),
			csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
		},
		success: function(response, status_text, xhr){
			if(xhr.status == 202) {
				window.location.replace('/user/' + response.uid);
				//profile_or_home();
				//$('#login_or_reg_modal').foundation('close');
			}
			else if(xhr.status == 201) {
				console.log("no such luck");
				$('#login_or_reg_modal_contents').html(response);
			}
		},
		error: function(response){
			console.log("Returned error code");
		}
	});
var UserList = React.createClass({
	loadUsersFromServer: function() {
		$.ajax({
			type: "GET",
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({data: JSON.parse(data)});
				console.log("success");
			}.bind(this),
			error: function(xhr, status, err) {
				console.log("failure");
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},

	getInitialState: function() {
		return {data: null};
	},

	componentDidMount: function() {
		this.loadUsersFromServer();
		setInterval(this.loadUsersFromServer, this.props.pollInterval);
	},

	render: function() {

		if(!this.state.data) {
			return (
				<div><i className="fa fa-spinner fa-spin fa-2x fa-fw" style={{marginTop: '1em', marginLeft: '1em'}}></i></div>
			)
		}

		var users = this.state.data.map(function(user) {
			return (
				<li key={user.pk}><User first={user.fields.first_name} last={user.fields.last_name} email={user.fields.email}></User></li>
			);
		});
		return (
			<div className="user_list">
				<h1>Users</h1>
				<ul>
					{users}
				</ul>
			</div>
		);
	}
});
var User = React.createClass({
	render: function() {
		return (
			<div><b>{this.props.first} {this.props.last}: </b>{this.props.email}</div>
		);
	}
})
ReactDOM.render(
	<UserList url="/user/api" pollInterval={2000} />,
	document.getElementById('users')
);*/