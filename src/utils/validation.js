export function validateTitle(title) {
	const trimmed = title?.trim() ?? '';

	if (!trimmed) return 'Title is required.';
	if (trimmed.length > 120) return 'Title must be 120 characters or fewer.';

	return null;
}

export function validateDescription(description) {
	const trimmed = description?.trim() ?? '';

	if (trimmed.length > 1000) return 'Description must be 1000 characters or fewer.';

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
