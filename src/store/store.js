import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: {
            name: null,
            username: null,
            is_logged: false,
            role: null
        },
        token: null,
        mahapola: 'no',
        course: {
            co_id:null,
            type:null,
            course_code: null,
            course_title: null,
            level: null,
            semester: null,
            percentage: null
        }
    },
    getters: {
        getToken: state => {
            return state.token;
        },
        getUser: state => {
            return state.user;
        },
        getCourse: state => {
            return state.course;
        },
        getMahapola: state => {
            return state.mahapola;
        }
    },
    mutations: {
        setToken: (state, payload) => {
            state.token = payload;
        },
        setUser: (state, payload) => {
            state.user = payload;
        },
        setCourse: (state, payload) => {
            state.course = payload;
        },
        setMahapola: (state,payload) => {
            state.mahapola = payload;
        },
        removeToken: state => {
            state.token = null;
            state.user = {
                username: null,
                is_logged: false,
                role: null
            };
        }
    },
    plugins: [createPersistedState()]
});