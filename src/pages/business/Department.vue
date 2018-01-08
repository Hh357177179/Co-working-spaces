<template>
  <div class="department">
    <div>
      <el-input v-model="search" placeholder="部门搜索" clearable class="topInput"></el-input>
      <el-button type="primary" @click="submitSearch(search)">查询</el-button>
      <el-button type="primary" @click="outerVisible=true">新增</el-button>
    </div>
    <el-table :data="department_list" border style="width: 100%"  v-loading="loading">
      <el-table-column prop="AddDate" label="日期"></el-table-column>
      <el-table-column prop="Principal" label="负责人"></el-table-column>
      <el-table-column prop="Phone" label="电话"></el-table-column>
      <el-table-column prop="DepartmentName" label="名称"></el-table-column>
      <el-table-column prop="Remark" label="备注"></el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
      </template>
      </el-table-column>
    </el-table>
    <el-pagination class="pagination" background layout="prev, pager, next" :total="TotalPage" @current-change="currentChange"></el-pagination>
    <!-- 新增弹窗 -->
    <div class="ball">
      <el-dialog title="新建部门" :visible.sync="outerVisible" :show-close = "false" :close-on-click-modal="false">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="部门名称" prop="DepartmentName">
            <el-input v-model="form.DepartmentName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="部门负责人" prop="Principal">
            <el-input v-model="form.Principal" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="Phone">
            <el-input v-model="form.Phone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="Remark">
            <el-input v-model="form.Remark" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm('form')">取 消</el-button>
          <el-button type="primary" @click="addData('form')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 编辑弹窗 -->
    <div class="ball">
      <el-dialog title="编辑部门" :visible.sync="editVisible" :close-on-click-modal="false" :show-close = "false">
        <el-form :model="editform" :rules="rules" ref="editform">
          <el-form-item label="部门名称" prop="DepartmentName">
            <el-input v-model="editform.DepartmentName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="部门负责人" prop="Principal">
            <el-input v-model="editform.Principal" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="Phone">
            <el-input v-model="editform.Phone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="Remark">
            <el-input v-model="editform.Remark" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editVisible=false">取 消</el-button>
          <el-button type="primary" @click="submitEdit('editform')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {getDeparement, newDeparement, editDeparement} from '@/api'
export default {
  data () {
    return {
      form: {
        DepartmentName: '',
        Principal: '',
        Phone: '',
        Remark: ''
      },
      editform: {
        DepartmentName: '',
        Principal: '',
        Phone: '',
        Remark: ''
      },
      department_list: [],
      TotalPage: 0,
      search: '',
      loading: false,
      outerVisible: false,
      innerVisible: false,
      editVisible: false,
      formLabelWidth: '200px',
      rules: {
        DepartmentName: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在3～5个字符', trigger: 'blur' }
        ],
        Principal: [
          { required: true, message: '请输入部门负责人', trigger: 'blur' }
        ],
        Phone: [
          // { required: true, message: '请输入手机号', trigger: 'blur' },
          // { type: 'number', message: '请输入正确的手机号', trigger: 'blur' },
          // { validator: checkPhone, trigger: 'blur' },
          { required: true, pattern: /^1[34578]\d{9}$/, message: '手机号码不符合规格',  trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitSearch () {
      this.get_department()
    },
    addData (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          // console.log(this.form)
          newDeparement(this.form).then(data => {
            if (data.status === 0) {
              this.$alert(data.message, '系统提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.outerVisible = false
                  this.$refs[form].resetFields()
                  this.get_department()
                }
              })
            } else {
               this.$alert(data.message, '系统提示', {
                 confirmButtonText: '确定',
                 callback: action => {
                 }
               })
             }
          })
        }
      })
    },
    currentChange (currentPage) {
      this.page = currentPage
      this.get_department()
    },
    resetForm (form) {
      this.outerVisible = false
      this.$refs[form].resetFields()
    },
    handleEdit (index, row) {
      // console.log(index, row)
      this.editform = Object.assign({}, row)
      this.editVisible = true
    },
    submitEdit (editform) {
      this.$refs[editform].validate((valid) => {
        if (valid) {
          editDeparement(this.editform).then(data => {
          // console.log(data)
            if (data.status === 0) {
              this.$alert(data.message, '系统提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.editVisible = false
                  this.get_department()
                }
              })
            }
          })
        }
      })
    },
    get_department () {
      this.loading = true
      getDeparement(this.page, this.pageSize, this.search).then(data => {
        if (data.status === 0) {
          // console.log(data)
            this.department_list = (data.data.List)
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
    padding-top: 60px;
    .el-input{
      width:70%;
      margin-right: 10px;
    }
    .el-form-item__error{
        left: 100px !important;
      }
    .topInput{
      width: 250px;
      margin-bottom: 20px;
    }
    .pagination{
      text-align: right;
      margin-top: 20px;
    }
    .el-dialog{
      width: 35%;
      .el-form-item__label{
        width: 100px;
      }
    }
    .el-button--mini, .el-button--mini.is-round{
      margin-left: calc(50% - 15px);
    }
  }
</style>
