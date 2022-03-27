const pokeNames = document.querySelector('[data-poke-name]');
const pokeID = document.querySelector(['[pokeID]']);
const pokeTypes = document.querySelector('[pokeTypes]');
const pokeStats = document.querySelector(['[pokeStats]']);

const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("./missigno.png")
            alert('Este pokémon no existe. Intenta otra vez')
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            console.log(data);
            let pokeImg = data.sprites.front_default; 
            pokeImage(pokeImg);
            console.log(pokeImg);
            const { stats , types} = data;
            pokeNames.textContent = data.name;
            pokeID.textContent = `N° ${data.id}`;
            renderPokemonTypes(types);
            renderPokemonStats(stats);
        }
    });
}

const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.background = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    dark: '#808080' ,
    fairy: '#FFB6C1' ,
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#287233',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#800080',
    ground: '#D2B074',
    dragon: '#572364',
    steel: '#1D8A99',
    fighting: '#F44611',
    default: '#2A1A1F',
};



const renderPokemonStats = stats =>{
    pokeStats.innerHTML = '';
    stats.forEach(stat =>{
        const statElem = document.createElement("div");
        const statElemName = document.createElement("div");
        const statElemAmount = document.createElement("div");
        statElemName.textContent = stat.stat.name;
        statElemAmount.textContent =stat.base_stat;
        statElem.appendChild(statElemName);
        statElem.appendChild(statElemAmount);
        pokeStats.appendChild(statElem);

    })
}


const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}
