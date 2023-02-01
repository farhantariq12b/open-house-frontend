import { PluginService } from ".";

const propertyService = PluginService("/");

class PropertyService {
  static getProperties(params) {
    return propertyService({
      method: 'GET',
      url: 'properties',
      params
    })
  }
  static getPropertyById(id) {
    return propertyService({
      method: 'GET',
      url: `property/${id}`,
    })
  }

  static registerProperty(data) {
    return propertyService({
      method: 'POST',
      url: `property`,
      data
    })
  }

  static updateProperty(id, data) {
    return propertyService({
      method: 'PUT',
      url: `property/${id}`,
      data
    })
  }
}

export default PropertyService;