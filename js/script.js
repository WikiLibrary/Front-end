const { getFirestore, collection, getDocs } = 'firebase/firestore/lite';

function loginPage(params) {
    window.location.href = './login.html'
}

function openNewPost(params) {
    window.location.href = './postagem.html'
}

console.log(localStorage.getItem('user'))
if(localStorage.getItem('user') == null){
  window.location.href = './login.html'
} else{
  console.log(jwt_decode(localStorage.getItem('user')))
  document.getElementById('fotoPerfil').src = jwt_decode(localStorage.getItem('user')).picture
  document.getElementById('nomePerfil').innerHTML = jwt_decode(localStorage.getItem('user')).name
  document.getElementById('emailPerfil').innerHTML = jwt_decode(localStorage.getItem('user')).email
}
  const db = getFirestore(app); 
  const citiesCol = collection(db, 'bibliotecas');
  console.log(citiesCol)
  // const citySnapshot = getDocs(citiesCol);
  // const cityList = citySnapshot.docs.map(doc => doc.data());
  // return cityList;