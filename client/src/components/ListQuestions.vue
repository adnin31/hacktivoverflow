<template lang="html">
  <div class="">
    <div v-for="question in allQuestions" class="panel panel-default">
      <div class="panel-heading"><router-link :to="'/'+question._id" @click.native="getDetail(question._id)">{{question.question}}</router-link>     </div>
      <div class="panel-body">
        <p>{{question.content}}</p>
      </div>
      <div class="panel-footer">
        <div class="row baris">
          <p class=""><span class="glyphicon glyphicon-user"></span> author :  {{question.author[0].username}} </p>
          <div v-if="parseToken.username === question.author[0].username" class="col-md-offset-8">
            <button class="btn btn-success edit " type="button" name="button"><span class="glyphicon glyphicon-pencil"></span> </button>
            <button class="btn btn-danger edit " type="button" name="button" @click="deleteQuestion(question._id)"><span class="glyphicon glyphicon-trash"></span> </button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {mapActions} from 'vuex'
import axios from 'axios'
export default {
  methods: {
    ...mapActions({
      getDetail: 'getDetailQuestion'
    }),
    deleteQuestion (id) {
      console.log('ini delete', id)
      axios.delete(`http://localhost:3000/questions/${id}`, {
        headers: {
          token: this.$store.state.appToken
        }
      })
      .then(data => {
        console.log(data)
        this.$store.dispatch('getAllQuestions')
      })
    }
  },
  computed: {
    allQuestions () {
      var token = this.$store.state.allQuestions
      return token
    },
    parseToken () {
      return this.$store.state.parseToken
    }
  },
  created () {
    this.$store.dispatch('getAllQuestions')
    console.log(this.parseToken.username)
    console.log(this.allQuestions)
  }
}
</script>

<style lang="css">
  .panel-heading {
    font-size: 150%;
  }
  .edit {
    border-radius: 50%;
    text-align: right;
    margin-left: 20px;
  }
  .baris{
    display: flex;
    align-items: baseline;
  }
</style>
