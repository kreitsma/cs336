// addscript.js

"use strict";

$( 'form' ).submit(function( event ) {
	event.preventDefault();
	
	var form = $( this );
	var userData = { "firstname" : $( "#firstname" ).val(),
							"lastname" : $( "#lastname" ).val(),
							"startdate" : $( "#startdate" ).val() };

	$.ajax({
		type: 'POST',
		url: '/addperson',
		contentType: 'application/json',
		data: JSON.stringify(userData),
		dataType: 'json'
	})
	.done(function( json ) {
		$( "body" ).empty();
		$( "body" ).append("<p>" + json.firstname + " " + json.lastname + "'s information has been added" + "</p>");
	})
  
	.fail(function( xhr, status, errorThrown ) {
		alert("Request failed");
		console.log( "Error: " + errorThrown );
	});
});