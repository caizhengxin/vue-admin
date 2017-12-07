<template>
    <div id="app">
        <!-- <img src="./assets/logo.png"> -->
        <transition name="fade"
                    mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style>
    body {
        margin: 0px;
        padding: 0px;
        font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
        background-color: #fff;
        font-size: 14px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    #app {
        color: #2c3e50;
        text-align: center;
    }

    .el-submenu [class^=iconfont] {
        vertical-align: baseline;
        margin-right: 10px;
    }

    .el-menu-item [class^=iconfont] {
        vertical-align: baseline;
        margin-right: 10px;
    }

    .el-form-item {
        text-align: left;
    }
</style>
