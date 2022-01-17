import { describe, it } from 'mocha'
import sinon from 'sinon'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

import { GetRandomPokemonTeamService } from '../../src/services/getRandomPokemonTeamService.js'
import { validRandomPokemonTeamMock } from '../mocks/valid-random-pokemon-team.js'

chai.use(chaiAsPromised)

const expect = chai.expect

describe('GetRandomPokemonTeamService Suite Tests', () => {

  it.skip('should return a valid random pokemon team when execute is called', async () => {
    const sut = new GetRandomPokemonTeamService({ pokemonsRepository: {} })

    const expected = validRandomPokemonTeamMock

    const result = await sut.execute()

    expect(result).to.be.equal(expected)

  })

})