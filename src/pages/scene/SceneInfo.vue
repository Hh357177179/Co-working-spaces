<template>
  <div class="sceneinfo">
    <div>
      <el-input v-model="searchs" placeholder="场景名称" clearable class="topInput"></el-input>
      <el-button type="primary" @click="sceneSearch(searchs)">查询</el-button>
    </div>
    <div class="listTable">
      <el-table :data="get_SceneList" border style="width: 100%" v-loading="loading">
        <el-table-column label="场景名称" prop="SceneName"></el-table-column>
        <el-table-column label="所属园区" prop="GardenName"></el-table-column>
        <el-table-column label="执行类型" prop="ExeType"></el-table-column>
        <el-table-column label="场景图标" prop="SceneIcon">
          <template slot-scope="scope">
            <img :src="scope.row.SceneIcon" alt="" style="width:40px;heigint:40px;">
          </template>
        </el-table-column>
        <el-table-column label="启动类型" prop="StartModeName"></el-table-column>
        <el-table-column label="状态" prop="IsEnabled">
          <template slot-scope="scope">
            <el-tag :type="scope.row.IsEnabled === '可用' ? 'success' : 'danger'">
              {{scope.row.IsEnabled}}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination class="pagination" background layout="prev, pager, next" :total="TotalPage" @current-change="currentChange"></el-pagination>
  </div>
</template>
<script>
import {getSceneList} from '@/api'
export default {
  data () {
    return {
      searchs: '',
      loading: false,
      get_SceneList: [],
      TotalPage: 0
    }
  },
  methods: {
    sceneSearch () {
      this.getScence()
    },
    getScence () {
      this.loading = true
      getSceneList(this.page, this.pagesize, this.searchs).then(data => {
        this.get_SceneList = data.data.List
        this.TotalPage = data.data.TotalPage
        this.loading = false
      })
      .catch(() => {
        this.loading = false
      })
    },
    currentChange (currentPage) {
      this.page = currentPage
      this.getScence()
    }
  },
  mounted () {
    this.getScence()
  }
}
</script>
<style lang="less">
  .sceneinfo{
    padding: 20px;
    padding-top: 60px;
    .el-input{
      width:20%;
      margin-right: 10px;
    }
    .listTable{
      margin-top: 20px;
      text-align: center;
      .el-table th{
        text-align: center;
      }
    }
    .pagination{
      text-align: right;
      margin-top: 20px;
    }
  }
</style>
