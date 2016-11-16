"use strict";

$(document).ready(function() {
    $( ".widget input[type=submit], .widget a, .widget button" ).button();
    $( "button, input, a" ).click( function( event ) {
      $( "body" ).append( "<span><em>No data yet..</em></span>" );
    } );
} );
