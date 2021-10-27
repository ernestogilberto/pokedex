import {getPokemon, getSpecies} from "./api.js";

const $image = document.querySelector('#image')
const $description = document.querySelector('#description')

export async function findPokemon(id) {
    const pokemon = await getPokemon(id)
    const species = await getSpecies(id)
    const description = species.flavor_text_entries.find(entry => entry.language.name === 'es').flavor_text

    $image.src = pokemon.sprites.front_default
    $description.innerHTML = `
            <h1>${pokemon.name}</h1>
            <p>${description}</p>`
    console.log(pokemon, species)
}

