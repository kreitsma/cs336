// idscript.js

"use strict";

$( 'form' ).submit(function( event ) {
	event.preventDefault();
	
	var form = $( this );
	var idNum = { "idnumber" : $( "#idnum" ).val() };

	$.ajax({
		type: 'POST',
		url: '/findbyid',
		contentType: 'application/json',
		data: JSON.stringify(idNum),
		dataType: 'json'
	})
	.done(function( json ) {
		$( "p" ).empty();
		$( "body" ).append("<p>The person with ID number " + 
									json.idnum + " is " + json.firstname + " " + json.lastname + 
									", who started " + json.numyears + " years ago.</p>");
	})
  
	.fail(function( xhr, status, errorThrown ) {
		alert("Request failed");
		console.log( "Error: " + errorThrown );
	});
});