
    // Please, try this in your browser's console

    let api_key = '94f0c60308f2a42f4c8a0265000556cd';

    function api_request_02() {

        let input_actor = 'Leonardo';
        let filter_is_on = true;

        if (filter_is_on === true) {
            let request_movie = 'https://api.themoviedb.org/3/search/person?api_key=' + api_key + '&language=en-US&query=' + input_actor + '&page=1&include_adult=false'

            fetch(request_movie).then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
            });
        }
    }
    api_request_02();

    // This function prints a top 20 list of results and at this point the user must click at the name
    // to finally show the top movies of his selection.

