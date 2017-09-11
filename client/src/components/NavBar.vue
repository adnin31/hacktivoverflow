<template lang="html">
  <nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">HACKTIVOVERFLOW</a>
    </div>
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li class=""><a href="#">HOME</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <form class="navbar-form navbar-left" role="search">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Search">
          </div>
          <button type="submit" class="btn btn-default">Submit</button>
        </form>

        <li><a v-if="token === null" class="button" data-toggle="modal" data-target="#myModal">Login</a></li>
        <li><a v-if="token" class="button" @click="logout" >Logout</a></li>

        <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog">
              <!-- Modal content-->
              <div class="modal-content">
                <div class="modal-header" style="padding:35px 50px;">
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                  <h4><span class="glyphicon glyphicon-lock"></span> Login</h4>
                </div>
                <div class="modal-body" style="padding:40px 50px;">
                  <form role="form">
                    <div class="form-group">
                      <label for="usrname"><span class="glyphicon glyphicon-user"></span> Username</label>
                      <input type="text" class="form-control" v-model="username" placeholder="Enter email">
                    </div>
                    <div class="form-group">
                      <label for="psw"><span class="glyphicon glyphicon-eye-open"></span> Password</label>
                      <input type="password" class="form-control" v-model="password" placeholder="Enter password">
                    </div>
                    <button @click="login" type="button" class="btn btn-success btn-block" data-dismiss="modal"><span class="glyphicon glyphicon-off"></span> Login</button>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-danger btn-default pull-left" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> Cancel</button>
                  <p>Not a member? <a href="#">Sign Up</a></p>
                </div>
              </div>
            </div>
        </div>


        <li><a class="button" data-toggle="modal" data-target="#modalRegister" v-if="token === null">Register</a></li>
        <div class="modal fade" id="modalRegister" role="dialog">
            <div class="modal-dialog">
              <!-- Modal content-->
              <div class="modal-content">
                <div class="modal-header" style="padding:35px 50px;">
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                  <h4><span class="glyphicon glyphicon-pencil"></span> Register</h4>
                </div>
                <div class="modal-body" style="padding:40px 50px;">
                  <form role="form">
                    <div class="form-group">
                      <label for="usrname"><span class="glyphicon glyphicon-user"></span> Username</label>
                      <input type="text" class="form-control" v-model="username" placeholder="Enter Username">
                    </div>
                    <div class="form-group">
                      <label for="psw"><span class="glyphicon glyphicon-eye-open"></span> Password</label>
                      <input type="password" class="form-control" v-model="password" placeholder="Enter password">
                    </div>
                    <div class="form-group">
                      <label for="email"><span class="glyphicon glyphicon-envelope"></span> Email</label>
                      <input type="text" class="form-control" v-model="email" placeholder="Enter email">
                    </div>
                    <button @click="register" type="button" class="btn btn-success btn-block" data-dismiss="modal"><span class="glyphicon glyphicon-off"></span> Register</button>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-danger btn-default pull-left" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> Cancel</button>
                </div>
              </div>
            </div>
        </div>


      </ul>
    </div>
  </div>
</nav>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      username: '',
      password: '',
      email: '',
      token: localStorage.getItem('token')
    }
  },
  methods: {
    login () {
      var self = this
      axios.post('http://localhost:3000/users/signin', {
        username: self.username,
        password: self.password
      })
      .then(res => {
        if (res.data === 'password salah' || res.data === 'You Must Register First') {
          alert('Something Wrong with your input')
        } else {
          console.log(res)
          localStorage.setItem('token', res.data)
          self.token = res.data
          this.$store.commit('setAppToken', res.data)
        }
        self.username = ''
        self.password = ''
      })
    },
    logout () {
      localStorage.clear()
      this.token = null
      this.$store.commit.removeAppToken
    },
    register () {
      var self = this
      axios.post('http://localhost:3000/users/register', {
        username: self.username,
        password: self.password,
        email: self.email
      })
      .then(res => {
        console.log(res)
        self.username = ''
        self.password = ''
        self.email = ''
      })
      .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="css">
a {
  cursor: pointer;
}
</style>
