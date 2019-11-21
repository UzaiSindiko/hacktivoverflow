<template>
  <div class="home">
    <div class="header d-flex justify-content-between align-items-center">
      <h3>My Answer</h3>
      <button @click="changePage('/createquestion')" class="btn btn-primary">Ask Questions</button>
    </div>
    
    <div class="mt-5">
      <Qcard />
      <Qcard />
      <Qcard />
    </div>
  </div>
</template>

<script>
import Qcard from './Qcard'

export default {
  name: 'home',
  components: {
    Qcard
  },
  methods: {
    changePage(link){
      this.$router.push(link)
    }
  }
}
</script>

<style scoped>
.home{
  width: 100%;
  padding: 20px;
}

h3{
 text-align: left;
 margin: 10px 20px;
}

</style>