<template>
  <div class="login-container d-flex justify-content-center align-items-center flex-column">
    <i class="fab fa-stack-overflow"></i>
    <div class="from-container ">
      <form @submit.prevent="action" class="d-flex flex-column align-items-center justify-content-center h-100">
        <h1 v-if="loginFrom">LOGIN</h1>
        <h1 v-if="!loginFrom">REGISTER</h1>
        <input v-model="email" type="text" placeholder="Enter Email">
        <input v-model="password" type="password" placeholder="Enter Password">
        <button v-if="loginFrom" class="btn btn-primary" style="width: 80%;" type="submit">Login</button>
        <button v-if="!loginFrom" class="btn btn-success" style="width: 80%;" type="submit">Register</button>
        <a @click.prevent="changeFrom" href="">
          <span v-if="loginFrom" >Don't have accont? Register</span>
          <span v-else>Already Have Account? Login</span>
        </a>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      loginFrom: true,
      email: '',
      password: ''
    }
  },
  methods: {
    changeFrom(){
      this.loginFrom = !this.loginFrom
    },
    action(){
      if(this.loginFrom){
        this.login()
      } else {
        this.register()
      }
      this.email = '';
      this.password = '';
    },
    login(){
      let email = this.email
      let password = this.password
      this.$store.dispatch('LOGIN', { email, password })
    },
     register(){
       let email = this.email
      let password = this.password
      this.$store.dispatch('REGISTER', { email, password })
    }
  }

}
</script>

<style scoped>
a{
  padding: 10px;
  font-size: 12px;
}

i{
  font-size: 40px;
}

.login-container{
  width: 100%;
  height: 90vh;
  background-color: rgba(239, 240, 241, 1);
}

.from-container{
  width: 400px;
  height: 400px;
  border-radius: 15px;
  background: white;
  box-shadow: 0px 0px 12px 1px rgba(0,0,0,0.22);
  margin: 30px;
}

.from-container form input{ 
  width: 80%;
  padding: 5px 15px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid gray;
}

</style>