<script setup>
import { computed, defineAsyncComponent } from 'vue';
import { RouterLink } from 'vue-router';
import { Layers, CheckCircle2, Clock, AlertTriangle, ArrowRight, BarChart3 } from '@lucide/vue';
import { useTaskStore } from '@/stores/taskStore';

const ApexChart = defineAsyncComponent(() => import('vue3-apexcharts'));

const store = useTaskStore();

const stats = computed(() => [
	{ label: 'Total Tasks', value: store.total, icon: Layers, accent: 'bg-primary' },
	{ label: 'Completed', value: store.doneCount, icon: CheckCircle2, accent: 'bg-success' },
	{ label: 'In Progress', value: store.inProgressCount, icon: Clock, accent: 'bg-info' },
	{ label: 'High Priority', value: store.highCount, icon: AlertTriangle, accent: 'bg-danger' },
]);

const progressOptions = {
	chart: { type: 'radialBar' },
	plotOptions: { radialBar: { hollow: { size: '60%' } } },
	stroke: { lineCap: 'round' },
	colors: ['#e24790'],
	labels: ['Completed'],
};

const progressSeries = computed(() => [store.progress]);

const priorityOptions = {
	chart: { type: 'bar', stacked: true, toolbar: { show: false } },
	plotOptions: { bar: { horizontal: true, borderRadius: 6 } },
	yaxis: { labels: { show: true, style: { fontSize: '13px', fontWeight: 600, colors: ['#2b1b27'] } } },
	xaxis: { categories: ['High', 'Medium', 'Low'], labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
	grid: { show: false },
	legend: { show: false },
	tooltip: { enabled: false },
};

const prioritySeries = computed(() => [
	{ name: 'High', data: [store.highCount, 0, 0], color: '#dc3545' },
	{ name: 'Medium', data: [0, store.mediumCount, 0], color: '#f59e0b' },
	{ name: 'Low', data: [0, 0, store.lowCount], color: '#1f8a70' },
]);

const statusOptions = {
	chart: { type: 'donut' },
	labels: ['To Do', 'In Progress', 'Done'],
	colors: ['#735f6d', '#e24790', '#1f8a70'],
	plotOptions: { pie: { borderRadius: 6, spacing: 4, donut: { size: '68%' } } },
	stroke: { width: 0 },
	dataLabels: {
		enabled: true,
		formatter: (val, opts) => opts.w.config.series[opts.seriesIndex],
	},
};

const statusSeries = computed(() => [store.todoCount, store.inProgressCount, store.doneCount]);

const statusBadge = {
	todo: 'bg-muted/10 text-muted',
	'in-progress': 'bg-info/10 text-info',
	done: 'bg-success/10 text-success',
};

const statusLabel = {
	todo: 'To Do',
	'in-progress': 'In Progress',
	done: 'Done',
};
</script>

<template>
	<div class="space-y-6">
		<!-- Header -->

		<div>
			<h1 class="text-lg font-bold text-ink">Overview</h1>

			<p class="mt-0.5 text-sm text-muted">Your task dashboard at a glance.</p>
		</div>

		<!-- Stats -->

		<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
			<div v-for="stat in stats" :key="stat.label" class="group relative overflow-hidden rounded-xl border border-border bg-card-bg p-4 shadow-card transition hover:shadow-card-hover">
				<div class="absolute left-0 top-0 h-full w-0.5 rounded-r" :class="stat.accent"></div>

				<div class="flex items-center justify-between">
					<p class="text-xs font-semibold uppercase tracking-wider text-muted">{{ stat.label }}</p>

					<div class="grid size-7 place-items-center rounded-lg bg-column-bg text-muted transition group-hover:text-ink">
						<component :is="stat.icon" :size="14" />
					</div>
				</div>

				<p class="mt-2 text-2xl font-bold tracking-tight text-ink">{{ stat.value }}</p>
			</div>
		</div>

		<!-- Charts -->

		<div class="grid gap-3 lg:grid-cols-3">
			<!-- Task Progress Radial Bar Chart -->

			<div class="rounded-xl border border-border bg-card-bg p-5 shadow-card">
				<div class="flex items-center justify-between">
					<h2 class="text-xs font-semibold uppercase tracking-wider text-muted">Task Progress</h2>

					<span class="text-xs text-muted">{{ store.doneCount }} of {{ store.total }}</span>
				</div>

				<div class="h-full w-full flex justify-center items-center">
					<ApexChart type="radialBar" height="220" :options="progressOptions" :series="progressSeries" />
				</div>
			</div>

			<!-- Priority Bar Chart -->

			<div class="rounded-xl border border-border bg-card-bg p-5 shadow-card">
				<h2 class="text-xs font-semibold uppercase tracking-wider text-muted">Priority</h2>

				<div class="h-full w-full flex justify-center items-center">
					<ApexChart type="bar" :options="priorityOptions" :series="prioritySeries" />
				</div>
			</div>

			<!-- Status Donut Chart -->

			<div class="rounded-xl border border-border bg-card-bg p-5 shadow-card">
				<h2 class="text-xs font-semibold uppercase tracking-wider text-muted">Status</h2>

				<div class="h-full w-full flex justify-center items-center">
					<ApexChart type="donut" :options="statusOptions" :series="statusSeries" />
				</div>
			</div>
		</div>

		<!-- Recent Tasks -->

		<div class="rounded-xl border border-border bg-card-bg p-5 shadow-card">
			<div class="flex items-center justify-between">
				<h2 class="text-xs font-semibold uppercase tracking-wider text-muted">Recent Tasks</h2>

				<RouterLink to="/dashboard/tasks" class="inline-flex items-center gap-1 text-xs font-medium text-primary transition hover:text-hover">
					View all
					<ArrowRight :size="12" />
				</RouterLink>
			</div>

			<div v-if="store.tasks.length > 0" class="mt-4 divide-y divide-border-light">
				<div v-for="task in store.tasks.slice(0, 5)" :key="task.id" class="flex items-center gap-3 rounded-lg px-2 py-2.5 transition hover:bg-column-bg/50 -mx-2 first:mt-0 last:mb-0">
					<div class="min-w-0 flex-1">
						<p class="truncate text-sm font-medium text-ink">{{ task.title }}</p>
					</div>

					<span class="shrink-0 rounded-md px-2 py-0.5 text-[11px] font-semibold" :class="statusBadge[task.status]">{{ statusLabel[task.status] }}</span>
				</div>
			</div>

			<!-- Empty State -->

			<div v-else class="mt-6 flex flex-col items-center py-6 text-center">
				<BarChart3 class="text-muted/20" :size="28" />

				<p class="mt-2.5 text-sm font-medium text-muted">No tasks yet</p>

				<p class="mt-0.5 text-xs text-muted/60">Create your first task to see it here.</p>
			</div>
		</div>
	</div>
</template>
