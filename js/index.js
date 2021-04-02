/////////////////////////// Breaking Bad  functions //////////////////////////////////
// Funcion para desplegar las temporadas de Breaking Bad
breakingBadShowSeasons = episodes => {
    const charactersDiv = document.querySelector("#seasonsBreakingBad");
    var episodeArray = [];
    episodes.forEach(episode => {
        console.log(episode);
        // Chequea no existe la temporada y realiza la logica
        console.log(episodeArray.includes(episode.season));
        if (!episodeArray.includes(episode.season)) {
            const characterElement = document.createElement('p');
            characterElement.innerText = `Temporada: ${episode.season}`;
            charactersDiv.append(characterElement);
            // Se agrega al array
            episodeArray.push(episode.season)
        }
    });
}

// Obtener todos los episodios de Breaking Bad
breakingBadEpisodes = () => {
    fetch('https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=Breaking+Bad')
    .then(response => response.json())
    .then(data => breakingBadShowSeasons(data))
    };


/////////////////////////// Better Call Saul functions //////////////////////////////////
// Funcion para desplegar las temporadas de Better Call Saul
betterCallSaulShowSeasons = episodes => {
    const charactersDiv = document.querySelector("#seasonsBetterCallSaul");
    var episodeArray = [];
    episodes.forEach(episode => {
        console.log(episode);
        // Chequea no existe la temporada y realiza la logica
        console.log(episodeArray.includes(episode.season));
        if (!episodeArray.includes(episode.season)) {
            const characterElement = document.createElement('p');
            characterElement.innerText = `Temporada: ${episode.season}`;
            charactersDiv.append(characterElement);
            // Se agrega al array
            episodeArray.push(episode.season)
        }
    });
}

// Obtener todos los episodios de Better Call Saul
betterCallSaulEpisodes = () => {
    fetch('https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=Better+Call+Saul')
    .then(response => response.json())
    .then(data => betterCallSaulShowSeasons(data));
};


/////////////////////////// MAIN //////////////////////////
breakingBadEpisodes()
betterCallSaulEpisodes();



