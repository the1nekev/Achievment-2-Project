//IIFE 
let pokemonRepository = (function () {

    //pokemon array
    let pokemonList = [
        {
            name: "Heracross",
            types: ["Bug", "Fighting"],
            height: 1.5
        },
        {
            name: "Lucario",
            types: ["Steel", "Fighting"],
            height: 1.2
        },
        {
            name: "Squirtle",
            types: ["Water"],
            height: 0.5
        },

    ];

    //getAll() function to get pokemonList
    function getAll() {
        return pokemonList;
    }

    //add() funtion to add item to pokemonList
    function add(pokemon){
        //Validation of proper data input
        if (
            typeof pokemon === "object" &&
            "name" in pokemon &&
            "height" in pokemon &&
            "types" in pokemon
        ) {
            pokemonList.push(pokemon);
        }else{
            console.log("failed to add pokemon")
        }     
    }
    
    function addListItem(pokemon){
        let pokemonList = document.querySelector(".pokemon-list");
        let listPokemon = document.createElement("li");
        let button = document.createElement("button"); 
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
        button.addEventListener("click", () => showDetails(pokemon));
    };
    function showDetails(pokemon){
        console.log(pokemon.name);
    };
    return{
        add: add,
        getAll: getAll,
        addListItem: addListItem,
    };
    

}) ();

//adding more pokemon for test
//pokemonRepository.add({ name: "Pikachu", height: 0.3, types:["electric"]});
//console.log(pokemonRepository.getAll());

//forEach Loop to iterate through PokeDex
pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});

