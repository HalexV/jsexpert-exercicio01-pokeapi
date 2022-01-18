'use strict';

export const adaptRoute = (controller) => {
  return async (request, response) => {
    const httpRequest = {
      body: {}
    }
    
    const httpResponse = await controller.handle(httpRequest)
    
    if (httpResponse.statusCode === 200) {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      return response.end(JSON.stringify(httpResponse.body))
    } else {
      response.writeHead(httpResponse.statusCode, { 'Content-Type': 'application/json' });
      return response.end(JSON.stringify({
        error: httpResponse.body.message
      }))
    }
  }
}
