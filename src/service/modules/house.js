import { PluginService } from ".";

const houseService = PluginService("/");

class HouseService {
  static updateHouse(id, userIds) {
    return houseService({
      method: 'PUT',
      url: `enroll-user/${id}`,
      data: {
        userIds
      }
    })
  }

}

export default HouseService