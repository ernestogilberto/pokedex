import {findPokemon, setImage, setPokemon} from "./pokedex.js";

const $form = document.querySelector('#form')
const $next = document.querySelector('#next-pokemon')
const $prev = document.querySelector('#prev-pokemon')
const $pokedex = document.querySelector('#pokedex')
const $nextImg = document.querySelector('#next-image')
const $prevImg = document.querySelector('#prev-image')
const $random = document.querySelector('#random')
const $lang = document.querySelector('#lang')
const $close = document.querySelector('#close')

$form.addEventListener('submit', showPokemon)
$next.addEventListener('click', showNextPokemon)
$prev.addEventListener('click', showPrevPokemon)
$nextImg.addEventListener('click', showNextImage)
$prevImg.addEventListener('click', showPrevImage)
$random.addEventListener('click', showRandomPokemon)
$lang.addEventListener('click', changeLanguage)
$close.addEventListener('click', close)

let currentPokemon = null
let currentImage = null
let currentLanguage = 'es'

async function showPokemon(event) {
    $pokedex.classList.add('is-open')
    event.preventDefault()
    const form = new FormData($form)
    const id = form.get('id').toLowerCase()

    currentPokemon = await setPokemon(id, currentLanguage)
    currentImage = 0
}

function close() {
    $pokedex.classList.remove('is-open')
}

async function showNextPokemon() {
    $pokedex.classList.add('is-open')
    const id = currentPokemon && currentPokemon.id < 893 ? currentPokemon.id + 1 : 1
    currentPokemon = await setPokemon(id, currentLanguage)
    $form.querySelector('input[name="id"]').value = id
}

async function showPrevPokemon() {
    $pokedex.classList.add('is-open')
    const id = currentPokemon && currentPokemon.id > 1 ? currentPokemon.id - 1 : 893
    currentPokemon = await setPokemon(id, currentLanguage)
    $form.querySelector('input[name="id"]').value = id
}

async function showNextImage() {
    if (currentPokemon) {
        const id = currentImage < currentPokemon.sprites.length - 1 ? ++currentImage : 0
        currentImage = id
        setImage(currentPokemon.sprites[id])
    }
}

async function showPrevImage() {
    if (currentPokemon) {
        const id = currentImage > 0 ? --currentImage : currentPokemon.sprites.length - 1
        currentImage = id
        setImage(currentPokemon.sprites[id])
    }
}

async function showRandomPokemon() {
    $pokedex.classList.add('is-open')
    const id = Math.floor(Math.random() * 893) + 1
    currentPokemon = await setPokemon(id, currentLanguage)
    $form.querySelector('input[name="id"]').value = id
}

async function showCardPokemon(id) {
    $pokedex.classList.add('is-open')
    currentPokemon = await setPokemon(id, currentLanguage)
    $form.querySelector('input[name="id"]').value = id
}

async function changeLanguage() {
    currentLanguage === 'es' ? currentLanguage = 'en' : currentLanguage = 'es'
}

async function displayCards() {

    const $cards = document.querySelector('.cards')

    for (let i = 1; i <= 151; i++) {
        const card = document.createElement('article')
        card.classList.add('card')
        $cards.appendChild(card)
        const pokemon = await findPokemon(i, currentLanguage)
        card.setAttribute('id', pokemon.id)
        card.onclick = () => showCardPokemon(pokemon.id)
        card.innerHTML = `
            <h1>${pokemon.name}</h1> 
        `
        for (let i = 0; i < pokemon.types.length; i++) {

            card.innerHTML += `
                <img src="./icons/types/${pokemon.types[i]}.svg" alt="${pokemon.name}">
            `
        }
    }
}

displayCards()