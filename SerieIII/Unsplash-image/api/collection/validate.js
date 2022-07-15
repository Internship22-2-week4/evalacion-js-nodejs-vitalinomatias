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
  check('idUser')
    .exists()
    .not()
    .isEmpty()
    .withMessage('Debe existir una usuario al que le pertenezca la coleccion'),
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
