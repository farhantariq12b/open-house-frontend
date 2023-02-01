import { PluginService } from ".";

const authService = PluginService("/");

class AuthService {
  static login(data) {
    return authService({
      method: "post",
      url: "/login",
      data,
    });
  }
  static signUp(data) {
    return authService({
      method: "post",
      url: "/signup",
      data,
    });
  }
}

export default AuthService;
