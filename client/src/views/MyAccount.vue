<template>
  <div class="w-100">
  <nav>
      <div id="account-nav">
          <router-link to="/myaccount/myquestion">My Question</router-link> |
          <router-link to="/myaccount/myanswer">My Answer</router-link>
          <!-- <router-link to="/myaccount/editaccount">Edit account</router-link> -->
      </div>
    <transition appear enter-active-class="animated fadeInUp">
      <router-view/>
    </transition>
  </nav>
  </div>
</template>

<script>

export default {

}
</script>

<style scoped>

nav{
    margin: 30px 0;
    height: 50px;
    width: 100%;
}

#account-nav a {
  font-weight: bold;
  color: rgb(105, 105, 105);
  text-decoration: none;
}

#account-nav a:hover{
  color: #F48024;
}

#account-nav a.router-link-exact-active {
  color: #F48024;
}

</style>
