<template>
    <div class="login">
         <div class="container">
             <img src="../assets/avatar.jpg" class="avatar" alt="">
             <el-form :model="loginForm" :rules="rules" ref="loginForm"  class="demo-ruleForm" >
                <el-form-item  prop="username" placeholder="请输入用户名/电话号码" >
                    <el-input v-model="loginForm.username" prefix-icon='el-icon-user-solid'></el-input>
                </el-form-item>
                <el-form-item  prop="password" placeholder="请输入密码">
                    <el-input v-model="loginForm.password" prefix-icon='icon-key'></el-input>
                </el-form-item>
                <el-button type="primary" @click="login" class="login-btn">主要按钮</el-button>
            </el-form>
         </div>
    </div>
</template>

<script>
import { login } from '@/apis/user.js'
export default {
  data () {
    return {
      loginForm: {
        username: '',
        passeord: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名/电话号码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 16, message: '请输入3-16位的密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate(async (res) => {
        if (res) {
          let res = await login(this.loginForm)
          if (res.data.message === '登录成功') {
            this.$message({
              message: '登录成功',
              type: 'success'
            })
            localStorage.setItem('admin_token', res.data.data.token)
            setTimeout(() => {
              this.$router.push({ name: 'Index' })
            }, 500)
          } else {
            this.$message({
              message: '登录信息错误',
              type: 'error'
            })
          }
          console.log(res)
        } else {
          this.$message({
            message: '输入数据不合法',
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
