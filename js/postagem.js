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
let progress = 0

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
            User = firebase.database().ref('user/').child(key);
            User.transaction(function(){
               let entry = r.val()[key];
               if(entry['Notificações'] == undefined){
                  entry['Notificações'] = []
               }
               let teste = []
               console.log(r.val())
               for (let index = 0; index < entry['Notificações'].length; index++) {
                console.log(entry['Notificações'][index])
               }
               entry['Notificações'] =  [`${params['createdAt']} Você produziu a postagem: ${params['title']} `]

              console.log(teste)
              return entry
           }).then(function(resolve){
            window.location.href = './index.html'
          }).catch(function(error){
               console.error(error);
          });
        }
      }
})}

const range = document.querySelector('#range'),
	progressbar = document.querySelector('.progress-bar');
  
  
range.addEventListener('input', function(){
	const value = range.value;
  progressbar.style.setProperty('--progress', value)
})


function createNewPost(params) {
    let entry = {}
    entry['Comments'] = []
    entry['Tags'] = []
    entry['TextPost'] = document.getElementById('textPost').value
    entry['createdAt'] = new Date().toISOString().toString()
    entry['uptadeAt'] = new Date().toISOString().toString()
    entry['likeAt'] = []
    entry['title'] = document.getElementById('titulo').value
    entry['picture'] = JSON.parse(localStorage.getItem('user')).picture
    entry['user'] = JSON.parse(localStorage.getItem('user')).name
    entry['userEmail'] = JSON.parse(localStorage.getItem('user')).email
    entry['upload'] = document.querySelector("#image").src

    console.log(entry)
    var Post = firebase.database().ref('postagens/');
    Post.push(entry).then(function(data){
        updateNotification(entry)
        }).catch(function(error){
          console.error(error);
        }
    )
}

function uploadImage() {
  const ref = firebase.storage().ref();
  const file = document.querySelector("#image").files[0];
  const name = +new Date() + "-" + file.name;
  const metadata = {
     contentType: file.type
  };
  console.log(metadata)
  const task = ref.child(name).put(file, metadata);
  task.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    document.getElementById("progress-down").value = progress
    document.getElementById("progress").innerHTML = parseInt(progress) + "%"
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  })
  task.then(snapshot => snapshot.ref.getDownloadURL())
  .then(url => {
    console.log(url);
    alert('image uploaded successfully');
    document.querySelector("#image").src = url;
})
}