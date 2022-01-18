'use strict';

class RootController {
  async handle(httpRequest){
    return {
      statusCode: 200,
      body: {
        data: 'Hello World!'
      }
    }
  }
}

export { RootController }