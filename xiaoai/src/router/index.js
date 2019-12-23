import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        component: Home,
        children: [{
            path: '',
            name: 'index',
            component: () =>
                import ('../views/index/index.vue')
        }]
    },
    {
        path: '/publish',
        component: Home,
        children: [{
            path: '',
            name: 'publish',
            component: () =>
                import ('../views/aside/publish.vue')
        }]
    },
    {
        path: '/statistics',
        component: Home,
        children: [{
            path: '',
            name: 'statistics',
            component: () =>
                import ('../views/aside/statistics.vue')
        }]
    },
    {
        path: '/markdown',
        component: Home,
        children: [{
            path: '',
            name: 'markdown',
            component: () =>
                import ('../views/aside/markdown.vue')
        }]
    },
    {
        path: '/tag',
        component: Home,
        children: [{
            path: '',
            name: 'tag',
            component: () =>
                import ('../views/aside/tag.vue')
        }]
    },
    {
        path: '/table',
        component: Home,
        children: [{
            path: '',
            name: 'table',
            component: () =>
                import ('../views/aside/table.vue')
        }]
    },


    {
        path: '/excel',
        component: Home,
        children: [{
            path: '',
            name: 'excel',
            component: () =>
                import ('../views/aside/excel.vue')
        }]
    },
    {
        path: '/upload',
        component: Home,
        children: [{
            path: '',
            name: 'upload',
            component: () =>
                import ('../views/aside/upload.vue')
        }]
    },
    {
        path: '/total',
        component: Home,
        children: [{
            path: '',
            name: 'total',
            component: () =>
                import ('../views/aside/total.vue')
        }]
    },
    {
        path: '/',
        component: Home,
        children: [{
            path: 'lgout',
            name: 'lgout',
            component: () =>
                import ('../views/aside/lgout.vue')
        }]
    },





    {
        path: '/Login',
        name: 'Login',
        meta: {
            title: "Login"
        },
        component: () =>
            import ('../views/login/Login.vue')
    },
    {
        path: '/Register',
        name: 'Register',
        meta: {
            title: "Register"
        },
        component: () =>
            import ('../views/login/Register.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    let user = localStorage.getItem('username')
    if (to.path === '/Login' || to.path === '/Register') {
        next()
    } else {
        user ? next() : next('/Login')
    }
    next()
})
export default router