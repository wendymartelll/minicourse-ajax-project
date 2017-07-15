
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

    $greeting.text('So, you want to live at ' + address + ' ?'); // replaces the greetting w new message

    var streetviewURL = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + ''; //gets the photo from api by now the pc is inside of streetview variable
    $body.append('<img class="bgimg" src="' + streetviewURL + '">'); // adding a new class to body html to display the pic background of location

    // Your NYTimes AJAX request goes here
    var nytimesURL ='http://api.nytimes.com/svc/search/v2/articlesearch.json?q='+ cityStr +'&sort=newest&api-key=92a038c1b4bd46c39f544d5ca894e230';

    $.getJSON(nytimesURL, function (data){
      $nytHeaderElem.text ('New York Times about' + cityStr);

      articles = data.response.docs;
      for (var i = 0; i < articles.length; i++) {
        var article = articles[i];
        $nytElem.append('<li class = "article">' + '<a href = "'+ article.web_url +'">'
        + article.headline.main + '</a>' + '<p>' +article.snippet + '</p>' +'</li>');
      };

    }).error(function (e) {
      $nytHeaderElem.text ('New York Times about could not be loaded' );
    });

    // Wikipedia AJAX request is here
    var wikiURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback';

    var wikiRequestTimeout = setTimeout(function(){  // protection for error
      $wikiElem.text("failed to get wikipedia resources");
    },8000);

    $.ajax({
      url: wikiURL,
      dataType:"jsonp",

      success: function(response){
        var articleList= response[1];

        for (var i = 0; i < articleList.length; i++) {
          var articleStr = articleList[i];
          var url = 'http://en.wikipedia.org/wiki/' + articleStr;
          $wikiElem.append('<li><a href = "'+ url +'">'
          + articleStr + '</a></li>');
        };
        clearTimeout(wikiRequestTimeout);
      }
    });



    return false;
};



$('#form-container').submit(loadData);
