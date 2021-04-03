/////////////////////////// Breaking Bad  functions //////////////////////////////////
// Funcion para generar el listado de episodios
setBreakingBadEpisodes = (episodes, season) => {
    html = "";
    episodes.forEach(episode => {
        // Chequea si es el episodio que necesita
        if (episode.season === season) {
            html += `<li><a href="episodios.html?episodeId=${episode.episode_id}">Episodio ${episode.episode}: ${episode.title}</a></li>`;
        }        
    })
    return html
}


// Funcion para desplegar las temporadas de Breaking Bad
breakingBadShowSeasons = episodes => {
    const ul = document.querySelector("#Breaking-Bad-Temporadas");
    var episodeArray = [];
    episodes.forEach(episode => {
        // Chequea no existe la temporada y realiza la logica
        if (!episodeArray.includes(episode.season)) {
           
            let li = document.createElement("li");
            li.innerHTML = `<input type="checkbox" name="list" id="nivel1-${episode.season}"><label for="nivel1-${episode.season}">Temporada ${episode.season}</label><ul class="interior">${setBreakingBadEpisodes(episodes, episode.season)}</ul>`;
            
            // Se agregan entre si las etiquetas
            ul.append(li);
            // Se agrega al array
            episodeArray.push(episode.season);
        }
    });
}

// Obtener todos los episodios de Breaking Bad
getBreakingBadEpisodes = () => {
    fetch('https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=Breaking+Bad')
    .then(response => response.json())
    .then(data => breakingBadShowSeasons(data))
    };





