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