<template>
  <div class="category">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品分类</el-breadcrumb-item>
      </el-breadcrumb>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-button type="success" plain @click="addCategory">添加分类</el-button>
      </el-col>
    </el-row>
    <tree-grid
      :treeStructure="true"
      :columns="columns"
      :data-source="dataSource"
      @deleteCate="deleteCategory"
      @editCate="editCategory"
    >
    </tree-grid>

    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <!-- 添加分类对话框 -->
    <el-dialog title="添加分类" :visible.sync="addDialogFormVisible">
      <el-form :model="addForm" label-width="80px" :rules="rules" ref="addCateForm">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addForm.cat_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="父级名称">
          <el-cascader
            :options="options"
            v-model="selectedOptions"
            :props="props"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCateSubmit('addCateForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import TreeGrid from '@/components/TreeGrid/TreeGrid'
import {getCategories, addCategories} from '@/api'
export default {
  data () {
    return {
      addForm: {
        cat_name: '',
        cat_pid: 0,
        cat_level: 0
      },
      options: [], // 级联选择器的数据源
      selectedOptions: [], // 级联选择器选中后的数据
      // props表示配置级联选择器展示的数据字段
      props: {
        value: 'cat_id',
        label: 'cat_name'
      },
      addDialogFormVisible: false,
      dataSource: [],
      total: 0,
      pagenum: 1,
      pagesize: 10,
      columns: [{
        text: '分类名称',
        dataIndex: 'cat_name',
        width: ''
      }, {
        text: '是否有效',
        dataIndex: 'cat_deleted',
        width: ''
      }, {
        text: '排序',
        dataIndex: 'cat_level',
        width: ''
      }],
      rules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    TreeGrid
  },
  created () {
    this.initList()
  },
  methods: {
    deleteCategory (cid) {
      console.log(cid)
    },
    editCategory (cid) {
      console.log(cid)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.initList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.initList()
    },
    initList () {
      getCategories({type: '3', pagenum: this.pagenum, pagesize: this.pagesize}).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          this.total = res.data.total
          this.dataSource = res.data.result
        }
      })
    },
    handleChange (value) {
      console.log(value)
    },
    addCategory () {
      this.addDialogFormVisible = true
      getCategories({type: '2'}).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          this.options = res.data
        }
      })
    },
    addCateSubmit (formName) {
      this.$refs[formName].validate(valide => {
        if (valide) {
          if (this.selectedOptions.length === 0) {
            this.addForm.cat_pid = 0
            this.addForm.cat_level = 0
          } else if (this.selectedOptions.length === 1) {
            this.addForm.cat_pid = this.selectedOptions[this.selectedOptions.length - 1]
            this.addForm.cat_level = 1
          } else {
            this.addForm.cat_pid = this.selectedOptions[this.selectedOptions.length - 1]
            this.addForm.cat_level = 2
          }
          addCategories(this.addForm).then(res => {
            if (res.meta.status === 201) {
              this.addDialogFormVisible = false
              this.initList()
              this.$message({
                type: 'success',
                message: res.meta.msg
              })
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.category {
  .page {
    padding: 5px 0;
    background-color: #D3DCE6;
  }
}
</style>
