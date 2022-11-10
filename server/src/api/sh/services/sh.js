const { createCoreService } = require('@strapi/strapi').factories

module.exports = createCoreService('api::sh.sh', ({ strapi }) => ({
  // Method 1: Creating an entirely new custom service
  async index(...args) {
    let response = { okay: true }

    if (response.okay === false) {
      return { response, error: true }
    }

    return response
  },
}))
