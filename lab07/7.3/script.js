"use strict";

$(document).ready(function() {
    $( ".widget input[type=submit], .widget a, .widget button" ).button();
    $( "button, input, a" ).click( function( event ) {
			
			$.ajax({
 
    		// The URL for the request
    		url: "/lab07",
 
    		// The data to send (will be converted to a query string)
    		data: {
        		name: "lab07"
    		},
 
		    // Whether this is a POST or GET request
		    type: "GET",
	 
		    // The type of data we expect back
		    dataType : "json",
			})

			.done(function( json ) {
		      $( "body").append("<span><em>" + json.content + "</em></span>");
		  })

			//Handle failures
			.fail(function( xhr, status, errorThrown ) {
		    alert( "Sorry, there was a problem!" );
		    console.log( "Error: " + errorThrown );
		    console.log( "Status: " + status );
		    console.dir( xhr );
		  })

			// Code to run regardless of success or failure;
 		 .always(function( xhr, status ) {
 		   alert( "The request is complete!" );
 		 });


    } );
} );
