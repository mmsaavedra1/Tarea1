// Funcion para desplegar los datos de episodios
showEpisode = (episode) => {
    const div = document.querySelector("#Episode");
    let h1 = document.createElement("h1");
    h1.innerText = `Descripción del episodio: "${episode.title}" de la serie ${episode.series}`;
    div.append(h1);
}

// Obtener datos sobre el episodio en especifico
getEpisode = (episodeId) => {
    fetch(`https://tarea-1-breaking-bad.herokuapp.com/api/episodes/${episodeId}`)
    .then(response => response.json())
    .then(data => showEpisode(data[0]));
}