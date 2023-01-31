export const state = () => ({
  userRole: 'public',
})

export const mutations = {
  setUserRole(state, role) {
    state.userRole = role
  },
}

export const actions = {
  async fetchAndSaveUserRole({ commit, state }) {
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

  getUserRole(state) {
    return state.userRole
  },
}
