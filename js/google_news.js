// Generated by CoffeeScript 1.3.3
(function() {
  var $results, GOOGLE_URL, createResultEl, displayResults, getDateString, requestData;

  GOOGLE_URL = 'https://ajax.googleapis.com/ajax/services/search/news?v=1.0' + '&callback=?';

  $results = $('.results').first();

  getDateString = function(date) {
    var day, month, year;
    date = new Date(Date.parse(date));
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate() + 1;
    if (Number(month) < 10) {
      month = '0' + month;
    }
    if (Number(day) < 10) {
      day = '0' + day;
    }
    return "" + year + "/" + month + "/" + day;
  };

  createResultEl = function(result) {
    var $content, $date, $img, $publisher, $root, $summary, $title, date, img, url;
    $root = $("<article></article>");
    if (result.image != null) {
      img = result.image.tbUrl;
    } else {
      img = 'http://placekitten.com/80/60';
    }
    $img = $("<img src='" + img + "'/>");
    url = result.unescapedUrl;
    $summary = $("<p class='info'></p>");
    $publisher = $("<span class='publisher'>" + result.publisher + "</p>");
    date = getDateString(result.publishedDate);
    $date = $("<time>" + date + "</time>");
    $content = $("<p class='summary'>" + result.content + "\n  <a href='" + url + "'>Read More</a>\n</p>");
    $summary.append($img, $publisher, $date);
    $title = $("<h3><a href='" + url + "'>" + result.title + "</h3></a>");
    return $root.append($title, $summary, $content);
  };

  displayResults = function(data) {
    var $sorryBroResponse, results;
    $results.removeClass('loading');
    results = data.responseData.results;
    if (results.length === 0) {
      $sorryBroResponse = $("<h1 class='error'>Sorry bro, no search results found. :[</h1>");
      return $results.append($sorryBroResponse);
    }
    return results.forEach(function(result) {
      var $article;
      $article = createResultEl(result);
      return $results.append($article);
    });
  };

  requestData = function(event) {
    var query;
    event.preventDefault();
    $results.empty();
    $results.addClass('loading');
    query = $('input[name="query"]').val();
    return $.getJSON(GOOGLE_URL, {
      q: query
    }, displayResults);
  };

  $('form[name="search"]').submit(requestData);

}).call(this);
