function listString(pokemon){
  return `<div class="pokemon-cards" id="${pokemon.order}-card">
  <h2>${pokemon.name}</h2>
  <img id="${pokemon.order}-img" src="${pokemon.sprites.front}" />
  <br>
  <a class="flip" data-id="${pokemon.order}-link">flip card</a>
  </div>`;
}

function loadListOfCharacters(input, characters){
  let filteredPokemon = []
    characters.forEach(character => {
    if(character.name.includes(input)=== true){
       if(input === ""){
         filteredPokemon = []
       }else{
         filteredPokemon.push(character);
       }
      };

  });
  getContainer().innerHTML = filteredPokemon.map(pokemon => listString(pokemon));
  attachEventListeners(characters);
}

function getContainer(){
  return document.getElementById("pokemon-container");
}

function findFlipLink(){
  return  document.querySelectorAll(".flip")
}

function attachEventListeners(characters){
  findFlipLink().forEach(item => {
    item.addEventListener('click', (e) => {findPokemonCardImage(item.dataset.id, characters)})
  })
}

function findPokemonCardImage(id, characters){
  const linkId= id;
  const imgId= id.replace(/-link/gi, '-img');
  const img = document.getElementById(`${imgId}`);
  const order =  id.replace(/-link/gi, '');
  fetchPokemonByOrder(order, img, characters)
}

function fetchPokemonByOrder(order,img, characters){
    characters.forEach(character => {
      if(character.order == order){
        toggleLogic(character, img)
      }
      })
}

function toggleLogic(pokemon, img){
  const front = pokemon.sprites.front
  const back = pokemon.sprites.back
  img.src === front ? img.setAttribute("src", back) : img.setAttribute("src", front);
}

function searchEventListener(characters){
  const searchInput= document.getElementById("pokemon-search-input");
  searchInput.addEventListener('input', (e) => {
    loadListOfCharacters(e.target.value.trim(), characters);
  })
}


document.addEventListener('DOMContentLoaded', function(){
  let characters = data.pokemons
  searchEventListener(characters)
});
