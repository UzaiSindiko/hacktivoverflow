<template>
  <div class="home">
    <div class="header d-flex justify-content-between align-items-center">
      <h3>Top Questions</h3>
      <button @click="changePage('/createquestion')" class="btn btn-primary">Ask Questions</button>
    </div>
    
    <div class="mt-5">
      <Qcard v-for="question in topQuestions"  :key="question._id" :question="question"/>
    </div>
  </div>
</template>

<script>
import Qcard from '../components/Qcard'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    Qcard
  },
  computed: {
    ...mapState(['topQuestions'])
  },
  methods: {
    changePage(link){
      this.$router.push(link)
    }
  },
  created() {
    this.$store.dispatch('GET_TOP')
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