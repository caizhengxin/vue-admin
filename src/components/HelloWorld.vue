<template>
    <el-dropdown trigger="hover">
        <span class="el-dropdown-link avatar"><img :src="this.Avatar" /> {{User}}</span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>我的消息</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
  export default {
    data() {
      return {
        Avatar: '',
        User: 'caixin',
      };
    },
    methods: {
    }
  }
</script>
