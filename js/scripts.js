//Empty Array for PokeDex
const pokemonList = [];

//Adding the first PokeDex "page"
pokemonList[0] = {
    name: "Heracross",
    height: 1.5 , // changed the date type for height from 'string' to 'integer'
    types: ["Bug", "Fighting"]
};

//Second PokeDex "page"
pokemonList[1] = {
    name: "Lucario",
    height: 1.2,
    types: ["Fighting", "Steel"]
};

//Third "page"
pokemonList[2] = {
    name: "Squirtle",
    height: 0.5,
    types: ["Water"]
};

//Output for testing PokeDex "pages"
console.log(pokemonList);

//For Loop to iterate through PokeDex
for (let i = 0; i < pokemonList.length; i++){
    document.write(pokemonList[i].name + " " + "(height: " + pokemonList[i].height + ")" + " ");
    //conditional to check pokemon height
    if (pokemonList[i].height > 1.3){
       document.write("-Wow that's a big Pokemon");
    } else {
        document.write(" -Little Man!")
    }
    document.write("<br>")

};