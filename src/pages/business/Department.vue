<template>
  <div class="department">
    <div>
      <el-input v-model="search" placeholder="部门搜索" clearable></el-input>
      <el-button type="primary" @click="submitSearch(search)">查询</el-button>
      <el-button type="primary" @click="addData()">新增</el-button>
    </div>
    <el-table :data="department_list" border style="width: 100%"  v-loading="loading">
      <el-table-column prop="AddDate" label="日期"></el-table-column>
      <el-table-column prop="Principal" label="负责人"></el-table-column>
      <el-table-column prop="Phone" label="电话"></el-table-column>
      <el-table-column prop="DepartmentName" label="名称"></el-table-column>
      <el-table-column prop="Remark" label="备注"></el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
    <el-pagination class="pagination" background layout="prev, pager, next" :total="TotalPage"></el-pagination>
  </div>
</template>
<script>
import {getDeparement} from '@/api'
export default {
  data () {
    return {
      department_list: [],
      TotalPage: 0,
      search: '',
      page: 1,
      pageSize: 10,
      loading: false
    }
  },
  methods: {
    submitSearch () {
      this.get_department()
    },
    addData () {
      console.log(1)
      
    },
    get_department () {
      this.loading = true
      getDeparement(this.page, this.pageSize, this.search).then(data => {
        this.department_list = (data.data.List)
        this.TotalPage = data.data.TotalPage
        this.loading = false
      })
    }
  },
  mounted () {
     this.get_department()
  }
}
</script>
<style lang="less">
  .department{
    padding: 20px;
    .el-input{
      width: 250px;
      margin-bottom: 20px;
      margin-right: 10px;
    }
    .pagination{
      text-align: center;
      margin-top: 20px;
    }
  }
</style>
