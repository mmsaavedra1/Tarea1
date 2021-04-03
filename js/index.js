// Funcion para desplegar los datos de episodios
showEpisode = (episode) => {
    const div = document.querySelector("#Episode");

    let h1 = document.createElement("h1");
    h1.innerText = `${episode.series}`;

    let h2 = document.createElement("h2");
    h2.innerText = `Temporada: ${episode.season}\n`;

    let h2a = document.createElement("h2");
    h2a.innerText = `Episodio: "${episode.title}"`;

   let h3 = document.createElement("h3");
   h3.innerText = `Nº de episodio: ${episode.episode}`

   let h4 = document.createElement("h4");
   h4.innerText = `Fecha: ${episode.air_date}`

   let h4a = document.createElement("h4");
   h4a.innerText = "Personajes:"

   let ul = document.createElement("ul");
   html = ""
   episode.characters.forEach (character => {
       html += `<li><a href="personajes.html?name=${character}">${character}</a></li>`;
   })
   ul.innerHTML = html;

    div.append(h1);
    div.append(h2);
    div.append(h2a);
    div.append(h3);
    div.append(h4);
    div.append(h4a);
    div.append(ul)
}

// Obtener datos sobre el episodio en especifico
getEpisode = (episodeId) => {
    fetch(`https://tarea-1-breaking-bad.herokuapp.com/api/episodes/${episodeId}`)
    .then(response => response.json())
    .then(data => showEpisode(data[0]));
}