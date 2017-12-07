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
                    <div class="tools" @click="collapse">
                        <i class="fa fa-align-justify"></i>
                    </div>
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
            };
        },
        methods: {
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                // console.log(key, keyPath);
            },
            collapse() {
                this.isCollapse = !this.isCollapse;
            },
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
  
</style>