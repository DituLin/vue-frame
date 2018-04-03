<template>
  <div class="login" @keydown.enter="handleLogin">
    <div class="login-con">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="log-in"></Icon>
          欢迎登录
        </p>
        <div class="form-con">
          <Form ref="loginForm" :model="form" :rules="rules">
            <FormItem prop="accout">
              <Input v-model="form.account" placeholder="请输入用户名"/>
              <span slot="prepend">
              <Icon :size="16" type="person"></Icon>
              </span>
            </FormItem>
            <FormItem prop="password">
              <Input v-model="form.password" placeholder="请输入密码"/>
              <span slot="prepend">
              <Icon :size="14" type="locked"></Icon>
              </span>
            </FormItem>
            <FormItem>
              <Button @click="handleLogin" type="primary" long>
                <Icon v-if="loading" :size="12" type="load-a" :class="loadingIcon"></Icon>
                登录
              </Button>
            </FormItem>
          </Form>
          <p class="login-tip" :style="tipStyle">{{loginTip}}</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import {userLogin} from '../service/userService'

  export default {
    name: 'loginView',
    data () {
      return {
        loginTip: '请输入用户名密码',
        tipStyle: {
          color: '#c3c3c3'
        },
        loadingIcon: 'loading-icon',
        form: {
          account: '',
          password: ''
        },
        rules: {
          account: [
            {required: true, message: '账号不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ]
        },
        user: {
          token: '320b9e89aa994ac788ae7cdc7d3c5af6',
          name: '14759951276',
          account: '14759951276'
        }
      }
    },
    computed: {
      ...mapGetters([
        'token',
        'loading'
      ])
    },
    methods: {
      ...mapActions([
        'setUser',
        'setMenu'
      ]),
      handleLogin () {
        this.$refs.loginForm.validate(async (valid) => {
          if (valid && !this.loading) {
            let response = await userLogin(this.form.account, this.form.password)
            if (response !== undefined) {
              var status = response.status
              if (status === '1') {
                console.log('status:' + status)
                // var user = response.data
                this.setUser(this.user)
                // this.setMenu(user.sysMenuTree)
                this.$router.push('/')
              } else {
                this.loginTip = response.errorMsg
                this.tipStyle = {color: '#ed3f14'}
              }
            }
          }
        })
      }
    }
  }
</script>

<style type="text/css" scoped>
  .login {
    width: 100%;
    height: 100%;
    background: #495060 url("../../static/img/login_bg.jpg");
    background-size: 100%;
    position: absolute;
  }

  .login-con {
    position: absolute;
    right: 160px;
    top: 50%;
    transform: translateY(-60%);
    width: 300px;
  }

  .login-con-header {
    font-size: 16px;
    font-weight: 300;
    text-align: center;
    padding: 30px 0;
  }

  .login-con .form-con {
    padding: 10px 0 0;
  }

  .login-con .login-tip {
    font-size: 10px;
    text-align: center;
  }

  .loading-icon {
    margin-right: 20px;
  }
</style>
