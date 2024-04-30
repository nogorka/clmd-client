import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      currentLocation: {
        lat: 0,
        long: 0
      },
      inputPoints: [],
      optimalRoute: []
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
      state.optimalRoute = [...route]
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
      // TODO: fetch points to server and receive optimal route
      const data = state.inputPoints.toSorted((a, b) => a.id - b.id)

      commit('setOptimalRoute', data)
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
