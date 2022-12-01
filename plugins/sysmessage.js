export default (context, inject) => {
  inject('sysmessage', (msg) => {
    window.$nuxt.$emit('sysmsg', msg)
  })
}
