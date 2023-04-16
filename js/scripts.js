//IIFE 
let pokemonRepository = (function () {

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

    //log pokemon details to the console with click event.
    function showDetails(pokemon){
        loadDetails(pokemon).then(function (){
            console.log(pokemon)
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

//console.log(pokemonRepository.getAll());

//forEach Loop to iterate through PokeDex
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
