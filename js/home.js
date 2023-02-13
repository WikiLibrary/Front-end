var storage = firebase.storage();
var storageRef = storage.ref();
var tangRef = storageRef.child('images/Tang.png');

tangRef.getDownloadURL().then(function(url) 
{
    var test = url
    document.querySelector('img').src = test;
}).catch(function(error) 
{
    switch (error.code) 
    {
        case 'storage/object_not_found':
            break;

        case 'storage/unauthorized':
            break;

        case 'storage/canceled':
            break;

        case 'storage/unknown':
            break;
    }
});

var test = '';
document.querySelector('img').src = test;
