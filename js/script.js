
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!

    var streetStr = $('#street').val(); // gets input street from the object that collected data
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;
    $greeting.text("So you want to live in " + address + " ?"); // replaces the greetting w new message

    var streetviewURL = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location='+ address + ''; //gets the photo from api by now the pc is inside of streetview variable
    $body.append('<img class="bgimg" src="' + streetviewURL + '">'); // adding a new class to body html to display the pic background of location

    return false;
};

$('#form-container').submit(loadData);