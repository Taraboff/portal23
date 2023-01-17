<template>
  <client-only>
    <nav class="flex items-center justify-between py-4">
      <div class="flex">
        <img src="/logoshch_red.png" class="m-auto mainlogo" alt="" />
      </div>
      <ul class="flex items-center">
        <li>
          <nuxt-link
            tag="a"
            to="/"
            active-class="font-bold text-slate-500"
            exact
            no-prefetch
            class="px-4"
            >Главная</nuxt-link
          >
        </li>
        <li>
          <nuxt-link
            tag="a"
            to="/rors"
            active-class="font-bold text-gray-500"
            exact
            no-prefetch
            class="px-4"
            >Справочник РОРС</nuxt-link
          >
        </li>

        <li>
          <nuxt-link
            v-if="!$auth.loggedIn"
            class="px-4"
            active-class="font-bold text-gray-500"
            exact
            to="/login"
            >Вход</nuxt-link
          >
        </li>

        <li class="pl-6 pr-2" v-if="$auth.loggedIn">
          {{ loggedInUser.username }}
        </li>
        <li class="pl-1 pr-4">
          <a
            v-if="$auth.loggedIn"
            href="/logout"
            @click.prevent="userLogout"
            class="hover:text-gray-500"
            >Выйти</a
          >
        </li>
      </ul>
    </nav>
  </client-only>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  data: () => ({}),
  methods: {
    ...mapMutations(['setUserRole']),

    async userLogout() {
      await this.$auth.logout()
      this.$router.push('/')
    },
  },

  computed: {
    ...mapGetters(['loggedInUser', 'isAuthenticated']),
  },
  async mounted() {
    if (this.$auth.user) {
      // если токен авторизации действителен
      const response = await this.$axios('/api/users/me?populate=role')
      const userRole = response.data.role.type
      this.setUserRole(userRole)
    }
  },
}
</script>

<style scoped>
.mainlogo {
  width: 200px;
  margin: 5px 55px 0 15px;
}
</style>
