<template>
  <div class="information" v-loading.fullscreen.lock="fullscreenLoading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="informLeft">
      <p>企业名称 :</p>
      <p>企业法人 :</p>
      <p>企业电话 :</p>
      <p>营业执照号 :</p>
      <p>企业规模 :</p>
      <p>经营范围 :</p>
      <p>授权记录 :</p>
    </div>
    <div class="informRight">
      <p>{{BusName}}</p>
      <p>{{LegalPerson}}</p>
      <p>{{BusContactNumber}}</p>
      <p>{{BusinessLicenseNumber}}</p>
      <p>{{Scale}}</p>
      <p>{{BusinessScope}}</p>
      <p class="searches" @click="LookImpower">查看</p>
    </div>
    <div class="clear"></div>
    <!-- 授权记录 -->
    <div class="impower">
      <el-dialog title="授权记录" :visible.sync="impowerVisible" top="15%" width="60%">
        <el-table style="100%" border :data="getSettledbusOrder_list">
          <el-table-column prop="OrderCode" label="订单号"></el-table-column>
          <el-table-column prop="Amount" label="订单金额"></el-table-column>
          <el-table-column prop="StartTime" label="开始时间"></el-table-column>
          <el-table-column prop="ExpireTime" label="到期时间"></el-table-column>
          <el-table-column prop="Remark" label="备注"></el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {getInformation, getSettledbusOrder} from '@/api'
export default {
  data () {
    return {
      information_list: [],
      getSettledbusOrder_list: [],
      fullscreenLoading: false,
      BusName: '',
      LegalPerson: '',
      BusContactNumber: '',
      BusinessLicenseNumber: '',
      Scale: '',
      BusinessScope: '',
      impowerVisible: false
    }
  },
  methods: {
    get_information () {
      this.fullscreenLoading = true
      getInformation().then(data => {
        this.information_list = data
        this.BusName = data.BusName
        this.LegalPerson = data.LegalPerson
        this.BusContactNumber = data.BusContactNumber
        this.BusinessLicenseNumber = data.BusinessLicenseNumber
        this.Scale = data.Scale
        this.BusinessScope = data.BusinessScope
        this.fullscreenLoading = false
      })
      .catch(() => {
        this.fullscreenLoading = false
      })
    },
    get_SettledbusOrder () {
      getSettledbusOrder().then(data => {
        this.getSettledbusOrder_list = data
      })
    },
    LookImpower () {
      this.impowerVisible = true
      this.get_SettledbusOrder()
    }
  },
  mounted () {
    this.get_information()
  }
}
</script>
<style lang="less">
  .information {
    padding-left: 100px;
    padding-top: 50px;
    .informLeft{
      width: 100px;
      float: left;
      p{
        line-height: 60px;
        text-align: right;
      }
    }
    .informRight{
      float: left;
      width: 200px;
      margin-left: 20px;
      p{
        line-height: 60px;
      }
      .searches{
        color: #409eff;
        cursor: pointer;
      }
    }
  }
</style>