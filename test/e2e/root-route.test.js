'use strict';
import { describe, it } from 'mocha'
import { expect } from 'chai'
import supertest from 'supertest'

const request = supertest

import app from '../../src/app.js'

describe('Root Route', () => {
  it('should call the root route when a nonexistent route is called', async () => {
    const response = await request(app).get('/nonexistent-route')

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.deep.equal({ data: 'Hello World!' })
  })

  it('should return 200 when the root route is called', async () => {
    const response = await request(app).get('/')

    expect(response.status).to.be.equal(200)
  })
})
