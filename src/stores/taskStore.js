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

	const total = computed(() => tasks.value.length);
	const doneCount = computed(() => tasks.value.filter((t) => t.status === 'done').length);
	const progress = computed(() => (total.value ? Math.round((doneCount.value / total.value) * 100) : 0));

	const filteredTasks = computed(() => {
		let result = tasks.value;
		if (searchQuery.value.trim()) {
			const query = searchQuery.value.trim().toLowerCase();
			result = result.filter((t) => t.title.toLowerCase().includes(query));
		}
		if (selectedPriority.value !== 'all') {
			result = result.filter((t) => t.priority === selectedPriority.value);
		}
		return result;
	});

	const todoTasks = computed(() => filteredTasks.value.filter((t) => t.status === 'todo'));
	const inProgressTasks = computed(() => filteredTasks.value.filter((t) => t.status === 'in-progress'));
	const doneTasks = computed(() => filteredTasks.value.filter((t) => t.status === 'done'));

	const todoCount = computed(() => tasks.value.filter((t) => t.status === 'todo').length);
	const inProgressCount = computed(() => tasks.value.filter((t) => t.status === 'in-progress').length);
	const highCount = computed(() => tasks.value.filter((t) => t.priority === 'high').length);
	const mediumCount = computed(() => tasks.value.filter((t) => t.priority === 'medium').length);
	const lowCount = computed(() => tasks.value.filter((t) => t.priority === 'low').length);

	function addTask({ title, description, priority }) {
		const error = validateTitle(title);
		if (error) return { error };
		const descError = validateDescription(description);
		if (descError) return { error: descError };
		tasks.value.unshift({
			id: crypto.randomUUID(),
			...normalizeTask({ title, description, priority, status: 'todo' }),
		});
		saveTasks(tasks.value);
		return { error: null };
	}

	function updateTask(id, updates) {
		const index = tasks.value.findIndex((t) => t.id === id);
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
		saveTasks(tasks.value);
		return { error: null };
	}

	function removeTask(id) {
		tasks.value = tasks.value.filter((t) => t.id !== id);
		saveTasks(tasks.value);
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

	function reorderTasks(status, oldIndex, newIndex) {
		const columnTasks = tasks.value.filter((t) => t.status === status);
		const [moved] = columnTasks.splice(oldIndex, 1);
		columnTasks.splice(newIndex, 0, moved);

		let idx = 0;
		tasks.value = tasks.value.map((t) => (t.status === status ? columnTasks[idx++] : t));
		saveTasks(tasks.value);
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
		reorderTasks,
		setSearch,
		setPriority,
	};
});
