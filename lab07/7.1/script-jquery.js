$( document ).ready(function() {
				console.log( "ready" );
        $( "a" ).click(function( event ) {
            alert( "The link will no longer take you to jquery.com" );
            event.preventDefault();
        });
    });

		//Add a new paragraph to the document
		$( "body" ).append( "<p>Testing Lab 07...</p>" );
