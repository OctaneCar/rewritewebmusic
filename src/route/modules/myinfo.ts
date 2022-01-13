import {RouteRecordRaw} from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: 'user/userInfo',
        name: 'myinfo',
        component: () => import('@/components/myinfo.vue')
    }
]

export default routes