
imgUrl="https://upload.wikimedia.org/wikipedia/commons/4/46/Leonardo_Dicaprio_Cannes_2019.jpg"
actorName="Leonardo Di Caprio"
resume="Leonardo Wilhelm DiCaprio1​ (Los Ángeles; 11 de noviembre de 1974)2​ es un actor, productor de cine y ambientalista estadounidense. Ha recibido numerosos premios entre los que destacan un Óscar al mejor actor; un premio BAFTA al mejor actor por su actuación en El renacido (2015); dos Globos de Oro al mejor actor de drama por sus actuaciones en El aviador (2004) y El renacido; y un Globo de Oro al mejor actor de comedia o musical por El lobo de Wall Street (2009). Adicionalmente, ha ganado el premio del Sindicato de Actores, el Oso de Plata y un Premio Chlotrudis.3​ Así como que, a partir de 2019, sus películas han recaudado unos 7’2 mil millones de dólares, y ha sido ocho veces ya considerado uno de los actores mejor pagados del mundo."
movieTitle="Titanic"
date="Fecha"
movieResume="Titanic es una película estadounidense dramática de catástrofe de 1997 dirigida y escrita por James Cameron y protagonizada por Leonardo."
ranking="1888.99"
movieUrl="https://es.wikipedia.org/wiki/Titanic_(pel%C3%ADcula_de_1997)"

function deployActor(imgUrl, actorName, resume, movieTitle, date, movieResume, ranking, movieUrl){

    var separatorEl=$('<br>');

    var resultsEl = $('#results');

    var cardEl = $('<div>');
    cardEl.attr('class', 'card');

    var cardContentEl = $('<div>');
    cardContentEl.attr('class', 'card-content');

    var mediaEl = $('<div>');
    mediaEl.attr('class', 'media');

    var mediaLeftEl = $('<div>');
    mediaLeftEl.attr('class', 'media-left');

    var figureEl = $('<figure>');
    figureEl.attr('class', 'image is-48x48');
    
    var imageEl = $('<img>');
    imageEl.attr('src', imgUrl);

    var mediaContentEl = $('<div>');
    mediaContentEl.attr('class', 'media-content');

    var titleEl = $('<p>');
    titleEl.attr('class', 'title is-4');
    titleEl.text(actorName);

    var subtitleEl=$('<p>');
    subtitleEl.attr('class', 'subtitle is-6');
    subtitleEl.text("Popularity: "+ranking);


    var contentEl = $('<p>');
    contentEl.attr('class', 'content');
    contentEl.text(resume);

    resultsEl.append(cardEl);
    cardEl.append(cardContentEl);
    cardContentEl.append(mediaEl);
    mediaEl.append(mediaLeftEl);
    mediaLeftEl.append(figureEl);
    figureEl.append(imageEl);
    mediaEl.append(mediaContentEl);
    mediaContentEl.append(titleEl);
    mediaContentEl.append(subtitleEl);
    cardContentEl.append(contentEl);
    resultsEl.append(separatorEl);

    for(var x=0;x<3;x++)
    {

        var boxEl=$('<div>');
        boxEl.attr('class','box');

        var paragraphEl=$('<p>');

        var strongEl=$('<strong>');
        strongEl.attr('style','padding-right:5px');
        strongEl.text(movieTitle);

        var smallEl=$('<small>');
        smallEl.text(date);

        var breakEl=$('<br>');

        var movieTextEl=$('<div>');
        movieTextEl.text(movieResume);

        var movieUrlEl=$('<a>');
        movieUrlEl.attr('href',movieUrl);
        movieUrlEl.text(movieUrl);

        cardContentEl.append(boxEl);
        boxEl.append(paragraphEl);
        paragraphEl.append(strongEl);
        paragraphEl.append(smallEl);
        boxEl.append(movieTextEl);
        boxEl.append(movieUrlEl);
    }

}


for(var x=0;x<3 ;x++){
    deployActor(imgUrl, actorName, resume, movieTitle, date, movieResume, ranking, movieUrl);
}

// Retrieve INPUT data
let api_key = '94f0c60308f2a42f4c8a0265000556cd';
let submit_button = document.getElementById( 'submit');

function api_tmdb() {

    submit_button.addEventListener('click',function(event) {
        event.preventDefault();

        let input_actor = document.getElementById('name').value;
        let request_movie = 'https://api.themoviedb.org/3/search/person?api_key=' + api_key + '&language=en-US&query=' + input_actor + '&page=1&include_adult=false';
        console.log('Results related to: ' + input_actor.toUpperCase());

        fetch(request_movie).then(function (response) {
            return response.json();
        })
            .then(function(data) {
                for (let artist in data.results) {
                    let id = data.results[artist].id;
                    let name = data.results[artist].name;
                    let known_for = data.results[artist].known_for;
                    let popularity = data.results[artist].popularity;
                    let profile_path = data.results[artist].profile_path;
                    let link = 'https://api.themoviedb.org/3/search/person?api_key=' + api_key + '&language=en-US&query=' + name.replace(/ /g, '%20') + '&page=1&include_adult=false';

                    let new_array = {
                        name:name,
                        id:id,
                        known_for:known_for,
                        profile_path:profile_path,
                        link:link,
                        popularity:popularity
                    };
                    console.log(new_array);
                }
            });
    });
}
api_tmdb();

    

