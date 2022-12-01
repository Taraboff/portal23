'use strict'

/**
 * contact controller
 */

const { createCoreController } = require('@strapi/strapi').factories

module.exports = createCoreController('api::contact.contact', ({ strapi }) => ({
  confirmContact: async (ctx, next) => {
    const { id } = JSON.parse(ctx.request.body)
    const user = ctx.state.user
    console.log(id)
    // using the entityService to get content from strapi
    // entityService provides a few CRUD operations we can use
    // we'll be using findOne to get an order by id
    const contact = await strapi.entityService.findOne(
      'api::contact.contact',
      id
    )
    return JSON.stringify(contact)
  },
  create: async (ctx, next) => {
    // get user from context
    // const user = ctx.state.user
    const contact = JSON.parse(ctx.request.body)
    const response = await strapi.entityService.create(
      'api::contact.contact',
      contact
    )

    const result = await JSON.stringify(response)
    return { data: result }
  },
  update: async (ctx, next) => {
    const id = ctx.params.id
    const contact = JSON.parse(ctx.request.body)

    const response = await strapi.entityService.update(
      'api::contact.contact',
      id,
      contact
    )

    return JSON.stringify({ data: response })
  },
}))
