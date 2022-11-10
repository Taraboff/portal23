module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/contacts/confirm/:id',
      handler: 'contact.confirmContact',
    },
  ],
}
