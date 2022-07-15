class CollectionController {
  constructor (serviceCollection, collection) {
    this._service = serviceCollection
    this._entity = collection
  }

  async createNewCollection (collection) {
    const newCollection = new this._entity(collection)
    const response = await this._service.save('collection', newCollection)
    return response
  }

  async getAllPhotoCollection (idUser) {
    // console.log(idUser)
    const response = await this._service.allCollection('photo', idUser)
    return response
  }
}

export default CollectionController
