<script setup>
import { AlertTriangle, X } from '@lucide/vue';

defineProps({
	message: { type: String, required: true },
});

const emit = defineEmits(['close']);
</script>

<template>
	<div role="status" aria-live="polite" class="fixed inset-x-4 bottom-4 z-100 mx-auto flex max-w-sm items-start gap-3 rounded-xl border border-danger/20 bg-card-bg px-4 py-3 shadow-modal sm:left-auto sm:right-6 sm:mx-0">
		<AlertTriangle class="mt-0.5 shrink-0 text-danger" :size="16" />

		<p class="flex-1 text-sm text-ink">{{ message }}</p>

		<button type="button" aria-label="Dismiss" class="shrink-0 text-muted transition hover:text-ink" @click="emit('close')">
			<X :size="15" />
		</button>
	</div>
</template>
