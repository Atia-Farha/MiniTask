<script setup>
import { ref } from 'vue';
import { ChevronDown } from '@lucide/vue';
import TaskDetail from '@/components/tasks/TaskDetail.vue';
import { PRIORITY_CONFIG, STATUS_OPTIONS } from '@/utils/taskConfig';

const props = defineProps({
	task: { type: Object, required: true },
});

const emit = defineEmits(['edit', 'delete', 'status-change']);

const showDetail = ref(false);

function onStatusChange(event) {
	emit('status-change', props.task.id, event.target.value);
}

function onDetailStatusChange(id, status) {
	emit('status-change', id, status);
}
</script>

<template>
	<article class="group relative rounded-xl border border-border bg-card-bg p-4 shadow-card transition hover:shadow-card-hover" :class="{ 'opacity-60': task.status === 'done' }">
		<div class="absolute left-0 top-4 h-8 w-1 rounded-r-full" :class="PRIORITY_CONFIG[task.priority].dot"></div>

		<div class="flex items-start justify-between gap-3">
			<div class="min-w-0 flex-1 pl-2 cursor-pointer" @click="showDetail = true">
				<div class="flex items-center gap-2">
					<h3 class="text-sm font-semibold text-ink leading-snug" :class="{ 'text-muted line-through decoration-2 decoration-muted/60': task.status === 'done' }">
						{{ task.title }}
					</h3>
				</div>

				<p v-if="task.description" class="mt-1.5 text-[13px] leading-relaxed text-muted/70 line-clamp-2 whitespace-pre-wrap">
					{{ task.description }}
				</p>

				<div class="mt-3 flex flex-wrap items-center gap-2">
					<span class="inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[11px] font-semibold" :class="PRIORITY_CONFIG[task.priority].badge">
						<span class="size-1.5 rounded-full" :class="PRIORITY_CONFIG[task.priority].dot"></span>
						{{ PRIORITY_CONFIG[task.priority].label }}
					</span>
				</div>
			</div>
		</div>

		<div class="mt-3 flex items-center gap-2 border-t border-border-light pt-2.5">
			<div class="relative">
				<select :value="task.status" class="appearance-none rounded-lg border border-border bg-column-bg py-1 pl-2 pr-6 text-[11px] font-medium text-muted outline-none transition hover:border-primary/30 focus:border-primary focus:ring-1 focus:ring-primary/10" @change="onStatusChange">
					<option v-for="opt in STATUS_OPTIONS" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
				</select>

				<ChevronDown class="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-muted/50" :size="12" />
			</div>
		</div>
	</article>

	<!-- Task detail modal -->
	<Teleport to="body">
		<TaskDetail v-if="showDetail" :task="task" @close="showDetail = false" @status-change="onDetailStatusChange" @edit="emit('edit', $event)" @delete="emit('delete', $event)" />
	</Teleport>
</template>
