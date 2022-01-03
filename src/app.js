'use strict';
import http from 'http'

import { RootController } from './controllers/root-controller.js'

const rootController = new RootController()

const requestListener = async (request, response) => {
  
  const routes = {
    default: rootController.handle
  }

  const executeRoute = routes['default'] || undefined

  return await executeRoute(request, response)
  
}

const app = http.createServer(requestListener)

export default app