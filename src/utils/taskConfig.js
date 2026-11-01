export const PRIORITY_CONFIG = {
	low: {
		label: 'Low',
		dot: 'bg-success',
		badge: 'bg-success/10 text-success border-success/20',
	},
	medium: {
		label: 'Medium',
		dot: 'bg-warning',
		badge: 'bg-warning/10 text-warning border-warning/20',
	},
	high: {
		label: 'High',
		dot: 'bg-danger',
		badge: 'bg-danger/10 text-danger border-danger/20',
	},
};

export const STATUS_OPTIONS = [
	{ value: 'todo', label: 'To Do' },
	{ value: 'in-progress', label: 'In Progress' },
	{ value: 'done', label: 'Done' },
];

export const PRIORITIES = Object.keys(PRIORITY_CONFIG);
export const STATUSES = STATUS_OPTIONS.map((option) => option.value);

export const DEFAULT_PRIORITY = 'medium';
export const DEFAULT_STATUS = 'todo';
