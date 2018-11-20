<template>
  <div class="home">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="auto">
        <div class="logo"></div>
        <el-menu
          :router="true"
          :unique-opened="true"
          :collapse="isCollapse"
          class="el-menu-admin"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu :index="item.path" v-for="item in menuData" :key="item.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="tag.path" v-for="tag in item.children" :key="tag.id">
              <i class="el-icon-menu"></i>
              <span slot="title">{{tag.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>

        <!-- header部分 -->
        <el-header>
          <i class="myicon myicon-menu toggle-btn" @click="toggleCollapse"></i>
          <div class="system-title">电商后台管理系统</div>
          <div>
            <span class="welcome">
              您好，{{$store.getters.username}}
            </span>
            <el-button type="text" @click="logout">退出</el-button>
          </div>
        </el-header>

        <!-- 中间内容部分 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { getUserList, getMenus } from "@/api";
export default {
  data() {
    return {
      isCollapse: false,
      menuData: []
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    logout() {
      // 清除登录状态，即保存在localStorage中的token
      localStorage.removeItem("mytoken");
      // 跳转到登录页面
      this.$router.push({ name: "Login" });
    }
  },
  created() {
    getMenus().then(res => {
      if (res.meta.status === 200) {
        this.menuData = res.data;
      }
    });
  },
  mounted() {
    let params = { params: { query: "", pagenum: 1, pagesize: 1 } };
    getUserList(params).then(res => {
      console.log(res);
    });
  }
};
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #989898;
  }
  .toggle-btn {
    font-size: 36px;
    color: #989898;
    cursor: pointer;
    line-height: 60px;
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
</style>
