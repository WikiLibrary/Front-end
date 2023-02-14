function loginPage(params) {
  window.location.href = './login.html'
}

function openNewPost(params) {
  window.location.href = './postagem.html'
}

console.log(localStorage.getItem('user'))
if(localStorage.getItem('user') == null){
window.location.href = './login.html'
} else{
console.log(JSON.parse(localStorage.getItem('user')).picture)
if(JSON.parse(localStorage.getItem('user')).picture == undefined || JSON.parse(localStorage.getItem('user')).picture == ''){
  document.getElementById('fotoPerfil').src = '../img/do-utilizador.png'
} else {
  document.getElementById('fotoPerfil').src = JSON.parse(localStorage.getItem('user')).picture
}
document.getElementById('nomePerfil').innerHTML = JSON.parse(localStorage.getItem('user')).name
document.getElementById('emailPerfil').innerHTML = JSON.parse(localStorage.getItem('user')).email
}

var Post = firebase.database().ref('postagens');
function listPosts() {
Post.on('value', function (r) {
  let html = '';
  for (const key in r.val()) {
    let itemSpan = ''
    let comments = []
    let likeAt = []
    let deleteButton = ''
    let url = ''
      if(r.val()[key].Tags != undefined){
        r.val()[key].Tags.map(function (itemTag) {
            itemSpan += `<span>
              <p>${itemTag}</p>
            </span>`
          })
      }
      if(r.val()[key]['upload'] != undefined){
        url = `<iframe src="${r.val()[key]['upload']}" style="width: 100%;height:300px; margin-top: 20px" frameborder="0"></iframe>`
      }
      console.log(JSON.parse(localStorage.getItem('user')).email)
      console.log(r.val()[key]['userEmail'])
      console.log(r.val()[key]['userEmail'] ==  JSON.parse(localStorage.getItem('user')).email)
      if(r.val()[key]['userEmail'] ==  JSON.parse(localStorage.getItem('user')).email){
        deleteButton = `<button onclick="deleteMyPost('${key}')"><p>Deletar</p></button>`
      }

    //   if (documento.arquivo.indexOf(".pdf") != -1) {
    //     // It is a pdf 
    // }
      if(r.val()[key]['Comments'] != undefined){ comments = r.val()[key]['Comments']}
      if(r.val()[key]['likeAt'] != undefined){ likeAt = r.val()[key]['likeAt']}
          html += `<div class="postagem">
          <h2 onclick="viewPost('${key}')">${r.val()[key]['title']}</h2>
          <div onclick="viewPost('${key}')" style="display: flex; justify-content: space-between; margin-bottom: 30px; margin-top: 30px;">
              <div style="display: flex;">
                  <div>
                      <p><b>${r.val()[key]['user']}</b></p>
                      <p>${r.val()[key]['uptadeAt']}</p>
                  </div>
              </div>
              <div style="display: flex">
                  ${itemSpan}
              </div>
          </div>
          <p style="font-size: 15px; line-height: 18px;" onclick="viewPost('${key}')">${r.val()[key]['TextPost']}</p>
          ${url}
          <div style="display: flex; justify-content: space-between; margin-top: 25px; align-items: center;">
            <div class="buttonPosts">
              <button><img src="./img/bookmark.png" label="bookmark"></button>
              <button><img src="./img/chat.png" label="bookmark"><p>Comentar</p></button>
              ${deleteButton}
            </div>
            <div>
              <p>${comments.length} Comentarios</p>
            </div>
          </div>
          </div>`
          $('#listPosts').html(html);
      }
$('#listPosts').html(html + '<h4>Não a mais postagens novas</h4>');
});
}

function viewPost(params) {
  console.log(params)
  window.location.href = `./view-postagem.html?id=${params}`
}

function deleteMyPost(params) {
var Entry = firebase.database().ref('postagens/').child(params);
Entry.remove(); // this will trigger Entry.on('value') immediatly
window.location.replace("./index.html")
}

console.log(getThisIMGUser('giovana.np1@gmail.com').then(resolve => console.log(resolve)))
{/* <img src="${getThisIMGUser(r.val()[key]['userEmail'])}" alt=""> */}
async function getThisIMGUser(params) {
// let teste = '../img/do-utilizador.png'
var ref =  firebase.database().ref("user");
await ref.orderByChild("email").equalTo(params).on("child_added", function(snapshot) {
  console.log('aqui')
  return snapshot.val()['email'];
});
// return teste
}

listPosts()