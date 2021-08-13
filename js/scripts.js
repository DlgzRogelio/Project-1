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
    if (imgUrl!= null){
        imageEl.attr('src', "https://image.tmdb.org/t/p/w500"+imgUrl);
    } else {
        imageEl.attr('src', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYwxeqpgo12TSQXpuTsVhjJ78So8JBSvnlasVnWbNpEKnI787YVl6UetETTCeE_atWqI0&usqp=CAU');
    }

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

    for(var x=0;x<movieTitle.length;x++) {

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
        movieUrlEl.attr('href',movieUrl+movieTitle[x].title);
        movieUrlEl.text(movieUrl+movieTitle[x].title);

        cardContentEl.append(boxEl);
        boxEl.append(paragraphEl);
        paragraphEl.append(strongEl);
        paragraphEl.append(smallEl);
        boxEl.append(movieTextEl);
        boxEl.append("<br>");
        boxEl.append(movieUrlEl);
    }
}

// Retrieve INPUT data
let api_key = '94f0c60308f2a42f4c8a0265000556cd';
let submit_button = document.getElementById( 'submit');
var wikiAbstract;

document.body.children[1].children[0].children[1].style.display = 'none';

function api_tmdb() {
    submit_button.addEventListener('click',function(event) {
        event.preventDefault();

        let input_actor = document.getElementById('name').value;
        let request_movie = 'https://api.themoviedb.org/3/search/person?api_key=' + api_key + '&language=en-US&query=' + input_actor + '&page=1&include_adult=false';

        fetch(request_movie).then(function (response) {
            return response.json();
        }).then(async function(data) {

            console.log(data.results);
            //Declarations for WIKI
            var apiEndpoint = "https://en.wikipedia.org/w/api.php";

            for (let index = 0; index < data.results.length; index++) {

                let link = 'https://www.themoviedb.org/search?language=es&query=';
                var params ="action=query&prop=extracts&format=json&origin=*&exsentences=3&exlimit=1&titles="+data.results[index].name;

                await fetch(apiEndpoint + "?" + params).then(function (response){
                    return response.json();
                }).then(function(data2) {
                    var result=Object.keys(data2.query.pages)[0];
                    wikiAbstract=data2.query.pages[result].extract;
                    deployActor(data.results[index].profile_path, data.results[index].name, wikiAbstract, data.results[index].known_for, data.results[index].popularity, link);
                });
            }

            document.body.children[1].children[0].children[1].style.display = 'block';
            document.body.children[1].style.padding = '5em 0 0';
        });
    });
}
api_tmdb();

function clear_results() {
    submit_button.addEventListener('click', function(){
        document.getElementById("results").innerHTML = "";
    });
}
clear_results();

//Routine to display modal

$("#modalTeam").click(function() {
    console.log("entra");
    var target = $(this).data("target");
    $("html").addClass("is-clipped");
    $(target).addClass("is-active");
});

$(".modal-close").click(function() {
    $("html").removeClass("is-clipped");
    $(this).parent().removeClass("is-active");
});