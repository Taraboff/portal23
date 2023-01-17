export const state = () => ({})

export const mutations = {
  setUserRole(state, role) {
    state.auth.user.role = role
  },
}

export const actions = {
  async getUserRole({ commit, state }) {
    const response = await this.$axios.$get('api/users/me?populate=role')
    const userRole = response.role.type
    commit('setUserRole', userRole)
  },
}

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  },
}
