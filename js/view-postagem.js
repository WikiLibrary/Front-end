var parseQueryString = function() {
    console.log('entrou')
    var str = window.location.search;
    let mapa = '' 
    var objURL = {};
    str.replace(
        new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
        function( $0, $1, $2, $3 ){
            objURL[ $1 ] = $3;
        }
    );
    console.log(objURL.id)
    console.log('entrou')
    var Entry = firebase.database().ref('postagens/').child(objURL.id);
    Entry.once('value', function (r) { // once = just this once, no need to actively watch the changes
        let entry = r.val();
        console.log(entry)
        document.getElementById("title").innerHTML =  `${entry['title']}`
        document.getElementById("user").innerHTML =  `<b>${entry['user']}</b>`
        document.getElementById("TextPost").innerHTML =  `${entry['TextPost']}`
        document.getElementById("uptadeAt").innerHTML =  `${entry['uptadeAt']}`
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
parseQueryString()