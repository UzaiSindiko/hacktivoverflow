<template>
  <div class="tag-detail-con">
    <div class="header d-flex justify-content-between align-items-center">
      <div class="text-left px-3 w-75">
          <h3>Questions tagged [{{ oneTag.tag }}]</h3>
          <p>{{ oneTag.desc }}</p>
      </div>
      <button @click="changePage('/createquestion')" class="btn btn-primary">Ask Questions</button>
    </div>
    <button v-if="isWatch"  @click="unwatch"  class="d-flex justify-content-start align-items-center ml-2 btn btn-danger"> <i class="fas fa-eye-slash mr-3"></i>Unwatch Tag</button>
    <button v-if="!isWatch" @click="watch" class="d-flex justify-content-start align-items-center ml-2 btn btn-success"> <i class="fas fa-eye"></i> Watch Tag</button>
    <div class="mt-5">
      <Qcard v-for="question in questions" :key="question._id"  :question="question" />
    </div>
  </div>
</template>

<script>
import Qcard from '../components/Qcard'
import { mapState } from 'vuex'

export default {
    components: {
        Qcard
    },
    data(){
      return{
        isWatch: false,
      }
    },
    computed: {
        ...mapState(['oneTag', 'questions', 'userId'])
    },
    methods: {
    changePage(link){
      this.$router.push(link)
    },
    watch(){
      this.isWatch = true 
      let id = this.$route.params.id
      this.$store.dispatch('WATCH_TAG', id)
    },
    unwatch(){
      this.isWatch = false 
      let id = this.$route.params.id
      this.$store.dispatch('REMOVE_TAG', id)
    }
  },
  created(){
      let id = this.$route.params.id
      this.$store.dispatch('GET_ONE_TAG', id)
        .then(() =>{
          this.oneTag.watcher.forEach(el => {
            if(el + '' == this.userId){
              this.isWatch = true
            } else {
              this.isWatch = false
            }
          });
        })
      this.$store.dispatch('GET_Q_BY_TAG', id)
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