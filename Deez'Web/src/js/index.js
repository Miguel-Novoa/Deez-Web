const searchBar = document.querySelector('#searchInput');
const searchBtn = document.querySelector('#searchBtn');
const tracksSection = document.querySelector('#tracksSection');
const advancedSearchInput = document.querySelector('#inputGroupSelect01');
const searchInput = document.querySelector('#searchInput');
let searchBarValue;
let datas;
let urlApi;
let tracksLiked = [];
let previewsLiked = JSON.parse(localStorage.getItem('tracksLiked'));

searchBtn.addEventListener('click', ()=>{
    init();
});

searchInput.addEventListener('keyup', (e)=>{
    if(e.keyCode === 13){
        init();
    };
});

const init = () =>{
    tracksSection.innerHTML = '';
    searchBarValue = searchBar.value;
    if(advancedSearchInput.value == 0){
        urlApi = `https://api.deezer.com/search?q=${searchBarValue}&output=jsonp`;
    }else if(advancedSearchInput.value == 'RANKING' || advancedSearchInput.value == 'RATING_DESC'){
        urlApi = `https://api.deezer.com/search?q=${searchBarValue}&order=${advancedSearchInput.value}&output=jsonp`;
    }else{
        urlApi = `https://api.deezer.com/search?q=${advancedSearchInput.value + ":"}"${searchBarValue}"&output=jsonp`
    };
    if(searchBarValue !== ""){
        fetchJsonp(urlApi)
        .then(function(res){
            return res.json()
        }).then(function(json){
            datas = json.data
            displayCards();
            clickOnLikeHandler();
        }).catch(function(ex){
            console.log('error', ex)
        })
    }else{
        console.log('empty field')
    };
};

//Fonction permettant de générer les cards pour chaque résultat de la recherche
const displayCards = () =>{
    for(let i=0; i<datas.length; i++){
        let trackID = 'id-'+datas[i].id;
        tracksSection.innerHTML += `
        <div class="card" style="width: 18rem;">
        <img src="${datas[i].album.cover_medium}" class="card-img-top" alt="...">
        <div class="card-body">
            <div class="cardTitle">
                <h5 class="card-title">${datas[i].title}</h5>
                <p class='likeBtn' id="${trackID}">🤍</p>
            </div>
          <p class="card-text">${datas[i].artist.name  + ' / ' + datas[i].album.title}</p>
          <p class="card-text">${'Durée : ' + convertSecondsToMinutes(datas[i].duration)}</p>
          <div class="cardBtnsDiv">
            <a href="http://127.0.0.1:8080/pages/track.html?id=${datas[i].id}" id="${i}" class="btn btn-primary">Ecouter un extrait</a>
            <a href="http://127.0.0.1:8080/pages/album.html?id=${datas[i].album.id}" class="btn btn-primary">Voir la page de l'album</a>
            <a href="http://127.0.0.1:8080/pages/artist.html?id=${datas[i].artist.id}" class="btn artistPage btn-primary">Voir la page de l'artiste</a>
          </div>
        </div>
      </div>
        `
        const likeBtn = document.querySelector(`#${trackID}`);

        if(previewsLiked !== null){
            for(let r=0; r<previewsLiked.length; r++){
                if(previewsLiked[r].id == datas[i].id){
                    likeBtn.innerHTML = '❤';
                };
            };
        };
    };
};

//Fonction permettant d'ajouter/retirer des musiques des favoris
const clickOnLikeHandler = () =>{
    const like = document.querySelectorAll('.likeBtn');
    for(let y=0; y<like.length; y++){
        like[y].addEventListener('click', ()=>{
            if(like[y].innerHTML == '🤍'){
                like[y].innerHTML = '❤';
                tracksLiked.push(datas[y]);
                localStorage.setItem('tracksLiked', JSON.stringify(tracksLiked));
            }else{
                like[y].innerHTML = '🤍';
                const deleteTrack = tracksLiked.indexOf(tracksLiked[y]);
                tracksLiked.splice(deleteTrack, 1);
                localStorage.setItem('tracksLiked', JSON.stringify(tracksLiked));
            };
        });
    };
};

//Ajoute les musiques ajoutées aux favoris dans le localStorage et les inject dans le tableau des favoris
if(previewsLiked !== null){
    for(let z=0; z<previewsLiked.length; z++){
        tracksLiked.push(previewsLiked[z]);
    };
};