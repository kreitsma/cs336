var PersonBox = React.createClass({
	loadPeopleFromServer: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
		})
		.done(function(result){
             this.setState({data: result});
         }.bind(this))
         .fail(function(xhr, status, err) {
             console.error(this.props.url, status, err.toString());
         }.bind(this));
	},
	handlePersonSubmit: function(person) {
		var people = this.state.data;
		var newPeople = people.concat([person]);
		this.setState({data: newPeople});
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			type: 'POST',
			data: person,
		})
		.done(function(result){
             this.setState({data: result});
         }.bind(this))
         .fail(function(xhr, status, err) {
             this.setState({data: people});
             console.error(this.props.url, status, err.toString());
         }.bind(this));
	},
	getInitialState: function() {
		return {data: []};
	},
	componentDidMount: function() {
		this.loadPeopleFromServer();
		setInterval(this.loadPeopleFromServer, this.props.pollInterval);
	},
	render: function() {
		return (
		<div className="personBox">
			<h1>People</h1>
			<PersonList data={this.state.data} />
			<PersonForm onPersonSubmit={this.handlePersonSubmit} />
		</div>
		);
	}
});

var PersonList = React.createClass({
  render: function() {
	var personNodes = this.props.data.map(function(person) {
      return (
        <Person id={person.loginID} >
          {person.firstname}
		  {person.lastname}
		  {person.startdate}
        </Person>
      );
    });

    return (
      <div className="personList">
        {personNodes}
      </div>
    );
  }
});

var Person = React.createClass({
    rawMarkup: function() {
        var md = new Remarkable({html: true});
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    },

    render: function() {
        return (
            <div className="person">
                <h2 className="personID" >
                    {this.props.id}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
        );
    }
});

var PersonForm = React.createClass({
	getInitialState: function() {
    return {firstname: '', lastname: '', id: '', startdate: ''};
  },
  handleFirstNameChange: function(e) {
    this.setState({firstname: e.target.value});
  },
  handleLastNameChange: function(e) {
    this.setState({lastname: e.target.value});
  },
  handleStartDateChange: function(e) {
    this.setState({startdate: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var firstname = this.state.firstname.trim();
	var lastname = this.state.lastname.trim();
    var startdate = this.state.startdate.trim();
    if (!firstname || !lastname || !startdate) {
      return;
    }
    this.props.onPersonSubmit({firstname: firstname, lastname: lastname, startdate: startdate});
    this.setState({firstname: '', lastname: '', startdate: ''});
  },

  render: function() {
    return (
      <form className="personForm" onSubmit={this.handleSubmit}>
        <input
		  className="ui-widget ui-corner-all"
          type="text"
          placeholder="Your first name"
          value={this.state.firstname}
          onChange={this.handleFirstNameChange}
        />
		<input
		  className="ui-widget ui-corner-all"
          type="text"
          placeholder="Your last name"
          value={this.state.lastname}
          onChange={this.handleLastNameChange}
        />
        <input
		  className="ui-widget ui-corner-all"
          type="text"
          placeholder="Start date YYYY/MM/DD"
          value={this.state.startdate}
          onChange={this.handleStartDateChange}
        />
        <input className="ui-button ui-widget ui-corner-all" type="submit" value="Post" />
      </form>
    );
  }
});

ReactDOM.render(
  <PersonBox url="/people" pollInterval={2000} />,
  document.getElementById('content')
);