'use strict';
import http from 'http'

import { RootController } from './controllers/root-controller.js'

import { PokemonsRepository } from './repositories/pokemonsRepository.js'
import { GetRandomPokemonTeamService } from './services/getRandomPokemonTeamService.js'
import { GetRandomPokemonTeamController } from './controllers/getRandomPokemonTeamController.js';

import { adaptRoute } from './adapters/node/node-route-adapter.js';

const rootController = new RootController()

const pokemonsRepository = new PokemonsRepository()
const getRandomPokemonTeamService = new GetRandomPokemonTeamService({ pokemonsRepository })
const getRandomPokemonTeamController = new GetRandomPokemonTeamController({ getRandomPokemonTeamService })

const requestListener = async (request, response) => {

  const { url, method } = request

  const resource = `${method}:${url}`.toLowerCase()
  
  const routes = {
    default: adaptRoute(rootController),
    'get:/team': adaptRoute(getRandomPokemonTeamController)
  }

  const executeRoute = routes[resource] || routes['default']

  return await executeRoute(request, response)
  
}

const app = http.createServer(requestListener)

export default app