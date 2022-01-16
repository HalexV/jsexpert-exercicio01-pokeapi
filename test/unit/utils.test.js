import { describe, it } from "mocha";
import { expect } from "chai";

import utils from '../../src/utils/utils.js'

describe('Utils Suite Tests', () => {
  
  describe('getThreeUniqueRandomIds', () => {

    it('should throw when max is less than three', () => {
      const sut = utils.getThreeUniqueRandomIds
      
      expect(() => sut(2)).to.throws('Max must be greater or equal to three')
    })

  })

})