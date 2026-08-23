import { createRouter, createWebHistory } from 'vue-router';

// Layouts
import DashboardLayout from '@/layouts/DashboardLayout.vue';

// Marketing Views
import HomeView from '@/views/marketing/HomeView.vue';

// Dashboard Views
import OverviewView from '@/views/dashboard/OverviewView.vue';
import TasksView from '@/views/dashboard/TasksView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		// Marketing Routes
		{
			path: '/',
			name: 'home',
			component: HomeView,
			meta: {
				title: 'Home',
			},
		},

		// Dashboard Routes
		{
			path: '/dashboard',
			component: DashboardLayout,
			children: [
				{
					path: '',
					name: 'overview',
					component: OverviewView,
					meta: {
						title: 'Overview',
						subtitle: 'Your task summary at a glance.',
					},
				},
				{
					path: 'tasks',
					name: 'tasks',
					component: TasksView,
					meta: {
						title: 'Tasks',
						subtitle: 'Organize and manage your tasks.',
					},
				},
			],
		},
	],
});

router.afterEach((to) => {
	document.title = (to.meta.title || 'MiniTask') + ' | MiniTask';
});

export default router;
