<template>
  <div class="login">
    <div class="login-box">
      <p>共享办公管理系统</p>
      <div class="forms">
          <el-form :model="form" label-width="100px" class="demo-ruleForm" ref="form" :rules="rules">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="btn" type="primary" @click="submitForm('form')">立即登录</el-button>
            </el-form-item>
          </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {login} from '@/api'
  export default {
    data () {
      return {
        form: {
          username: 'huangbin',
          password: 'admin'
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 5, max: 20, message: '长度3～5个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm (form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            login(this.form).then(data => {
              // console.log(data)
              if (data.status === 0) {
                let users = JSON.stringify(data.data)
                // console.log(users)
                sessionStorage.setItem('userKey', users)
                this.$message({
                  message: data.message,
                  type: 'success'
                });
                this.$router.push('/root')
              } else {
                this.$message({
                  message: data.data.message,
                  type: 'error'
                })
              }
            })
          }
        })
      }
    },
    components: {
      login
    }
  }
</script>

<style lang="less">
  .login{
    background: url('../../assets/image/back.jpg') no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    z-index: 11;
    position: absolute;
    .login-box{
      width: 500px;
      height: 400px;
      margin: 0 auto;
      background-color: rgba(0,0,0,.4);
      border-radius: 10px;
      margin-top: 10%;
      p{
        color: #fff;
        text-align: center;
        height: 50px;
        line-height: 50px;
      }
      .forms{
        color: #fff;
        .el-input__inner{
          width: 90%;
        }
      }
    }
  }
</style>
