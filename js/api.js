const BASE_API = 'https://pokeapi.co/api/v2/'


export async function getPokemon(id) {
    const response = await fetch(`${BASE_API}pokemon/${id}/`)
    return await response.json()
}

export async function getSpecies(id) {
    const response = await fetch(`${BASE_API}pokemon-species/${id}/`)
    return await response.json()
}