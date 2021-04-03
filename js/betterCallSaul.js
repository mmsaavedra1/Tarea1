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
betterCallSaulShowSeasons = episodes => {
    const ul = document.querySelector("#Better-Call-Saul-Temporadas");
    var episodeArray = [];
    episodes.forEach(episode => {
        // Chequea no existe la temporada y realiza la logica
        if (!episodeArray.includes(episode.season)) {
            // Se agrega la info a modo de HTML
            //let a = document.createElement("a");
            //a.setAttribute('href', `temporadas.html?series=Better+Call+Saul&season=${episode.season}`);
            //a.innerText = `Temporada: ${episode.season}`;

            let li = document.createElement("li");
            li.innerHTML = `<input type="checkbox" name="list" id="2-${episode.season}"><label for="2-${episode.season}">Temporada ${episode.season}</label>\n<ul class="interior">\n${setBetterCallSaulEpisodes(episodes, episode.season)}</ul>`;

            // Se agregan entre si las etiquetas
            ul.append(li);
            // Se agrega al array
            episodeArray.push(episode.season);
        }
    });
}

// Obtener todos los episodios de Better Call Saul
getBetterCallSaulEpisodes = () => {
    fetch('https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=Better+Call+Saul')
    .then(response => response.json())
    .then(data => betterCallSaulShowSeasons(data));
};