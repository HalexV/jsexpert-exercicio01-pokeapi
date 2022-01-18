'use strict';

import utils from "../utils/utils.js";

class GetRandomPokemonTeamService {
  
  constructor({ pokemonsRepository }) {
    this.pokemonsRepository = pokemonsRepository
  }
  
  async execute() {
    const END_RANGE = 493

    const randomPokemonTeam = []

    const idsArray = utils.getThreeUniqueRandomIds(END_RANGE)

    const resultArray = await Promise.all([
      this.pokemonsRepository.findById(idsArray[0]),
      this.pokemonsRepository.findById(idsArray[1]),
      this.pokemonsRepository.findById(idsArray[2]),
    ])
  
    resultArray.forEach(obj => {
      const pokemonObj = {}
      
      const quantityMoves = obj.moves.length >= 3 ? 3 : obj.moves.length

      pokemonObj.name = obj.name
      pokemonObj.moves = []

      for(let index = 0; index < quantityMoves; index++) {
        pokemonObj.moves.push(obj.moves[index].move.name)
      }

      randomPokemonTeam.push(pokemonObj)

    })

    return randomPokemonTeam
  }
}

export { GetRandomPokemonTeamService }