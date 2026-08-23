<script setup>
import { ref } from 'vue';
import { Pencil, Trash2, ChevronDown } from '@lucide/vue';
import ConfirmDialog from '@/components/ui/ConfirmDialog.vue';

const props = defineProps({
	task: { type: Object, required: true },
});

const emit = defineEmits(['edit', 'delete', 'status-change']);

const isDeleteConfirmVisible = ref(false);

const statusOptions = [
	{
		value: 'todo',
		label: 'To Do',
	},
	{
		value: 'in-progress',
		label: 'In Progress',
	},
	{
		value: 'done',
		label: 'Done',
	},
];

const priorityConfig = {
	low: {
		label: 'Low',
		dot: 'bg-success',
		badge: 'bg-success/10 text-success border-success/20',
	},
	medium: {
		label: 'Medium',
		dot: 'bg-warning',
		badge: 'bg-warning/10 text-warning border-warning/20',
	},
	high: {
		label: 'High',
		dot: 'bg-danger',
		badge: 'bg-danger/10 text-danger border-danger/20',
	},
};

function handleStatusChange(event) {
	emit('status-change', props.task.id, event.target.value);
}
</script>

<template>
	<article class="group relative rounded-xl border border-border bg-card-bg p-4 shadow-card transition hover:shadow-card-hover" :class="{ 'opacity-60': task.status === 'done' }">
		<div class="absolute left-0 top-4 h-8 w-1 rounded-r-full" :class="priorityConfig[task.priority].dot"></div>

		<div class="flex items-start justify-between gap-3">
			<div class="min-w-0 flex-1 pl-2">
				<div class="flex items-center gap-2">
					<h3 class="text-sm font-semibold text-ink leading-snug" :class="{ 'text-muted line-through decoration-2 decoration-muted/60': task.status === 'done' }">
						{{ task.title }}
					</h3>
				</div>

				<p v-if="task.description" class="mt-1.5 text-[13px] leading-relaxed text-muted/70 line-clamp-2">
					{{ task.description }}
				</p>

				<div class="mt-3 flex flex-wrap items-center gap-2">
					<span class="inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[11px] font-semibold" :class="priorityConfig[task.priority].badge">
						<span class="size-1.5 rounded-full" :class="priorityConfig[task.priority].dot"></span>
						{{ priorityConfig[task.priority].label }}
					</span>
				</div>
			</div>

			<div class="flex shrink-0 items-center gap-0.5 opacity-0 transition group-hover:opacity-100">
				<button class="grid size-7 place-items-center rounded-lg text-muted/40 transition hover:bg-primary/10 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary" aria-label="Edit task" @click="emit('edit', task)">
					<Pencil :size="13" />
				</button>

				<button class="grid size-7 place-items-center rounded-lg text-muted/40 transition hover:bg-danger/10 hover:text-danger focus-visible:ring-2 focus-visible:ring-red-400" aria-label="Delete task" @click="isDeleteConfirmVisible = true">
					<Trash2 :size="13" />
				</button>
			</div>
		</div>

		<div class="mt-3 flex items-center gap-2 border-t border-border-light pt-2.5">
			<div class="relative">
				<select :value="task.status" class="appearance-none rounded-lg border border-border bg-column-bg py-1 pl-2 pr-6 text-[11px] font-medium text-muted outline-none transition hover:border-primary/30 focus:border-primary focus:ring-1 focus:ring-primary/10" @change="handleStatusChange">
					<option v-for="statusOption in statusOptions" :key="statusOption.value" :value="statusOption.value">{{ statusOption.label }}</option>
				</select>

				<ChevronDown class="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-muted/50" :size="12" />
			</div>
		</div>

		<!-- Delete confirmation modal -->
		<ConfirmDialog v-if="isDeleteConfirmVisible" message="Delete this task?" confirm-label="Delete" @confirm="emit('delete', task.id)" @cancel="isDeleteConfirmVisible = false" />
	</article>
</template>
