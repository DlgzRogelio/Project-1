# _Movie Mates_

#### [TRY IT HERE](https://dlgzrogelio.github.io/Project-1/)
##### Project by _RED TEAM_
[Luis Treviño](https://github.com/ltrevino) / [José Rogelio](https://github.com/DlgzRogelio) / [Carlos Aguirre](https://github.com/ca2los) / [Ian Elizalde](https://github.com/ian-dot)

Movie Mates is a browser engine ready to go for getting all the data related to people on movies and series. Every result 
will be sorted by rating in ascending order. If a name is entered, the program will retrieve the top data you are looking for.

### Let Movie Mates recommend you the content you need
If you enjoy watching prime content without losing time, then this APP is perfect for you. We want you to chill and type 
the name of the person related to the movies and series you enjoy the most. Movie Mates will do the hard work for you, by 
filtering the content you must watch.


### It's not only about actresses or actors
Don't limit yourself, try our engine and start looking for directors, producers, and score composers. Discover the most
acclaimed projects you didn't know already existed. All you need to do is:

1. Type a name (full name or single name)
2. Press ENTER or click the SEARCH button
3. Select the result of your interest

### Technologies
Our program wouldn't be possible without the help of free online resources available to anyone:

#### HTML 5 + CSS (BULMA)
Bulma is a free, open source framework that provides ready-to-use frontend components that you can easily combine to 
build responsive web interfaces. [**DOCUMENTATION**](https://bulma.io/)

#### JQuery
jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers. With a combination of versatility and extensibility, jQuery has changed the way that millions of people write JavaScript. [**DOCUMENTATION**](https://jquery.com/)

#### THE MOVIE DATABASE (API)
The Move Database is a free API service with millions of movies, tv shows and people to discover. 
[**DOCUMENTATION**](https://developers.themoviedb.org/3/getting-started/introduction)

#### MEDIA WIKI (API)
The MediaWiki API is a mature and stable interface that is actively supported and improved. While we try to avoid it, 
we may occasionally need to make breaking changes; subscribe to the mediawiki-api-announce mailing list for notice 
of updates. [**DOCUMENTATION**](https://www.mediawiki.org/wiki/API:Main_page)

### Approach the code...
The HTML is created live, every time a search is initialized. The cards at the results list are generated with JS and/or JQUERY:
```javascript
for(var x=0;x<movieTitle.length;x++) {
    cardContentEl.append(boxEl);
    boxEl.append(paragraphEl);
    paragraphEl.append(strongEl);
    paragraphEl.append(smallEl);
    boxEl.append(movieTextEl);
    boxEl.append("<br>");
    boxEl.append(movieUrlEl);
}
```
To retrieve the data from The Movie Database, the program access to the API with the INPUT from the user:
```javascript
function api_tmdb() {
    submit_button.addEventListener('click',function(event) {
        event.preventDefault();

        let input_actor = document.getElementById('name').value;
        let request_movie = 'https://api.themoviedb.org/3/search/person?api_key=' + api_key + '&language=en-US&query=' + input_actor + '&page=1&include_adult=false';
        ...
```
Then the program starts the iteration and filters the data from Media Wiki, the second API:
```javascript
for (let index = 0; index < data.results.length; index++) {

    let link = 'https://www.themoviedb.org/search?language=es&query=';
    var params ="action=query&prop=extracts&format=json&origin=*&exsentences=3&exlimit=1&titles="+data.results[index].name;

    await fetch(apiEndpoint + "?" + params).then(function (response){
        return response.json();
        ...
```
Both of the interactions with API's are triggered from the fetch function, an evolution of the XMLHTTPRequest. Bellow we present a general diagram of this functionality:

![image](https://user-images.githubusercontent.com/12967754/129433432-bc60f45a-f5a9-4a98-9580-391f98fc13b0.png)


#### BY [_RED TEAM_]((https://dlgzrogelio.github.io/Project-1/))

