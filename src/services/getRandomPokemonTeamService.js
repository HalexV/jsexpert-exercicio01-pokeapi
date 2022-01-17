'use strict';

import utils from "../utils/utils.js";

class GetRandomPokemonTeamService {
  
  constructor({ pokemonsRepository }) {
    this.pokemonsRepository = pokemonsRepository
  }
  
  // Todos os pokémons possuem no mínimo três moves?
  async execute() {
    const END_RANGE = 493

    const idsArray = utils.getThreeUniqueRandomIds(END_RANGE)

    // Obter as informações do pokémon pelo id

    // Verificar se o pokemon tem no mínimo 3 moves

    // Montar o time de pokemon com os names e moves

    // Retornar o time

    return null
  }
}

export { GetRandomPokemonTeamService }