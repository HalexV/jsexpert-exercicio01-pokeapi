'use strict';

import https from 'https'

const makeGetRequest = async function (url) {
  
  const { hostname, pathname } = new URL(url)

  const options = {
    hostname,
    path: pathname,
  }

  return new Promise((resolve, reject) => {
    const request = https.request(options, (response) => {
      let data = ''
      const status = response.statusCode
      

      response.on('data', (chunk) => {
        data += chunk
      });

      response.on('end', () => {
        resolve({
          data: JSON.parse(data),
          status,
        })
      })

      response.on('error', (error) => {
        reject(error)
      })

    })

    request.on('error', (error) => {
      reject(error)
    })

    request.end()
  }) 
  
}

const getThreeUniqueRandomIds = function (max) {
  if(typeof max !== 'number') throw new Error('Max must be a number')
  if(max < 3) throw new Error('Max must be greater or equal to three')
  
  const idsArray = []

  while(idsArray.length < 3) {
    const id = Math.ceil(Math.random() * max)

    if(!idsArray.includes(id)) idsArray.push(id)
  }

  return idsArray
}

export default {
  makeGetRequest,
  getThreeUniqueRandomIds
}