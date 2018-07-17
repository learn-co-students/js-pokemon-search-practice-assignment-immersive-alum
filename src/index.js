
const url = "http://localhost:3000/pokemons"

function getPokemon(){
  return fetch(url)
  .then((response)=>response.json())
}

function listString(pokemon){
  return `<div class="pokemon-cards" id="${pokemon.order}-card">
  <h2>${pokemon.name}</h2>
  <img id="${pokemon.order}-img" src="${pokemon.sprites.front}" />
  <br>
  <a class="flip" data-id="${pokemon.order}-link">flip card</a>
  </div>`;
}

function loadListOfCharacters(input){
  let filteredPokemon = []

  return getPokemon().then(characters =>
    characters.forEach(character => {
      if(character.name.includes(input)=== true){
        filteredPokemon.push(character);
      };
      getContainer().innerHTML = filteredPokemon.map(pokemon => listString(pokemon));
  })).then(()=> attachEventListeners());
}

function getContainer(){
  return document.getElementById("pokemon-container");
}

function findFlipLink(){
  return  document.querySelectorAll(".flip")
}

function attachEventListeners(){
  findFlipLink().forEach(item => {
    item.addEventListener('click', (e) => {findPokemonCardImage(item.dataset.id)})
  })
}

function findPokemonCardImage(id){
  const linkId= id;
  const imgId= id.replace(/-link/gi, '-img');
  const img = document.getElementById(`${imgId}`);
  const order =  id.replace(/-link/gi, '');
  fetchPokemonByOrder(order, img)
}

function fetchPokemonByOrder(order,img){
  return getPokemon().then(characters =>
    characters.forEach(character => {
      if(character.order == order){
        toggleLogic(character, img)
      }
      })
    );
}

function toggleLogic(pokemon, img){
  const front = pokemon.sprites.front
  const back = pokemon.sprites.back
  img.src === front ? img.setAttribute("src", back) : img.setAttribute("src", front);
}

function searchEventListener(){
  const searchInput= document.getElementById("pokemon-search-input");
  searchInput.addEventListener('input', (e) => {
    loadListOfCharacters(e.target.value.trim());
  })
}


document.addEventListener('DOMContentLoaded', function(){
  searchEventListener()
});
