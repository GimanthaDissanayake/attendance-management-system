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
        selectedDate: null,
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
        },
        student: {
            registration_no:null,
            name:null,
            level: null,
            mentor_name: null,
            mentor_id: null,
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
        getStudent: state => {
            return state.student;
        },
        getSelectedDate: state => {
            return state.selectedDate;
        },
        getMahapola: state => {
            return state.mahapola;
        },
        getTime: state => {
            return state.time;
        },
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
        setStudent: (state, payload) => {
            state.student = payload;
        },
        setMahapola: (state,payload) => {
            state.mahapola = payload;
        },
        setSelectedDate: (state,payload) => {
            state.selectedDate = payload;
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