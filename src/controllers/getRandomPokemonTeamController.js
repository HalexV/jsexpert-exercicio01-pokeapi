'use strict';

class GetRandomPokemonTeamController {
  constructor({ getRandomPokemonTeamService }) {
    this.getRandomPokemonTeamService = getRandomPokemonTeamService
  }
  
  async handle(httpRequest) {
    const randomPokemonTeam = await this.getRandomPokemonTeamService.execute()

    return {
      statusCode: 200,
      body: randomPokemonTeam
    }
  }
}

export { GetRandomPokemonTeamController }