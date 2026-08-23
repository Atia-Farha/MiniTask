<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { Layers, CheckCircle2, Clock, AlertTriangle, ArrowRight, BarChart3 } from '@lucide/vue';
import { useTaskStore } from '@/stores/taskStore';

const taskStore = useTaskStore();

const dashboardStats = computed(() => [
	{
		label: 'Total Tasks',
		value: taskStore.totalTaskCount,
		icon: Layers,
		accent: 'bg-primary',
	},
	{
		label: 'Completed',
		value: taskStore.completedTaskCount,
		icon: CheckCircle2,
		accent: 'bg-success',
	},
	{
		label: 'In Progress',
		value: taskStore.inProgressCount,
		icon: Clock,
		accent: 'bg-info',
	},
	{
		label: 'High Priority',
		value: taskStore.highPriorityCount,
		icon: AlertTriangle,
		accent: 'bg-danger',
	},
]);

const priorityBreakdownData = computed(() => {
	const totalTasks = taskStore.totalTaskCount || 1;
	return [
		{
			label: 'High',
			count: taskStore.highPriorityCount,
			color: 'bg-danger',
			width: (taskStore.highPriorityCount / totalTasks) * 100,
		},
		{
			label: 'Medium',
			count: taskStore.mediumPriorityCount,
			color: 'bg-warning',
			width: (taskStore.mediumPriorityCount / totalTasks) * 100,
		},
		{
			label: 'Low',
			count: taskStore.lowPriorityCount,
			color: 'bg-success',
			width: (taskStore.lowPriorityCount / totalTasks) * 100,
		},
	];
});

const statusBreakdownData = computed(() => {
	const totalTasks = taskStore.totalTaskCount || 1;
	return [
		{
			label: 'To Do',
			count: taskStore.todoCount,
			color: 'bg-muted',
			width: (taskStore.todoCount / totalTasks) * 100,
		},
		{
			label: 'In Progress',
			count: taskStore.inProgressCount,
			color: 'bg-primary',
			width: (taskStore.inProgressCount / totalTasks) * 100,
		},
		{
			label: 'Done',
			count: taskStore.completedTaskCount,
			color: 'bg-success',
			width: (taskStore.completedTaskCount / totalTasks) * 100,
		},
	];
});

const progressRingCircumference = 2 * Math.PI * 45;
const progressRingDashOffset = computed(() => progressRingCircumference - (taskStore.completionPercentage / 100) * progressRingCircumference);

const statusBadgeStyles = {
	todo: 'bg-muted/10 text-muted',
	'in-progress': 'bg-info/10 text-info',
	done: 'bg-success/10 text-success',
};
const statusDisplayLabels = {
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
			<div v-for="stat in dashboardStats" :key="stat.label" class="group relative overflow-hidden rounded-xl border border-border bg-card-bg p-4 shadow-card transition hover:shadow-card-hover">
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

					<span class="text-xs text-muted">{{ taskStore.completedTaskCount }} of {{ taskStore.totalTaskCount }}</span>
				</div>

				<div class="mt-5 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
					<!-- Ring -->
					<div class="relative size-32 shrink-0">
						<svg class="size-32 -rotate-90" viewBox="0 0 100 100">
							<circle cx="50" cy="50" r="45" fill="none" stroke-width="7" class="stroke-border-light" />

							<circle cx="50" cy="50" r="45" fill="none" stroke-width="7" stroke-linecap="round" class="stroke-primary transition-all duration-500" :stroke-dasharray="progressRingCircumference" :stroke-dashoffset="progressRingDashOffset" />
						</svg>

						<div class="absolute inset-0 grid place-items-center">
							<div class="text-center">
								<p class="text-2xl font-bold text-ink">{{ taskStore.completionPercentage }}<span class="text-sm text-muted">%</span></p>

								<p class="text-[10px] font-medium uppercase tracking-wider text-muted">Done</p>
							</div>
						</div>
					</div>

					<!-- Status bars -->
					<div class="flex-1 space-y-3.5">
						<div v-for="statusItem in statusBreakdownData" :key="statusItem.label">
							<div class="flex items-center justify-between">
								<div class="flex items-center gap-2">
									<span class="size-1.5 rounded-full" :class="statusItem.color"></span>

									<span class="text-xs font-medium text-ink">{{ statusItem.label }}</span>
								</div>

								<span class="text-xs tabular-nums text-muted">{{ statusItem.count }}</span>
							</div>

							<div class="mt-1.5 h-1.5 overflow-hidden rounded-full bg-border-light">
								<div class="h-full rounded-full transition-all duration-500" :class="statusItem.color" :style="{ width: `${statusItem.width}%` }"></div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Priority breakdown -->
			<div class="rounded-xl border border-border bg-card-bg p-5 shadow-card">
				<h2 class="text-xs font-semibold uppercase tracking-wider text-muted">Priority</h2>

				<div class="mt-4 space-y-3.5">
					<div v-for="priorityItem in priorityBreakdownData" :key="priorityItem.label">
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-2">
								<span class="size-1.5 rounded-full" :class="priorityItem.color"></span>

								<span class="text-xs font-medium text-ink">{{ priorityItem.label }}</span>
							</div>

							<span class="text-xs tabular-nums text-muted">{{ priorityItem.count }}</span>
						</div>

						<div class="mt-1.5 h-1.5 overflow-hidden rounded-full bg-border-light">
							<div class="h-full rounded-full transition-all duration-500" :class="priorityItem.color" :style="{ width: `${priorityItem.width}%` }"></div>
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

			<div v-if="taskStore.tasks.length > 0" class="mt-4 divide-y divide-border-light">
				<div v-for="recentTask in taskStore.tasks.slice(0, 5)" :key="recentTask.id" class="flex items-center gap-3 rounded-lg px-2 py-2.5 transition hover:bg-column-bg/50 -mx-2 first:mt-0 last:mb-0">
					<div class="min-w-0 flex-1">
						<p class="truncate text-sm font-medium text-ink">{{ recentTask.title }}</p>
					</div>

					<span class="shrink-0 rounded-md px-2 py-0.5 text-[11px] font-semibold" :class="statusBadgeStyles[recentTask.status]">{{ statusDisplayLabels[recentTask.status] }}</span>
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
