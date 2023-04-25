//IIFE 
let pokemonRepository = (function () {
    //pokemon array
    let pokemonList = [];
    //pokeApi
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

    let searchInput = document.querySelector('#search-input');


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
        listPokemon.classList.add("list-item-group");
        
        let button = document.createElement("button"); 
       
        button.classList.add("btn");
        button.classList.add("btn-primary");
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#exampleModal');

        //click event to log pokemon details
        button.addEventListener("click", function(event) {
            showDetails(pokemon)
        });

        button.innerText = pokemon.name;

        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
        
    };

    //function using promise to load name and details forEach Pokemon
    function loadList(){
        return fetch(apiUrl).then(function(response) {
            return response.json();
        }).then(function(json) {
            json.results.forEach(function (item){
                let pokemon = {
                    name: item.name,
                    detailsUrl : item.url,
                    types: item.types
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
            showModal(item);
        }).catch(function(e){
            console.error(e);
        });
    }

    function showDetails(pokemon){
        loadDetails(pokemon)
    };

    function showModal(pokemon){
        let modalTitle = document.querySelector('.modal-title');
        modalTitle.innerText = pokemon.name;

        let pokemonImage = document.querySelector('.pokemon-image');
        pokemonImage.src = pokemon.imageUrl;

        let pokemonHeight = document.querySelector('.pokemon-height');
        pokemonHeight.innerText = 'Height: ' + pokemon.height + ' meters';
    };

    //search for pokemon using bootstrap form
    searchInput.addEventListener('input', function() {
        pokemonRepository.filterSearch(searchInput);
    });

    function filterSearch(searchInput){
        let filterValue = searchInput.value.toLowerCase();

        //filter the pokemonList Array based on filterValue
        let filteredPokemon = pokemonList.filter(function(pokemon){
            return pokemon.name.toLowerCase().indexOf(filterValue) > -1;
        });

        //update the displayed list
        let pokemonListElement = document.querySelector('.pokemon-list');
        pokemonListElement.innerHTML = '';
        filteredPokemon.forEach(function (pokemon) {
            pokemonRepository.addListItem(pokemon);
        });
    }

    
    return{
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal,
        filterSearch: filterSearch
    };
    
})();

//forEach Loop to iterate through PokeDex
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
