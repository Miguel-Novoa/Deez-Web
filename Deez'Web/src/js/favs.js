let tracksLikedList = JSON.parse(localStorage.getItem('tracksLiked'));
const favTracksSection = document.querySelector('#favTracks');


//Fonction affichant la liste des favoris
const generateFavTracksList = () =>{
    for(let a=0; a<tracksLikedList.length; a++){
        let deleteID = 'id-'+tracksLikedList[a].id;
        favTracksSection.innerHTML+=`
            <div class="track">
                <p>❤</p>
                <p><a href="http://127.0.0.1:8080/pages/track.html?id=${tracksLikedList[a].id}">${tracksLikedList[a].title}</a></p>
                <p id='${deleteID}' class='delete'>🗑</p>
            </div>
        `
        const deleteBtn = document.querySelectorAll('.delete');
        
        deleteTracks(deleteBtn);
    };
};


//Fonction permettant de supprimer des pistes de la liste des favoris
const deleteTracks = (btn) =>{
    btn.forEach(e => e.addEventListener('click', ()=>{
        const popup = document.querySelector('#popup');
        const confirm = document.querySelector('#oui');
        const closePopup = document.querySelector('#non');
        let eID = e.id.split('id-');
        popup.style.display = 'block';

        confirm.addEventListener('click', ()=>{
            for(let u=0; u<tracksLikedList.length; u++){
                if(tracksLikedList[u].id == eID[1]){
                    let deleteTrack = tracksLikedList.indexOf(tracksLikedList[u])
                    tracksLikedList.splice(deleteTrack, 1);
                    localStorage.setItem('tracksLiked', JSON.stringify(tracksLikedList));
                    window.location.reload();
                };
            };
        });

        closePopup.addEventListener('click', ()=>{
            popup.style.display = 'none';
        });
    }));
};


if(tracksLikedList == null){
    console.log('Aucune musique dans les favoris');
}else{
    generateFavTracksList();
};