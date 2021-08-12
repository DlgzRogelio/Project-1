
function deployActor(imgUrl, actorName, resume, movieTitle, ranking, movieUrl){

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
    imageEl.attr('src', "https://image.tmdb.org/t/p/w500"+imgUrl);

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
    contentEl.append(resume);

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



    for(var x=0;x<movieTitle.length;x++)
    {

        var boxEl=$('<div>');
        boxEl.attr('class','box');

        var paragraphEl=$('<p>');

        var strongEl=$('<strong>');
        strongEl.attr('style','padding-right:5px');
        strongEl.text(movieTitle[x].title);

        var smallEl=$('<small>');
        smallEl.text(movieTitle[x].release_date);

        //var breakEl=$('<br>');

        var movieTextEl=$('<div>');
        movieTextEl.text(movieTitle[x].overview);

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

// Retrieve INPUT data

let api_key = '94f0c60308f2a42f4c8a0265000556cd';
let submit_button = document.getElementById( 'submit');
var wikiAbstract;

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
                    

//////////////////////////


                    let link = 'https://api.themoviedb.org/3/search/person?api_key=' + api_key + '&language=en-US&query=' + name.replace(/ /g, '%20') + '&page=1&include_adult=false';

                    let new_array = {
                        name:name,
                        id:id,
                        known_for:known_for,
                        profile_path:profile_path,
                        link:link,
                        popularity:popularity
                    };












//////////////////


                    //Declarations for WIKI
                    var apiEndpoint = "https://en.wikipedia.org/w/api.php";
                    var params ="action=query&prop=extracts&format=json&origin=*&exsentences=3&exlimit=1&titles="+name;

    
                    fetch(apiEndpoint + "?" + params).then(function (response){
                        return response.json();
                    }).then(function(data) {
                        
                        var result=Object.keys(data.query.pages)[0];
                        
                        wikiAbstract=data.query.pages[result].extract;

                        deployActor(profile_path, name, wikiAbstract, known_for, popularity, link);

            
                    });

///////////////////////
                }
            });
    });
}



api_tmdb();



