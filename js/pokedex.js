import {getPokemon, getSpecies} from "./api.js";

const $image = document.querySelector('#image')
const $description = document.querySelector('#description')
const $screen = document.querySelector('#screen')
const $light = document.querySelector('#light')

function speech(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es'
    speechSynthesis.speaking ? speechSynthesis.cancel() : null
    speechSynthesis.speak(utterance);

    utterance.addEventListener
    ('start', () => {     $light.classList.add('is-animated')
    })

    utterance.addEventListener
   ('end', () => {     $light.classList.remove('is-animated')
    })
}

export function setImage(url) {
    $image.src = url
}

function setDescription(name, description){
    $description.innerHTML = `
            <h1>${name}</h1>
            <p>${description}</p>`
}

function loader(isLoading = false) {
    const img = isLoading ? 'url(../icons/loading.gif)' : ''
    $screen.style.backgroundImage = img
}

export async function findPokemon(id) {
    const pokemon = await getPokemon(id)
    const species = await getSpecies(id)
    const description = species.flavor_text_entries.find(entry => entry.language.name === 'es').flavor_text
    const sprites = [pokemon.sprites.front_default]

    for (const spritesKey in pokemon.sprites){

        if(spritesKey !== 'front_default' && pokemon.sprites[spritesKey] && spritesKey !== 'other' && spritesKey !== 'versions'){
            sprites.push(pokemon.sprites[spritesKey])
        }
    }

    return {
        id: pokemon.id,
        name: pokemon.name,
        sprites,
        description
    }
}

export async function setPokemon(id){
    loader(true)
    const pokemon = await findPokemon(id)
    loader(false)
    setImage(pokemon.sprites[0])
    setDescription(pokemon.name, pokemon.description)

    speech(`${pokemon.name}. ${pokemon.description}`)

    return pokemon
}