const myOl$$ = document.querySelector('#pokedex');


const getPokemons = async () => {
 let pokemons = [];
 for (let i=1; i<= 151; i++){
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
  console.log(response);
  const res = await response.json();
  pokemons.push({name: res.name,
    image: res.sprites['front_default'],
    type : res.types.map((type) => type.type.name).join(','),
    id: res.id})
 } 
 return pokemons
}; console.log(getPokemons());

const pintarPokemon = (pokemons) => {
  myOl$$.innerHTML = '';
  for (let pokemon of pokemons){
  let li = document.createElement('li');
  li.className = 'card';
  li.innerHTML = `
  <p>${pokemon.id}</p>
  <h4 class='card-title'>${pokemon.name}</h4>
  <img src='${pokemon.image}'></img>
  <p class='card-subtitle'>${pokemon.type}</p>`
  myOl$$.appendChild(li);
  }
}

const init = async () => {
const pokemons = await getPokemons();
const dibujarPokemons = pintarPokemon(pokemons);
console.log(dibujarPokemons);
};
init();





  
  
  
 