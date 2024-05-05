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
      mapSettings: {
        colors: []
      }
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
    },
    setColors(state, colors) {
      state.mapSettings.colors = colors
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


    async getOptimalRoute({ dispatch }, { id }) {
      const response = await api.getOptimalRoute(id)
      dispatch('updateRouteData', response)
    },
    async optimizeRoute({ state, dispatch }) {
      if (state.inputPoints.length > 0) {
        const response = await api.optimizeRoute(state.inputPoints)
        dispatch('updateRouteData', response)
        return response.data?._id || null
      }
    },
    updateRouteData({ commit, dispatch }, payload) {
      if (payload.success) {
        const { _id, route, datetime } = payload.data
        commit('setOptimalRoute', _id)
        commit('setOptimalRoute', JSON.parse(route))
        dispatch('generateColors')
        return _id
      } else {
        return null
      }
    },
    clearOptimalRoute({ commit }) {
      commit('setOptimalRoute', [])
      commit('setRouteTime', 0)
      commit('setRouteLength', 0)
      commit('setRouteId', null)
    },
    updateRouteMeta({ commit }, summary) {
      commit('setRouteTime', summary.totalTime)
      commit('setRouteLength', summary.totalDistance)
    },

    generateColors: ({ state, commit }) => {
      const amount = state.optimalRoute.route.length
      const diff = 360 / amount
      const hueList = []

      for (let i = 0; i < amount; i++) {
        hueList.push(i * diff)
      }

      commit('setColors', hueList)
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
