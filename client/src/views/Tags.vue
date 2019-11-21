<template>
  <div class="w-100 p-5">
      <div class="text-left">
          <h1>Tags</h1>
          <p>A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.</p>
      </div>
      <div class="search w-100 d-flex jusify-content-start">
          <input type="search" placeholder="Search Tag...">
      </div>
    <div class="d-flex mt-3 flex-wrap"> 
      <tag />
      <tag />
      <tag />
      <tag />
    </div>
  </div>
</template>

<script>
import tag from '../components/Tag'

export default {
    components: {
        tag
    }
}
</script>

<style scoped>

.search input{
    width: 300px;
    padding: 5px 10px;
}

</style>