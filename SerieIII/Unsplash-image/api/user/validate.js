import { response } from '../../response/response.js'
import expressValidation from 'express-validator'

const check = expressValidation.check
const validationResult = expressValidation.validationResult
export const validateCreateUser = [
  check('username')
    .exists()
    .isLength({ min: 3 })
    .withMessage('Name should be atleast 3 characters'),
  check('email')
    .exists()
    .isEmail()
    .withMessage('Please enter  valid email'),
  check('password')
    .exists()
    .isLength({ min: 8 })
    // .isUppercase()
    // .isNumeric({ min: 1 })
    .withMessage('Password debe tener al menos 8 caracteres'),
  (req, res, next) => {
    try {
      validationResult(req).throw()
      next()
    } catch (error) {
      response.error(req, res, error.array()[0].msg, 400)
    }
  }
]
