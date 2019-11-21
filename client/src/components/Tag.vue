<template>
        <div @click="changePage('sadfsadfasdf/tag')" class="tag-card text-left d-flex flex-column justify-content-between">
            <div class="d-flex align-items-center">
                <span class="title">Javascript</span>
                <span class="ml-2 text-secondary">x 346456</span>
            </div>
            <div class="desc">
                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe harum officiis nulla sed eum ea, cupiditate dolorem nisi facere numquam voluptatem ipsum nobis sequi provident tenetur consequatur similique suscipit expedita obcaecati alias. In earum laboriosam corrupti minima accusantium distinctio quasi corporis, asperiores ducimus nisi laborum nemo esse nobis dicta debitis deserunt aliquam veritatis dolorum eos vel similique consequatur dolore tempore? Praesentium, placeat exercitationem. Debitis accusantium harum cumque, eveniet sed veniam repellat commodi, vero molestias esse quae ex quaerat? Placeat labore error ipsa, ad reprehenderit temporibus officiis quae explicabo libero hic possimus nulla recusandae asperiores in dicta ut aliquam debitis rerum?</span>
            </div>
            <div>
                <span>938 asked today, 5137 this week</span>
            </div>
        </div>
</template>

<script>
export default {
    methods: {
        changePage(link){
            // alert('masuk')
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