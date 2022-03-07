
//Fonction permettant de convertir de secondes en minutes la durée d'une musique
const convertSecondsToMinutes = (duration) =>{
    duration %= 3600;
    minutes = Math.floor(duration/60);
    seconds = Math.floor(duration%60);

    return minutes + 'm' + seconds;
};