import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import Home from '../components/Home.vue'
import Main from '../components/Main.vue'
import Index from '../components/charts/Index.vue'
import Record from '../components/nav1/Record.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: '首页',
            iconCls: 'iconfont icon-homepage',
            leaf: true,
            component: Main,
            children: [
                {path: '/index', name: '首页', component: Index, meta: { keepAlive: true } }
            ]
        },
        {
            path: '/',
            name: '',
            iconCls: 'iconfont icon-fangwenjilu',
            leaf: true,
            component: Main,
            children: [
                {path: '/record', name: '访问记录', component: Record, meta: { keepAlive: true }}
            ]
        },
        {
            path: '/',
            name: '',
            iconCls: 'iconfont icon-tiezi',
            component: Main,
            leaf: true,
            children: [
                {path: '/hello', name: '帖子管理', component: HelloWorld, meta: { keepAlive: true }}
            ]
        },
        {
            path: '/',
            name: '',
            iconCls: 'iconfont icon-pinglun',
            component: Main,
            leaf: true,
            children: [
                {path: '/hello', name: '评论管理', component: HelloWorld, meta: { keepAlive: true }}
            ]
        },
        {
            path: '/',
            name: '',
            iconCls: 'iconfont icon-bankuai',
            component: Main,
            leaf: true,
            children: [
                {path: '/hello', name: '板块管理', component: HelloWorld, meta: { keepAlive: true }}
            ]
        },
        {
            path: '/',
            name: '用户管理',
            iconCls: 'iconfont icon-yonghu',
            component: Main,
            // leaf: true,
            children: [
                {path: '/hello', name: '用户管理', component: HelloWorld, meta: { keepAlive: true }},
                {path: '/hello', name: 'CMS用户管理', component: HelloWorld, meta: { keepAlive: true }},
                {path: '/hello', name: 'CMS组管理', component: HelloWorld, meta: { keepAlive: true }},
            ]
        },
    ]
})
