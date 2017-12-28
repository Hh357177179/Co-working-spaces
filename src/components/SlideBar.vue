<template>
  <div class="slide-Bar">
    <el-menu
      unique-opened
      router
      :default-active="$route.path"
      class="el-menu-vertical-demo">
      <el-menu-item index="/root" @click="homeClick">
        <i class="iconfont icon-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="iconfont icon-qiye"></i>
          <span>企业管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/information">企业信息</el-menu-item>
          <el-menu-item index="/department">企业部门</el-menu-item>
          <el-menu-item index="/staff">企业员工</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="iconfont icon-shebei"></i>
          <span>设备管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/facilityinfo">设备信息</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="iconfont icon-changjing"></i>
          <span>场景管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/sceneinfo">场景信息</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="iconfont icon-gongwei"></i>
          <span>工位管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/stationinfo">工位信息</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="iconfont icon-xitong"></i>
          <span>系统设置</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/changepass">修改密码</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  export default {
    methods: {
      homeClick () {
        [].map.call(document.querySelectorAll('.el-submenu'), (el) => {
          if (el.classList.contains('is-opened')) el.children[0].click()
        })
      }
    }
  }
</script>

<style lang="less">
  .slide-Bar{
    position: fixed;
    left: 0px;
    top: 0px;
    padding-top: 60px;
    height: 100%;
    width: 16%;
    float: left;
    ul{
      height: 100%;
      .el-submenu .el-menu-item{
        padding-left: 70px !important;
        padding-right: 0px !important;
        height: 40px;
        line-height: 40px;
        font-size: 13px;
      }
      i{
        margin-right: 10px;
      }
    }
    .el-menu-item-group__title{
      padding: 0px;
      .iconfont{
        font-size: 18px;
      }
    }
  }

</style>
