$('document').ready(function(){
    $('#spotify-form').submit(function(event) {
      event.preventDefault();
      $.get('http://localhost:3000/music/authorize' + $.param(), function(data) {
        window.location = data;
      }).then(data => {
        console.log(req.body)
      })
  });
  initial();
  console.log('init')
  // login oAuth
  $.ajax({
    url: 'http://localhost:3000/music/kanye'
  }).done(data => {
    console.log(data)
    $('#kanye').prepend(`<h3> ${data.kanyeQuote}t</h3>`)

  })
  .fail(err => {
    console.log(err);
  })
})

function initial(){
  if(isSignIn()){
    $('#main').hide();
    if(isSignInSpotify()){
      $('#music-stats').show();
      $('#spotify--login').hide();
    }else{
      $('#music-stats').hide();
      $('#spotify--login').show();
    }
  }else{
    $('#spotify--login').hide();
    $('#main').show();
    $('#music-stats').hide();
  }
}
function isSignInSpotify(){
  if(localStorage.getItem('spotify_token')){
    return true;
  }else{
    return false;
  }
}
function isSignIn(){
  if(localStorage.getItem('token')){
    return true
  }else{
    return false;
  }
}
function onSignIn(googleUser) {
  let id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: 'post',
    url: 'http://localhost:3000/user/login',
    data: {
      id_token
    }
  })
  .done((data) => {
    localStorage.setItem('token',data)
  })
  .fail((jqXHR,err) => {
    console.error(jqXHR);
  })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}
