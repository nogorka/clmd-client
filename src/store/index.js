import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      currentLocation: {
        lat: 0,
        long: 0
      },
      inputPoints: [],
      optimalRoute: {
        route: [],
        length: 0,
        time: 0,
        id: null,
      },
      loading: false
    }
  },
  mutations: {
    setCurrentLocation(state, { lat, long }) {
      state.currentLocation.long = long
      state.currentLocation.lat = lat
    },
    setInputPoints(state, points) {
      state.inputPoints = [...points]
    },
    setOptimalRoute(state, route) {
      state.optimalRoute.route = [...route]
    },
    setRouteTime(state, time) {
      state.optimalRoute.time = time
    },
    setRouteLength(state, length) {
      state.optimalRoute.length = length
    }
  },
  actions: {
    updateCurrentLocation({ commit }, payload) {
      commit('setCurrentLocation', payload)
    },
    getLocation({ dispatch }) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords
          dispatch('updateCurrentLocation', { lat: latitude, long: longitude })
        }, showError)
      } else {
        alert('Geolocation is not supported by this browser.')
      }
    },

    updateInputPoints({ commit }, points) {
      commit('setInputPoints', points)
    },

    async optimizeRoute({ state, commit }) {
      state.loading = true
      // TODO: fetch points to server and receive optimal route
      const data = state.inputPoints.toSorted((a, b) => a.id - b.id)
      setTimeout(() => {
        commit('setOptimalRoute', data)
        state.loading = false
      }, 1000)
    },
    clearRoute({ commit }) {
      commit('setOptimalRoute', [])
    },
    updateRouteInfo({commit}, summary) {
      commit('setRouteTime', summary.totalTime )
      commit('setRouteLength', summary.totalDistance )
    }
  }
})

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert('User denied the request for Geolocation.')
      break
    case error.POSITION_UNAVAILABLE:
      alert('Location information is unavailable.')
      break
    case error.TIMEOUT:
      alert('The request to get user location timed out.')
      break
    case error.UNKNOWN_ERROR:
      alert('An unknown error occurred.')
      break
  }
}

export default store
