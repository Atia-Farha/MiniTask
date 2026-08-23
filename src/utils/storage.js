const TASKS_STORAGE_KEY = 'minitask.tasks';

export function loadTasksFromStorage() {
	try {
		const rawJsonString = localStorage.getItem(TASKS_STORAGE_KEY);
		const parsedTasks = rawJsonString ? JSON.parse(rawJsonString) : [];

		return Array.isArray(parsedTasks) ? parsedTasks.filter((task) => task?.id && task?.title?.trim()) : [];
	} catch {
		return [];
	}
}

export function saveTasksToStorage(tasks) {
	try {
		localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
	} catch {
		alert('Failed to save tasks. Please try again later.');
	}
}
