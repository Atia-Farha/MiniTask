import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { loadTasks, saveTasks } from '@/utils/storage';
import { validateTitle, validateDescription, normalizeTask } from '@/utils/validation';
import { seedTasks } from '@/data/seed';

export const useTaskStore = defineStore('tasks', () => {
	const stored = loadTasks();
	const tasks = ref(stored.length > 0 ? stored : seedTasks);
	const searchQuery = ref('');
	const selectedPriority = ref('all');
	const showForm = ref(false);

	function persist() {
		saveTasks(tasks.value);
	}

	const total = computed(() => tasks.value.length);
	const doneCount = computed(() => tasks.value.filter((task) => task.status === 'done').length);
	const progress = computed(() => (total.value ? Math.round((doneCount.value / total.value) * 100) : 0));

	const filteredTasks = computed(() => {
		let result = tasks.value;
		if (searchQuery.value.trim()) {
			const query = searchQuery.value.trim().toLowerCase();
			result = result.filter((task) => task.title.toLowerCase().includes(query));
		}
		if (selectedPriority.value !== 'all') {
			result = result.filter((task) => task.priority === selectedPriority.value);
		}
		return result;
	});

	const todoTasks = computed(() => filteredTasks.value.filter((task) => task.status === 'todo'));
	const inProgressTasks = computed(() => filteredTasks.value.filter((task) => task.status === 'in-progress'));
	const doneTasks = computed(() => filteredTasks.value.filter((task) => task.status === 'done'));

	const counts = computed(() =>
		tasks.value.reduce((acc, task) => {
			acc[task.status] = (acc[task.status] || 0) + 1;
			acc[task.priority] = (acc[task.priority] || 0) + 1;
			return acc;
		}, {}),
	);

	const todoCount = computed(() => counts.value.todo || 0);
	const inProgressCount = computed(() => counts.value['in-progress'] || 0);
	const highCount = computed(() => counts.value.high || 0);
	const mediumCount = computed(() => counts.value.medium || 0);
	const lowCount = computed(() => counts.value.low || 0);

	function addTask({ title, description, priority }) {
		const error = validateTitle(title);
		if (error) return { error };
		const descError = validateDescription(description);
		if (descError) return { error: descError };
		tasks.value.unshift({
			id: crypto.randomUUID(),
			...normalizeTask({ title, description, priority, status: 'todo' }),
		});
		persist();
		return { error: null };
	}

	function updateTask(id, updates) {
		const index = tasks.value.findIndex((task) => task.id === id);
		if (index === -1) return { error: 'This task no longer exists.' };
		if (updates.title !== undefined) {
			const error = validateTitle(updates.title);
			if (error) return { error };
		}
		if (updates.description !== undefined) {
			const descError = validateDescription(updates.description);
			if (descError) return { error: descError };
		}
		const existing = tasks.value[index];
		tasks.value[index] = {
			...existing,
			...normalizeTask({
				title: updates.title ?? existing.title,
				description: updates.description ?? existing.description,
				priority: updates.priority ?? existing.priority,
				status: updates.status ?? existing.status,
			}),
		};
		persist();
		return { error: null };
	}

	function removeTask(id) {
		tasks.value = tasks.value.filter((task) => task.id !== id);
		persist();
	}

	function changeStatus(id, status) {
		return updateTask(id, { status });
	}

	function setSearch(query) {
		searchQuery.value = query;
	}

	function setPriority(priority) {
		selectedPriority.value = priority;
	}

	return {
		tasks,
		searchQuery,
		selectedPriority,
		showForm,
		total,
		doneCount,
		progress,
		filteredTasks,
		todoTasks,
		inProgressTasks,
		doneTasks,
		todoCount,
		inProgressCount,
		highCount,
		mediumCount,
		lowCount,
		addTask,
		updateTask,
		removeTask,
		changeStatus,
		setSearch,
		setPriority,
	};
});
