import { createRouter, createWebHistory } from 'vue-router';

// Layouts
import MarketingLayout from '@/layouts/MarketingLayout.vue';
import DashboardLayout from '@/layouts/DashboardLayout.vue';

// Marketing Views
import HomeView from '@/views/marketing/HomeView.vue';

// Dashboard Views
import DashboradView from '@/views/dashboard/DashboradView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		// Marketing Routes
		{
			path: '/',
			component: MarketingLayout,
			children: [
				{
					path: '',
					name: 'home',
					component: HomeView,
					meta: {
						title: 'Home',
					},
				},
			],
		},

		// Dashboard Routes
		{
			path: '/dashboard',
			component: DashboardLayout,
			children: [
				{
					path: '',
					name: 'dashboard',
					component: DashboradView,
					meta: {
						title: 'Dashboard',
					},
				},
			],
		},
	],
});

router.afterEach((to) => {
	document.title = to.meta.title + ' | MiniTask' || 'MiniTask';

	const description = document.querySelector('meta[name="description"]');

	if (description && to.meta.description) {
		description.setAttribute('content', to.meta.description || '');
	}
});

export default router;
