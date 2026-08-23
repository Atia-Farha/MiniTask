import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { loadTasksFromStorage, saveTasksToStorage } from '@/utils/storage';
import { validateTitle, validateDescription, normalizeTaskFields } from '@/utils/validation';
import { seedTasks } from '@/data/seed';

export const useTaskStore = defineStore('tasks', () => {
	const savedTasks = loadTasksFromStorage();
	const tasks = ref(savedTasks.length > 0 ? savedTasks : seedTasks);
	const searchQuery = ref('');
	const selectedPriority = ref('all');
	const isTaskFormVisible = ref(false);

	function saveTasksToLocalStorage() {
		saveTasksToStorage(tasks.value);
	}

	const totalTaskCount = computed(() => tasks.value.length);
	const completedTaskCount = computed(() => tasks.value.filter((task) => task.status === 'done').length);
	const completionPercentage = computed(() => (totalTaskCount.value ? Math.round((completedTaskCount.value / totalTaskCount.value) * 100) : 0));

	const filteredTasks = computed(() => {
		let filteredResult = tasks.value;
		if (searchQuery.value.trim()) {
			const searchTerm = searchQuery.value.trim().toLowerCase();
			filteredResult = filteredResult.filter((task) => task.title.toLowerCase().includes(searchTerm));
		}
		if (selectedPriority.value !== 'all') {
			filteredResult = filteredResult.filter((task) => task.priority === selectedPriority.value);
		}
		return filteredResult;
	});

	const todoTasks = computed(() => filteredTasks.value.filter((task) => task.status === 'todo'));
	const inProgressTasks = computed(() => filteredTasks.value.filter((task) => task.status === 'in-progress'));
	const completedTasks = computed(() => filteredTasks.value.filter((task) => task.status === 'done'));

	const taskCounts = computed(() =>
		tasks.value.reduce((countsAccumulator, task) => {
			countsAccumulator[task.status] = (countsAccumulator[task.status] || 0) + 1;
			countsAccumulator[task.priority] = (countsAccumulator[task.priority] || 0) + 1;
			return countsAccumulator;
		}, {}),
	);

	const todoCount = computed(() => taskCounts.value.todo || 0);
	const inProgressCount = computed(() => taskCounts.value['in-progress'] || 0);
	const highPriorityCount = computed(() => taskCounts.value.high || 0);
	const mediumPriorityCount = computed(() => taskCounts.value.medium || 0);
	const lowPriorityCount = computed(() => taskCounts.value.low || 0);

	function addTask({ title, description, priority }) {
		const titleError = validateTitle(title);
		if (titleError) return { error: titleError };
		const descriptionError = validateDescription(description);
		if (descriptionError) return { error: descriptionError };
		tasks.value.unshift({
			id: crypto.randomUUID(),
			...normalizeTaskFields({ title, description, priority, status: 'todo' }),
		});
		saveTasksToLocalStorage();
		return { error: null };
	}

	function updateTask(taskId, taskUpdates) {
		const taskIndex = tasks.value.findIndex((task) => task.id === taskId);
		if (taskIndex === -1) return { error: 'Task not found.' };
		if (taskUpdates.title !== undefined) {
			const titleError = validateTitle(taskUpdates.title);
			if (titleError) return { error: titleError };
		}
		if (taskUpdates.description !== undefined) {
			const descriptionError = validateDescription(taskUpdates.description);
			if (descriptionError) return { error: descriptionError };
		}
		const existingTask = tasks.value[taskIndex];
		tasks.value[taskIndex] = {
			...existingTask,
			...normalizeTaskFields({
				title: taskUpdates.title ?? existingTask.title,
				description: taskUpdates.description ?? existingTask.description,
				priority: taskUpdates.priority ?? existingTask.priority,
				status: taskUpdates.status ?? existingTask.status,
			}),
		};
		saveTasksToLocalStorage();
		return { error: null };
	}

	function removeTask(taskId) {
		tasks.value = tasks.value.filter((task) => task.id !== taskId);
		saveTasksToLocalStorage();
	}

	function changeTaskStatus(taskId, newStatus) {
		return updateTask(taskId, { status: newStatus });
	}

	function updateSearchQuery(query) {
		searchQuery.value = query;
	}

	function updatePriorityFilter(priority) {
		selectedPriority.value = priority;
	}

	return {
		tasks,
		searchQuery,
		selectedPriority,
		isTaskFormVisible,
		totalTaskCount,
		completedTaskCount,
		completionPercentage,
		filteredTasks,
		todoTasks,
		inProgressTasks,
		completedTasks,
		todoCount,
		inProgressCount,
		highPriorityCount,
		mediumPriorityCount,
		lowPriorityCount,
		addTask,
		updateTask,
		removeTask,
		changeTaskStatus,
		updateSearchQuery,
		updatePriorityFilter,
	};
});
