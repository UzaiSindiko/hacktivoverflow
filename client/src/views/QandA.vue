<template>
    <div v-if="oneQuestion.title !== undefined" class="w-100 d-flex flex-column align-items-center">
        <div class="qna-container">
            <div class="title pb-2 text-left">
                <h4>{{ oneQuestion.title }}</h4>
                <h5 v-if="answerByQ.length" class="text-success">Answer {{ answerByQ[answerByQ.length - 1].count }}</h5>
            </div>
            <div class="q-detail d-flex">
                <div class="vote d-flex flex-column">
                    <i @click="upQ" style="cursor: pointer;" class="fas fa-caret-up"></i>
                    <span class="mx-3">{{ oneQuestion.upvotes.length - oneQuestion.downvotes.length }}</span>
                    <i @click="downQ" style="cursor: pointer;" class="fas fa-caret-down"></i>
                </div>
                <div class="w-100">
                    <div class="text-left m-3">
                        <div v-html="oneQuestion.desc" class="desc"></div>
                    </div>
                    <div class="ml-2 text-left d-flex flex-wrap">
                        <span v-for="(tag, i) in oneQuestion.tags" :key="i" class="tag">#{{ tag.tag }}</span>
                    </div>
                    <div class="text-right">
                        <p>{{ oneQuestion.userId.email }}</p>
                    </div>
                </div>
            </div>
            <button @click="editQ" v-if="userId  + '' == oneQuestion.userId._id" class="d-flex justify-content-start ml-5 btn btn-success" >Edit Questions</button>
        </div>

        <!-- QUILL CONTAINER -->
        <div class="quill-container">
            <h3 class="text-left">Add Your Answer</h3>
                <input v-model="answer.title" type="text" class="w-100 mb-2 px-3 py-1" placeholder="Enter Title">
             <VueEditor v-model="answer.desc" />
             <div class="w-100 d-flex justify-content-start my-4">
                 <button v-if="!edit" @click="addAns" class="ml-2 btn btn-primary ">Add</button>
                 <button v-else @click="update" class="ml-2 btn btn-info ">Edit</button>
             </div>
        </div>


        <!-- ANSWER -->
    <div class="a-container">
        <p class="text-left">Page: {{ currentPage }}</p>
        <div class="pages d-flex">
            <div @click="pervPage" class="page"><i class="fas fa-backward"></i></div>
            <div v-for="page in pages" :key="page" @click="changePageNum(page+1)"  class="page">{{ page + 1 }}</div>
            <div @click="nextPage" class="page"><i class="fas fa-forward"></i></div>
        </div>

        <div v-for="ans in answers" :key="ans._id" class="answer d-flex flex-column justify-content-between">
            <div class="d-flex">
                <div class="vote d-flex flex-column">
                    <i @click="upA(ans._id)" style="cursor: pointer;" class="fas fa-caret-up"></i>
                    <span class="mx-3">{{ ans.upvotes.length - ans.downvotes.length  }}</span>
                    <i @click="downA(ans._id)" style="cursor: pointer;" class="fas fa-caret-down"></i>
                </div>
                <div class="w-100">
                    <h5>{{ans.title}}</h5>
                    <div v-html="ans.desc" class="a-desc text-left"></div>
                </div>
            </div>
            <div class="text-right w-100">{{ ans.userId.email }}</div>
            <button @click="finOneA(ans._id)" v-if="userId  + '' == ans.userId._id" class="btn btn-success w-25">Edit</button>
        </div>

     <div class="pages d-flex">
        <div @click="pervPage" class="page"><i class="fas fa-backward"></i></div>
        <div v-for="page in pages" :key="page" @click="changePageNum(page+1)" class="page">{{ page + 1 }}</div>
        <div @click="nextPage" class="page"><i class="fas fa-forward"></i></div>
    </div>
        

        
    </div>

    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { mapState } from 'vuex'

