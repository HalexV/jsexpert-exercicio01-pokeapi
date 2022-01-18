'use strict';
import { describe, it } from 'mocha'
import { expect } from 'chai'
import supertest from 'supertest'

const request = supertest

import app from '../../src/app.js'

describe('Team Route', () => {
  it('should return 200 when the team route is called', async () => {
    const response = await request(app).get('/team')

    const data = response.body

    expect(response.status).to.be.equal(200)
    expect(data).to.be.an('array')
    expect(data.length).to.be.equal(3)
    
    for(let index = 0; index < 3; index++) {
      expect(data[index]).to.be.an('object')
      expect(data[index]).to.have.property('name')
      expect(data[index]).to.have.property('moves')

      expect(data[index].name).to.be.a('string')
      expect(data[index].moves).to.be.an('array')
    }

  })
})
