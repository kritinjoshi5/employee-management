import axios from 'axios'; //HTTP client service

const actions = { // to perform operations for the store
    getAllUsers({commit}) { // Get all users
        commit('setLoading', true)
        axios.get('https://jsonplaceholder.typicode.com/users').then((resp) => {
            if (resp && resp.data) {
                commit('setUsers', resp.data)
                commit('setLoading', false)
            }
        })
    },
    deleteUser({commit}, id) { // Delete user
        commit('setLoading', true)
        axios.delete('https://jsonplaceholder.typicode.com/users/' + id).then(() => {
            commit('setLoading', false)
        })
    },
    updateUser({commit}, user) { // Update user
        commit('setLoading', true)
        axios.put('https://jsonplaceholder.typicode.com/users/' + user.id, user).then(() => {
            commit('setLoading', false)
        })
    },
    addUser({commit}, user) { // save new user
        commit('setLoading', true)
        axios.post('https://jsonplaceholder.typicode.com/users', user).then(() => {
            commit('setLoading', false)
        })
    }
}

const state = { // to locate a specific piece of state
    users: [],
    loading: false
}

const mutations = { // to change state in store
    setUsers(state, users) { // set user value in state
        state.users = users;
    },
    setLoading(state, loading) { // set loading value in state
        state.loading = loading
    }
}

export default {
    "namespaced": true,
    state,
    mutations,
    actions,
}