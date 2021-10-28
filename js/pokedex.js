import {getPokemon, getSpecies} from "./api.js";

const $image = document.querySelector('#image')
const $description = document.querySelector('#description')
const $screen = document.querySelector('#screen')
const $light = document.querySelector('#light')

function speech(text, lang) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang
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

export async function findPokemon(id, lang) {
    const pokemon = await getPokemon(id)
    const species = await getSpecies(id)
    console.log(lang)
    const description = species.flavor_text_entries.find(entry => entry.language.name === lang).flavor_text
    const sprites = [pokemon.sprites.front_default]

    for (const spritesKey in pokemon.sprites){

        if(spritesKey !== 'front_default' && pokemon.sprites[spritesKey] && spritesKey !== 'other' && spritesKey !== 'versions'){
            sprites.push(pokemon.sprites[spritesKey])
        }
    }
    console.log(pokemon.types[0].type.name)
    return {
        id: pokemon.id,
        name: pokemon.name,
        type: pokemon.types[0].type.name,
        sprites,
        description
    }
}

export async function setPokemon(id, lang){
    loader(true)
    console.log(lang)
    const pokemon = await findPokemon(id, lang)
    loader(false)
    setImage(pokemon.sprites[0])
    setDescription(pokemon.name, pokemon.description)

    speech(`${pokemon.name}. ${pokemon.description}`, lang)
    return pokemon
}