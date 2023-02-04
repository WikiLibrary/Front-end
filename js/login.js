function loginPage(params) {
    window.location.href = './login.html'
}

function openNewPost(params) {
    window.location.href = './postagem.html'
}

console.log(localStorage.getItem('user'))

function handleCredentialResponse(response) {
    if(response != undefined){
      localStorage.setItem('user', response.credential)
      console.log(localStorage.getItem('user'))
      window.location.href = './index.html'
    }
  }
  window.onload = function () {
    google.accounts.id.initialize({
      client_id: "865999602449-l8pqn22ishkt77e9hmfjqirnhjprf2b9.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  }