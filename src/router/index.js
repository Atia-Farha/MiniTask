import { createRouter, createWebHistory } from 'vue-router';

import DashboardLayout from '@/layouts/DashboardLayout.vue';
import HomeView from '@/views/marketing/HomeView.vue';

const OverviewView = () => import('@/views/dashboard/OverviewView.vue');
const TasksView = () => import('@/views/dashboard/TasksView.vue');

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		// Marketing routes
		{
			path: '/',
			name: 'home',
			component: HomeView,
			meta: { title: 'Home' },
		},

		// Dashboard routes
		{
			path: '/dashboard',
			component: DashboardLayout,
			children: [
				{
					path: '',
					name: 'overview',
					component: OverviewView,
					meta: { title: 'Overview' },
				},
				{
					path: 'tasks',
					name: 'tasks',
					component: TasksView,
					meta: { title: 'Tasks' },
				},
			],
		},
	],
});

router.afterEach((to) => {
	document.title = (to.meta.title || 'MiniTask') + ' | MiniTask';
});

export default router;
