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
    function add(){
        pokemonList.push(pokemon);
    }

    return{
        add: add,
        getAll: getAll
    };

}) ();
//console.log(pokemonRepository.getAll());


//forEach Loop to iterate through PokeDex
pokemonRepository.getAll().forEach(pokemonList => console.log(pokemonList));