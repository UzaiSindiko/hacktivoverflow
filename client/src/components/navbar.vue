<template>
  <nav class="nav-container d-flex align-items-center justify-content-between">
    <i style="cursor: pointer;" class="fab fa-stack-overflow"></i>
    <input class="search" type="search" name="" id="" placeholder="Search....">
    <div @click="changePage('/myaccount/myquestion')" class="d-flex align-items-center">
      <img v-if="isLogin" style="cursor: pointer;" class="profile-pic" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTHYycoKHHxwYLX9EFrpx-xxmyGIH3A6HUgnKza8HlCo0F6Sw8r" alt="">
      <button v-if="isLogin" class="btn btn-dark">My Account</button>
      <i v-if="isLogin" @click="logout" style="cursor: pointer;" class="text-secondary fas fa-sign-out-alt"></i>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'navbar',
  computed: {
    ...mapState(['isLogin'])
  },
  methods:{
    changePage(link){
      this.$router.push(link)
    },
    logout(){
      this.$store.dispatch('LOGOUT')
    }
  }

}
</script>

<style scoped>
.nav-container{
  height: 10vh;
  padding: 0 15px;
  box-shadow: -1px 5px 5px -5px rgba(0,0,0,0.34);
  border-top: 3px solid #F48024;
}

input{
  padding:5px  10px;
}

.profile-pic{
  width: 35px;
  border-radius: 50%;
  margin: 0 10px;
}

.search{
  width: 50%;
  border: 1px solid rgb(190, 190, 190);
}

i{
  font-size: 30px;
  padding: 0 10px;
}


</style>