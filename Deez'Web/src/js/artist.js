const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const artistId = urlParams.get('id');
const main = document.querySelector('main');

let urlApi = `https://api.deezer.com/artist/${artistId}&output=jsonp`

fetchJsonp(urlApi)
        .then(function(res){
            return res.json()
        }).then(function(json){
            displayArtist(json)
        }).catch(function(ex){
            console.log('error', ex)
        })

//Fonction affichant les informations de l'artiste
const displayArtist = (artistDatas) =>{
    main.innerHTML = `
        <h2>${artistDatas.name}</h2>
        <section id="artistInfos">
            <img src="${artistDatas.picture_xl}" alt="album">
            <div id="artistText">
                <p>Nombre d'albums : ${artistDatas.nb_album}</p>
                <p>Nombre de fans : ${artistDatas.nb_fan}</p>
            </div>
            <a href="${artistDatas.link}"><button>Voir l'artiste sur Deezer</button></a>
        </section>
    `
};