function redirectEdit() {
    var str = window.location.search;
    var objURL = {};
    str.replace(
        new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
        function( $0, $1, $2, $3 ){
            objURL[ $1 ] = $3;
        }
    );
    window.location.href = `./wiki-biblioteca-edit.html?id=${objURL.id}`
}

var parseQueryString = function() {
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
    var Entry = firebase.database().ref('bibliotecas/').child(objURL.id);
    Entry.once('value', function (r) { // once = just this once, no need to actively watch the changes
        let entry = r.val();
        console.log(entry)
        document.getElementById("endereco").innerHTML =  `<img alt="location" src="./img/location.png"/><b>Endereço</b>: ${entry['Endereço']}`
        document.getElementById("website").innerHTML =  `<img alt="mouse" src="./img/mouse.png"/><b>Website</b>: ${entry['Site']}`
        document.getElementById("facebook").innerHTML =  `<img alt="facebook" src="./img/facebook.png"/><b>Facebook</b>: ${entry['Facebook']}`
        document.getElementById("instagram").innerHTML =  `<img alt="instagram" src="./img/instagram.png"/><b>Instagram</b>: ${entry['Instagram']}`
        document.getElementById("twitter").innerHTML =  `<img alt="twitter" src="./img/twitter.png"/><b>Twitter</b>: ${entry['Twitter']}`
        document.getElementById("vinculo").innerHTML =  `<b>Vínculo</b>: ${entry['Vínculo (Estadual, Municipal, Federal, Privado)']}`
        document.getElementById("telefone").innerHTML =  `<img alt="telefone" src="./img/telefone.png"/><b>Telefone</b>: ${entry['Telefone']}`
        document.getElementById("municipio").innerHTML =  `<b>Município</b>: ${entry['Município']}`
        document.getElementById("fundacao").innerHTML =  `<b>Ano de Fundação:</b>${entry['Ano de Fundação']}`
        document.getElementById("certificado").innerHTML =  `<b>Certificado:</b>${entry['Certificado']}`
        document.getElementById("instutuicao").innerHTML =  `<b>Instituição:</b>${entry['Instituição']}`
        document.getElementById("rede").innerHTML =  `<b>Rede de bibliotecas:</b>${entry['Instituição']}`
        document.getElementById("snbp").innerHTML =  `<b>Tipologia (SNBP):</b>${entry['Tipologia (SNBP)']}`
        document.getElementById("tematica").innerHTML =  `<b>Tipologia (Temática):</b>${entry['Tipologia (Temática)']}`
        document.getElementById("tipologia").innerHTML =  `<b>Tipologia da Pesquisa:</b>${entry['Tipologia da Pesquisa']}`
        document.getElementById("biblioteca").innerHTML =  `${entry['Biblioteca']}`
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


function loginPage(params) {
    window.location.href = './login.html'
}

function openNewPost(params) {
    window.location.href = './postagem.html'
}

if(localStorage.getItem('user') == null){
  window.location.href = './login.html'
} else{
  console.log(localStorage.getItem('user'))
}

parseQueryString()

function deleteActivity() {
    var str = window.location.search;
    let mapa = '' 
    var objURL = {};
    str.replace(
        new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
        function( $0, $1, $2, $3 ){
            objURL[ $1 ] = $3;
        }
    );
    var Entry = firebase.database().ref('bibliotecas/').child(objURL.id);
    Entry.remove(); // this will trigger Entry.on('value') immediatly
    window.location.replace("./bibliotecas.html")
    return false;
}