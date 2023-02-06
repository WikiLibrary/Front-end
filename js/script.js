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
  console.log(jwt_decode(localStorage.getItem('user')))
  document.getElementById('fotoPerfil').src = jwt_decode(localStorage.getItem('user')).picture
  document.getElementById('nomePerfil').innerHTML = jwt_decode(localStorage.getItem('user')).name
  document.getElementById('emailPerfil').innerHTML = jwt_decode(localStorage.getItem('user')).email
}

var Post = firebase.database().ref('postagens');
console.log(Post)
function listPosts() {
 Post.on('value', function (r) {
    let html = '';
    function logArrayElements(item, index) {
            console.log(item.Comments.length)
            let itemSpan = ''
            item.Tags.map(function (itemTag) {
              itemSpan += `<span>
                <p>${itemTag}</p>
              </span>`
            })
            console.log(item)
            html += `<div class="postagem">
            <h2>${item.title}</h2>
            <div style="display: flex; justify-content: space-between; margin-bottom: 30px; margin-top: 30px;">
                <div style="display: flex;">
                    <img src="./img/unnamed.jpg" alt="">
                    <div>
                        <p><b>${item.user}</b></p>
                        <p>${item.uptadeAt}</p>
                    </div>
                </div>
                <div style="display: flex">
                    ${itemSpan}
                </div>
            </div>
            <p style="font-size: 15px; line-height: 18px;">${item.TextPost}</p>
            <div style="display: flex; justify-content: space-between; margin-top: 25px; align-items: center;">
              <div class="buttonPosts">
                <button><img src="./img/bookmark.png" label="bookmark"></button>
                <button><img src="./img/chat.png" label="bookmark"><p>Comentar</p></button>
              </div>
              <div>
                <p>${item.Comments.length} Comentarios</p>
              </div>
            </div>
            </div>`
            $('#listPosts').html(html);
        }
  r.val().forEach(logArrayElements);
  console.log(html)
});
}

listPosts()