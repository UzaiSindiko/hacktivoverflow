<template>
        <div @click="changePage(`${tag._id}/tag`)" class="tag-card text-left d-flex flex-column justify-content-between">
            <div class="d-flex align-items-center">
                <span class="title">{{ tag.tag }}</span>
                <span class="ml-2 text-secondary">x {{ tag.watcher.length }}</span>
            </div>
            <div class="desc">
                <span>{{ tag.desc }}</span>
            </div>
            <div>
                <span>938 asked today, 5137 this week</span>
            </div>
        </div>
</template>

<script>
export default {
    props: ['tag'],
    methods: {
        changePage(link){
            this.$router.push(link)
        }
    }

}
</script>

<style scoped>

.desc{
    font-size: 12px;
    height: 50px;
    width: 100%;
    overflow: auto;
}

.title{
    padding: 5px 10px;
    background-color: #E1ECF4;
    color: #7D7EA2;
}

.search input{
    width: 300px;
    padding: 5px 10px;
}

.tag-card{
    width: 32%;
    height: 150px;
    border: .6px solid rgb(231, 231, 231);
    margin: 5px ;
    padding: 10px;
    cursor: pointer;
}

</style>