var loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit',function (event) {
  event.preventDefault();

  var loginUsername = document.getElementById("login-username").value;
  var loginPassword = document.getElementById("login-password").value;

  var login_data = {
    username:`${loginUsername}`,
    password: `${loginPassword}`
  }


  fetch('/login', {
    method: 'POST',
    body: JSON.stringify(login_data),
    headers:{
      'Content-Type': 'application/json'
    }
  })
  .catch(err => {
    console.log(err)
  })
    .then(res => {
      console.log(res)
      if (res.redirected){
        window.location.href = res.url
      }
    })
  })
