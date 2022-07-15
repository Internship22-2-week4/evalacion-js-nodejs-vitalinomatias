import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import swaggerUI from 'swagger-ui-express'
import YAML from 'yamljs'

// configuracion de paths
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// importacion de modulos
import { userModule } from './user/index.js'
import { authModule } from './auth/index.js'
import { photoModule } from './photo/index.js'
import { collectionModule } from './collection/index.js'

// esta clase crea el servidor
class Server {
  constructor (config) {
    this._app = express()
    this._port = config.port
    this._hostname = config.hostname
    this._name = config.name
    this._dirname = dirname(fileURLToPath(import.meta.url))
    this._swaggerFile = YAML.load(join(dirname(fileURLToPath(import.meta.url)), '../docs/swagger.yaml'))
    this.setMiddlewares()
    this.setRoutes()
  }

  setMiddlewares () {
    this._app.use(express.json())
    this._app.use(express.urlencoded({ extended: true }))
    this._app.use(cors())
    this._app.use(morgan('dev'))
  }

  // se configuran las rutas raices
  setRoutes () {
    this._app.use('/api/v1/user', userModule(express.Router))
    this._app.use('/api/v1/auth', authModule(express.Router))
    this._app.use('/api/v1/photo', photoModule(express.Router))
    this._app.use('/api/v1/collection', collectionModule(express.Router))
    this._app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(this._swaggerFile))
  }

  start () {
    this._app.set('hostname', this._hostname)
    this._app.listen(this._port, () => {
      console.log(`${this._name} is running on http://${this._hostname}:${this._port}`)
    })
  }
}

export default Server
