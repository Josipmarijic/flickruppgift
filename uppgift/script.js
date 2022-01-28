const KEY = 'f29415bbb6e51487488a4d7a0852702d';
const btn = document.querySelector("button");

btn.addEventListener( 'click', function(){
    const input = document.querySelector('input');
    console.log(input.value);

    clearImages(); 

    const url = `https://www.flickr.com/services/rest/?api_key=${KEY}&method=flickr.photos.search&text=${input.value}&format=json&nojsoncallback=1&per_page=1&page=1&safe_search=1`;
    
fetch(url).then(
    function(response){
        console.log(response);
        if(response.status>=200 && response.status<300){
            return response.json();
        }
        else{
            throw 'Something went wrong. :(';
        }
    }
).then(
    function(data){
        console.log(data);
       
        getImageUrl(data.photos.photo[0]);
    }
).catch(
    function(error){
        console.log(error);
        let felMed = document.createElement("h1");
        felMed.innerText = "Något gick fel vänligen titta så du har stavat rätt.";
        document.body.append(felMed)
    }
);
});



function getImageUrl(photoObject){
    let photo = photoObject;
    let size = 'm';

    let imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;

    
    displayImg(imgUrl);
}


function displayImg(url){
    let img = document.createElement('img');
    img.src = url;

    document.body.appendChild(img);
}

function clearImages(){
    const images = document.querySelectorAll('img');
    

    for(const img of images){
        img.remove();
    }
}