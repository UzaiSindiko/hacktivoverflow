<template>
 <div class="Q-card-container d-flex">
     <div @click="changePage(`/${question._id}/qna`)" class="info">
        <span>0</span>
        <span style="font-size: 10px;">Votes</span>
     </div>
     <div @click="changePage(`/${question._id}/qna`)" class="info">
        <span>0</span>
        <span style="font-size: 10px;">Answers</span>
     </div>
     <div @click="changePage(`/${question._id}/qna`)" class="info">
        <span>{{ question.views }}</span>
        <span style="font-size: 10px;">Views</span>
     </div>
     <div class="Q my-3 w-100">
        <div @click="changePage(`/${question._id}/qna`)" style="cursor: pointer;" class="Q-title text-left px-3 text-primary">
            <h6>{{ question.title }}</h6>
        </div>
        <div class="d-flex justify-content-between px-3 w-100">
            <div class="mt-3">
                <span v-for="(tag, i) in question.tags" :key="i" class="Q-tag">{{ tag.tag }}</span>
            </div>
            <div style="cursor: pointer;" class="Q-user mt-3 text-primary">{{ question.userId.email }}</div>
        </div>
     </div>
 </div>
</template>

<script>
export default {
    name: 'Q-card',
    props: ['question'],
    methods: {
        changePage(link){
            this.$router.push(link)
        }
    }

}
</script>

<style scoped>

.info-con{
    width: 100%;
}

.Q-card-container{
    width: 100%;
    border-bottom: 5px solid rgb(216, 216, 216);
    margin: 10px 0;
}

.info{
    width: 80px;
    height: 80px;
    display: flex;
    border: 1px solid grey;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
}

.Q-tag{
    background-color: gainsboro;
    padding: 8px;
    margin: 0 3px;
    cursor: pointer;
}

</style>