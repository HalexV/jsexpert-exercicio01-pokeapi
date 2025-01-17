import { afterEach, describe, it } from 'mocha'
import sinon from 'sinon'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

import { GetRandomPokemonTeamService } from '../../src/services/getRandomPokemonTeamService.js'

import { validRandomPokemonTeamMock } from '../mocks/valid-random-pokemon-team.js'
import { validRandomPokemonTeamLessMovesMock } from '../mocks/valid-random-pokemon-team-less-moves.js'
import { findByIdResultsMocks } from '../mocks/findById-results.js'
import { findByIdResultsLessMovesMocks } from '../mocks/findById-results-less-moves.js'

import utils from '../../src/utils/utils.js'

chai.use(chaiAsPromised)

const expect = chai.expect


describe('GetRandomPokemonTeamService Suite Tests', () => {

  afterEach(() => {
    sinon.restore()
  })
  
  it('should return a valid random pokemon team when execute is called', async () => {
    const findByIdStub = sinon.stub()
    findByIdStub.onFirstCall().resolves(findByIdResultsMocks[0])
    findByIdStub.onSecondCall().resolves(findByIdResultsMocks[1])
    findByIdStub.onThirdCall().resolves(findByIdResultsMocks[2])
    
    const sut = new GetRandomPokemonTeamService({ pokemonsRepository: {
      findById: findByIdStub
    } })

    const expected = validRandomPokemonTeamMock

    const result = await sut.execute()

    expect(result).to.be.deep.equal(expected)

  })

  it('should return a valid random pokemon team when any pokemon results have less than three moves', async () => {
    const findByIdStub = sinon.stub()
    findByIdStub.onFirstCall().resolves(findByIdResultsLessMovesMocks[0])
    findByIdStub.onSecondCall().resolves(findByIdResultsLessMovesMocks[1])
    findByIdStub.onThirdCall().resolves(findByIdResultsLessMovesMocks[2])
    
    const sut = new GetRandomPokemonTeamService({ pokemonsRepository: {
      findById: findByIdStub
    } })

    const expected = validRandomPokemonTeamLessMovesMock

    const result = await sut.execute()

    expect(result).to.be.deep.equal(expected)
  })

  it('should call getThreeUniqueRandomIds with 493', async () => {
    const findByIdStub = sinon.stub().callsFake(async () => {
      return new Promise(resolve => resolve(
        findByIdResultsMocks[0]
      ))
    })

    const sut = new GetRandomPokemonTeamService({ pokemonsRepository: {
      findById: findByIdStub
    } })

    const getThreeUniqueRandomIdsStub = sinon.stub(utils, 'getThreeUniqueRandomIds').returns([1,2,3])

    await sut.execute()

    expect(getThreeUniqueRandomIdsStub.calledWith(493)).to.be.ok
  })

  it('should throw when getThreeUniqueRandomIds throws', async () => {
    const sut = new GetRandomPokemonTeamService({ pokemonsRepository: {} })

    sinon.stub(utils, 'getThreeUniqueRandomIds').callsFake(() => {throw new Error()})

    const result = sut.execute()

    await expect(result).to.be.eventually.rejected
  })

  it('should call findById with ascending ids array positions', async () => {
    const findByIdStub = sinon.stub().callsFake(async () => {
      return new Promise(resolve => resolve(
        findByIdResultsMocks[0]
      ))
    })

    const sut = new GetRandomPokemonTeamService({ pokemonsRepository: {
      findById: findByIdStub
    } })

    sinon.stub(utils, 'getThreeUniqueRandomIds').returns([1,2,3])

    await sut.execute()

    expect(findByIdStub.callCount).to.be.equal(3)
    expect(findByIdStub.firstCall.calledWith(1)).to.be.ok
    expect(findByIdStub.secondCall.calledWith(2)).to.be.ok
    expect(findByIdStub.thirdCall.calledWith(3)).to.be.ok
  })

  it('should throw when findById throws', async () => {
    const findByIdStub = sinon.stub().callsFake(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })

    const sut = new GetRandomPokemonTeamService({ pokemonsRepository: {
      findById: findByIdStub
    } })

    const result = sut.execute()

    await expect(result).to.be.eventually.rejected
  })

})