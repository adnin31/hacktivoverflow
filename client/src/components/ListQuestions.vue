<template lang="html">
  <div class="">
    <div v-for="question in allQuestions" class="panel panel-default">
      <div class="panel-heading"><a href="#">{{question.content}} </a>  </div>
      <div class="panel-body">
        {{question.author[0].username}}
      </div>
    </div>
  </div>

</template>

<script>
export default {
  computed: {
    allQuestions () {
      return this.$store.state.allQuestions
    }
  },
  created () {
    this.$store.dispatch('getAllQuestions')
  }
}
</script>

<style lang="css">
</style>
