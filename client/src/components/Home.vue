<template lang="html">
  <div class="container">
    <div class="col-md-8" >
      <router-link v-if="getToken" type="button" class="btn btn-primary" name="button" :to="'/new-question'"><span class="glyphicon glyphicon-plus"></span> Add Question</router-link>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import ListQuestions from '@/components/ListQuestions'
export default {
  components: {
    ListQuestions
  },
  computed: {
    getToken () {
      return this.$store.state.appToken
    }
  }

}
</script>

<style lang="css" scoped>

  .btn {
    margin-bottom:  30px;
  }
</style>
