function loginPage(params) {
  window.location.href = './login.html'
}

function openNewPost(params) {
  window.location.href = './postagem.html'
}

function getUser(params) {
  var User = firebase.database().ref('user');
  User.on('value', function (r) {
    for (const key in r.val()) {
      if (r.val()[key]['email'] == JSON.parse(localStorage.getItem('user')).email) {
        let listNotify = ''
        console.log(r.val())
        r.val()[key]['Notificações'].map(value => listNotify += `<p style="font-size: 15px; line-height: 18px;">${value}</p>`)
        document.getElementById('postagem-list').innerHTML = listNotify
      }
    }
  })
}

if (localStorage.getItem('user') == null) {
  window.location.href = './login.html'
} else {
  if (JSON.parse(localStorage.getItem('user')).picture == undefined || JSON.parse(localStorage.getItem('user')).picture == '') {
    document.getElementById('fotoPerfil').src = '../img/do-utilizador.png'
  } else {
    document.getElementById('fotoPerfil').src = JSON.parse(localStorage.getItem('user')).picture
  }
  document.getElementById('nomePerfil').innerHTML = JSON.parse(localStorage.getItem('user')).name
  document.getElementById('emailPerfil').innerHTML = JSON.parse(localStorage.getItem('user')).email
  getUser()
}

var Post = firebase.database().ref('postagens');

function listPosts() {
  Post.on('value', function (r) {
    let html = '';
    for (const key in r.val()) {
      let itemSpan = ''
      let deleteButton = ''
      let comments = []
      let likeAt = []
      let url = ''
      if (r.val()[key].Tags != undefined) {
        r.val()[key].Tags.map(function (itemTag) {
          itemSpan += `<span>
              <p>${itemTag}</p>
            </span>`
        })
      }
      if (r.val()[key]['upload'] != undefined) {
        url = `<iframe src="${r.val()[key]['upload']}" style="width: 100%;height:300px; margin-top: 20px" frameborder="0"></iframe>`
      }
      if (r.val()[key]['userEmail'] == JSON.parse(localStorage.getItem('user')).email) {
        deleteButton = `<button onclick="deleteMyPost('${key}')"><p>Deletar</p></button>`
      }

      if (r.val()[key]['Comments'] != undefined) {
        comments = r.val()[key]['Comments']
      }
      if (r.val()[key]['likeAt'] != undefined) {
        likeAt = r.val()[key]['likeAt']
      }
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
              ${likeButton(likeAt,r.val()[key], key)}
              ${deleteButton}
            </div>
            <div>
              <p>${comments.length} Comentarios</p>
            </div>
            <div>
              <p>${likeAt.length} Curtidas</p>
            </div>
          </div>
          </div>`
      $('#listPosts').html(html);
    }
    $('#listPosts').html(html + '<h4>Não a mais postagens novas</h4>');
  });
}

function getUser(params) {
  var User = firebase.database().ref('user');
  User.on('value', function (r) {
    for (const key in r.val()) {
      if (r.val()[key]['email'] == JSON.parse(localStorage.getItem('user')).email) {
        user = r.val()
        userKey = key
      }
    }
  })
}

function getPost(keyCurrent) {
  var Post = firebase.database().ref('postagens');
  Post.on('value', function (r) {
    for (const key in r.val()) {
      if (key == keyCurrent) {
        likePost(key, r.val()[key])
        break;
      }
    }
  })
}

let user = ''
let userKey = ''
getUser()

async function likePost (key, data)  {
  console.log('Foi até aqui no else')
  let dataResult = {}
  if(data['likeAt'] == undefined){
    data['likeAt'] = []
  }
  const result = data['likeAt'].filter(word => word == JSON.parse(localStorage.getItem('user')).email);
  let resultCurr = data['likeAt'].length
  dataResult[resultCurr] = JSON.parse(localStorage.getItem('user')).email
  let teste = dataResult
  var updates = {};
  if(result.length == 0){
      updates['/postagens/' + key + '/likeAt/'] = teste;
      firebase.database().ref().update(updates);
  }else {
    data['likeAt'].map((value, key) => {
      console.log(data['likeAt'])
      if(value == JSON.parse(localStorage.getItem('user')).email){
        data['likeAt'].splice(key, 1); 
        if(data['likeAt'].length == 0){
          delete data['likeAt']
        }
        updates['/postagens/' + key] = data;
      }
      // return firebase.database().ref().update(updates);
    }) 
  }
}


function likeButton(params, values, key) {
  haveLike = []
  console.log(params)
  haveLike = params.filter(item => item != localStorage.getItem('user').email)
  if (haveLike.length != 0) {
    return `<button style="background-color: mediumvioletred;" onclick="getPost('${key}')"><img src="./img/heart-white.png" label="heart"><p style="color: white;" >Curtido</p></button>`
  } else {
    return `<button onclick="getPost('${key}')"><img src="./img/heart.png" label="heart"><p>Curtir</p></button>`
  }
}

function viewPost(params) {
  window.location.href = `./view-postagem.html?id=${params}`
}

function deleteMyPost(params) {
  var Entry = firebase.database().ref('postagens/').child(params);
  Entry.remove(); // this will trigger Entry.on('value') immediatly
  window.location.replace("./index.html")
}

async function getThisIMGUser(params) {
  var ref = firebase.database().ref("user");
  await ref.orderByChild("email").equalTo(params).on("child_added", function (snapshot) {
    return snapshot.val()['email'];
  });
}

listPosts()