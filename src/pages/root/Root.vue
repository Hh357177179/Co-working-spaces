<template>
  <div class="root">
    <el-container>
      <el-header>
        <heads></heads>  
      </el-header>
      <el-container>
        <el-aside width="16%">
          <slide-bar></slide-bar>  
        </el-aside>
        <el-main>
          <p>{{$route.name}}</p>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import SlideBar from '@/components/SlideBar'
import Heads from '@/components/Header'
export default {
  components: {
    SlideBar,
    Heads
  }
}
</script>
<style lang="less" scoped>
  .el-header{
    padding: 0px;
    position: fixed;
    top:0px;
    left:0px;
    width: 100%;
    background-color: #fff;
    z-index: 111;
  }
  .el-main{
    padding: 0;
    padding-top: 60px;
    p{
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #ccc;
      padding: 0 20px;
      position: fixed;
      width: 100%;
      background-color: #fff;
      z-index:111;
      color: #409eff;
    }
  }
</style>


