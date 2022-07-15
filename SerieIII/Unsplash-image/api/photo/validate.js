import { response } from '../../response/response.js'
import expressValidation from 'express-validator'

const check = expressValidation.check
const validationResult = expressValidation.validationResult
export const validateCreate = [
  check('name')
    .exists()
    .not()
    .isEmpty()
    .withMessage('debe existir un nombre'),
  check('uri')
    .exists()
    .not()
    .isEmpty()
    .withMessage('debe existir una diireccion '),
  check('etiqueta')
    .exists()
    .not()
    .isEmpty()
    .withMessage('debe existir una etiqueta '),
  check('idColeccion')
    .exists()
    .not()
    .isEmpty()
    .withMessage('Debe existir una coleccion'),
  (req, res, next) => {
    try {
      validationResult(req).throw()
      next()
    } catch (error) {
      console.log(error.array)
      response.error(req, res, error.array()[0].msg, 400)
    }
  }
]
