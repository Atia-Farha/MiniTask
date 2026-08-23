<script setup>
import { onMounted, onUnmounted } from 'vue';
import { AlertTriangle } from '@lucide/vue';

defineProps({
	message: { type: String, default: 'Are you sure?' },
	confirmLabel: { type: String, default: 'Confirm' },
});

const emit = defineEmits(['confirm', 'cancel']);

function handleEscapeKey(event) {
	if (event.key === 'Escape') emit('cancel');
}

onMounted(() => document.addEventListener('keydown', handleEscapeKey));
onUnmounted(() => document.removeEventListener('keydown', handleEscapeKey));
</script>

<template>
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm" @click.self="emit('cancel')">
		<div class="w-full max-w-sm rounded-2xl border border-border bg-card-bg shadow-modal">
			<div class="flex flex-col items-center px-6 pt-6 pb-4 text-center">
				<div class="grid size-12 place-items-center rounded-full bg-danger/10">
					<AlertTriangle class="text-danger" :size="24" />
				</div>

				<h2 class="mt-4 text-base font-bold text-ink">{{ message }}</h2>

				<p class="mt-1 text-sm text-muted">This action cannot be undone.</p>
			</div>

			<div class="flex gap-3 border-t border-border px-6 py-4">
				<button class="btn btn-secondary btn-md rounded-xl flex-1" @click="emit('cancel')">Cancel</button>

				<button class="btn btn-danger btn-md rounded-xl flex-1" @click="emit('confirm')">{{ confirmLabel }}</button>
			</div>
		</div>
	</div>
</template>
