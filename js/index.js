import {findPokemon} from "./pokedex.js";

const $form = document.querySelector('#form')

$form.addEventListener('submit', showPokemon)


async function showPokemon(event) {
    event.preventDefault()
    const form = new FormData($form)
    const id = form.get('id')

    await findPokemon(id)
}