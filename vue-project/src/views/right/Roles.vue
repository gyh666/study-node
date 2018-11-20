<template>
  <div class="roles">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      </el-breadcrumb>
      </el-col>
    </el-row>
    <el-button type="primary" plain>添加角色</el-button>
    <el-table
      border
      class="mt-15"
      :data="roleList"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-for="firstChildren in scope.row.children" :key="firstChildren.id">
            <el-col :span="4">
              <el-tag closable @close="deleteRight(scope.row, firstChildren.id)">{{firstChildren.authName}}</el-tag>
              <i class="el-icon-arrow-right" v-if="firstChildren.children.length !== 0"></i>
            </el-col>
            <el-col :span="20">
              <el-row v-for="secondChildren in firstChildren.children" :key="secondChildren.id">
                <el-col :span="4">
                  <el-tag closable type="success" @close="deleteRight(scope.row, secondChildren.id)">{{secondChildren.authName}}</el-tag>
                  <i class="el-icon-arrow-right" v-if="secondChildren.children.length !== 0"></i>
                </el-col>
                <el-col :span="20">
                  <el-tag @close="deleteRight(scope.row, thirdChildren.id)" closable type="warning" v-for="thirdChildren in secondChildren.children" :key="thirdChildren.id">
                    {{thirdChildren.authName}}
                    </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row v-if="scope.row.children.length === 0">
            <el-col :span="24">该角色没有分配权限，请前往分配！</el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column
        label="角色名称"
        prop="roleName"
        width="165px">
      </el-table-column>
      <el-table-column
        label="描述"
        prop="roleDesc"
        width="130px">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" plain icon="el-icon-edit"></el-button>
          <el-button size="mini" type="danger" plain icon="el-icon-delete"></el-button>
          <el-button size="mini" type="warning" plain icon="el-icon-check" title="授权角色" @click="showDialog(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="授权角色" :visible.sync="dialogFormVisible">
      <div class="tree-container">
        <el-tree
          :data="rightList"
          show-checkbox
          ref="tree"
          node-key="id"
          :default-expand-all="true"
          :default-checked-keys="selectedRights"
          :props="defaultProps">
        </el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitGrant">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {getRoleList, deleteRoleRight, getRightList, grantRoleRight} from '@/api'
export default {
  data () {
    return {
      roleList: [],
      dialogFormVisible: false,
      rightList: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      selectedRights: [], // 保存默认选中的权限id
      currentRole: {} // 保存点击的角色
    }
  },
  created () {
    this.initList()
  },
  methods: {
    initList () {
      getRoleList().then(res => {
        if (res.meta.status === 200) {
          console.log(res)
          this.roleList = res.data
        }
      })
    },
    deleteRight (row, rightId) {
      deleteRoleRight({roleId: row.id, rightId: rightId}).then(res => {
        if (res.meta.status === 200) {
          row.children = res.data
        } else {
          this.$message({
            type: 'error',
            message: res.meta.msg
          })
        }
      })
    },
    showDialog (row) {
      this.dialogFormVisible = true
      this.currentRole = row
      getRightList({type: 'tree'}).then(res => {
        if (res.meta.status === 200) {
          console.log(res.data)
          this.rightList = res.data
        } else {
          this.$message({
            type: 'error',
            message: res.meta.msg
          })
        }
      })
      // 遍历之前先让数组清空
      this.selectedRights.length = 0
      // 取出当前点击角色的所有权限， 然后遍历到它的第三个children，取出它里面的所有的项的id，让进selectedRights中
      this.currentRole.children.forEach(first => {
        if (first.children && first.children.length !== 0) {
          first.children.forEach(second => {
            if (second.children && second.children.length !== 0) {
              second.children.forEach(third => {
                this.selectedRights.push(third.id)
              })
            }
          })
        }
      })
    },
    // 提交授权
    submitGrant () {
      let rids = this.$refs.tree.getCheckedKeys().join(',')
      grantRoleRight(this.currentRole.id, {rids: rids}).then(res => {
        if (res.meta.status === 200) {
          this.$message({
            type: 'success',
            message: res.meta.msg
          })
          this.dialogFormVisible = false
          this.initList()
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.roles {
  .el-tag {
    margin-right: 5px;
    margin-bottom: 5px;
  }
  .tree-container {
    height: 300px;
    overflow: auto;
  }
}
</style>
