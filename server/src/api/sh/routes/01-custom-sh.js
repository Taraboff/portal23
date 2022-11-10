module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/sh',
      handler: 'sh.index',
      config: {
        auth: false,
      },
    },
  ],
}
