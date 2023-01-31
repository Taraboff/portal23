<template>
  <div class="sticky top-[100vh]">
    <div class="flex justify-center pb-6 pt-20 mx-8">
      <ul v-if="true">
        <li class="text-xs">
          Сервер Петропавловской дистанции сигнализации и связи, версия:
          {{ version }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({}),
  computed: {
    version() {
      return this.$config.appVersion
    },
  },
}
</script>
