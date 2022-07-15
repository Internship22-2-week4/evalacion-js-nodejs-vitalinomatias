class CollectionRouter {
  constructor (router, controller, response, httpCode, createValidation, checkToken) {
    this._router = router() // instancia del enrutador de express
    this._ctrl = controller
    this._response = response
    this._httpCode = httpCode
    this._checkCollection = createValidation
    this._checktoken = checkToken
    this.registerRoutes()
  }

  registerRoutes () {
    this._router.post('/', this._checktoken, this._checkCollection, this.handlePostCollection.bind(this))
    this._router.get('/:idUser/photos', this._checktoken, this.handleGetCollection.bind(this))
  }

  async handlePostCollection (req, res) {
    try {
      const collection = req.body
      const result = await this._ctrl.createNewCollection(collection)
      this._response.success(req, res, result, this._httpCode.OK)
    } catch (error) {
      this._response.success(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  async handleGetCollection (req, res) {
    const user = req.params
    try {
      const result = await this._ctrl.getAllPhotoCollection(user.idUser)
      this._response.success(req, res, result, this._httpCode.OK)
    } catch (error) {
      this._response.success(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }
}

export default CollectionRouter
