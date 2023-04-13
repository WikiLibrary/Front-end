let data

function setComments() {
  let html = '';
  let total ='';
  if(data['comments'] !== undefined) {
	console.log(data);
    var params = data['comments'].filter(post => post);
    var countingComments = params.length;
    params.forEach(item => {
      console.log('passou aqui');
      html += `<div class="comment-area">
          <div style="display: flex; flex-direction: row;">
            <img class="img-comment" src="${item.userImage}" alt="" id="img-postagem">   
            <p id="userComment">${item.email}</p>
            <p class="update-time">${item.createdAt}7</p>
          </div>
          <p class="user-role">${item.jobRole}</p>
          <p style="margin-top: 20px;">${item.content}</p>
      </div>`
    })
    total += `${countingComments} comentários`
    $('#commentsList').html(html);
    $('#totalComments').html(total);
  }
}


function addComment(params) {
let comments = {}
comments['content'] = document.getElementById('adicionarComentario').value
comments['createdAt'] = new Date().toISOString().toString()
comments['email'] = JSON.parse(localStorage.getItem('user')).name
comments['userEmail'] = JSON.parse(localStorage.getItem('user')).email
comments['userImage'] = JSON.parse(localStorage.getItem('user')).picture
comments['jobRole'] = 'Desenvolvedora Fullstack'

console.log(comments)
let index

if(data['comments'].length == undefined){
	index = 0
} else {
	index = data['comments'].length
}

console.log(index)

var updates = {};
updates['/postagens/' + getURL() + '/comments/' + index + "/"] = comments;
console.log(updates)
firebase.database().ref().update(updates);
parseQueryString(getURL())
}



function inputValues(val) {
	if (document.getElementById('adicionarComentario').value != '' ) {
		document.getElementById('buttonCadastro').disabled = false; 
	}
}

function haveLike(params) {
	if(data['likeAt'] != undefined){
	const result = data['likeAt'].filter(word => word == JSON.parse(localStorage.getItem('user')).email);
	if(result.length != 0){
		console.log('Entoru aqui', document.getElementById("buttonLike").style.backgroundColor)
		document.getElementById("buttonLike").style.backgroundColor = "#B7006E"
		document.getElementById("buttonLike").style.color = "white"
		document.getElementById("buttonLike").innerHTML = "Curtido"
	}
	else{
		document.getElementById("buttonLike").style.backgroundColor = "#E1DAD7"
		document.getElementById("buttonLike").style.color = "black"
		document.getElementById("buttonLike").innerHTML = "Curtir" 
	}
	}
}

var parseQueryString = function(id) {
	var Entry = firebase.database().ref('postagens/').child(id);
		Entry.once('value', function (r) { // once = just this once, no need to actively watch the changes
			let entry = r.val();
		data = entry
		haveLike()
    	setComments()
		console.log(data)
		document.getElementById("title").innerHTML =  `${entry['title']}`
		document.getElementById("user").innerHTML =  `<b>${entry['user']}</b>`
		document.getElementById("TextPost").innerHTML =  `${entry['TextPost']}`
		document.getElementById("uptadeAt").innerHTML =  `${entry['uptadeAt']}`
		document.getElementById("document-saved").src = `${entry['upload']}`
		if(entry['picture'] == undefined || entry['picture'] == ''){
			document.getElementById('img-postagem').src = '../img/do-utilizador.png'
		} else {
			document.getElementById('img-postagem').src = entry['picture']
		}
		// img-postagem
		if(entry['Mapa'] != undefined){
			console.log(document.getElementById("mapa"))
			document.getElementById("mapa").innerHTML = entry['Mapa']
			document.querySelector("iframe").width = "100%"
			document.querySelector("iframe").height = "250px"
			document.querySelector("iframe").style = "border: none;filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));border-radius: 25px;"
			console.log(document.querySelector("iframe"))
		}
		if(entry['Imagem'] != undefined && entry['Imagem'] != ''){
			console.log(entry['Imagem'])
			document.getElementById("image").src = entry['Imagem']
		}
	});
};

function likePost() {
	if(data['likeAt'] == undefined){
		data['likeAt'] = []
	}
	const result = data['likeAt'].filter(word => word == JSON.parse(localStorage.getItem('user')).email);
	resultCurr = data['likeAt'].length
	let dataResult = {}
	dataResult[resultCurr] = JSON.parse(localStorage.getItem('user')).email
	if(result.length == 0){
		var updates = {};
		updates['/postagens/' + getURL() + '/likeAt/'] = dataResult;
		document.getElementById("buttonLike").style.backgroundColor = "#B7006E"
		document.getElementById("buttonLike").style.color = "white"
		document.getElementById("buttonLike").innerHTML = "Curtido"
		firebase.database().ref().update(updates);
		var Entry = firebase.database().ref('postagens/').child(getURL());
		Entry.once('value', function (r) { // once = just this once, no need to actively watch the changes
		let entry = r.val();
		data = entry
		haveLike()
		})
	} else {
		var updates = {};
		dataResult = data['likeAt'].filter(value => value != JSON.parse(localStorage.getItem('user')).email)
		updates['/postagens/' + getURL() + '/likeAt/'] = dataResult;
		document.getElementById("buttonLike").style.backgroundColor = "#E1DAD7"
		document.getElementById("buttonLike").style.color = "black"
		document.getElementById("buttonLike").innerHTML = "Curtir" 
		firebase.database().ref().update(updates);
		var Entry = firebase.database().ref('postagens/').child(getURL());
		Entry.once('value', function (r) { // once = just this once, no need to actively watch the changes
		let entry = r.val();
		data = entry
		haveLike()
		})
	}    
}

// const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

// console.log(beasts.indexOf('bison'));

function getURL() {
	var str = window.location.search;
	let mapa = '' 
	var objURL = {};
	str.replace(
		new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
		function( $0, $1, $2, $3 ){
			objURL[ $1 ] = $3;
		}
	);
	return objURL.id
}

parseQueryString(getURL())