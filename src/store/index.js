import { createStore } from 'vuex'
import api from '@/http/helper.js'

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
        id: null
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
    },
    setRouteId(state, id) {
      state.optimalRoute.id = id
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
      const response = await api.optimizeRoute(state.inputPoints)

      if (response.success) {
        commit('setOptimalRoute', response.data._id)
        commit('setOptimalRoute', JSON.parse(response.data.route))
        state.loading = false
      } else {
        // TODO: show user a notification with error
        state.loading = false
      }
    },
    clearRoute({ commit }) {
      commit('setOptimalRoute', [])
      commit('setRouteTime', 0)
      commit('setRouteLength', 0)
    },
    updateRouteInfo({ commit }, summary) {
      commit('setRouteTime', summary.totalTime)
      commit('setRouteLength', summary.totalDistance)
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
