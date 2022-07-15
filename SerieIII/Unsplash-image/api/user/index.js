import UserRouter from './Router.js'
import UserController from './Controller.js'
import User from '../../entity/User.js'
import { helpers } from '../../lib/helpers.js'
import { HttpCode } from '../../response/httpCode.js'
import { response } from '../../response/response.js'
import { validateCreateUser } from './validate.js'

import { DBMongo } from '../../store/DBMongo.js'

export const userModule = (expressRouter) => {
  const userServices = new DBMongo()
  const userController = new UserController(userServices, User, helpers.encryptPassword)
  const userRouter = new UserRouter(expressRouter, userController, response, HttpCode, validateCreateUser)
  return userRouter._router
}
