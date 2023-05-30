var Post = firebase.database().ref('forum');

Post.on('value', function (r) { console.log(r.val())})

function listPosts() {
    Post.on('value', function (r) {
      let html = '';
      for (const key in r.val()) {
        let itemSpan = ''
    //     let deleteButton = ''
    //     let comments = []
    //     let likeAt = []
    //     let url = ''
    //     if (r.val()[key].Tags != undefined) {
    //       r.val()[key].Tags.map(function (itemTag) {
    //         itemSpan += `<span>
    //             <p>${itemTag}</p>
    //           </span>`
    //       })
    //     }
        r.val()[key]['tags'].map(function (itemTag) {
            itemSpan += `<a>
                ${itemTag}
              </a>`
        })
    //     if (r.val()[key]['upload'] != undefined) {
    //       url = `<iframe src="${r.val()[key]['upload']}" style="width: 100%;height:300px; margin-top: 20px" frameborder="0"></iframe>`
    //     }
    //     if (r.val()[key]['userEmail'] == JSON.parse(localStorage.getItem('user')).email) {
    //       deleteButton = `<button onclick="deleteMyPost('${key}')"><p>Deletar</p></button>`
    //     }
  
    //     if (r.val()[key]['Comments'] != undefined) {
    //       comments = r.val()[key]['Comments']
    //     }
    //     if (r.val()[key]['likeAt'] != undefined) {
    //       likeAt = r.val()[key]['likeAt']
    //     }
        console.log(key)
        console.log(r.val()[key])
        html += `
        <div class="list-box-iten">
            <div style="display: flex; flex-direction: column">
                <button class="button-forum" style="display: flex;"><img src="./img/heart.png" label="bookmark"><p>${r.val()[key]['like'].length}</p></button>
                <button class="button-forum" style="display: flex;"><img src="./img/chat.png" label="bookmark"><p>${r.val()[key]['comment'].length}</p></button>
            </div>
            <div style="display: flex; flex-direction: column; margin-left: 15px;">      
                <b>${r.val()[key]['title']}</b>
                <p>${r.val()[key]['text']}</p>
            <div>
            <div>
               ${itemSpan}
            </div>
        </div>`
        $('#listPosts').html(html);
      }
    });
  }

  listPosts()