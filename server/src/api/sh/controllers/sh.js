// const { createCoreController } = require('@strapi/strapi').factories

module.exports = {
  //   // Method 1: Creating an entirely custom action
  //   async exampleAction(ctx) {
  //     try {
  //       ctx.body = 'ok'
  //     } catch (err) {
  //       ctx.body = err
  //     }
  //   },

  async index(ctx, next) {
    // called by GET /hello
    console.log(ctx.request.url)
    ctx.body = 'Hello World!' // we could also send a JSON
    return ctx.body
  },
}
