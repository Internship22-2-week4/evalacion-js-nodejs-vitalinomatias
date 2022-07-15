import bcrypt from 'bcrypt'
import expressValidation from 'express-validator'
import { response } from '../response/response.js'

import jwt from 'jsonwebtoken'
import { config } from '../config/default.js'

export const helpers = {
  encryptPassword: (password) => {
    return bcrypt.hashSync(password, 10)
  },

  comparePassword: (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword)
  },

  generateToken: (idUser) => {
    return jwt.sign({
      id: idUser
    }, config.jwt.secret, {
      // expiresIn: '5Minutes'
      expiresIn: '10Minutes'
    })
  },
  verifyToken: (token) => {
    return jwt.verify(token, config.jwt.secret)
  },
  validateResult: (req, res, next) => {
    try {
      expressValidation.validationResult(req.throw)
      return next()
    } catch (error) {
      response.error(req, res, error.array()[0].msg, 400)
    }
  }
}
