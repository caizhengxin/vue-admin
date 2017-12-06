import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/charts/Index.vue'
import Home from '../components/Home.vue'
import Record from '../components/Record.vue'
import Main from '../components/Main.vue'
import Post from '../components/Post.vue'
import HelloWorld from '../components/HelloWorld.vue'
import User from '../components/user/User.vue'
import CMSGroup from '../components/user/CMSGroup.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/cms',
            name: '',
            iconCls: 'iconfont icon-homepage',
            leaf: true,
            component: Main,
            children: [
                {path: '', name: '首页', component: Index, meta: { keepAlive: true } }
            ]
        },
        {
            path: '/cms',
            name: '用户管理',
            iconCls: 'iconfont icon-yonghu',
            component: Main,
            // leaf: true,
            children: [
                {path: 'fontuser', name: '用户管理', component: User, meta: { keepAlive: true }},
                {path: 'cmsuser', name: 'CMS用户管理', component: HelloWorld, meta: { keepAlive: true }},
                {path: 'cmsgroup', name: 'CMS组管理', component: CMSGroup, meta: { keepAlive: true }},
            ]
        },
        {
            path: '/cms',
            name: '',
            iconCls: 'iconfont icon-fangwenjilu',
            leaf: true,
            component: Main,
            children: [
                {path: 'record', name: '访问记录', component: Record, meta: { keepAlive: true }}
            ]
        },
        {
            path: '/cms',
            name: '',
            iconCls: 'iconfont icon-tiezi',
            component: Main,
            leaf: true,
            children: [
                {path: 'post', name: '帖子管理', component: Post, meta: { keepAlive: true }}
            ]
        },
        {
            path: '/cms',
            name: '',
            iconCls: 'iconfont icon-pinglun',
            component: Main,
            leaf: true,
            children: [
                {path: 'comment', name: '评论管理', component: HelloWorld, meta: { keepAlive: true }}
            ]
        },
        {
            path: '/cms',
            name: '',
            iconCls: 'iconfont icon-bankuai',
            component: Main,
            leaf: true,
            children: [
                {path: 'board', name: '板块管理', component: HelloWorld, meta: { keepAlive: true }}
            ]
        },
    ]
})
