import { onMounted, onUnmounted, ref } from 'vue';
import { STORAGE_ERROR_EVENT } from '@/utils/storage';

const DISMISS_AFTER_MS = 6000;

export function useStorageNotice() {
	const notice = ref('');
	let timeoutId = null;

	function dismiss() {
		notice.value = '';
		if (timeoutId) {
			clearTimeout(timeoutId);
			timeoutId = null;
		}
	}

	function show(message) {
		notice.value = message;
		if (timeoutId) clearTimeout(timeoutId);
		timeoutId = setTimeout(dismiss, DISMISS_AFTER_MS);
	}

	function onStorageError(event) {
		show(event.detail);
	}

	onMounted(() => window.addEventListener(STORAGE_ERROR_EVENT, onStorageError));

	onUnmounted(() => {
		window.removeEventListener(STORAGE_ERROR_EVENT, onStorageError);
		if (timeoutId) clearTimeout(timeoutId);
	});

	return { notice, dismiss };
}
