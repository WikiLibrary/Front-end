let entry_id
let data;

function uploadImage() {
    const ref = firebase.storage().ref();
    const file = document.querySelector("#image").files[0];
    const name = +new Date() + "-" + file.name;
    const metadata = {
       contentType: file.type
    };
    const task = ref.child(name).put(file, metadata);task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {
    console.log(url);
    alert('image uploaded successfully');
    document.querySelector("#image").src = url;
 })
 .catch(console.error);
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
    entry_id = objURL.id
    console.log(objURL.id)
    var Entry = firebase.database().ref('bibliotecas/').child(objURL.id);
    Entry.once('value', function (r) { // once = just this once, no need to actively watch the changes
        let entry = r.val();
        console.log(document.getElementById("biblioteca"))
        document.getElementById("anoFundacao").value = entry['Ano de Fundação']
        document.getElementById("biblioteca").value =  entry['Biblioteca']
        document.getElementById("certificado").value =  entry['Certificado']
        document.getElementById("email").value =  entry['E-mail']
        document.getElementById("endereco").value =  entry['Endereço']
        document.getElementById("facebook").value =  entry['Facebook']
        document.getElementById("instagram").value =  entry['Instagram']
        document.getElementById("instituicao").value =  entry['Instituição']
        document.getElementById("municipio").value =  entry['Município']
        document.getElementById("redeBiblioteca").value = entry['Rede de bibliotecas']
        document.getElementById("site").value =  entry['Site']
        document.getElementById("telefone").value = entry['Telefone']
        document.getElementById("snbp").value =  entry['Tipologia (SNBP)']
        document.getElementById("tematica").value =  entry['Tipologia (Temática)']
        document.getElementById("tipologia").value =  entry['Tipologia da Pesquisa']
        document.getElementById("twitter").value =  entry['Twitter']
        document.getElementById("vinculo").value =  entry['Vínculo (Estadual, Municipal, Federal, Privado)']
        document.getElementById("mapa").value =  entry['Mapa']
        document.getElementById("horario").value =  entry['Horario']
        document.getElementById("image").src =  entry['Imagem']
        data = entry
    });
};

function updateActivity() {
    var Entry = firebase.database().ref('bibliotecas/').child(entry_id);
    
     Entry.transaction(function(){
        entry = data || {};   
        entry['Ano de Fundação'] =  document.getElementById("anoFundacao").value
        entry['Biblioteca'] = document.getElementById("biblioteca").value
        entry['Certificado'] = document.getElementById("certificado").value
        entry['E-mail'] = document.getElementById("email").value
        entry['Endereço'] = document.getElementById("endereco").value
        entry['Facebook'] = document.getElementById("facebook").value
        entry['Instagram'] = document.getElementById("instagram").value
        entry['Instituição'] = document.getElementById("instituicao").value
        entry['Município'] = document.getElementById("municipio").value
        entry['Rede de bibliotecas'] = document.getElementById("redeBiblioteca").value
        entry['Site'] = document.getElementById("site").value
        entry['Telefone'] = document.getElementById("telefone").value
        entry['Tipologia (SNBP)'] = document.getElementById("snbp").value
        entry['Horario'] = document.getElementById("horario").value
        entry['Tipologia (Temática)'] = document.getElementById("tematica").value
        entry['Tipologia da Pesquisa'] = document.getElementById("tipologia").value
        entry['Twitter'] = document.getElementById("twitter").value
        entry['Vínculo (Estadual, Municipal, Federal, Privado)'] = document.getElementById("vinculo").value
        entry['Mapa'] = document.getElementById("mapa").value
        entry['Imagem'] = document.getElementById("image").src
        
        return entry;
        
    }).then(function(){
        window.location.replace("./bibliotecas.html")
    }).catch(function(error){
        console.error(error);
    });
    
    return false;
}
parseQueryString()