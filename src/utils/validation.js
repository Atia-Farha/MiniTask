import { DEFAULT_PRIORITY, DEFAULT_STATUS, PRIORITIES, STATUSES } from '@/utils/taskConfig';

export function validateTitle(title) {
	const trimmed = title?.trim() ?? '';

	if (!trimmed) return 'Please enter a task title.';
	if (trimmed.length > 120) return 'Title can be at most 120 characters.';

	return null;
}

export function validateDescription(description) {
	const trimmed = description?.trim() ?? '';

	if (trimmed.length > 1000) return 'Description can be at most 1000 characters.';

	return null;
}

export function normalizeTask({ title = '', description = '', priority = DEFAULT_PRIORITY, status = DEFAULT_STATUS } = {}) {
	return {
		title: title.trim(),
		description: description.trim(),
		priority: PRIORITIES.includes(priority) ? priority : DEFAULT_PRIORITY,
		status: STATUSES.includes(status) ? status : DEFAULT_STATUS,
	};
}

export function sanitizeTask(task) {
	if (!task?.id || !task?.title?.trim()) return null;

	return {
		id: task.id,
		...normalizeTask({
			title: task.title,
			description: task.description,
			priority: task.priority,
			status: task.status,
		}),
	};
}
