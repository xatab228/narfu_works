import {createRouter, createWebHistory} from 'vue-router'
import CellurarAutomationPage from "@/views/CellurarAutomationPage.vue";
export enum ROUTES {
    MAIN_PAGE = '/',
    SETTINGS = '/settings',
    CELLURAR_AUTOMATION = '/celluarar',
    PARALLEL_SORTING = '/parallel',
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: ROUTES.MAIN_PAGE,
            name: 'MainPage',
            component: () => import('@/views/MainPage.vue')
        },
        {
            path: ROUTES.CELLURAR_AUTOMATION,
            name: 'CellurarAutomation',
            component: CellurarAutomationPage,
        },
        {
            path: ROUTES.SETTINGS,
            name: 'Settings',
            component: () => import('@/views/SettingsPage.vue')
        },
        {
            path: ROUTES.PARALLEL_SORTING,
            name: 'ParallelSorting',
            component: () => import('@/views/ParallelSorting.vue')
        },
    ]
})

export default router
