<template lang="html">
  <div class="container">
    <div class="col-md-8">
      {{allQuestions}}
      <ListQuestions></ListQuestions>
    </div>
  </div>
</template>

<script>
import ListQuestions from '@/components/ListQuestions'
export default {
  components: {
    ListQuestions
  }
}
</script>

<style lang="css">
</style>
