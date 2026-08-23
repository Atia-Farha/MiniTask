export function validateTitle(title) {
	const trimmedTitle = title?.trim() ?? '';

	if (!trimmedTitle) return 'Title is required.';
	if (trimmedTitle.length > 120) return 'Title must be 120 characters or fewer.';

	return null;
}

export function validateDescription(description) {
	const trimmedDescription = description?.trim() ?? '';

	if (trimmedDescription.length > 1000) return 'Description must be 1000 characters or fewer.';

	return null;
}

export function normalizeTaskFields({ title = '', description = '', priority = 'low', status = 'todo' }) {
	return {
		title: title.trim(),
		description: description.trim(),
		priority,
		status,
	};
}
