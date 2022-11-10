'use strict'

/**
 * contact controller
 */

const { createCoreController } = require('@strapi/strapi').factories

module.exports = createCoreController('api::contact.contact', ({ strapi }) => ({
  confirmContact: async (ctx, next) => {
    const { id } = ctx.request.params
    const user = ctx.state.user

    // using the entityService to get content from strapi
    // entityService provides a few CRUD operations we can use
    // we'll be using findOne to get an order by id
    const contact = await strapi.entityService.findOne(
      'api::contact.contact',
      id
    )
    console.log(contact)
    return id
  },
  create: async (ctx, next) => {
    // get user from context
    // const user = ctx.state.user
    // get request body data from context
    const { rorsContact } = ctx.request.body
    console.log(ctx.request.body)
    // use the create method from Strapi enitityService
    //const response = await super.create(ctx);
    const contact = await strapi.entityService.create(
      'api::contact.contact',
      rorsContact
    )

    return contact
  },
}))
