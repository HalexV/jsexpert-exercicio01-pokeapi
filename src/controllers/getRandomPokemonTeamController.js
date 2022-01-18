'use strict';

class GetRandomPokemonTeamController {
  constructor({ getRandomPokemonTeamService }) {
    this.getRandomPokemonTeamService = getRandomPokemonTeamService
  }
  
  async handle(httpRequest) {
    try {
      const randomPokemonTeam = await this.getRandomPokemonTeamService.execute()

      return {
        statusCode: 200,
        body: randomPokemonTeam
      }
    } catch (error) {
      console.error(error)
      return {
        statusCode: 500,
        body: error
      }
    }
    
  }
}

export { GetRandomPokemonTeamController }