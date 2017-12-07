<template>
    <el-form
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
      label-position="left"
      status-icon
      label-width="0px"
      class="login">
        <h3 class="title">系统登录</h3>
        <el-form-item prop="email">
            <el-input type="email" v-model="loginForm.email" auto-complete="off" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码" @keyup.enter.native="handleSubmit"></el-input>
        </el-form-item>
        <el-form-item prop="checked">
            <el-checkbox v-model="checked">记住7天</el-checkbox>
        </el-form-item>
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click.native="handleSubmit" :loading="logining">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<style>
    .login {
        width: 350px;
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }

    .remember {
      margin: 0px 0px 35px 0px;
      text-align: left;
    }
</style>

<script>
    import { CMSLogin } from '../api/api';
    export default {
        data() {
            return {
                logining: false,
                loginForm: {
                    email: '1249614072@qq.com',
                    password: 'caixin'
                },
                loginRules: {
                    email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                        {type: 'email', message: '邮箱格式错误'},
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        {min: 6, max: 20, message: '请输入6-20位的密码'},
                    ]
                },
                checked: false,
            };
        },
        methods: {
            handleSubmit: function() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.logining = true;
                        let para = Object.assign({}, this.loginForm);
                        CMSLogin(para).then(data => {
                            this.logining = false;
                            if (data['code'] !== 200) {
                                this.$message({
                                    message: data['msg'],
                                    type: 'error'
                                });
                            } else {
                                sessionStorage.setItem('user', JSON.stringify(data['user']));
                                this.$router.push({path: '/cms'})
                            }
                        })
                    }
                });
            },
        }
    }
</script>