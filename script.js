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
  const promises = [];
  for (let i = 1; i <= 151; i++) {
    promises.push(pokemon(i));
  }

  const results = await Promise.all(promises);
  results.forEach((pokemon) => pokemonCard(pokemon));
};

const pokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await res.json();
  return data;
};

const pokemonCard = (pokemon) => {
  const container = document.querySelector(".container");
  const div = document.createElement("div");
  div.classList.add("pokelist");

  const typeColor = color[pokemon.types[0].type.name];
  div.style.backgroundColor = typeColor;

  const pokemonName = pokemon.name.toUpperCase();

  const hp = pokemon.stats[0].base_stat;
  const attack = pokemon.stats[1].base_stat;
  const defense = pokemon.stats[2].base_stat;
  const speed = pokemon.stats[5].base_stat;

  const maxStatValue = Math.max(hp, attack, defense, speed);

  const card = `
    <div>
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
        pokemon.id
      }.png" loading="lazy" alt="${pokemonName}">
      <h2>${pokemon.id} - ${pokemonName}</h2>
      <h3>Type :  ${pokemon.types[0].type.name}</h3>
      <div class="stats">
        <div class="stat">
          <span class="stat-label"><strong>HP :</strong>  ${hp}</span>
          <div class="bar" style="width: ${
            (hp / maxStatValue) * 80
          }%; background-color: #f44336;"></div>
        </div>
        <div class="stat">
          <span class="stat-label"><strong>Attack :</strong>  ${attack}</span>
          <div class="bar" style="width: ${
            (attack / maxStatValue) * 80
          }%; background-color: #2196F3;"></div>
        </div>
        <div class="stat">
          <span class="stat-label"><strong>Defense:</strong>  ${defense}</span>
          <div class="bar" style="width: ${
            (defense / maxStatValue) * 80
          }%; background-color: #4CAF50;"></div>
        </div>
        <div class="stat">
          <span class="stat-label"><strong>Speed :</strong>  ${speed}</span>
          <div class="bar" style="width: ${
            (speed / maxStatValue) * 80
          }%; background-color: #FFC107;"></div>
        </div>
      </div>
    </div>
  `;

  div.innerHTML = card;
  container.appendChild(div);
};

fetchAllPokemon().catch((err) => console.error(err));
