class PhotoRouter {
  constructor (router, controller, response, httpCode, createValidation, checkToken) {
    this._router = router() // instancia del enrutador de express
    this._ctrl = controller
    this._response = response
    this._httpCode = httpCode
    this._checkPhoto = createValidation
    this._checktoken = checkToken
    this.registerRoutes()
  }

  registerRoutes () {
    this._router.post('/', this._checktoken, this._checkPhoto, this.handlePostPhoto.bind(this))
    this._router.put('/', this._checktoken, this.handlePutPhoto.bind(this))
    this._router.delete('/', this._checktoken, this.handleDeletePhoto.bind(this))
    this._router.get('/', this._checktoken, this.handleGetPhoto.bind(this))
    this._router.get('/recientes', this._checktoken, this.handleGetPhotoRecientes.bind(this))
  }

  async handlePostPhoto (req, res) {
    try {
      const photo = req.body
      const result = await this._ctrl.createNewPhoto(photo)
      this._response.success(req, res, result, this._httpCode.OK)
    } catch (error) {
      this._response.success(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  async handlePutPhoto (req, res) {
    try {
      const photo = req.body
      const result = await this._ctrl.updatePhoto(photo)
      this._response.success(req, res, result, this._httpCode.OK)
    } catch (error) {
      this._response.success(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  async handleDeletePhoto (req, res) {
    try {
      const photo = req.body
      const result = await this._ctrl.deletePhoto(photo._id)
      this._response.success(req, res, result, this._httpCode.OK)
    } catch (error) {
      this._response.success(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  async handleGetPhoto (req, res) {
    if (Object.keys(req.query).length > 0) {
      try {
        const result = await this._ctrl.getOnePhoto('_etiqueta', req.query._etiqueta)
        this._response.success(req, res, result, this._httpCode.OK)
      } catch (error) {
        this._response.success(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
      }
    } else {
      try {
        const result = await this._ctrl.getAllPhoto()
        this._response.success(req, res, result, this._httpCode.OK)
      } catch (error) {
        this._response.success(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
      }
    }
  }

  async handleGetPhotoRecientes (req, res) {
    try {
      const result = await this._ctrl.getPhotoRecent()
      this._response.success(req, res, result, this._httpCode.OK)
    } catch (error) {
      this._response.success(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }
}

export default PhotoRouter
