<template>
  <div class="changePass">
    <el-form :model="changeForm" :rules="rules" ref="changeForm">
      <el-form-item label="旧密码" prop="oldPassword" label-width="100px">
        <el-input type="password" v-model="changeForm.oldPassword" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword" label-width="100px">
        <el-input type="password" v-model="changeForm.newPassword" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confrimPassword" label-width="100px">
        <el-input type="password" v-model="changeForm.confrimPassword" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="changeBtn" type="primary" @click="Subchange('changeForm')">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { modifyPassword } from '@/api'
export default {
  data () {
    var validateConfrim = (rule, value, callback) => {
     if (value !== this.changeForm.newPassword) {
        callback(new Error('两次输入的密码不一致!'))
      } else {
        callback ()
      }
    }
    return {
      changeForm: {
        oldPassword: '',
        newPassword: '',
        confrimPassword: ''
      },
      rules: {
        oldPassword: [
          {required: true, message: '请输入原始密码', trigger: 'blur'},
          {min: 4, max: 10, message: '请输入4～10为密码', trigger: 'blur'}
        ],
        newPassword: [
          {required: true, message: '请输入新密码', trigger: 'blur'},
          {min: 4, max: 10, message: '请输入4～10为密码', trigger: 'blur'}
        ],
        confrimPassword: [
          {required: true, message: '请输再次输入密码', trigger: 'blur'},
          {validator: validateConfrim, tigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    Subchange(changeForm) {
      this.$refs[changeForm].validate((valid) => {
        if (valid) {
          // console.log(this.changeForm)
          modifyPassword(this.changeForm).then(data => {
            // console.log(data)
            if (data.status === 0) {
              this.$alert(data.message, '系统提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$router.push('/login ')
                }
              })
            } else {
              this.$alert(data.message, '系统提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$refs[changeForm].resetFields()
                }
              })
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="less">
  .changePass{
    padding: 20px;
    padding-top: 60px;
    .el-form-item__label{
      text-align: center;
    }
    .el-input{
      width: 30%;
    }
    .el-button{
      margin-left: 16%;
      width: 100px;
    }
  }
</style>