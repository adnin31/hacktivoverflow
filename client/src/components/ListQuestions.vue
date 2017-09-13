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
          <div v-if="parseToken != ''">
            <div v-if="parseToken.username === question.author[0].username" class="col-md-offset-8">
              <button class="btn btn-success edit " type="button" name="button" data-toggle="modal" data-target="#modalEdit" @click="editModal(question._id)"><span class="glyphicon glyphicon-pencil"></span> </button>
              <button class="btn btn-danger edit " type="button" name="button" @click="deleteQuestion(question._id)"><span class="glyphicon glyphicon-trash"></span> </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="modalEdit" role="dialog">
        <div class="modal-dialog">
          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header" style="padding:35px 50px;">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4><span class="glyphicon glyphicon-pencil"></span> Edit</h4>
            </div>
            <div class="modal-body" style="padding:40px 50px;">
              <form role="form">
                <div class="form-group">
                  <label for="usrname">Title Question</label>
                  <input type="text" class="form-control" v-model="detailQuestion.question">
                </div>
                <div class="form-group">
                  <label for="psw">Question</label>
                  <textarea class="form-control" rows="3" id="textArea" v-model="detailQuestion.content"></textarea>
                </div>
                <button @click="edit" type="button" class="btn btn-success btn-block" data-dismiss="modal"><span class="glyphicon glyphicon-floppy-disk"></span> Save</button>
              </form>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-danger btn-default pull-left" data-dismiss="modal" @click="closeModal"><span class="glyphicon glyphicon-remove"></span> Cancel</button>
            </div>
          </div>
        </div>
    </div>
  </div>

</template>

<script>
import { mapActions, mapState } from 'vuex'
import axios from 'axios'
export default {
  data () {
    return {
      editId: ''
    }
  },
  methods: {
    ...mapActions({
      getDetail: 'getDetailQuestion',
      getAllQuestions: 'getAllQuestions'
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
    },
    editModal (id) {
      this.getDetail(id)
      this.editId = id
    },
    edit () {
      var self = this
      axios.put(`http://localhost:3000/questions/${this.editId}`, {
        question: self.detailQuestion.question,
        content: self.detailQuestion.content
      }, {
        headers: {
          token: self.appToken
        }
      }).then(data => {
        console.log(data)
        this.$store.dispatch('getAllQuestions')
      })
    },
    closeModal () {
      this.title = ''
      this.text = ''
    }
  },
  computed: {
    ...mapState([
      'detailQuestion',
      'appToken'
    ]),
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
    this.$store.commit('setCreatedList')
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
