var Blog = firebase.database().ref('bibliotecas');
let pageCurrent = 1
let pageTotal = 0
function listBiblioteca(page) {
Blog.on('value', function (r) {
    let html = '';
    var listNumber = (page * 5) - 1
    if(page == 1){
      var listNumberLimit = listNumber - 5
    } else {
      var listNumberLimit = listNumber - 4
    }
    function logArrayElements(item, index) {
        if(index <= listNumber && index >= listNumberLimit){
            html += `<div class="item-lista-bibliotecas" onClick="viewBiblioteca(${index})">
            <img src="${getImage(item)}" alt="">
            <div>
                <p><b>${item.Biblioteca}</b></p>
                <span>
                    <p>${item.Endereço}</p>
                    <p><b>${item.Instituição}</b></p>
                </span>
            </div>
          </div>`
        }
        $('#entries').html(html);
    }
    pageTotal = Math.ceil(r.val().length / 5)
    document.getElementById('numeracao').innerHTML = `${pageCurrent} de ${pageTotal}`
    r.val().forEach(logArrayElements);
});
}

{/* <p>1500 Livros - 350 de Registros publicados</p> */}

function getImage(params) {
  console.log('Essa é a imagem -->', params)
  if(params['Imagem'] == 'https://wikilibrary.netlify.app/undefined'){
    return 'https://matriculas.estacio.br/blog/wp-content/uploads/2020/05/29est-biblioteca.jpg'
  }
  if(params['Imagem'] != undefined){
    return params['Imagem']
  }
  return 'https://matriculas.estacio.br/blog/wp-content/uploads/2020/05/29est-biblioteca.jpg'
}

function nextPage(params) {
  if(pageTotal != pageCurrent){
      listBiblioteca(++pageCurrent)
  }
  updatePage()
}

function updatePage(params) {
  console.log(pageCurrent)
  if(pageCurrent == 1){
    document.getElementById('anterior').setAttribute("disabled", true);
  } else {
    document.getElementById('anterior').disabled = false;
  }
  if(pageTotal == pageCurrent){
    document.getElementById('proximo').setAttribute("disabled", true);
  } else {
    document.getElementById('proximo').disabled = false;
  }
}

function beforePage(params) {
  if(pageCurrent != 1){
    listBiblioteca(--pageCurrent)
  }
  updatePage()
}

function loginPage(params) {
    window.location.href = './login.html'
}

function openNewPost(params) {
    window.location.href = './postagem.html'
}

function viewBiblioteca(params) {
  console.log(params)
  window.location.href = `./wiki-biblioteca.html?id=${params}`
}

if(localStorage.getItem('user') == null){
  window.location.href = './login.html'
} else{
  console.log(localStorage.getItem('user'))
}
console.log('aqui')
listBiblioteca(1)
document.getElementById('numeracao').innerHTML = `${pageCurrent} de ${pageTotal}`

if(pageCurrent == 1){
  document.getElementById('anterior').setAttribute("disabled", true);
}
if(pageTotal == pageCurrent){
  document.getElementById('proximo').setAttribute("disabled", true);
}