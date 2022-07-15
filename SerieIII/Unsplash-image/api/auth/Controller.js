
export default class AuthController {
  constructor (authServices, entity, comparePassword, generateToken) {
    this._services = authServices
    this._entity = entity
    this._comparePassword = comparePassword
    this._generateToken = generateToken
  }

  async authenticationUser (user) {
    try {
      let result = await this._services.findByAtribute('users', '_email', user.email)
      result = result[0]
      console.log(result)
      if (result !== null) {
        const resultComparePassword = this._comparePassword(user.password, result._password)
        if (resultComparePassword) {
          const tokenUser = this._generateToken(result._id, result._idRole)
          console.log(tokenUser)
          console.log(result)
          return new this._entity({
            state: true,
            username: result._username,
            email: result._email,
            token: tokenUser,
            message: 'Login successful'
          })
        } else {
          return new this._entity({
            state: false,
            username: '',
            email: '',
            token: '',
            message: 'Sus credenciales son incorrectos'
          })
        }
      } else {
        return new this._entity({
          state: false,
          username: '',
          email: '',
          token: '',
          message: 'Sus credenciales son incorrectos'
        })
      }
    } catch (error) {
      return new Error(error)
    }
  }
}
