const color = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};

const fetchAllPokemon = async () => {
  for (let i = 1; i <= 151; i++) {
    await pokemon(i);
  }
};

const pokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  pokemonCard(data);
};

pokemonCard = (pokemon) => {
  const container = document.querySelector(".container");
  const div = document.createElement("div");
  div.classList.add("pokelist");
  const card = `<div>
  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"></img>
  <h2>${pokemon.name}</h2>
  </div>
  `;
  div.innerHTML = card;
  container.append(div);
};

fetchAllPokemon();
