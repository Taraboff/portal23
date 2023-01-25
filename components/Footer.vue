<template>
  <div class="sticky top-[100vh]">
    <div class="flex justify-center pb-6 pt-20 mx-8">
      <ul v-if="true">
        <li class="text-xs">Версия приложения: {{ version }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({}),
  computed: {
    ...mapGetters(['loggedInUser', 'isAuthenticated']),
    version() {
      return this.$config.appVersion
    },
  },
  methods: {
    async userLogout() {
      await this.$auth.logout()
      this.$router.push('/')
    },
  },
}
</script>
