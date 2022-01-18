import { expect } from "chai";
import { describe, it } from "mocha";

import { GetRandomPokemonTeamController } from "../../src/controllers/getRandomPokemonTeamController.js";

import { validRandomPokemonTeamMock } from '../mocks/valid-random-pokemon-team.js'

describe('GetRandomPokemonTeamController Suite Tests', () => {

  it('should return status code 200 and the random pokemon team when getRandomPokemonTeamService succeed', async () => {
    const executeStub = async () => new Promise(resolve => resolve(validRandomPokemonTeamMock))

    const sut = new GetRandomPokemonTeamController({
      getRandomPokemonTeamService: {
        execute: executeStub
      }
    })

    const expected = {
      statusCode: 200,
      body: validRandomPokemonTeamMock
    }

    const result = await sut.handle({})

    expect(result).to.be.deep.equal(expected)
  })

})