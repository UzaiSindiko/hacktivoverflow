<template>
  <div class="over-flow">
    <div class="header d-flex justify-content-between align-items-center">
      <h3>All Questions</h3>
      <button @click="changePage('/createquestion')" class="btn btn-primary">Ask Questions</button>
    </div>
    
    <div class="mt-5">
      <Qcard v-for="question in questions"  :key="question._id" :question="question"/>
    </div>
  </div>
</template>

<script>
import Qcard from '../components/Qcard'
import { mapState } from 'vuex'

export default {
  name: 'over-flow',
  components: {
    Qcard
  },
  methods: {
    changePage(link){
      this.$router.push(link)
    }
  },
  computed:{
    ...mapState(['questions'])
  },
  created(){
    this.$store.dispatch('GET_Q')
  }
}
</script>
<style scoped>
.over-flow{
  width: 100%;
  padding: 20px;
}

h3{
 text-align: left;
 margin: 10px 20px;
}

</style>