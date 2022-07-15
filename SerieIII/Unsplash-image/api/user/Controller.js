class UserController {
  constructor (serviceUser, user, hashPassword) {
    this._service = serviceUser
    this._entity = user
    this._hashPassword = hashPassword
  }

  async createNewUser (user) {
    if (user.username && user.email && user.password) {
      const newUser = new this._entity(user)
      newUser.encryptPassword(user.password, this._hashPassword)
      const response = await this._service.save('users', newUser)
      return response
    } else {
      throw new Error('Missing parameter')
    }
  }
}

export default UserController
