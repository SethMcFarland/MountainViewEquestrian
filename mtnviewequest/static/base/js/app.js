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
);