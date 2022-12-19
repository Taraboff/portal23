<template>
  <div class="sticky top-[100vh]">
    <div class="pb-6 mx-8">
      <ul>
        <li class="text-xs">Разработка и поддержка сайта</li>
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
  },
  methods: {
    async userLogout() {
      await this.$auth.logout()
      this.$router.push('/')
    },
  },
}
</script>
