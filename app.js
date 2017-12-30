(function musicDB() {
    this.init = function() {
        this.search();
    };// init END

    this.search = function() {
        var form = document.querySelector('#form');

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            var input_search_value = document.querySelector('#input_search').value;
            form.reset();

            get_data(input_search_value.split(' ').join('+'));
        });
    };// search END

    this.get_data = function(artist) {
        var http = new XMLHttpRequest();
        var url = `https://itunes.apple.com/search?term=${artist}&entity=album`;
        var method = 'GET';

        var album_list_container = document.querySelector('#album_list');
        album_list_container.innerHTML = '';

        http.open(method, url);
        http.onreadystatechange = function() {
            if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
                show_artist(JSON.parse(http.response));
            } else if (http.readyState === XMLHttpRequest.DONE && http.status !== 200) {
                
            }
        }
        http.send();
    };// get_data END

    this.show_artist = function(obj) {
        var album_list_container = document.querySelector('#album_list');
        var output = '';

        if (obj.results.length > 0) {

            document.querySelector('#no_match').style.display = 'none';

            for (let i = 0; i < obj.results.length; i++) {
                output += '<div class="col-3 album_item">';
                output +=   `<div class="item_tn" style="background: url(${obj.results[i].artworkUrl100});"></div>`;
                output +=   `<div class="item_title">${obj.results[i].collectionName}</div>`;
                output +=   '<div class="item_price">';
                output +=       `<span>Price:</span> ${obj.results[i].collectionPrice} ${obj.results[i].currency}`;
                output +=   '</div>';
                output +=   `<a href="${obj.results[i].collectionViewUrl}" target="_blank">Buy now</a>`;
                output += '</div>';
            }
            album_list_container.innerHTML = '';
            album_list_container.insertAdjacentHTML('afterbegin', output);
        } else {
            // display errors
            document.querySelector('#no_match').style.display = 'block';
        }

    };// show_artist END
    
    this.init();
})();