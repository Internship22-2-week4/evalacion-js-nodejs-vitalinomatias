import dotenv from 'dotenv'
dotenv.config()

export const config = {
  api: {
    port: process.env.PORT || 8000,
    hostname: process.env.HOSTNAME || 'localhost',
    name: process.env.NAME || 'app'
  },
  db: {
    host: process.env.DB_HOST || 'localhost'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret'
  },
  dbMongo: {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/app'
  }
}
