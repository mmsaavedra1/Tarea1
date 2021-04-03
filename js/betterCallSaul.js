/////////////////////////// Better Call Saul functions //////////////////////////////////
// Funcion para generar el listado de episodios
setBetterCallSaulEpisodes = (episodes, season) => {
    html = "";
    episodes.forEach(episode => {
        // Chequea si es el episodio que necesita
        if (episode.season === season) {
            html += `<li><a href="episodios.html?episodeId=${episode.episode_id}">Episodio ${episode.episode}: ${episode.title}</a></li>\n`;
        }        
    })
    return html
}

// Funcion para desplegar las temporadas de Better Call Saul
betterCallSaulShowSeasons = (episodes, temporada) => {
    const ul = document.querySelector("#Better-Call-Saul-Temporadas");
    var episodeArray = [];
    episodes.forEach(episode => {
        // Chequea no existe la temporada y realiza la logica
        if (!episodeArray.includes(episode.season)) {
            // Se despliega segun la logica
            let li = document.createElement("li");
            if (temporada === episode.season) {
                li.innerHTML = `<input type="checkbox" checked=true name="list" id="nivel2-${episode.season}"><label for="nivel2-${episode.season}">Temporada ${episode.season}</label>\n<ul class="interior">\n${setBetterCallSaulEpisodes(episodes, episode.season)}</ul>`;
            } else {
                li.innerHTML = `<input type="checkbox" name="list" id="nivel2-${episode.season}"><label for="nivel2-${episode.season}">Temporada ${episode.season}</label>\n<ul class="interior">\n${setBetterCallSaulEpisodes(episodes, episode.season)}</ul>`;
            }
            // Se agregan entre si las etiquetas
            ul.append(li);
            // Se agrega al array
            episodeArray.push(episode.season);
        }
    });
}

// Obtener todos los episodios de Better Call Saul
getBetterCallSaulEpisodes = (temporada) => {
    fetch('https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=Better+Call+Saul')
    .then(response => response.json())
    .then(data => betterCallSaulShowSeasons(data, temporada));
};