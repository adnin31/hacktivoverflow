<template lang="html">
  <div class="">
    <div v-for="question in allQuestions" class="panel panel-default">
      <div class="panel-heading"><router-link :to="'/'+question._id">{{question.question}}</router-link>     </div>
      <div class="panel-body">
        <p>{{question.content}}</p>
      </div>
      <div class="panel-footer">
        <p><span class="glyphicon glyphicon-user"></span> author :  {{question.author[0].username}}</p>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  computed: {
    allQuestions () {
      return this.$store.state.allQuestions.reverse()
    }
  },
  created () {
    this.$store.dispatch('getAllQuestions')
  }
}
</script>

<style lang="css">
</style>
