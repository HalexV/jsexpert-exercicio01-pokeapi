import { describe, it } from 'mocha'
import sinon from 'sinon'
import { expect } from 'chai'

import { PokemonsRepository } from '../../src/repositories/pokemonsRepository.js'
import utils from '../../src/utils/utils.js'

describe('pokemonsRepository Suite Tests', () => {

  afterEach(() => {
    sinon.restore()
  })

  describe('findById', () => {

    it('should call makeGetRequest with the url containing the pokemon id', async () => {
      const sut = new PokemonsRepository()

      const expected = 'https://pokeapi.co/api/v2/pokemon/0'

      const makeGetRequestStub = sinon.stub(utils, 'makeGetRequest').callsFake(async () => {
        return new Promise(resolve => resolve('ok'))
      })

      await sut.findById(0)

      expect(makeGetRequestStub.calledWith(expected)).to.be.ok

    })

  })

})