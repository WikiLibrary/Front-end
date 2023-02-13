if(document.getElementById('textPost').value != '' && document.getElementById('titulo').value != '' ){
  console.log(document.getElementById('textPost').value)
  console.log(document.getElementById('titulo').value)
}
function loginPage(params) {
  window.location.href = './login.html'
}
$(".chosen-select").chosen({rtl: true}); 

function viewInput() {
    // console.log(document.getElementById('bibliotecas').value)
    if(document.getElementById('textPost').value != '' && document.getElementById('titulo').value != ''){
      document.getElementById('buttonPost').disabled = false 
    }
}
var expanded = false;

// function showCheckboxes() {
//   var checkboxes = document.getElementById("checkboxes");
//   if (!expanded) {
//     checkboxes.style.display = "block";
//     expanded = true;
//   } else {
//     checkboxes.style.display = "none";
//     expanded = false;
//   }
// }
function updateNotification(params) {
    var User = firebase.database().ref('user');
    User.on('value', function (r) {
      for (const key in r.val()) {
        if(r.val()[key]['email'] == JSON.parse(localStorage.getItem('user')).email){
            console.log('entrou uma vez')
            User = firebase.database().ref('user/').child(key);
            User.transaction(function(){
               let entry = r.val()[key];
               console.log(entry['Notificações'])
               let teste = []
               for (let index = 0; index < entry['Notificações'].length; index++) {
                console.log(entry['Notificações'][index])
               }
               entry['Notificações'] =  [`${params['createdAt']} Você produziu a postagem: ${params['title']} `]

              console.log(teste)
              return entry
           }).then(function(){
            window.location.href = './index.html'
          }).catch(function(error){
               console.error(error);
          });
        }
      }
})}
function createNewPost(params) {
    let entry = {}
    entry['Comments'] = []
    entry['Tags'] = []
    entry['TextPost'] = document.getElementById('textPost').value
    entry['createdAt'] = new Date().toISOString().toString()
    entry['uptadeAt'] = new Date().toISOString().toString()
    entry['likeAt'] = []
    entry['title'] = document.getElementById('titulo').value
    entry['user'] = JSON.parse(localStorage.getItem('user')).name
    entry['userEmail'] = JSON.parse(localStorage.getItem('user')).email
    console.log(entry)
    var Post = firebase.database().ref('postagens/');
    Post.push(entry).then(function(data){
        updateNotification(entry)
        }).catch(function(error){
          console.error(error);
        }
    )
}