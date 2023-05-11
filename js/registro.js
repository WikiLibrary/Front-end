let id
let totalBiblioteca;
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
 
function dataBiblioteca(data) {
    var values = firebase.database().ref('bibliotecas/');
    values.once('value', function (r) {
        let dataInfo =  (r.val().length)
        data = dataInfo
        console.log('data: ', data)
    })
    return data;
} 

function addActivity() {
    totalBiblioteca = dataBiblioteca();

    let entry = {};   
        entry['Ano de Fundação'] =  document.getElementById("anoFundacao").value
        entry['Biblioteca'] = document.getElementById("biblioteca").value
        entry['E-mail'] = document.getElementById("email").value
        entry['Endereço'] = document.getElementById("endereco").value
        entry['Facebook'] = document.getElementById("facebook").value
        entry['Instagram'] = document.getElementById("instagram").value
        entry['Instituição'] = document.getElementById("instituicao").value
        entry['Município'] = document.getElementById("municipio").value
        entry['Rede de bibliotecas'] = document.getElementById("redeBiblioteca").value
        entry['Site'] = document.getElementById("site").value
        entry['Telefone'] = document.getElementById("telefone").value
        entry['Twitter'] = document.getElementById("twitter").value
        entry['Vínculo (Estadual, Municipal, Federal, Privado)'] = document.getElementById("vinculo").value
        entry['Mapa'] = document.getElementById("mapa").value
        // entry['Imagem'] = document.getElementById("image").src
    
    console.log('total', totalBiblioteca)

    let index

    if(totalBiblioteca == undefined){
        index = 0
    } else {
        index = totalBiblioteca + 1
    }
        
    console.log(index)

    var updates = {};
    updates['/bibliotecas/' + index + "/"] = entry;
    console.log(updates)
    firebase.database().ref().update(updates);
}
var Blog = firebase.database().ref('bibliotecas');
Blog.on('value', function (r) {
    console.log(r.val().length)
    id = r.val().length + 1
});