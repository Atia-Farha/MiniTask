const STORAGE_KEY = 'minitask.tasks';

export function loadTasks() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		const parsed = raw ? JSON.parse(raw) : [];

		return Array.isArray(parsed) ? parsed.filter((task) => task?.id && task?.title?.trim()) : [];
	} catch {
		return [];
	}
}

export function saveTasks(tasks) {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
	} catch {
		alert('Failed to save tasks. Please try again later.');
	}
}
