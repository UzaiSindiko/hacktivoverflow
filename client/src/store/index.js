import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../apis/axios'
import router from '../router/index'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    topQuestions: [],
    questions: [],
    myQuestions: [],
    tags: [],
    oneTag: {},
    oneQuestion: {},
    answerByQ: [],
    userId : '',
    oneAns: {},
    
  },
  mutations: {
    login (state, data) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('id', data.id)
      state.isLogin = true
      state.userId =  data.id + ''
    },
    is_login (state) {
      state.isLogin = true
      state.userId = localStorage.getItem('id')
    },
    logout (state) {
      localStorage.removeItem('token')
      state.isLogin = false
    },
    get_top(state, data){
      state.topQuestions = data
    },
    get_q(state, data){
      state.questions = data
    },
    get_tag(state, data){
      state.tags = data
    },
    get_one_q(state, data){
      state.oneQuestion = data
    },
    get_answer_by_q(state, data){
      state.answerByQ = data
    },
    get_one_a(state, data){
      state.oneAns = data
    },
    get_q_by_user(state, data){
      state.myQuestions = data
    },
    get_one_tag(state, data){
      state.oneTag = data
    }
  },
  actions: {
    UNWATCH_TAG(context, id){
      axios({
        method: 'patch',
        url: `/tags/${id}/unwatch`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) =>{
        context.dispatch('GET_ONE_TAG', id)
      })
      .catch(({ response }) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.message
        })
      })
    },
    WATCH_TAG(context, id){
      axios({
        method: 'patch',
        url: `/tags/${id}/watch`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) =>{
        context.dispatch('GET_ONE_TAG', id)
      })
      .catch(({ response }) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.message
        })
      })
    },
    GET_Q_BY_TAG(context, id){
      axios({
        method: 'get',
        url: `/questions/${id}/tag`
      })
      .then(({data}) =>{
        context.commit('get_q', data)
      })
      .catch(({ response }) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.message
        })
      })
    },
    GET_TAG_ALL(context){
      axios({
        method: 'get',
        url: '/tags/all'
      })
      .then(({data}) =>{
        context.commit('get_tag', data)
      })
      .catch(({ response }) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.message
        })
      })
    },
    GET_ONE_TAG(context, id){
      Swal.showLoading()
      return axios({
        method: 'get',
        url: `/tags/${id}`
      })
      .then(({data}) =>{
        Swal.close()
        context.commit('get_one_tag', data)
      })
      .catch(({ response }) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.message
        })
      })
    },
    DELETE_Q(context, id){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          axios({
            method: 'delete',
            url: `/questions/${id}`,
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(({ data }) =>{
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            router.push(`/`)
          })
          .catch(({ response }) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: response.data.message
            })
          })
        }
      })
    },
    UPDATE_Q(context, {question, id}){
      axios({
        method: 'patch',
        url: `/questions/${id}`,
        data: question,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) =>{
        router.push(`/${id}/qna`)
      })
      .catch(({ response }) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.message
        })
      })
    },
    GET_Q_BY_USER(context){
      Swal.showLoading()
      return axios({
        method: 'get',
        url: `/questions/user`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) =>{
        context.commit('get_q_by_user', data)
        Swal.close()
      })
      .catch(({ response }) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.message
        })
      })
    },
    UPDATE_A(context, {title, desc, id}){
      Swal.showLoading()
      return axios({
        method: 'patch',
        url: `/answers/${id}`,
        data: {
          title, desc
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) =>{
        context.commit('get_one_a', data)
        Swal.close()
      })
      .catch(({ response }) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.message
        })
      })
    },
    GET_ONE_A(context, id){
      Swal.showLoading()
      return axios({
        method: 'get',
        url: `/answers/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) =>{
        context.commit('get_one_a', data)
        Swal.close()
      })
      .catch(({ response }) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.message
        })
      })
      
    },
    UP_A(context, { id, questionId, page }){
     return axios({
        method: "patch",
        url: `/answers/${id}/upvote`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(() =>{
        return  context.dispatch('GET_ANSWER_BY_Q', {id: questionId, page})
      })
      .catch(({ response }) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.message
        })
      })
    },
    DOWN_A(context, { id, questionId, page}) {
     return axios({
        method: "patch",
        url: `/answers/${id}/downvote`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(() =>{
         return context.dispatch('GET_ANSWER_BY_Q', {id: questionId, page})
      })
      .catch(({ response }) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.message
        })
      })
    },
    UP_Q(context, id){
      axios({
        method: "patch",
        url: `/questions/${id}/upvote`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(() =>{
          context.dispatch('GET_ONE_Q', id)
      })
      .catch(({ response }) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.message
        })
      })
    },
    DOWN_Q(context, id){
      axios({
        method: "patch",
        url: `/questions/${id}/downvote`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(() =>{
          context.dispatch('GET_ONE_Q', id)
      })
      .catch(({ response }) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.message
        })
      })
    },
    POST_ANS(context, { title, desc, questionId }){
      return axios({
        method: 'post',
        url: '/answers',
        data:  { title, desc, questionId },
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(() =>{
        
      })
      .catch(({ response }) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.message
        })
      })
    },
    GET_ANSWER_BY_Q(context, {id, page}){
     return axios({
        method: 'post',
        url: '/answers/question',
        data: {
          questionId: id,
          page
        }
      })
      .then(({ data }) =>{
        context.commit('get_answer_by_q', data)
      })
      .catch(({ response }) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.message
        })
      })
    },
    GET_ONE_Q(context, id){
      return axios({
        method: 'get',
        url: `/questions/${id}`,
      })
      .then(({ data }) =>{
        context.commit('get_one_q', data)
      })
      .catch(({ response }) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.message
        })
      })
    },
    CREATE_Q(context, question){
      axios({
        method: 'post',
        url: '/questions',
        data: question,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) =>{
        router.push('/overflow')
      })
      .catch(({ response }) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.message
        })
      })
    },
    GET_TAG(context){
      axios({
        method: 'get',
        url: '/tags'
      })
      .then(({data}) =>{
        context.commit('get_tag', data)
      })
      .catch(({ response }) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.message
        })
      })
    },
    GET_TOP(context){
      axios({
        method: 'get',
        url: '/questions/top'
      })
      .then(({data}) =>{
        context.commit('get_top', data)
      })
      .catch(({ response }) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.message
        })
      })
    },
    GET_Q(context){
      axios({
        method: 'get',
        url: '/questions'
      })
      .then(({data}) =>{
        context.commit('get_q', data)
      })
      .catch(({ response }) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.message
        })
      })
    },
    LOGOUT (context) {
      context.commit('logout')
      router.push('/login')
    },
    REGISTER (context, { email, password }) {
      Swal.showLoading()
      return axios({
        method: 'post',
        url: '/users/register',
        data: {
          email,
          password,
        }
      })
        .then(({ data }) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Success Register',
            showConfirmButton: false,
            timer: 1500
          })
          context.commit('login', data)
          router.push('/')
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.message
          })
        })
    },
    IS_LOGIN(context){
      context.commit('is_login')
    },
    LOGIN (context, { email, password }) {
      Swal.showLoading()
      return axios({
        method: 'post',
        url: '/users/login',
        data: {
          email,
          password
        }
      })
        .then(({ data }) => {
          Swal.close()
          context.commit('login', data)
          router.push('/')
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.message
          })
        })
    },
  },
  modules: {
  }
})
