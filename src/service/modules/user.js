import { PluginService } from ".";

const userService = PluginService("/");

class UserService {
  static getUsers() {
    return userService({
      method: 'Get',
      url: 'users'
    })
  }
}

export default UserService;