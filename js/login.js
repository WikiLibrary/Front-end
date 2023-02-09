
function loginPage(params) {
    window.location.href = './login.html'
}

function openNewPost(params) {
    window.location.href = './postagem.html'
}

function goInCadastro() {
  window.location.href = './cadastro.html'
}

function verifyUser() {
  /***************************************************\
   * Process form data and save to Firebase database *
  \***************************************************/
      var entry = {};
      entry['email'] = document.getElementById('email').value
      entry['senha'] = document.getElementById('senha').value
      var Entry = firebase.database().ref('user/');
        Entry.on('value', function (r) {
          for (const key in r.val()) {
            if(r.val()[key]['email'] == document.getElementById('email').value &&
            r.val()[key]['senha'] == document.getElementById('senha').value){
              let payload = {
                senha: r.val()[key]['senha'],
                picture: r.val()[key]['picture'],
                email: r.val()[key]['email'],
                name: r.val()[key]['name']
              };
            console.log('Passou aqui')
              localStorage.setItem('user', JSON.stringify(payload))
              window.location.href = './index.html'
            } else {
              console.log('usuario ou senha invalidos')
            }
          }
        })
      console.log(entry)
}

function handleCredentialResponse(response) {
  if(response != undefined){
    console.log(JSON.stringify(jwt_decode(response.credential)))
    localStorage.setItem('user', JSON.stringify(jwt_decode(response.credential)))
    var User = firebase.database().ref('user');
    User.on('value', function (r) {
      let have = false
      for (const key in r.val()) {
        if(r.val()[key]['email'] == jwt_decode(response.credential)['email']){
          have = true
        }
      }
      if(have == false){
        createNewUserwithGoogle(jwt_decode(response.credential))
      } else {
        window.location.href = './index.html'
      }
    })

  }
}
window.onload = function () {
  google.accounts.id.initialize({
    client_id: "865999602449-l8pqn22ishkt77e9hmfjqirnhjprf2b9.apps.googleusercontent.com",
    callback: handleCredentialResponse
  });
    
  google.accounts.id.renderButton(
    document.getElementById("buttonDiv"),
    { theme: "outline", size: "large", width: "300px" }  // customization attributes
  );
  google.accounts.id.prompt(); // also display the One Tap dialog
}

function createNewUserwithGoogle(params) {
  /***************************************************\
   * Process form data and save to Firebase database *
  \***************************************************/
      console.log(params)
      var entry = {};
      entry['Notificações'] = []
      entry['email'] = params.email
      entry['picture'] = params.picture
      entry['nome'] = params.name
      entry['senha'] = ''

       var Entry = firebase.database().ref('user/');
      console.log(Entry)
       Entry.push(entry).then(function(data){
            // $('.alert').alert()
           console.log('foi', data)
           window.location.href = './index.html'
       }).catch(function(error){
           console.log('Caiu aqui');
           console.error(error);
       })
}
