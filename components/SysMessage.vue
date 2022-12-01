<template>
  <div>
    <transition appear name="fade">
      <div v-if="open" class="status" :class="[style]">{{ message }}</div>
    </transition>
  </div>
</template>
<script>
export default {
  data: () => ({
    message: '',
    style: '',
    open: false,
  }),
  methods: {
    showSysMessage(msg) {
      for (let key in msg) {
        this.message = msg[key]
        this.style = key
      }
      this.open = true
      setTimeout(() => {
        this.open = false
      }, 3000)
    },
  },
  mounted() {
    // слушаем событие sysmsg
    this.$nuxt.$on('sysmsg', this.showSysMessage)
  },
}
</script>
<style scoped>
.status {
  @apply fixed top-0 right-0 px-[19px] py-[2px] rounded text-white;
}
.alert {
  @apply bg-red-500;
}
.success {
  @apply bg-green-500;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 5.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
