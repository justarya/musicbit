<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Login Demo</title>
</head>
<body>
  <div class="g-signin2" data-onsuccess="onSignIn"></div>
  <div class="logout">
    <button onclick="signOut()">Logout</button>
  </div>
  <script
  src="https://code.jquery.com/jquery-3.4.1.min.js"
  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
  crossorigin="anonymous"></script>
  <script>
    function onSignIn(googleUser) {
      let id_token = googleUser.getAuthResponse().id_token;
      $.ajax({
        method: 'post',
        url: 'http://localhost:3000/api/login/google',
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
  </script>
</body>
</html>