<template>
 <div class="w-100 p-3 con">
      <h1 class="text-center">Ask Question</h1>
        <button @click="update" class="w-25 m-3 btn btn-success">Edit Question</button>
        <button @click="deleteQ" class="w-25 m-3 btn btn-danger">Delete Question</button>
    <div class="w-100 d-flex justify-content-center align-items-center flex-column">
        <input v-model="question.title" class="title" type="text" name="" id="" placeholder="Enter Title">
         <div class="quill-container">
           <VueEditor v-model="question.desc" />
         </div>
        <div class="tag d-flex">
        <input v-model="inputTag"  style="width: 95%;" class="px-3" type="text" list="tags" placeholder="Enter Tags"/>
        <datalist id="tags">
            <option v-for="(tag, i) in tags" :key="i"  :value="tag.tag">{{ tag.desc }}</option>
        </datalist>
        <button @click="makeTag" class="ml-4 btn btn-success">add</button>
        </div>

        <div class="d-flex flex-wrap mt-3 justify-content-start" style="width: 80%;">
            <div v-for="(tag, index) in showTag" :key="index" class="ask-tag d-flex align-items-center">
                <span>
                #{{ tag }}
                    <i
                        @click.prevent="removeTag(index)"
                        style="font-size: 15px; cursor: pointer;"
                        class="far fa-times-circle text-secondary cursor-pointer">
                    </i>
                </span>
            </div>
        </div>
    </div>
 </div>

</template>

<script>
import { VueEditor } from "vue2-editor";
import { mapState } from 'vuex'

export default {
    name: 'create-question',
    components: {
        VueEditor
    },
    computed: {
        ...mapState(['tags', 'oneQuestion'])
    },
    data(){
        return {
            question: {
                title: '',
                desc: '',
                tags: []
            },
            showTag: [],
            inputTag: '',
        }
    },
    methods: {
        deleteQ(){
            let id = this.$route.params.id
            this.$store.dispatch('DELETE_Q', id)
        },
        update(){
            let question = this.question
            let id = this.$route.params.id
            this.$store.dispatch('UPDATE_Q', {question, id})
        },
        makeTag () {
            let addTag = false
            let tagArr = this.inputTag.split(' ')
            tagArr.forEach(tag => {
               for (let i = 0; i < this.tags.length; i++) {
                   if(this.tags[i].tag === tag)   {
                       this.question.tags.push(this.tags[i]._id)
                       addTag = true
                   }                
               }
               if(!addTag){
                   this.question.tags.push(tag)
               }
               this.showTag.push(tag)
            })

            this.inputTag = ''
        },
        removeTag (index) {
            this.question.tags.splice(index, 1)
            this.showTag.splice(index, 1)
        },
    },
    created(){
        let id = this.$route.params.id
        this.$store.dispatch('GET_ONE_Q', id)
            .then(()=>{
                this.question.title = this.oneQuestion.title
                this.question.desc = this.oneQuestion.desc
                this.oneQuestion.tags.forEach(tag =>{
                    this.showTag.push(tag.tag)
                })
                this.$store.dispatch('GET_TAG')
            })
        
    }

}
</script>

<style  scoped>
.con{
    margin-bottom: 200px;
}

h1{
    color: #232323;
}

.title{
    width: 80%;
    padding: 10px;
    border: none;
    outline: none;
    border-bottom: #ffffff 1px solid;
    font-size: 20px;
    transition: 500ms;
    margin: 10px 0;
}

.title:focus{
    border-bottom: #afafaf 1px solid;
}

.tag{
    width: 80%;
}

.quill-container{
    width: 80%;
    margin: 15px 0;
}

.ask-tag{
  background-color: rgb(235, 235, 235);
  padding: 5px 10px;
  margin: 3px;
}

</style>