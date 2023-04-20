//IIFE 
let pokemonRepository = (function () {

    let modalContainer = document.querySelector('#modal-container');

    //pokemon array
    let pokemonList = [];
    //pokeApi
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

    //getAll() function to get pokemonList
    function getAll() {
        return pokemonList;
    }

    //add() funtion to add item to pokemonList
    function add(pokemon){
        //Validation of proper data input
        if (
            typeof pokemon === "object" &&
            "name" in pokemon 
        ) {
            pokemonList.push(pokemon);
        }else{
            console.log("failed to add pokemon")
        }     
    }

    //add each pokemon to HMTL doc
    function addListItem(pokemon){
        let pokemonList = document.querySelector(".pokemon-list");
        let listPokemon = document.createElement("li");
        let button = document.createElement("button"); 
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
        //click event to log pokemon details
        button.addEventListener("click", function(event) {
            showDetails(pokemon);
        });
    };

    //function using promise to load name and details forEach Pokemon
    function loadList(){
        return fetch(apiUrl).then(function(response) {
            return response.json();
        }).then(function(json) {
            json.results.forEach(function (item){
                let pokemon = {
                    name: item.name,
                    detailsUrl : item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    //load pokemon on HTML page
    function loadDetails(item){
        let url = item.detailsUrl;
        return fetch(url).then(function(response){
            return response.json();
        }).then (function(details){
            //Return Pokemon Details
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function(e){
            console.error(e);
        });
    }

    //function to close modal
    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    //log pokemon details to the console with click event.
    function showDetails(pokemon){
        loadDetails(pokemon).then(function (){
            modalContainer.innerHTML = '';

            //modal in modalContainer
            let modal = document.createElement('div');
            modal.classList.add('modal');

            //setting img container in modal
            let imgContainer = document.createElement('div');
            imgContainer.classList.add('imgContainer');

            //extracting pokemon name to display on Modal
            let pokeName = document.createElement('h3');
            pokeName.innerText = pokemon.name;

            //extracting pokemon height to display on Modal
            let pokeHeight = document.createElement('h3');
            pokeHeight.innerText = pokemon.height + ' meters';

            //adding img to imgContainer in modal
            let pokemonImg = document.createElement('img');
            pokemonImg.src = pokemon.imageUrl;

            //close button functionality
            let closeButton = document.createElement('button');
            closeButton.classList.add('modal-close');
            closeButton.innerText = 'close';
            closeButton.addEventListener('click', hideModal)

            //adding element to modal and modalContainer
            modal.appendChild(pokeName);
            modal.appendChild(pokeHeight);
            imgContainer.appendChild(pokemonImg);
            modal.appendChild(imgContainer);
            modal.appendChild(closeButton);
            modalContainer.appendChild(modal);

            modalContainer.classList.add('is-visible');

            //click-out functionality
            modalContainer.addEventListener('click', (e) => {
                let target = e.target;
                if (target === modalContainer) {
                    hideModal();
                }
            });

            //esc key funcionality
            window.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
                    hideModal();
                }
            });
        });
    };

    //return all the functions for usage.
    return{
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
    
}) ();



//forEach Loop to iterate through PokeDex
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
