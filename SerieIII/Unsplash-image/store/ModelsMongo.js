import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  _username: { type: String, required: true },
  _email: { type: String, required: true },
  _password: { type: String, required: true },
  _status: { type: String, required: true }
})

const photoSchema = new mongoose.Schema({
  _name: { type: String, required: true },
  _uri: { type: String, required: true },
  _etiqueta: { type: String, required: true },
  _idColeccion: { type: String, required: true },
  _status: { type: String, required: true }
})

const collectionSchema = new mongoose.Schema({
  _name: { type: String, required: true },
  _idUser: { type: String, required: true },
  _status: { type: String, required: true }
})

const userModel = mongoose.model('users', userSchema)
const photoModel = mongoose.model('photo', photoSchema)
const collectionModel = mongoose.model('collection', collectionSchema)

export const models = {
  users: userModel,
  photo: photoModel,
  collection: collectionModel
}
