'use strict';

import utils from "../utils/utils.js";

class PokemonsRepository {
  async findById(id) {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`

    await utils.makeGetRequest(URL)

    return null
  }
}

export { PokemonsRepository }