let data

function haveLike(params) {
    console.log(data)
    if(data['likeAt'] != undefined){
    const result = data['likeAt'].filter(word => word == JSON.parse(localStorage.getItem('user')).email);
    console.log(result.length)
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