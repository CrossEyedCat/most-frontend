
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Patients from '../views/Patients.vue';
import Stream from '../views/Stream.vue'
import Service from "@/views/Service.vue";
import Documents from "@/views/Documents.vue";
import Dicom from "@/views/Dicom.vue";
import medStream from "@/views/medStream.vue";
import lk from "@/views/lk.vue";
const routes = [
    { path: '/', name: 'Login', component: Login },
    { path: '/patients', name: 'Patients', component: Patients },
    { path: '/stream', name: 'Stream', component: Stream },
    { path: '/service', name: 'Service', component: Service },
    { path: '/document', name: 'Document', component: Documents },
    { path: '/dicom', name: 'Dicom', component: Dicom },
    { path: '/medStream', name: 'medStream', component: medStream },
    { path: '/lk', name: 'lk', component: lk },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Глобальный охранник маршрутов
/*router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
        // Если токен есть, пытаемся вернуться назад
        if (from.fullPath && from.fullPath !== to.fullPath) {
            // Используем router.go(-1) для перехода на предыдущую страницу
            router.go(-1);
        } else {
            // Если предыдущей страницы нет (например, прямой вход),
            // можно перенаправить куда-либо явно:
            next('/patients');
        }
    } else {
        // Если токена нет, отправляем на страницу логина
        if (to.path !== '/') {
            next({ path: '/' });
        } else {
            next();
        }
    }
});*/
export default router;