let id
let data;
let pageTotal;

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

function addActivity() {
    let entry = {};   
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
        entry['Tipologia (Temática)'] = document.getElementById("tematica").value
        entry['Tipologia da Pesquisa'] = document.getElementById("tipologia").value
        entry['Twitter'] = document.getElementById("twitter").value
        entry['Vínculo (Estadual, Municipal, Federal, Privado)'] = document.getElementById("vinculo").value
        entry['Mapa'] = document.getElementById("mapa").value
        entry['Imagem'] = document.getElementById("image").src
        
        
    var Entry = firebase.database().ref(`bibliotecas/${id}`);
          
    Entry.push(entry).then(function(data){
        window.location.replace("./bibliotecas.html")
    }).catch(function(error){
        console.error(error);
    })

}
var Blog = firebase.database().ref('bibliotecas');
Blog.on('value', function (r) {
    console.log(r.val().length)
    id = r.val().length + 1
});