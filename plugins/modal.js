export default (context, inject) => {
  const dialog = {
    open: (options) => {
      window.$nuxt.$emit('dialog', { ...options, open: true })
    },
    close: (options) => {
      window.$nuxt.$emit('dialog', { ...options, open: false })
    },
  }
  inject('dialog', dialog)
}
