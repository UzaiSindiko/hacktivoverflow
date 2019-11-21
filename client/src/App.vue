<template>
  <div id="app">
      <navbar />
      <div class="d-flex">
        <sidebar />
        <router-view/>
      </div>
  </div>
</template>


<script>
import navbar from './components/navbar'
import sidebar from './components/sidebar'

export default {
  components: {
    navbar,
    sidebar
  },
  created(){
    if(localStorage.getItem('token')){
      this.$store.dispatch('IS_LOGIN')
    }
  }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
