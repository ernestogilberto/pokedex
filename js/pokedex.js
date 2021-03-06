import {getPokemon, getSpecies} from "./api.js";

const $image = document.querySelector('#image')
const $description = document.querySelector('#description')
const $info = document.querySelector('#info')
const $screen = document.querySelector('#screen')
const $light = document.querySelector('#light')
const $safe = document.querySelector('.screen-safeArea')

function speech(text, lang) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang
    speechSynthesis.speaking ? speechSynthesis.cancel() : null
    speechSynthesis.speak(utterance);

    utterance.onstart = () => {
        $light.classList.add('is-animated')
    }

    utterance.onend = () => {
        $light.classList.remove('is-animated')
    }
}

export async function findPokemon(id, lang) {
    const pokemon = await getPokemon(id)
    const species = await getSpecies(id)
    const description = species.flavor_text_entries.find(entry => entry.language.name === lang).flavor_text
    const sprites = [pokemon.sprites.front_default]
    const types = []
    const moves = []

    for (const spritesKey in pokemon.sprites) {
        if (spritesKey !== 'front_default' && pokemon.sprites[spritesKey] && spritesKey !== 'other' && spritesKey !== 'versions') {
            sprites.push(pokemon.sprites[spritesKey])
        }
    }
    pokemon.types.forEach(type => {
        types.push(type.type.name)
    })

    pokemon.moves.forEach(move => {
        moves.push(move.move.name)
    })

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

export function setImage(url) {
    $image.src = url
    $image.style.display = 'block'
}

function setDescription(name, description) {
    $description.innerHTML = `
            <h1>${name}</h1>
            <p>${description}</p>`
}

function loader(isLoading = false) {
    $image.style.display = 'none'
    $screen.style.backgroundImage = isLoading ? 'url(../icons/loading.gif)' : ''
    $screen.style.backgroundSize = 'cover'
}

function setInfo(pokemon) {

    $info.innerHTML = `
        <h1>Tipo: </h1>
    `

    for (let i = 0; i < pokemon.types.length; i++) {

        $info.innerHTML += `
                <img src="./icons/types/${pokemon.types[i]}.svg" alt="${pokemon.name}">
            `
    }

    $info.innerHTML += `
            <h1>Tama??o: </h1>
            <p>${pokemon.height}</p>
            <h1>Peso: </h1>
            <p>${pokemon.weight}</p>
            <h1>Movimientos: </h1>
        `

    pokemon.moves.forEach(move => {
        $info.innerHTML += `
            <p>${move} - </p>
        `
    })

    $info.classList.add('active')
}

function setBackground(type) {
    $safe.style.backgroundImage = `url(./images/backgrounds/${type}.svg)`
    $safe.style.backgroundSize = 'contain'
}

export async function setPokemon(id, lang) {
    loader(true)
    const pokemon = await findPokemon(id, lang)
    loader(false)
    setImage(pokemon.sprites[0])
    setDescription(pokemon.name, pokemon.description)
    setInfo(pokemon)
    setBackground(pokemon.types[0])

    speech(`${pokemon.name}. ${pokemon.description}`, lang)
    return pokemon
}