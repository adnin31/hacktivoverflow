<template lang="html">
  <form class="form-horizontal">
    <legend>Add Question</legend>
    <div class="form-group">
      <label for="inputEmail" class="col-lg-2 control-label">Title</label>
      <div class="col-lg-10">
        <input type="text" class="form-control" v-model="title" placeholder="Title Question">
      </div>
    </div>
    <div class="form-group">
      <label for="textArea" class="col-lg-2 control-label">Your Question</label>
      <div class="col-lg-10">
        <textarea class="form-control" rows="3" v-model="content"></textarea>
      </div>
    </div>
    <div class="form-group">
      <div class="col-lg-10 col-lg-offset-2">
        <button type="reset" class="btn btn-default">Cancel</button>
        <button type="button" class="btn btn-primary" @click="addQuestion">Submit</button>
      </div>
    </div>
  </form>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    addQuestion () {
      var self = this
      console.log(this.$store.state.appToken)
      axios.post('http://localhost:3000/questions', {
        question: self.title,
        content: self.content
      }, {
        headers: {
          token: this.$store.state.appToken
        }
      })
      .then(res => {
        console.log(res.data)
        self.title = ''
        self.content = ''
      })
      .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="css">
</style>
