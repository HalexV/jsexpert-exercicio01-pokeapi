import { describe, it } from 'mocha'
import sinon from 'sinon'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const expect = chai.expect

import { PokemonsRepository } from '../../src/repositories/pokemonsRepository.js'
import utils from '../../src/utils/utils.js'

import validPokemonInfo from '../mocks/valid-pokemon-info.js'

describe('pokemonsRepository Suite Tests', () => {

  afterEach(() => {
    sinon.restore()
  })

  describe('findById', () => {

    it('should call makeGetRequest with the url containing the pokemon id', async () => {
      const sut = new PokemonsRepository()

      const responseMock = {
        data: {},
        status: 200
      }

      const expected = 'https://pokeapi.co/api/v2/pokemon/1'

      const makeGetRequestStub = sinon.stub(utils, 'makeGetRequest').callsFake(async () => {
        return new Promise(resolve => resolve(responseMock))
      })

      await sut.findById(1)

      expect(makeGetRequestStub.calledWith(expected)).to.be.ok

    })

    it('should throw when makeGetRequest throws', async () => {
      const sut = new PokemonsRepository()

      sinon.stub(utils, 'makeGetRequest').callsFake(async () => {
        return new Promise((resolve, reject) => reject(new Error()))
      })

      const result = sut.findById(1)

      await expect(result).to.be.eventually.rejected
    })

    it('should throw when status is not 200', async () => {
      const sut = new PokemonsRepository()

      const responseMock = {
        data: {},
        status: 400
      }

      sinon.stub(utils, 'makeGetRequest').callsFake(async () => {
        return new Promise(resolve => resolve(responseMock))
      })

      const result = sut.findById(1)

      await expect(result).to.be.eventually.rejectedWith('Poke API not returning status 200')
    })

    it('should return the correct pokemon data when valid id is passed', async () => {
      const sut = new PokemonsRepository()

      const responseMock = {
        data: validPokemonInfo,
        status: 200
      }

      const expected = validPokemonInfo

      sinon.stub(utils, 'makeGetRequest').callsFake(async () => {
        return new Promise(resolve => resolve(responseMock))
      })

      const result = await sut.findById(1)

      expect(result).to.be.deep.equal(expected)
    })

    it('should throw when an id is not passed', async () => {
      const sut = new PokemonsRepository()

      const responseMock = {
        data: {},
        status: 200
      }

      sinon.stub(utils, 'makeGetRequest').callsFake(async () => {
        return new Promise(resolve => resolve(responseMock))
      })

      const result = sut.findById()

      await expect(result).to.be.eventually.rejectedWith('An id must be informed')
    })

    it('should throw when an id is less than or equal to zero', async () => {
      const sut = new PokemonsRepository()

      const responseMock = {
        data: {},
        status: 200
      }

      sinon.stub(utils, 'makeGetRequest').callsFake(async () => {
        return new Promise(resolve => resolve(responseMock))
      })

      const result = sut.findById(0)
      const result2 = sut.findById(-1)

      await expect(result).to.be.eventually.rejectedWith('An id must be greater than zero')
      await expect(result2).to.be.eventually.rejectedWith('An id must be greater than zero')
    })

  })

})