import express from 'express'
import CollectionRouter from './Router.js'
import CollectionController from './Controller.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpCode.js'
import Collection from '../../entity/Collection.js'
import { validateCreate } from './validate.js'

import { DBMongo } from '../../store/DBMongo.js'

import { chekToken } from '../secure/secure.js'

export const collectionModule = () => {
  const servicesCollection = new DBMongo()
  const collectionController = new CollectionController(servicesCollection, Collection)
  const collectionRouter = new CollectionRouter(express.Router, collectionController, response, HttpCode, validateCreate, chekToken)
  return collectionRouter._router
}
