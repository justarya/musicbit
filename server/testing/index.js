$(function() {
    $('#spotify-form').submit(function(event) {
      event.preventDefault();
      $.get('http://localhost:3000/music/authorize' + $.param(), function(data) {
        window.location = data;
      }).then(data => {
      })
  });
})()
