import { sanitizeTask } from '@/utils/validation';

const STORAGE_KEY = 'minitask.tasks';
export const STORAGE_ERROR_EVENT = 'minitask:storage-error';

function notifyStorageError(message) {
	window.dispatchEvent(new CustomEvent(STORAGE_ERROR_EVENT, { detail: message }));
}

export function loadTasks() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		const parsed = raw ? JSON.parse(raw) : [];

		if (!Array.isArray(parsed)) return [];

		return parsed.map(sanitizeTask).filter(Boolean);
	} catch {
		return [];
	}
}

export function saveTasks(tasks) {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
	} catch {
		notifyStorageError("We couldn't save your tasks. Your changes may not persist after refresh.");
	}
}
