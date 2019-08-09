$(function() {
    $('#spotify-form').submit(function(event) {
      event.preventDefault();
      $.get('http://localhost:3000/authorize' + $.param(), function(data) {
        window.location = data;
      })

  });
})()
