function loginPage(params) {
    window.location.href = './login.html'
}

function openNewPost(params) {
    window.location.href = './postagem.html'
}

function goInCadastro() {
  window.location.href = './cadastro.html'
}

function viewInput(val) {
  if(document.getElementById('senha').value != '' && document.getElementById('confirmarSenha').value != '' &&
  document.getElementById('nome').value != '' && document.getElementById('email').value != ''){
    document.getElementById('buttonCadastro').disabled = false 
  }
}

function handleCredentialResponse(response) {
  if(response != undefined){
    localStorage.setItem('user', response.credential)
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

function createNewUser() {
  /***************************************************\
   * Process form data and save to Firebase database *
  \***************************************************/
      var entry = {};
      entry['Notificações'] = []
      entry['email'] = document.getElementById('email').value
      entry['picture'] =  ""
      entry['name'] = document.getElementById('nome').value
      if(document.getElementById('senha').value == document.getElementById('confirmarSenha').value){
        entry['senha'] = document.getElementById('senha').value
        var Entry = firebase.database().ref('user/');
        Entry.on('value', function (r) {
        let have = false
          for (const key in r.val()) {
            if(r.val()[key]['email'] == document.getElementById('email').value){
              have = true
            }
          }
          if(have == false){
            Entry.push(entry).then(function(data){
              window.location.href = './login.html'
            }).catch(function(error){
                console.error(error);
            })
          } else {
            console.log('Ela já possui cadastro');
          }
        })
      } else {
        console.log('as senhas não batem')
      }
      console.log(entry)
}

if(document.getElementById('senha').value != '' && document.getElementById('confirmarSenha').value != '' &&
document.getElementById('nome').value != '' && document.getElementById('email').value != ''){
  console.log(document.getElementById('nome').value)
  console.log(document.getElementById('senha').value)
  console.log(document.getElementById('email').value)
  console.log(document.getElementById('confirmarSenha').value)
}