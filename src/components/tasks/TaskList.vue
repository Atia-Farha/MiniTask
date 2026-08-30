<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Sortable from 'sortablejs';
import TaskCard from '@/components/tasks/TaskCard.vue';
import EmptyState from '@/components/tasks/EmptyState.vue';

defineProps({
	tasks: {
		type: Array,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	accentColor: {
		type: String,
		default: 'bg-muted',
	},
	emptyMessage: {
		type: String,
		default: 'No tasks here.',
	},
	emptySub: {
		type: String,
		default: '',
	},
});

const emit = defineEmits(['edit', 'delete', 'status-change', 'reorder']);

const listRef = ref(null);
let sortable = null;

onMounted(() => {
	if (listRef.value) {
		sortable = new Sortable(listRef.value, {
			animation: 150,
			onEnd: ({ oldIndex, newIndex }) => {
				if (oldIndex !== newIndex) emit('reorder', oldIndex, newIndex);
			},
		});
	}
});

onUnmounted(() => sortable?.destroy());
</script>

<template>
	<section class="flex flex-col">
		<!-- Column header -->
		<div class="mb-3 flex items-center gap-2.5">
			<div class="size-2 rounded-full" :class="accentColor"></div>

			<h2 class="text-xs font-bold uppercase tracking-wider text-muted">{{ title }}</h2>

			<span class="grid size-5 place-items-center rounded-md bg-column-bg text-[10px] font-bold text-muted">
				{{ tasks.length }}
			</span>
		</div>

		<!-- Task cards -->
		<div v-if="tasks.length > 0" ref="listRef" class="flex flex-col gap-2">
			<TaskCard v-for="task in tasks" :key="task.id" :task="task" @edit="emit('edit', $event)" @delete="emit('delete', $event)" @status-change="(taskId, newStatus) => emit('status-change', taskId, newStatus)" />
		</div>

		<!-- Empty state -->
		<EmptyState v-else :message="emptyMessage" :submessage="emptySub" />
	</section>
</template>
