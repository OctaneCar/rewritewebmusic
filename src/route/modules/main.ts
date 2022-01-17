import {RouteRecordRaw} from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'main',
        component: () => import('@/components/main.vue')
    }
]

export default routes