export default {
    components: {
        VueEditor
    },
    data(){
        return{
            pages: [],
            answers: [],
            currentPage : 1,
            answer: {
                title: '',
                desc: ''
            },
            ansId : '',
            edit: false
        }
    },
    methods: {
        editQ(){
            let id = this.$route.params.id
            this.$router.push(`/${id}/editq`)
        },
        update(){
             let id = this.ansId
             let title = this.answer.title            
             let desc = this.answer.desc
             this.$store.dispatch('UPDATE_A', {title, desc, id})
                .then(() =>{
                    let questionId = this.$route.params.id
                    let page = this.currentPage
                    this.$store.dispatch('GET_ANSWER_BY_Q', { id: questionId, page: 1 })
                    .then(()=>{
                        this.countPage()
                        this.currentPage = page
                        this.answer.title = ''      
                        this.answer.desc = ''
                    })
                })

        },
        finOneA(id){
            this.ansId = id
            this.$store.dispatch('GET_ONE_A', id)
                .then(() =>{
                    this.answer.title = this.oneAns.title
                    this.answer.desc = this.oneAns.desc
                    this.edit = true
                })
        },
        upQ(){
            let id = this.$route.params.id
            this.$store.dispatch('UP_Q', id)
                .then(() =>{
                     this.countPage()
                })
        },
        downQ(){
            let id = this.$route.params.id
            this.$store.dispatch('DOWN_Q', id)
                .then(() =>{
                        this.countPage()
                })
        },
        upA(id){
            let questionId = this.$route.params.id
            let page = this.currentPage
            this.$store.dispatch('UP_A', {id, questionId, page})
        },
        downA(id){
            let page = this.currentPage
            let questionId = this.$route.params.id
            this.$store.dispatch('DOWN_A', {id, questionId, page})
        },
        addAns(){
             let title = this.answer.title            
             let desc = this.answer.desc
             let questionId = this.$route.params.id
             this.$store.dispatch('POST_ANS', { title, desc, questionId })
                .then(() =>{
                    let page = this.pages.length || 1
                    this.$store.dispatch('GET_ANSWER_BY_Q', { id: questionId, page })
                    .then(()=>{
                        this.countPage()
                        this.currentPage = page
                        this.answer.title = ''      
                        this.answer.desc = ''
                    })
                })
        },
        changePageNum(num){
            this.currentPage = num
            let page = this.currentPage
            this.getAns(page)
        },
        nextPage(){
            if(this.currentPage + 1 > this.pages.length) this.currentPage = 1
            else this.currentPage++
            let page = this.currentPage
            this.getAns(page)
        },
        pervPage(){
            if(this.currentPage - 1 === 0) this.currentPage = this.pages.length
            else this.currentPage--
            let page = this.currentPage
            this.getAns(page)
        },
        getAns(page){
            let id = this.$route.params.id
            this.$store.dispatch('GET_ANSWER_BY_Q', { id, page })
                .then(() =>{
                    this.countPage()
                })
        },
        countPage(){
            let count = this.answerByQ[this.answerByQ.length - 1].count
            let page = Math.ceil(count/3)
            this.pages = []
            for (let i = 0; i < page; i++) {
                this.pages.push(i)                
            }
            this.answers = this.answerByQ.slice(0, this.answerByQ.length - 1)
        },
    },
    computed: {
        ...mapState(['oneQuestion', 'answerByQ', 'userId', 'oneAns'])
    },
    created(){
        let id = this.$route.params.id
        this.$store.dispatch('GET_ONE_Q', id)
            .then(() =>{
                let page = 1
                this.$store.dispatch('GET_ANSWER_BY_Q', { id, page })
                    .then(()=>{
                        this.countPage()
                    })
            })
    },
    watch: {
        answerByQ(){
            this.countPage()
        }
    }
}
</script>

<style scoped>

.answer{
    width: 100%;
    min-height: 200px;
    /* border: 2px solid rgb(0, 162, 255); */
    padding: 10px;
    margin: 20px 0;
    box-shadow: 0px 1px 11px 1px rgba(0,0,0,0.15);
}

.page{
    border: .6px solid rgb(173, 173, 173);
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin: 1px;
    border-radius: 5px;
}

.a-container{
    padding: 30px;
    width: 80%;
    /* border: 2px solid red; */
}

.quill-container{
    border-top: 2px solid grey;
    padding: 30px;
    width: 80%;
}

.qna-container{
    width: 100%;
    padding: 20px 100px;
}

.title{
    border-bottom: 5px solid rgba(244, 130, 36, 0.445);;
}

.vote{
    font-size: 30px;
    width: 10%;
}

.desc{
    width: 90%;
}

.tag{
    background-color: gainsboro;
    padding: 5px;
    margin: 3px;
    cursor: pointer;
}


</style>