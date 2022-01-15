'use strict';

import utils from "../utils/utils.js";

class PokemonsRepository {
  async findById(id) {
    if(!id) throw new Error('An id must be informed')
    
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`

    const { data, status } = await utils.makeGetRequest(URL)

    if (status !== 200) throw new Error('Poke API not returning status 200')

    return data
  }
}

export { PokemonsRepository }