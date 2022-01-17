'use strict';

import utils from "../utils/utils.js";

class GetRandomPokemonTeamService {
  
  constructor({ pokemonsRepository }) {
    this.pokemonsRepository = pokemonsRepository
  }
  
  async execute() {
    const END_RANGE = 493

    const idsArray = utils.getThreeUniqueRandomIds(END_RANGE)

    const resultArray = await Promise.all([
      this.pokemonsRepository.findById(idsArray[0]),
      this.pokemonsRepository.findById(idsArray[1]),
      this.pokemonsRepository.findById(idsArray[2]),
    ])

    // Verificar se o pokemon tem no mínimo 3 moves

    // Montar o time de pokemon com os names e moves

    // Retornar o time

    return null
  }
}

export { GetRandomPokemonTeamService }