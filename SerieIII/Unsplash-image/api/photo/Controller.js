class PhotoController {
  constructor (servicePhoto, photo) {
    this._service = servicePhoto
    this._entity = photo
  }

  async createNewPhoto (photo) {
    const newPhoto = new this._entity(photo)
    const response = await this._service.save('photo', newPhoto)
    return response
  }

  async updatePhoto (photo) {
    const response = await this._service.update('photo', photo)
    return response
  }

  async deletePhoto (id) {
    const response = await this._service.delete('photo', id)
    return response
  }

  async getOnePhoto (atribute, value) {
    const response = await this._service.findByAtribute('photo', atribute, value)
    return response
  }

  async getAllPhoto () {
    const response = await this._service.all('photo')
    return response
  }

  async getPhotoRecent () {
    const response = await this._service.getPhotoRecent('photo')
    return response
  }
}

export default PhotoController
