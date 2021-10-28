import {setPokemon, setImage} from "./pokedex.js";

const $form = document.querySelector('#form')
const $next = document.querySelector('#next-pokemon')
const $prev = document.querySelector('#prev-pokemon')
const $pokedex = document.querySelector('#pokedex')
const $nextImg = document.querySelector('#next-image')
const $prevImg = document.querySelector('#prev-image')

$form.addEventListener('submit', showPokemon)
$next.addEventListener('click', showNextPokemon)
$prev.addEventListener('click', showPrevPokemon)
$nextImg.addEventListener('click', showNextImage)
$prevImg.addEventListener('click', showPrevImage)

let currentPokemon = null
let currentImage = null

async function showPokemon(event) {
    $pokedex.classList.add('is-open')
    event.preventDefault()
    const form = new FormData($form)
    const id = form.get('id')

    currentPokemon = await setPokemon(id)
    currentImage = 0
}

async function showNextPokemon() {
    const id = currentPokemon && currentPokemon.id < 893 ? currentPokemon.id + 1 : 1
    currentPokemon = await setPokemon(id)
    $form.querySelector('input[name="id"]').value = id
}

async function showPrevPokemon() {
    const id = currentPokemon && currentPokemon.id > 1 ? currentPokemon.id - 1 : 893
    currentPokemon = await setPokemon(id)
    $form.querySelector('input[name="id"]').value = id
}

async function showNextImage() {
    if(currentPokemon){
        const id = currentImage < currentPokemon.sprites.length-1 ? ++currentImage : 0
        currentImage = id
        setImage(currentPokemon.sprites[id])
    }
}


async function showPrevImage() {
    if(currentPokemon){
        const id = currentImage > 0 ? --currentImage : currentPokemon.sprites.length-1
        currentImage = id
        setImage(currentPokemon.sprites[id])
    }
}