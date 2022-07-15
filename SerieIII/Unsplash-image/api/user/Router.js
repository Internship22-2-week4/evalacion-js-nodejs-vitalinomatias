class UserRouter {
  constructor (router, controller, response, httpCode, createUserValidation) {
    this._router = router() // instancia del enrutador de express
    this._ctrl = controller
    this._response = response
    this._httpCode = httpCode
    this._checkUser = createUserValidation
    this.registerRoutes()
  }

  registerRoutes () {
    this._router.post('/signup', this._checkUser, this.handleSignUp.bind(this))
  }

  async handleSignUp (req, res) {
    try {
      const result = await this._ctrl.createNewUser(req.body)
      this._response.success(req, res, result, 201)
    } catch (error) {
      this._response.success(req, res, error, this._httpCode.OK)
    }
  }

  async handlePutUser (req, res) {
    try {
      const user = req.body
      const result = await this._ctrl.updateUser(user)
      this._response.success(req, res, result, this._httpCode.OK)
    } catch (error) {
      this._response.success(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }
}

export default UserRouter
