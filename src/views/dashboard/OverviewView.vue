<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { Layers, CheckCircle2, Clock, AlertTriangle, ArrowRight, BarChart3 } from '@lucide/vue';
import { useTaskStore } from '@/stores/taskStore';

const store = useTaskStore();

const stats = computed(() => [
	{
		label: 'Total Tasks',
		value: store.total,
		icon: Layers,
		accent: 'bg-primary',
	},
	{
		label: 'Completed',
		value: store.doneCount,
		icon: CheckCircle2,
		accent: 'bg-success',
	},
	{
		label: 'In Progress',
		value: store.inProgressCount,
		icon: Clock,
		accent: 'bg-info',
	},
	{
		label: 'High Priority',
		value: store.highCount,
		icon: AlertTriangle,
		accent: 'bg-danger',
	},
]);

const priorityBreakdown = computed(() => {
	const total = store.total || 1;
	return [
		{
			label: 'High',
			count: store.highCount,
			color: 'bg-danger',
			width: (store.highCount / total) * 100,
		},
		{
			label: 'Medium',
			count: store.mediumCount,
			color: 'bg-warning',
			width: (store.mediumCount / total) * 100,
		},
		{
			label: 'Low',
			count: store.lowCount,
			color: 'bg-success',
			width: (store.lowCount / total) * 100,
		},
	];
});

const statusBreakdown = computed(() => {
	const total = store.total || 1;
	return [
		{
			label: 'To Do',
			count: store.todoCount,
			color: 'bg-muted',
			width: (store.todoCount / total) * 100,
		},
		{
			label: 'In Progress',
			count: store.inProgressCount,
			color: 'bg-primary',
			width: (store.inProgressCount / total) * 100,
		},
		{
			label: 'Done',
			count: store.doneCount,
			color: 'bg-success',
			width: (store.doneCount / total) * 100,
		},
	];
});

const circumference = 2 * Math.PI * 45;
const dashOffset = computed(() => circumference - (store.progress / 100) * circumference);

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
		<!-- Page header -->
		<div>
			<h1 class="text-lg font-bold text-ink">Overview</h1>

			<p class="mt-0.5 text-sm text-muted">Your task dashboard at a glance.</p>
		</div>

		<!-- Stats cards -->
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

		<!-- Progress + Priority row -->
		<div class="grid gap-3 lg:grid-cols-[1fr_300px]">
			<!-- Progress ring + status breakdown -->
			<div class="rounded-xl border border-border bg-card-bg p-5 shadow-card">
				<div class="flex items-center justify-between">
					<h2 class="text-xs font-semibold uppercase tracking-wider text-muted">Task Progress</h2>

					<span class="text-xs text-muted">{{ store.doneCount }} of {{ store.total }}</span>
				</div>

				<div class="mt-5 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
					<!-- Ring -->
					<div class="relative size-32 shrink-0">
						<svg class="size-32 -rotate-90" viewBox="0 0 100 100">
							<circle cx="50" cy="50" r="45" fill="none" stroke-width="7" class="stroke-border-light" />

							<circle cx="50" cy="50" r="45" fill="none" stroke-width="7" stroke-linecap="round" class="stroke-primary transition-all duration-500" 						:stroke-dasharray="circumference" :stroke-dashoffset="dashOffset" />
						</svg>

						<div class="absolute inset-0 grid place-items-center">
							<div class="text-center">
								<p class="text-2xl font-bold text-ink">{{ store.progress }}<span class="text-sm text-muted">%</span></p>

								<p class="text-[10px] font-medium uppercase tracking-wider text-muted">Done</p>
							</div>
						</div>
					</div>

					<!-- Status bars -->
					<div class="flex-1 space-y-3.5">
						<div v-for="item in statusBreakdown" :key="item.label">
							<div class="flex items-center justify-between">
								<div class="flex items-center gap-2">
									<span class="size-1.5 rounded-full" :class="item.color"></span>

									<span class="text-xs font-medium text-ink">{{ item.label }}</span>
								</div>

								<span class="text-xs tabular-nums text-muted">{{ item.count }}</span>
							</div>

							<div class="mt-1.5 h-1.5 overflow-hidden rounded-full bg-border-light">
								<div class="h-full rounded-full transition-all duration-500" :class="item.color" :style="{ width: `${item.width}%` }"></div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Priority breakdown -->
			<div class="rounded-xl border border-border bg-card-bg p-5 shadow-card">
				<h2 class="text-xs font-semibold uppercase tracking-wider text-muted">Priority</h2>

				<div class="mt-4 space-y-3.5">
					<div v-for="item in priorityBreakdown" :key="item.label">
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-2">
								<span class="size-1.5 rounded-full" :class="item.color"></span>

								<span class="text-xs font-medium text-ink">{{ item.label }}</span>
							</div>

							<span class="text-xs tabular-nums text-muted">{{ item.count }}</span>
						</div>

						<div class="mt-1.5 h-1.5 overflow-hidden rounded-full bg-border-light">
							<div class="h-full rounded-full transition-all duration-500" :class="item.color" :style="{ width: `${item.width}%` }"></div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Recent tasks -->
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

			<div v-else class="mt-6 flex flex-col items-center py-6 text-center">
				<BarChart3 class="text-muted/20" :size="28" />

				<p class="mt-2.5 text-sm font-medium text-muted">No tasks yet</p>

				<p class="mt-0.5 text-xs text-muted/60">Create your first task to see it here.</p>
			</div>
		</div>
	</div>
</template>
