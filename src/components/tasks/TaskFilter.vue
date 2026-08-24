<script setup>
import { Search, X, SlidersHorizontal } from '@lucide/vue';

defineProps({
	searchQuery: { type: String, required: true },
	selectedPriority: { type: String, required: true },
});

const emit = defineEmits(['update:search', 'update:priority']);
</script>

<template>
	<div class="flex flex-col gap-3 sm:flex-row sm:items-center">
		<div class="relative flex-1">
			<Search class="absolute left-3 top-1/2 -translate-y-1/2 text-muted/60" :size="16" />

			<input :value="searchQuery" type="text" placeholder="Search tasks..." class="w-full rounded-xl border border-border bg-card-bg py-2.5 pl-9 pr-9 text-sm text-ink placeholder-muted/50 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10" @input="emit('update:search', $event.target.value)" />

			<button v-if="searchQuery" class="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted/50 transition hover:text-ink" @click="emit('update:search', '')">
				<X :size="15" />
			</button>
		</div>

		<div class="flex items-center gap-2">
			<div class="relative">
				<select :value="selectedPriority" class="appearance-none rounded-xl border border-border bg-card-bg py-2.5 pl-3.5 pr-9 text-sm font-medium text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10" @change="emit('update:priority', $event.target.value)">
					<option value="all">All priorities</option>
					<option value="high">High</option>
					<option value="medium">Medium</option>
					<option value="low">Low</option>
				</select>

				<SlidersHorizontal class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted/50" :size="14" />
			</div>
		</div>
	</div>
</template>
