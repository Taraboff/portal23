<template>
  <section class="section">
    <div class="container mx-auto mt-12 flex justify-center">
      <div class="columns">
        <div class="column">
          <div class="flex justify-center mb-6">
            <h2 class="font-medium">Вход для зарегистрирванных</h2>
          </div>

          <Notification v-if="error" type="danger" :message="error" />

          <form method="post" @submit.prevent="login">
            <div class="field">
              <label class="block text-sm font-medium text-gray-700"
                >Эл.почта</label
              >
              <div class="control">
                <input
                  v-model="email"
                  type="email"
                  class="mt-2 py-2 block w-full rounded-md border-gray-300 shadow-sm text-sm focus:border-sky-700 focus:ring-sky-700"
                  name="email"
                />
              </div>
            </div>
            <div class="field">
              <label class="mt-3 block text-sm font-medium text-gray-700"
                >Пароль</label
              >
              <div class="control">
                <input
                  v-model="password"
                  type="password"
                  class="mt-2 py-2 block w-full rounded-md border-gray-300 shadow-sm text-sm focus:border-sky-700 focus:ring-sky-700"
                  name="password"
                />
              </div>
            </div>
            <div class="control">
              <button
                type="submit"
                class="mt-2 block mx-auto hover:font-medium"
              >
                Войти
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Notification from '~/components/Notification'
import { mapMutations } from 'vuex'
export default {
  components: {
    Notification,
  },
  auth: 'guest',
  data() {
    return {
      email: '',
      password: '',
      error: null,
    }
  },
  methods: {
    async login() {
      this.error = null
      try {
        await this.$auth.loginWith('local', {
          data: {
            identifier: this.email,
            password: this.password,
          },
        })
        this.$router.push('/')

        const resp = await this.$axios('users/me?populate=role') // перенести в actions
        const userRole = resp.data.role.type
        this.setUserRole(userRole)
        // передать в Store -> isAdmin
      } catch (e) {
        this.error = e.response.data.error.message
      }
    },
    ...mapMutations(['setUserRole']),
  },
}
</script>
