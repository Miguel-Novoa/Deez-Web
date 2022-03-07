const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const trackId = urlParams.get('id');
const main = document.querySelector('main');

let urlApi = `https://api.deezer.com/track/${trackId}&output=jsonp`;

let tracksLikedList = JSON.parse(localStorage.getItem('tracksLiked'));

fetchJsonp(urlApi)
    .then(function(res){
        return res.json()
    }).then(function(json){
        displayInfos(json)
    }).catch(function(ex){
        console.log('error', ex)
    })
           
    
//Fonction générant le main de la page et injectant les données de la musique sélectionnée
const displayInfos = (itemDatas) =>{
    let date = itemDatas.release_date.substring(8,10) + '/' 
    + itemDatas.release_date.substring(5,7) + '/' + itemDatas.release_date.substring(0,4);
    
    main.innerHTML = `
        <h2>${itemDatas.title}</h2>
        <section id="albumInfos">
            <img src="${itemDatas.album.cover_xl}" alt="album">
            <p>Album : ${itemDatas.album.title}</p>
        </section>
        <section id="trackInfos">
            <p>Artiste : ${itemDatas.artist.name}</p>
            <p>Durée : ${convertSecondsToMinutes(itemDatas.duration)}</p>
            <p>Date de parution : ${date}</p>
        </section>
        <section id="extrait">
            <p>Ecouter un extrait :</p>
            <audio controls src="${itemDatas.preview}"></audio>
        </section>
        <section id="trackBtns">
            <a href='${itemDatas.link}'><img src="../images/telecharger.png" alt="download"></a>
            <span id="like">🤍</span>
        </section>
    `
    const likeBtn = document.querySelector('#like');
    for(let p=0; p<tracksLikedList.length; p++){
        if(tracksLikedList[p].id == trackId){
            likeBtn.innerHTML = '❤';
        };
    };
    handleLikes(likeBtn, itemDatas);

};

//Fonction permettant d'ajouter/supprimer la musique des favoris
const handleLikes = (btn, data) =>{
    btn.addEventListener('click', ()=>{
        if(btn.innerHTML == '❤'){
            for(let h=0; h<tracksLikedList.length; h++){
                if(tracksLikedList[h].id == trackId){
                    let remove = tracksLikedList.indexOf(tracksLikedList[h]);
                    tracksLikedList.splice(remove, 1);
                    localStorage.setItem('tracksLiked', JSON.stringify(tracksLikedList));
                    btn.innerHTML = '🤍';
                }
            }
        }else{
            btn.innerHTML = '❤';
            tracksLikedList.push(data);
            localStorage.setItem('tracksLiked', JSON.stringify(tracksLikedList));
        }
    })

}

