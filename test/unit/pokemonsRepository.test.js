import { describe, it } from 'mocha'
import sinon from 'sinon'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const expect = chai.expect

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

    it('should throw when makeGetRequest throws', async () => {
      const sut = new PokemonsRepository()

      sinon.stub(utils, 'makeGetRequest').callsFake(async () => {
        return new Promise((resolve, reject) => reject(new Error()))
      })

      const result = sut.findById(0)

      await expect(result).to.be.eventually.rejected
    })

  })

})