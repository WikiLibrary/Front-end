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
  document.getElementById('fotoPerfil').src = JSON.parse(localStorage.getItem('user')).picture
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
        if(r.val()[key].Tags != undefined){
          r.val()[key].Tags.map(function (itemTag) {
              itemSpan += `<span>
                <p>${itemTag}</p>
              </span>`
            })
        }
        if(r.val()[key]['Comments'] != undefined){ comments = r.val()[key]['Comments']}
        if(r.val()[key]['likeAt'] != undefined){ likeAt = r.val()[key]['likeAt']}
            html += `<div class="postagem">
            <h2>${r.val()[key]['title']}</h2>
            <div style="display: flex; justify-content: space-between; margin-bottom: 30px; margin-top: 30px;">
                <div style="display: flex;">
                    <img src="./img/unnamed.jpg" alt="">
                    <div>
                        <p><b>${r.val()[key]['user']}</b></p>
                        <p>${r.val()[key]['uptadeAt']}</p>
                    </div>
                </div>
                <div style="display: flex">
                    ${itemSpan}
                </div>
            </div>
            <p style="font-size: 15px; line-height: 18px;">${r.val()[key]['TextPost']}</p>
            <div style="display: flex; justify-content: space-between; margin-top: 25px; align-items: center;">
              <div class="buttonPosts">
                <button><img src="./img/bookmark.png" label="bookmark"></button>
                <button><img src="./img/chat.png" label="bookmark"><p>Comentar</p></button>
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

listPosts()