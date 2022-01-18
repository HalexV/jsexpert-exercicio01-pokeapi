'use strict';
import http from 'http'

import { RootController } from './controllers/root-controller.js'
import { adaptRoute } from './adapters/node/node-route-adapter.js';

const rootController = new RootController()

const requestListener = async (request, response) => {

  const { url, method } = request

  const resource = `${method}:${url}`.toLowerCase()
  
  const routes = {
    default: adaptRoute(rootController)
  }

  const executeRoute = routes[resource] || routes['default']

  return await executeRoute(request, response)
  
}

const app = http.createServer(requestListener)

export default app