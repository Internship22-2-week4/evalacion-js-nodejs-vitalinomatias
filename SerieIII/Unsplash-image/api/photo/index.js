import express from 'express'
import PhotoRouter from './Router.js'
import PhotoController from './Controller.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpCode.js'
import Photo from '../../entity/Photo.js'
import { validateCreate } from './validate.js'

import { DBMongo } from '../../store/DBMongo.js'

import { chekToken } from '../secure/secure.js'

export const photoModule = () => {
  const servicesPhoto = new DBMongo()
  const photoController = new PhotoController(servicesPhoto, Photo)
  const photoRouter = new PhotoRouter(express.Router, photoController, response, HttpCode, validateCreate, chekToken)
  return photoRouter._router
}
