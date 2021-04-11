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

// Funcion para desplegar todas las citas de un personaje
showQuotes = (quotes) => {
    const div = document.querySelector('#Character');

    let h4 = document.createElement("h4");
    h4.innerText = 'Citas:';
    div.append(h4);

    
    let ul= document.createElement("ul");
    html = "";
    if (quotes.length != 0) {
        quotes.forEach(quote => {
        html += `<li>${quote.quote}</li>\n`;
        })
    } else {
        html = "<li>No hay información de citas para mostrar.</li>";
    }
    ul.innerHTML = html;
    div.append(ul);

} 

// Funcion para desplegar todos los datos de un personaje
showCharacter = (character) => {
    const div = document.querySelector('#Character');

    console.log(character);

    let img = document.createElement("img");
    img.setAttribute('src', character.img);
    img.setAttribute('width', '30%');
    img.setAttribute('height', '30%');
    div.append(img);

    console.log(character);
    let h2 = document.createElement("h2");
    h2.innerText = character.name;
    div.append(h2);

    let h4 = document.createElement("h4");
    h4.innerText = 'Alias: ';
    let ulc = document.createElement("ul")
    ulc.innerHTML = `<li>${character.nickname}</li>`
    div.append(h4);
    div.append(ulc);

    let h4a = document.createElement("h4");
    h4a.innerText = "Ocupación:"
    let ul = document.createElement("ul");
    html = ""
    character.occupation.forEach(aux => {
        html += `<li>${aux}</li>\n`;
    })
    ul.innerHTML = html;
    div.append(h4a);
    div.append(ul);

    let h4b = document.createElement("h4");
    h4b.innerText = 'Actor/Actriz:';
    let uld = document.createElement("ul");
    if (character.portrayed != "") {
        uld.innerHTML = `<li>${character.portrayed}</li>`
    } else {
        uld.innerHTML = '<li>No hay información de su actor/actriz.</li>'
    }
    div.append(h4b);
    div.append(uld);

    let h4c = document.createElement("h4");
    h4c.innerText = 'Estado:';
    let ule = document.createElement("ul");
    console.log(character.status);
    if (character.status != "") {
        ule.innerHTML = `<li>${character.status}</li>`
    } else {
        ule.innerHTML = '<li>No hay información de su estado.</li>';
    }
    div.append(h4c);
    div.append(ule);

    if (character.appearance.length != 0) {
        let h4c = document.createElement("h4");
        h4c.innerText = "Temporadas en Breaking Bad:";
        div.append(h4c);

        let ulf = document.createElement("ul");
        html = "";
        character.appearance.forEach(aux => {
            html += `<li><a href="index.html?series=Breaking+Bad&temporada=${aux}">Temporada ${aux}</a></li>\n`;
        })
        ulf.innerHTML = html;
        div.append(ulf);
    } else {
        let h4c = document.createElement("h4");
        h4c.innerText = "Este personaje no aparece en Breaking Bad."
        div.append(h4c);
    }

    if (character.better_call_saul_appearance.length != 0) {
        let h4d = document.createElement("h4");
        h4d.innerText = "Temporadas en Better Call Saul:";
        div.append(h4d);

        let ulg = document.createElement("ul");
        html = "";
        character.better_call_saul_appearance.forEach(aux => {
            html += `<li><a href="index.html?series=Better+Call+Saul&temporada=${aux}">Temporada ${aux}</a></li>\n`;
        })
        ulg.innerHTML = html;
        div.append(ulg);
    } else {
        let h4c = document.createElement("h4");
        h4c.innerText = "Este personaje no aparece en Better Call Saul."
        div.append(h4c)
    }

    getQuotes(character.name);

}


// Obtener datos sobre personaje
getCharacter = (name) => {
    fetch(`https://tarea-1-breaking-bad.herokuapp.com/api/characters?name=${name}`)
    .then(response => response.json())
    .then(data => showCharacter(data[0]));
}

// Obtener datos sobre el episodio en especifico
getEpisode = (episodeId) => {
    fetch(`https://tarea-1-breaking-bad.herokuapp.com/api/episodes/${episodeId}`)
    .then(response => response.json())
    .then(data => showEpisode(data[0]));
}

// Obtener todas las citas de un personaje
getQuotes = (name) => {
    fetch(`https://tarea-1-breaking-bad.herokuapp.com/api/quote?author=${name}`)
    .then(response => response.json())
    .then(data => showQuotes(data))
}

// Tener la busqueda deseada
const getBusqueda = async function(offset, url) {
    // El URL que se desea trabajar
    let actualUrl = url + `&limit=10&offset=${offset}`;
    
    // Se retorna con la promesa
    console.log(actualUrl);
    let apiResult = await fetch(actualUrl)
    .then(response => {
        return response.json();
    });

    return apiResult;
}

let getEntrireBusquedaList = async function(offset, url) {
    let results = await getBusqueda(offset, url);
    if (results.length > 0) {
        return results.concat(await getEntrireBusquedaList(offset+10, url));
    } else {
        return results;
    }
};

// Desplegar todos el resultado de busqueda
async function searchCharacter () {
    // Se crea el cuerpo de la busqueda
    let div = document.querySelector("#Character");
    let h1 = document.createElement("h1");

    // Obtener la variable para consultar por la API
    let queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has("ValorBusquedaName") && urlParams.get("ValorBusquedaName")!="") {
        let variable = urlParams.get("ValorBusquedaName");
        h1.innerText = "Valor de búsqueda: ";
        // Se realiza la busqueda
        let urlBase = `https://tarea-1-breaking-bad.herokuapp.com/api/characters?name=${variable}`;
        (async ()=>{

            const entireList=await getEntrireBusquedaList(0, urlBase);
            
            // Se crea en plantilla
            if (entireList.length != 0) {
                let ul = document.createElement('ul');
                html = "";
                for (let i=0; i<entireList.length; i++) {
                    html += `<li><a href="personajes.html?name=${entireList[i].name}">${entireList[i].name}</a></li>`;
                }
                ul.innerHTML = html;
                div.append(ul);
            } else {
                // Se agreag mensaje de alerta
                let h3 = document.createElement('h3');
                h3.innerText = "No hay resultados para la búsqueda ☹️"
                h3.setAttribute("align", "center");
                div.append(h3);
            }
        
        })();

    } else {
        // Se agreag mensaje de alerta
        h1.innerText = "No se ha podido cargar la información :("
        h1.setAttribute("align", "center");
    }
    div.append(h1);
}


/*
const limitPerPage=20;
const apiUrl="https://5b5cb0546a725000148a67ab.mockapi.io/api/v1/users";

const getUsers = async function(pageNo = 1) {

let actualUrl=apiUrl + `?page=${pageNo}&limit=${limitPerPage}`;
var apiResults=await fetch(actualUrl)
.then(resp=>{
return resp.json();
});

return apiResults;

}

const getEntireUserList = async function(pageNo = 1) {
  const results = await getUsers(pageNo);
  console.log("Retreiving data from API for page : " + pageNo);
  if (results.length>0) {
    return results.concat(await getEntireUserList(pageNo+1));
  } else {
    return results;
  }
};


(async ()=>{

    const entireList=await getEntireUserList();
    console.log(entireList);

})();
*/