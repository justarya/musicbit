let genres;
$('document').ready(function(){
  let searchParams = new URLSearchParams(window.location.search)
  if(searchParams.has('code')){
    let param = searchParams.get('code')
    $.ajax({
      url: 'http://localhost:3000/music/callback?code='+param
    })
    .done(function(data){
      localStorage.setItem('spotify_token',data.access_token);  
      window.location = '/';
    })
  }
  $('#spotify-form').submit(function(event) {
    event.preventDefault();
    $.ajax({
      url:'http://localhost:3000/music/authorize'
    })
    .done(function(data){
      window.location = data;
    })
    .fail(function(err){
      console.log('fail', err);
    });
  });
  initial();
})
function initial(){
  if(isSignIn()){
    $('#main').hide();
    if(isSignInSpotify()){
      $('#music-stats').show();
      $('#spotify--login').hide();
      loadData();
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
function loadData(){
  loadWelcome();
  loadBestTrack();
}
function loadWelcome(){
  $.ajax({
    method: 'post',
    url: 'http://localhost:3000/music/getProfile',
    data: {
      spotify_token: localStorage.getItem('spotify_token')
    }
  })
  .done((data) => {
    $('#profile-name').text('Hello, '+data.recentCollection.display_name)
  })
  .fail((jqXHR,err) => {
    console.error(jqXHR)
  })
}
function loadBestTrack(){
  $.ajax({
    method: 'post',
    url: 'http://localhost:3000/music/getTracks',
    data: {
      spotify_token: localStorage.getItem('spotify_token')
    }
  })
  .done(({tracksCollection}) => {
    console.log(tracksCollection.items[0]);
    $('#top-track-1 .album-art').css('background-image',`url('${tracksCollection.items[0].album.images[0].url}')`)
    $('#top-track-1 .track--desc__title h1').text(tracksCollection.items[0].name)
    $('#top-track-1 .track--desc__artist span').text(tracksCollection.items[0].artists[0].name)

    $('#top-track-2 .album-art').css('background-image',`url('${tracksCollection.items[1].album.images[0].url}')`)
    $('#top-track-2 .track--desc__title h1').text(tracksCollection.items[1].name)
    $('#top-track-2 .track--desc__artist span').text(tracksCollection.items[1].artists[0].name)


  })
  .fail((jqXHR,err) => {
    console.error(jqXHR)
  })
}
function loadTime(){
  $.ajax({
    method: 'post',
    url: 'http://localhost:3000/music/getTime',
    data: {
      spotify_token: localStorage.getItem('spotify_token')
    }
  })
  .done(({tracksCollection}) => {
    console.log(tracksCollection.items[0]);
    $('#current-listening-time .count').text(tracksCollection.realTime)

  })
  .fail((jqXHR,err) => {
    console.error(jqXHR)
  })
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
    method: 'POST',
    url: 'http://localhost:3000/user/login',
    data: {
      id_token
    }
  })
  .done((data) => {
    console.log('test')
    localStorage.setItem('token',data)
    initial();
  })
  .fail((jqXHR,err) => {
    console.error(jqXHR,err);
  })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    localStorage.clear();
    initial();
    console.log('User signed out.');
  });
}
