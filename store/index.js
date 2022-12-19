export const state = () => ({})

export const mutations = {
  setUserRole(state, role) {
    state.auth.user.role = role
  },
}

export const actions = {
  // запрос для получения всех контактов
}

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  },
}
