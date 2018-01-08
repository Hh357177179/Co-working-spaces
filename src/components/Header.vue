<template>
  <div class="head">
    <!-- <img src="../assets/image/st.jpeg" alt=""> -->
    <span class="headLeft">共享办公企业管理端</span>
    <span class="headRight">
      欢迎-<i>{{headName}}</i>  
    </span>
  </div>
</template>
<script>
export default {
  data () {
    return {
      headName: {}
    }
  },
  created () {
   let headNames = JSON.parse(sessionStorage.getItem('userKey'))
    // console.log(headNames.name)
    this.headName = headNames.name
  }
}
</script>
<style lang="less" scoped>
  .head{
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #ccc;
    // padding-left: 16%;
    color: #333;
    img{
      width: 60px;
      height: 59px;
      float: left;
      margin-left: 40px;
    }
    .headLeft{
      margin-left: 10%;  
      font-size: 20px;
    }
    .headRight{
      float: right;
      margin-right: 5%;
    }
    i{
      font-style: normal;
      color: #409eff;
    }
  }
</style>
