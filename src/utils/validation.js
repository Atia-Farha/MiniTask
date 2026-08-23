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

export function normalizeTask({ title = '', description = '', priority = 'low', status = 'todo' }) {
	return {
		title: title.trim(),
		description: description.trim(),
		priority,
		status,
	};
}
