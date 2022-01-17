import { afterEach, describe, it } from "mocha";
import { expect } from "chai";
import sinon from 'sinon'

import utils from '../../src/utils/utils.js'

describe('Utils Suite Tests', () => {
  
  afterEach(() => {
    sinon.restore()
  })

  describe('getThreeUniqueRandomIds', () => {

    it('should throw when max is less than three', () => {
      const sut = utils.getThreeUniqueRandomIds
      
      expect(() => sut(2)).to.throws('Max must be greater or equal to three')
    })

    it('should throw when max is not a number', () => {
      const sut = utils.getThreeUniqueRandomIds
      
      expect(() => sut('2')).to.throws('Max must be a number')
    })

    it('should return the ascending array of ids when max is valid', () => {
      const sut = utils.getThreeUniqueRandomIds

      const expected = [1, 2, 3]
      const max = 3

      const randomStub = sinon.stub(Math, 'random')

      randomStub.onFirstCall().returns(0.9)
      randomStub.onSecondCall().returns(0.5)
      randomStub.onThirdCall().returns(0)

      const result = sut(max)

      expect(result.length).to.be.equal(3)
      expect(result).to.be.deep.equal(expected)
    })

  })

})