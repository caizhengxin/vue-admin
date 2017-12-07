<template>
    <el-container class="container">
        <el-container class="con-top">
            <el-menu default-active="$route.path"
              id="nav-left"
              :class="isCollapse ? 'nav-collapse-width' : 'nav-width'"
              @open="handleOpen"
              @close="handleClose"
              :collapse="isCollapse"
              background-color="#eef1f6"
              text-color="#48576a"
              unique-opened
              router>
                <el-header>{{ isCollapse ? '' : logName }}</el-header>
                <template v-for="(item, index) in $router.options.routes" v-if="!item.hidden">
                    <el-submenu :index="index + ''" v-if="!item.leaf">
                        <template slot="title">
                            <i :class="item.iconCls"></i>
                            <span slot="title">{{ item.name }}</span>
                        </template>
                        <el-menu-item v-for="child in item.children" :index="item.path + '/' + child.path" v-if="!child.hidden">
                            <span slot="title">{{ child.name }}</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item v-if="item.leaf && item.children.length > 0" :index="item.path + '/' + item.children[0].path">
                        <i :class="item.iconCls"></i>
                        <span slot="title">{{ item.children[0].name }}</span>
                    </el-menu-item>
                </template>
            </el-menu>
            <el-container :class="isCollapse ? 'main-box-collapse-width': 'main-box'">
                <el-header>
                        <span class="tools" @click="collapse">
                            <i class="fa fa-align-justify"></i>
                        </span>
                        <el-dropdown trigger="hover" class="avatar">
                            <span class="el-dropdown-link"><span>{{User}}</span><img :src="this.Avatar" alt="avatar" width="40px" height="40px"></span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>我的消息</el-dropdown-item>
                                <el-dropdown-item>设置</el-dropdown-item>
                                <el-dropdown-item divided @click.native="handleLogout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                </el-header>
                <el-main>
                    <el-row>
                        <el-col :span="24" class="breadcrumb-container">
                            <strong class="main-title">{{ $route.name }}</strong>
                            <el-breadcrumb separator="/" class="breadcrumb">
                                <el-breadcrumb-item v-for="item in $route.matched" :key="item.path" class="breadcrumb-item">
                                    {{ item.name }}
                                </el-breadcrumb-item>
                            </el-breadcrumb>
                        </el-col>
                    </el-row>
                    <transition name="fade" mode="out-in">
                        <keep-alive>
                            <router-view v-if="$route.meta.keepAlive"></router-view>
                        </keep-alive>
                        <router-view v-if="!$route.meta.keepAlive"></router-view>
                    </transition>
                </el-main>
            </el-container>
        </el-container>
        <!-- <el-footer>Footer</el-footer> -->
    </el-container>
</template>

<script>
    export default {
        data() {
            return {
                isCollapse: false,
                logName: "CAIXIN",

                Avatar: '',
                User: '',
            };
        },
        methods: {
            handleOpen: function(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleClose: function(key, keyPath) {
                // console.log(key, keyPath);
            },
            collapse: function() {
                this.isCollapse = !this.isCollapse;
            },
            handleLogout: function() {
                this.$confirm('确认退出吗？', '提示', {
                    type: 'warning',
                }).then(() => {
                    sessionStorage.removeItem('user');
                    this.$router.push('/cms/login')
                }).catch(() => {

                })
            }
        },
        mounted() {
            var user = sessionStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
                this.User = user.name || '';
                this.Avatar = user.avatar || '';
            }
        }
    }
</script>

<style>
    .container {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
    }

    .el-header, .el-footer {
        background-color: #20a0ff;
        color: #fff;
        line-height: 60px;
    }

    #nav-left .el-header {
        font-size: 22px;
        /*padding-left: 20px;*/
        /*padding-right: 20px;*/
        border-color: hsla(62, 77%, 76%, .3);
        border-right-width: 1px;
        border-right-style: solid;
    }

    .el-footer {
        background-color: #222D32;
    }
  
    #nav-left {
        color: #333;
        background-color: #eef1f6;
        /*overflow-y: hidden;*/
        /*overflow-x: hidden;*/
    }

    #nav-left li {
        text-align: left;
    }

    .tools {
        width: 30px;
        cursor: pointer;
        float: left;
        margin-left: 10px;
    }

    .nav-collapse-width {
        width: 65px !important;
        /*width: 4.2% !important;*/
    }

    .nav-width {
        /*width: 220px !important;*/
        width: 14% !important;
    }

    .main-box {
        width: 84% !important;
        /*width: 100% !important;*/
    }

    .main-box-collapse-width {
        width: 95.8% !important;
        /*width: 100% !important;*/
    }

    .breadcrumb{
        float: right;
    }

    .breadcrumb-item span {
        font-weight: normal
    }

    .breadcrumb-item:last-child span {
        color: #97a8be !important;
    }

    .breadcrumb-container {
        margin-bottom: 30px;
    }

    .main-title {
        float: left;
        color: #475669;
    }

    .avatar {
        cursor: pointer;
        float: right;
    }

    .avatar span {
        color: #fff;
    }

    .avatar img {
        border-radius: 20px;
        vertical-align: middle;
        margin: 0 20px 0 10px;
    }
</style>