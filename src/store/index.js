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
        id: null
      },
      mapSettings: {
        colors: [],
        visibility: []
      },
      summary: []
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
    setSummaryList(state, list) {
      state.summary = [...list]
    },
    addSummary(state, summary) {
      state.summary.push(summary)
    },
    setRouteId(state, id) {
      state.optimalRoute.id = id
    },
    setColors(state, colors) {
      state.mapSettings.colors = [...colors]
    },
    setRouteVisibility(state, list) {
      state.mapSettings.visibility = [...list]
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
        const { _id, route, date } = payload.data
        const decodedRoute = JSON.parse(route)
        // const decodedRoute = route.map(r =>
        //   r.map(point => JSON.parse(point))
        // )

        commit('setOptimalRoute', _id)
        commit('setOptimalRoute', decodedRoute)
        dispatch('generateColors')

        const visibilityList = new Array(decodedRoute.length).fill(true)
        commit('setRouteVisibility', visibilityList)
        return _id
      } else {
        return null
      }
    },
    clearOptimalRoute({ commit }) {
      commit('setOptimalRoute', [])
      commit('setRouteId', null)
      commit('setSummaryList', [])
    },
    updateRouteMeta({ commit }, summary) {
      commit('addSummary', summary)
    },

    generateColors: ({ state, commit }) => {
      const amount = state.optimalRoute.route.length
      const diff = 360 / amount
      const hueList = []

      for (let i = 0; i < amount; i++) {
        hueList.push(i * diff)
      }

      commit('setColors', hueList)
    },
    clearMapSetting({ commit }) {
      commit('setColors', [])
      commit('setRouteVisibility', [])
    },
    updateRouteVisibility({ state, commit }, { index, newValue }) {
      const visibility = state.mapSettings.visibility.map((value, idx) => {
        return index === idx ? newValue : value
      })
      commit('setRouteVisibility', visibility)
    }

  },
  getters: {
    getRouteMetaData: (state) =>
      state.optimalRoute.route.map((route, index) =>
        ({
          hue: state.mapSettings.colors[index],
          visibility: state.mapSettings.visibility[index],
          summary: state.summary.find(summary => summary.index === index),
          route,
          index
        })
      )
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
