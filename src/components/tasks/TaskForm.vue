<script setup>
import { ref } from 'vue';
import { X } from '@lucide/vue';

const props = defineProps({
	editTask: { type: Object, default: null },
});

const emit = defineEmits(['submit', 'cancel']);

const title = ref(props.editTask?.title ?? '');
const desc = ref(props.editTask?.description ?? '');
const priority = ref(props.editTask?.priority ?? 'medium');
const error = ref('');

function submit() {
	error.value = '';
	if (!title.value.trim()) {
		error.value = 'Please enter a task title.';
		return;
	}
	emit('submit', {
		title: title.value.trim(),
		description: desc.value.trim(),
		priority: priority.value,
	});
	if (!props.editTask) {
		title.value = '';
		desc.value = '';
		priority.value = 'medium';
	}
}

function cancel() {
	error.value = '';
	emit('cancel');
}
</script>

<template>
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm" @click.self="cancel">
		<div class="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card-bg shadow-modal">
			<!-- Header -->

			<div class="flex items-center justify-between px-6 pt-5 pb-0">
				<h2 class="text-md font-bold text-primary">{{ editTask ? 'Edit Task' : 'New Task' }}</h2>

				<button class="grid size-7 place-items-center rounded-lg text-muted transition hover:bg-column-bg hover:text-ink" @click="cancel">
					<X :size="16" />
				</button>
			</div>

			<form class="px-6 pt-5 pb-6" @submit.prevent="submit">
				<div class="space-y-4">
					<!-- Title -->

					<div>
						<div class="mb-1.5 flex items-baseline justify-between">
							<label for="task-title" class="text-xs font-semibold uppercase tracking-wider text-muted">Title</label>

							<span class="text-[11px] tabular-nums text-muted/50">{{ title.length }}/120</span>
						</div>

						<input id="task-title" v-model="title" type="text" placeholder="e.g. Design landing page" maxlength="120" class="w-full rounded-xl border border-border bg-column-bg px-3.5 py-2.5 text-sm text-ink placeholder-muted/30 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10" autofocus />
					</div>

					<!-- Description -->

					<div>
						<div class="mb-1.5 flex items-baseline justify-between">
							<label for="task-desc" class="text-xs font-semibold uppercase tracking-wider text-muted">Description</label>

							<span class="text-[11px] tabular-nums text-muted/50">{{ desc.length }}/1000</span>
						</div>

						<textarea id="task-desc" v-model="desc" rows="3" maxlength="1000" placeholder="Optional details about this task..." class="w-full resize-none rounded-xl border border-border bg-column-bg px-3.5 py-2.5 text-sm text-ink placeholder-muted/30 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"></textarea>
					</div>

					<!-- Priority -->

					<div>
						<label class="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">Priority</label>

						<div class="flex gap-1.5 rounded-xl bg-column-bg p-1">
							<button
								v-for="opt in [
									{ value: 'low', label: 'Low', dot: 'bg-success' },
									{ value: 'medium', label: 'Medium', dot: 'bg-warning' },
									{ value: 'high', label: 'High', dot: 'bg-danger' },
								]"
								:key="opt.value"
								type="button"
								class="flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition"
								:class="priority === opt.value ? 'bg-card-bg text-ink shadow-sm' : 'text-muted hover:text-ink'"
								@click="priority = opt.value">
								<span class="size-1.5 rounded-full" :class="opt.dot"></span>
								{{ opt.label }}
							</button>
						</div>
					</div>
				</div>

				<!-- Error -->

				<p v-if="error" class="mt-3 flex items-center gap-1.5 rounded-lg bg-danger/5 px-3 py-2 text-xs text-danger">
					<span class="size-1 shrink-0 rounded-full bg-danger"></span>
					{{ error }}
				</p>

				<!-- Actions -->

				<div class="mt-5 flex gap-2">
					<button type="button" class="btn btn-secondary btn-md flex-1 rounded-xl" @click="cancel">Cancel</button>

					<button type="submit" class="btn btn-primary btn-md flex-1 rounded-xl">
						{{ editTask ? 'Save Changes' : 'Create Task' }}
					</button>
				</div>
			</form>
		</div>
	</div>
</template>
