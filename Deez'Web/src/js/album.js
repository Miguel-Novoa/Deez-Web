const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const albumId = urlParams.get('id');
const main = document.querySelector('main');
let tracks =[];

let urlApi = `https://api.deezer.com/album/${albumId}&output=jsonp`

fetchJsonp(urlApi)
        .then(function(res){
            return res.json()
        }).then(function(json){
            displayAlbum(json)
        }).catch(function(ex){
            console.log('error', ex)
        })

//Fonction permettant d'afficher l'album
const displayAlbum = (albumDatas) =>{
    displayTableLines(albumDatas.tracks.data)
    main.innerHTML += `
        <h2>${albumDatas.title}</h2>
        <section id="album">
            <img src="${albumDatas.cover_xl}" alt="album">
            <p>Artiste : ${albumDatas.artist.name}</p>
        </section>
        <section id="trackList">
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">Liste des musiques de cette album</th>
                </tr>
                </thead>
                <tbody>
                    ${tracks}
                </tbody>
            </table>
            <a href="${albumDatas.link}"><button>Voir l'album sur deezer</button></a>
        </section>
    `;
};


//Fonction générant la liste des favoris
const displayTableLines = (trackList) =>{
    for(let x=0; x<trackList.length; x++){
        tracks.push( `
        <tr>
            <td>${trackList[x].title}</td>
        </tr>
        `);
    };
};