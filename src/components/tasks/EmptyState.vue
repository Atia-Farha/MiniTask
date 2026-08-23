<script setup>
import { Inbox } from '@lucide/vue';

defineProps({
	message: { type: String, default: 'No tasks yet.' },
	submessage: { type: String, default: 'Create your first task to get started.' },
});
</script>

<template>
	<div class="flex flex-col items-center justify-center py-10 text-center">
		<div class="grid size-14 place-items-center rounded-2xl bg-column-bg">
			<Inbox class="text-muted/30" :size="24" />
		</div>

		<p class="mt-4 text-sm font-medium text-muted">{{ message }}</p>

		<p class="mt-0.5 text-xs text-muted/60">{{ submessage }}</p>
	</div>
</template>
