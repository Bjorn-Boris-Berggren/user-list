import { createRouter, createWebHistory } from 'vue-router';
import UserTable from './components/UserTable.vue';
import UserForm from './components/UserForm.vue';

const routes = [
    {
        path: '/',
        name: 'UserTable',
        component: UserTable
    },
    {
        path: '/add',
        name: 'UserForm',
        component: UserForm
    },
    {
        path: '/edit/:id',
        component: UserForm,
        props: true
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
