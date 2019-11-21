<template>
  <div class="home">
    <div class="header d-flex justify-content-between align-items-center">
      <h3>My Questions</h3>
      <button @click="changePage('/createquestion')" class="btn btn-primary">Ask Questions</button>
    </div>
    
    <div class="mt-5">
      <Qcard v-for="question in myQuestions" :key="question._id"  :question="question"/>
    </div>
  </div>
</template>

<script>
import Qcard from './Qcard'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    Qcard
  },
  computed: {
    ...mapState(['myQuestions'])
  },
  methods: {
    changePage(link){
      this.$router.push(link)
    }
  },
  created(){
    this.$store.dispatch('GET_Q_BY_USER')
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