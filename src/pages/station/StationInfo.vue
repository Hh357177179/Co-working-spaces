<template>
  <div class="stationinfo">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-input clearable v-model="formInline.name" placeholder="设备名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formInline.type" placeholder="设备类型">
          <el-option v-for="(typeList, index) in get_stationTypeList" :key="index" :label="typeList.StationTypeName" :value="typeList.StationTypeId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="stationSearch(formInline)">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="stationinfoList">
      <el-table border v-loading="loading" :data="get_StationList">
        <el-table-column label="名称" prop="StationName"></el-table-column>
        <el-table-column label="类别" prop="StationType"></el-table-column>
        <el-table-column label="编码" prop="StationEncoding">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top" class="StationEncoding">
              <p>{{scope.row.StationEncoding}}</p>
              <div slot="reference">
                <el-tag>{{Encoding(scope.row)}}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="StationState">
          <template slot-scope="scope">
            <el-tag :type="scope.row.StationState === 1 ? 'success' : 'danger'" close-transition>{{StationState(scope.row)}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="授权时间" prop="AuthorizeTime"></el-table-column>
      </el-table>
    </div>
    <el-pagination class="pagination" background layout="prev, pager, next" :total="TotalPage" @current-change="currentChange"></el-pagination>
  </div>
</template>
<script>
import { getStationTypeList, StationList } from '@/api'
  export default {
  data () {
    return {
      formInline: {
        name: '',
        type: ''
      },
      get_stationTypeList: [],
      get_StationList: [],
      TotalPage: 0,
      loading: false
    }
  },
  methods: {
    stationSearch () {
      this.getStationList()
    },
    getStationList () {
      this.loading = true
      StationList(this.page, this.pageSize, this.formInline.name, this.formInline.type).then(data => {
        if (data.status === 0) {
          this.get_StationList = data.data.List
          this.TotalPage = data.data.TotalPage
        } else {
          this.$message({
            message: data.data.message,
            type: 'error'
          })
        }
        this.loading = false
      })
      .catch(() => {
        this.loading  = false
      })
    },
    StationState(row) {
      return row.StationState === 1 ? '正常' : '异常'
    },
    Encoding (row) {
      return row.StationEncoding.substr(row.StationEncoding.lastIndexOf('-') + 1)
    },
    currentChange (currentPage) {
      this.page = currentPage
      this.getStationList()
    },
  },
  mounted () {
    this.getStationList()
    getStationTypeList().then(data => {
      this.get_stationTypeList = this.get_stationTypeList.concat(data.data)
    })
  }
}
</script>
<style lang="less">
  .stationinfo{
    padding: 20px;
    padding-top: 60px;
    .stationinfoList{
      text-align: center;
      .el-table th{
        text-align: center;
      }
      .StationEncoding{
        cursor: pointer;
      }
    }
    .pagination{
      text-align: right;
      margin-top: 20px;
    }
  }
</style>
