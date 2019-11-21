<template>
  <div v-if="isLogin" class="watch-tag d-flex flex-column justify-content-between pb-3">
        <div class="h-25 bg-light p-1 d-flex justify-content-between" style="font-size: 20px;"> 
            <div><i class="fas fa-eye"></i> Watch Tag</div>
            <button v-if="!edit" @click="editTag" class="btn btn-light border">Edit</button>
        </div>
          <div class="w-100">
            <div class="tag-con d-flex justify-content-start align-items-start flex-wrap">
              <span v-for="(tag, i) in watchTag" :key="i" class="tag">#{{ tag.tag }}
                 <i
                    @click.prevent="remove(tag._id)"
                    style="font-size: 15px; cursor: pointer;"
                    class="far fa-times-circle text-secondary cursor-pointer">
                    </i>
              </span>
            </div>
            <div v-if="edit" >
                  <input v-model="selectedTag" type="text" name="city" list="tags">
                  <datalist id="tags">
                    <option v-for="tag in tags" :key="tag._id" :value="tag.tag">{{tag.desc}}</option>
                  </datalist>
                  <span @click="addTag" class="btn-add"> <i class="fas fa-plus-circle"></i> </span>
            </div>
          </div>
      </div>
</template>

<script>

// watchTag
import { mapState } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'watch-tag',
  data(){
    return {
      edit : false,
      selectedTag: ''
    }
  },
  computed: {
    ...mapState(['watchTag', 'tags', 'isLogin'])
  },
  methods: {
    editTag(){
      this.edit = true
    },
    remove(id){
      this.$store.dispatch('REMOVE_TAG', id)
        .then(() =>{
            this.$store.dispatch('GET_WATCH')
          })
    },
    addTag(){
      let tag = ''
      for (let i = 0; i < this.tags.length; i++) {
        if(this.tags[i].tag === this.selectedTag){
          tag = this.tags[i]._id
        }
      }
      if(tag){
        this.$store.dispatch('WATCH_TAG', tag)
          .then(() =>{
            this.$store.dispatch('GET_WATCH')
            this.$store.dispatch('GET_IGNORE')
          })
      }
      else{
          Swal.fire({
            text: 'Tag does not exis in our site',
          })
      }
      this.selectedTag = ""
      this.edit = false
    }
  },
  created(){
    if(localStorage.getItem('token')){
      this.$store.dispatch('GET_WATCH')
      this.$store.dispatch('GET_TAG')
    }
  }

}
</script>

<style scoped>

.tag{
  padding: 5px;
  margin: 2px;
  background-color: rgb(231, 231, 231);
}

.tag-con{
  width: 100%;
  min-height: 120px;
  padding: 10px;
}

.btn-add{
  width: 20%;
  font-size: 20px;
  padding: 3px;
  color: rgb(58, 58, 255);
  cursor: pointer;
  height: 10px;
}

.watch-tag{
  width: 100%;
  min-height: 200px;
  padding: 1px;
  border: 1px solid rgb(226, 226, 226);
  margin: 10px;
}


</style>