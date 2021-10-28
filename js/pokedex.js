import {getPokemon, getSpecies} from "./api.js";

const $image = document.querySelector('#image')
const $description = document.querySelector('#description')
const $info = document.querySelector('#info')
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


function setInfo(pokemon){
    $info.innerHTML = `
            <h1>Tamaño: </h1>
            <p>${pokemon.height}</p>
            <h1>Peso: : </h1>
            <p>${pokemon.weight}</p>
            <h1>Movimientos: </h1>
        `

    pokemon.moves.forEach(move => {
        $info.innerHTML += `
            <p>${move}</p>
        `
    })

    $info.classList.add('active')

}


export async function findPokemon(id, lang) {
    const pokemon = await getPokemon(id)
    const species = await getSpecies(id)
    console.log(lang)
    const description = species.flavor_text_entries.find(entry => entry.language.name === lang).flavor_text
    const sprites = [pokemon.sprites.front_default]
    const types = []
    const moves = []

    for (const spritesKey in pokemon.sprites){
        if(spritesKey !== 'front_default' && pokemon.sprites[spritesKey] && spritesKey !== 'other' && spritesKey !== 'versions'){
            sprites.push(pokemon.sprites[spritesKey])
        }
    }
    if(pokemon.types.length > 0){

        for(let i = 0; i < pokemon.types.length; i++){
            types.push(pokemon.types[i].type.name)
        }
    }

    if(pokemon.moves.length > 0){

        for(let i = 0; i < pokemon.moves.length; i++){
            moves.push(pokemon.moves[i].move.name)
        }
    }

    return {
        id: pokemon.id,
        name: pokemon.name,
        height: pokemon.height,
        weight: pokemon.weight,
        types,
        sprites,
        description,
        moves
    }
}

export async function setPokemon(id, lang){
    loader(true)
    console.log(lang)
    const pokemon = await findPokemon(id, lang)
    loader(false)
    setImage(pokemon.sprites[0])
    setDescription(pokemon.name, pokemon.description)
    setInfo(pokemon)

    speech(`${pokemon.name}. ${pokemon.description}`, lang)
    return pokemon
}