'use strict';

class RootController {
  async handle(request, response){
    response.writeHead(200, { 'Content-Type': 'application/json' });
    return response.end(JSON.stringify({data: 'Hello World!'}))
  }
}

export { RootController }