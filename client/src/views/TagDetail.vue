<template>
  <div class="tag-detail-con">
    <div class="header d-flex justify-content-between align-items-center">
      <div class="text-left px-3 w-75">
          <h3>Questions tagged [javascript]</h3>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem amet vitae voluptatum sit blanditiis molestiae dolores quaerat assumenda voluptate, sed tenetur suscipit nulla, repellat ipsum deleniti rerum earum numquam debitis.</p>
      </div>
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
import Qcard from '../components/Qcard'
export default {
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

<style  scoped>

.tag-detail-con{
  width: 100%;
  padding: 20px;
}

h3{
 text-align: left;
 margin: 10px 20px;
}


</style>