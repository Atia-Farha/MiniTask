<script setup>
const columns = [
	{
		accent: 'bg-muted/40',
		title: 'To Do',
		count: 2,
		cards: [
			{ title: 'Design landing page', priority: 'high' },
			{ title: 'Write API docs', priority: 'medium' },
		],
	},
	{
		accent: 'bg-primary',
		title: 'In Progress',
		count: 1,
		cards: [{ title: 'Implement auth flow', description: 'OAuth2 integration with Google', priority: 'high' }],
	},
	{
		accent: 'bg-success',
		title: 'Done',
		count: 2,
		cards: [
			{ title: 'Set up repo', priority: 'low' },
			{ title: 'Install dependencies', priority: 'low' },
		],
	},
];

const priorityStyles = {
	high: { bar: 'bg-danger', badge: 'border-danger/20 bg-danger/10 text-danger', dot: 'bg-danger' },
	medium: { bar: 'bg-warning', badge: 'border-warning/20 bg-warning/10 text-warning', dot: 'bg-warning' },
	low: { bar: 'bg-success', badge: 'border-success/20 bg-success/10 text-success', dot: 'bg-success' },
};
</script>

<template>
	<div class="relative mx-auto w-full select-none overflow-hidden sm:overflow-visible">
		<div class="rounded-[1.65rem] border border-white/75 bg-surface p-3 sm:p-4 shadow">
			<div class="overflow-hidden rounded-2xl border border-primary/10 bg-board-bg">
				<!-- Browser chrome -->

				<div class="flex items-center gap-2 border-b border-primary/10 bg-surface px-4 py-3">
					<span class="size-2.5 rounded-full bg-primary-light"></span>
					<span class="size-2.5 rounded-full bg-primary/50"></span>
					<span class="size-2.5 rounded-full bg-primary/20"></span>
					<span class="ml-2 h-2 w-24 rounded-full bg-primary/10"></span>
				</div>

				<!-- Board -->

				<div class="overflow-x-auto">
					<div class="grid min-w-120 grid-cols-3 gap-2.5 p-3">
						<div v-for="column in columns" :key="column.title" class="rounded-xl border border-border bg-column-bg/50 p-2.5">
							<div class="mb-2.5 flex items-center gap-1.5">
								<span class="size-1.5 rounded-full" :class="column.accent"></span>
								<span class="text-[9px] font-bold uppercase tracking-wider text-muted">{{ column.title }}</span>
								<span class="grid size-3.5 place-items-center rounded bg-column-bg text-[8px] font-bold text-muted">{{ column.count }}</span>
							</div>

							<div class="space-y-2">
								<div v-for="card in column.cards" :key="card.title" class="relative rounded-lg border border-border bg-card-bg p-2.5 shadow-card" :class="{ 'opacity-60': column.title === 'Done' }">
									<div class="absolute left-0 top-2.5 h-6 w-0.5 rounded-r-full" :class="priorityStyles[card.priority].bar"></div>

									<p class="pl-1.5 text-[10px] font-semibold" :class="column.title === 'Done' ? 'text-muted line-through decoration-2 decoration-muted/60' : 'text-ink'">
										{{ card.title }}
									</p>

									<p v-if="card.description" class="mt-0.5 pl-1.5 text-[8px] leading-relaxed text-muted/60 line-clamp-1">
										{{ card.description }}
									</p>

									<div class="mt-1.5 flex items-center gap-1 pl-1.5">
										<span class="inline-flex items-center gap-0.5 rounded border px-1 py-px text-[7px] font-semibold" :class="priorityStyles[card.priority].badge">
											<span class="size-0.5 rounded-full" :class="priorityStyles[card.priority].dot"></span>
											{{ card.priority === 'high' ? 'High' : card.priority === 'medium' ? 'Medium' : 'Low' }}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Floating stats -->

		<div class="absolute -bottom-7 -left-4 hidden rounded-2xl border border-white/80 bg-surface px-4 py-3 sm:block shadow">
			<p class="text-xs font-semibold text-primary">Pending tasks</p>

			<p class="mt-1 text-xl font-bold">3</p>
		</div>

		<div class="absolute -right-3 top-16 hidden rounded-2xl border border-white/80 bg-surface px-4 py-3 sm:block shadow">
			<p class="text-xs font-semibold text-primary">Tasks complete</p>

			<p class="mt-1 text-xl font-bold text-success">+38%</p>
		</div>
	</div>
</template>
