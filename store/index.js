export const state = () => ({})

export const mutations = {
  setUserRole(state, role) {
    state.auth.user.role = role
  },
}

export const actions = {
  async getUserRole({ commit, state }) {
    const resp = await this.$axios('users/me?populate=role')
    const userRole = resp.data.role.type
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
