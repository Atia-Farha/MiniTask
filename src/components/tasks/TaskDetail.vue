<script setup>
import { ref } from 'vue';
import { ChevronDown, FileText, Pencil, Trash2 } from '@lucide/vue';
import ConfirmDialog from '@/components/ui/ConfirmDialog.vue';

const props = defineProps({
	task: { type: Object, required: true },
});

const emit = defineEmits(['close', 'status-change', 'edit', 'delete']);

const showConfirm = ref(false);

const statusOptions = [
	{ value: 'todo', label: 'To Do' },
	{ value: 'in-progress', label: 'In Progress' },
	{ value: 'done', label: 'Done' },
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

function onStatusChange(event) {
	emit('status-change', props.task.id, event.target.value);
}

function onEdit() {
	emit('edit', props.task);
	emit('close');
}

function onDelete() {
	emit('delete', props.task.id);
	emit('close');
}
</script>

<template>
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm" @click.self="emit('close')">
		<div class="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-card-bg shadow-modal">
			<div class="shrink-0 px-6 py-4 border-b border-border">
				<h3 class="text-lg font-bold text-primary leading-snug">
					{{ task.title }}
				</h3>

				<div class="mt-3 flex flex-wrap items-center gap-2">
					<div class="flex items-center gap-1.5 rounded-lg bg-column-bg px-3 py-1.5">
						<span class="size-2 rounded-full" :class="priorityConfig[task.priority].dot"></span>
						<span class="text-xs font-semibold text-ink">{{ priorityConfig[task.priority].label }} Priority</span>
					</div>

					<div class="relative">
						<select :value="task.status" class="appearance-none rounded-lg border border-border bg-column-bg py-1.5 pl-3 pr-7 text-xs font-semibold text-ink outline-none transition hover:border-primary/30 focus:border-primary focus:ring-1 focus:ring-primary/10" @change="onStatusChange">
							<option v-for="opt in statusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
						</select>

						<ChevronDown class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted/50" :size="12" />
					</div>
				</div>
			</div>

			<div class="min-h-0 flex-1 overflow-y-auto px-6 py-4">
				<div class="mb-2 flex items-center gap-1.5">
					<FileText class="text-muted/50" :size="13" />
					<span class="text-[11px] font-semibold uppercase tracking-wider text-muted/60">Description</span>
				</div>

				<div v-if="task.description" class="rounded-xl pt-2">
					<p class="text-sm leading-relaxed text-ink/80 whitespace-pre-wrap">{{ task.description }}</p>
				</div>

				<p v-else class="text-sm text-muted/40 italic">No description provided.</p>
			</div>

			<div class="flex shrink-0 gap-2 border-t border-border px-6 py-4">
				<button class="btn btn-secondary btn-md flex-1 rounded-xl" @click="emit('close')">Close</button>

				<button class="btn btn-primary btn-md flex-1 rounded-xl" @click="onEdit">
					<Pencil :size="14" />
					Edit
				</button>

				<button class="btn btn-danger btn-md rounded-xl px-3" @click="showConfirm = true">
					<Trash2 :size="14" />
				</button>
			</div>
		</div>

		<Teleport to="body">
			<ConfirmDialog v-if="showConfirm" message="Are you sure you want to delete this task?" confirm-label="Delete" @confirm="onDelete" @cancel="showConfirm = false" />
		</Teleport>
	</div>
</template>
