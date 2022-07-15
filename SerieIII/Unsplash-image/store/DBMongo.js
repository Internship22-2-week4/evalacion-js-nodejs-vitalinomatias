import mongoose from 'mongoose'
import { config } from '../config/default.js'
import { models } from './ModelsMongo.js'

export class DBMongo {
  constructor () {
    this.mongodb()
    this._models = models
  }

  async mongodb () {
    try {
      const db = await mongoose.connect(config.dbMongo.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      console.log(`MongoDB connected: ${db.connection.host}`)
    } catch (error) {
      console.log(error)
    }
  }

  async save (model, data) {
    // console.log(model)
    try {
      const newModel = this._models[model](data)
      const res = await newModel.save()
      console.log(res)
      return 'Guardado exitosamente'
    } catch (error) {
      return 'Fallo la creacion'
    }
  }

  async all (model) {
    try {
      const result = await this._models[model].find({ _status: '1' })
      if (Object.keys(result).length > 0) {
        return result
      }
      return 'No hay coincidencias'
    } catch (error) {
      console.log(error)
      return 'No hay coincidencias'
    }
  }

  async delete (model, id) {
    try {
      const result = await this._models[model].findByIdAndUpdate(id, { _status: '0' })
      if (result) {
        console.log(result)
        return 'Eliminación exitosa'
      }
      return 'Eliminacion fallida'
    } catch (error) {
      console.log(error)
      return 'Eliminacion fallida'
    }
  }

  async deleteOneSong (model, id) {
    try {
      const result = await this._models[model].findByIdAndDelete(id)
      if (result) {
        console.log(result)
        return 'Eliminacion exitosa'
      }
      return 'Eliminacion fallida'
    } catch (error) {
      console.log(error)
      return 'Eliminacion fallida'
    }
  }

  async update (model, data) {
    try {
      const result = await this._models[model].findByIdAndUpdate(data._id, data)
      if (result) {
        console.log(result)
        console.log('if')
        return 'Actualizacion exitosa'
      }
      return 'Actualizacion fallida'
    } catch (error) {
      return 'Actualizacion fallida'
    }
  }

  async findByAtribute (model, atribute, value) {
    try {
      const result = await this._models[model].find().where(atribute).all(value)
      if (result.length > 0) {
        return result
      }
      return 'No hay coincidencias'
    } catch (error) {
      return 'No hay coincidencias'
    }
  }

  async allCollection (model, idUser) {
    try {
      const result = await this._models[model].find({ _id: idUser })
      if (Object.keys(result).length > 0) {
        return result
      }
      return 'No hay coincidencias'
    } catch (error) {
      console.log(error)
      return 'No hay coincidencias'
    }
  }
}
