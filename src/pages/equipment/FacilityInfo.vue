<template>
  <div class="facility">
    <el-form :inline="true" :model="formFac" class="demo-form-inline">
      <el-form-item>
        <el-input clearable placeholder="设备名称" v-model="formFac.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select placeholder="设备类型" v-model="formFac.typeId">
          <el-option v-for="(equipList, index) in get_EquipTypeList" :key="index" :label="equipList.TypeName" :value="equipList.TypeId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="FacilitySearch(formFac)">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="facilityList">
      <el-table border v-loading="loading" :data="get_EquipList">
        <el-table-column label="设备名称" prop="EquipName"></el-table-column>
        <el-table-column label="设备类别" prop="TypeName"></el-table-column>
        <el-table-column label="园区名称" prop="GardenName"></el-table-column>
        <el-table-column label="设备图标" prop="EquipIcon">
          <template slot-scope="scope">
            <img :src="scope.row.EquipIcon" alt="" style="width:40px;heigint:40px;">
          </template>
        </el-table-column>
        <el-table-column label="销售价格" prop="SalePrice"></el-table-column>
      </el-table>
    </div>
    <el-pagination class="pagination" background layout="prev, pager, next" :total="TotalPage" @current-change="currentChange"></el-pagination>
  </div>
</template>
<script>
import { getEquipList, getEquipTypeList } from '@/api'
export default {
  data () {
    return {
      formFac: {
        name: '',
        typeId: ''
      },
      get_EquipTypeList: [],
      get_EquipList: [],
      TotalPage: 0,
      loading: false
    }
  },
  methods: {
    FacilitySearch () {
      this.getEquipLists()
    },
    getEquipLists () {
      getEquipList(this.page, this.pagesize, this.formFac.name, this.formFac.typeId).then(data => {
        this.loading = true
        if(data.status === 0) {
          this.get_EquipList = data.data.List
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
        this.loading = false
      })
    },
    currentChange (currentPage) {
      this.page = currentPage
      this.getEquipLists()
    }
  },
  mounted () {
    this.getEquipLists()
    getEquipTypeList().then(data => {
      this.get_EquipTypeList = this.get_EquipTypeList.concat(data.data)
    })
  }
}
</script>
<style lang="less">
  .facility{
    padding: 20px;
    padding-top: 60px;
    .facilityList{
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