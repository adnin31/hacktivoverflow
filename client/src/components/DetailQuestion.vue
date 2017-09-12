<template lang="">
  <div class="">
    <div class="">
      <h2>{{detailQuestion.question}}</h2>
      <hr>
      <p style="font-size : 120%">{{detailQuestion.content}}</p>

    </div>
    <div class="answers">
      <h3>Answers</h3>
      <hr>
      <div class="" v-for="answer in answers">
        <div class="well well-lg" >
          <p>{{answer.content}}</p>
          <br>
          <hr style="border-top : 3px solid #000">
          <div class="row baris">
            <p class=""><span class="glyphicon glyphicon-user"></span> author :  {{answer.answerAuthor[0].username}} </p>
            <div v-if="parseToken.username === answer.answerAuthor[0].username" class="col-md-offset-8">
              <button class="btn btn-success edit " type="button" name="button"><span class="glyphicon glyphicon-pencil"></span> </button>
              <button class="btn btn-danger edit " type="button" name="button"><span class="glyphicon glyphicon-trash"></span> </button>
            </div>
          </div>
        </div>

      </div>
      <hr>
      <h4>Add Answer</h4>

      <hr>
      <form class="form-horizontal">
        <div class="form-group">
          <label for="textArea" class="col-lg-2 control-label">Your Answer</label>
          <div class="col-lg-10">
            <textarea class="form-control" rows="3" v-model="jawaban"></textarea>
          </div>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-lg-10 col-md-offset-10 ">
              <button type="button" class="btn btn-primary" @click ="postAnswers(detailQuestion._id)">Submit</button>
            </div>
          </div>

        </div>
      </form>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      answers: '',
      jawaban: ''
    }
  },
  methods: {
    postAnswers (id) {
      var self = this
      axios.post(`http://localhost:3000/questions/${id}/answer`, {
        content: self.jawaban
      }, {
        headers: {
          token: this.$store.state.appToken
        }
      })
      .then(data => {
        console.log(data)
        self.jawaban = ''
        this.$store.dispatch('getDetailQuestion', id)
      })
    }
  },
  computed: {
    detailQuestion () {
      this.answers = this.$store.state.detailQuestion.answers
      return this.$store.state.detailQuestion
    },
    parseToken () {
      return this.$store.state.parseToken
    }
  },
  created () {

  }
}
</script>

<style lang="css" scoped>
  .answers {
    margin-top: 50px;
  }
</style>
