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
        course: {
            course_code: null,
            course_title: null,
            level: null,
            semester: null
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