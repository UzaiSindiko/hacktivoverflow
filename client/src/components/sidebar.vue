<template>
  <div id="sidebar" class="sidebar-container d-flex flex-column">
      <router-link to="/">Home</router-link>
      <router-link to="/overflow"> <i class="fas fa-globe-asia"></i> Hacktiv Overflow</router-link>
      <router-link class="special" to="/tags"><span class="ml-4">Tags</span></router-link>
      <router-link class="special" to="/users"><span class="ml-4">Users</span></router-link>
      <router-link class="special" to="/jobs"><span class="ml-4">Jobs</span></router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.sidebar-container{
    width: 15%;
    min-height: 90vh;
    padding: 30px 0;
    box-shadow: 10px 0px 5px -8px rgba(0,0,0,0.34);
}

#sidebar {
  padding: 30px 0;
}

#sidebar a {
    width: 100%;
    background-color: white;
    border: none;
    padding: 10px;
    transition: 300ms;
    text-align: left;
    margin: 5px 0;
    font-size: 15px;
    color: black;
}

#sidebar a.router-link-exact-active {
    background-color: rgb(230, 230, 230);  
    border-right: 3px solid #F48024;
}

</style>