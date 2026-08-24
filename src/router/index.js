import { createRouter, createWebHistory } from 'vue-router';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import HomeView from '@/views/marketing/HomeView.vue';
import OverviewView from '@/views/dashboard/OverviewView.vue';
import TasksView from '@/views/dashboard/TasksView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
			meta: { title: 'Home' },
		},
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
