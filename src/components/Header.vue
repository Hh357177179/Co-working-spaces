<template>
  <div class="head">
    欢迎 <span>{{headName}}</span> 进入共享办公企业管理端
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
    padding-left: 16%;
    color: #333;
    span{
      font-size: 18px;
      color: #000;
    }
  }
</style>
