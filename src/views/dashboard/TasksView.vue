<script setup>
import { ref } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import TaskFilter from '@/components/tasks/TaskFilter.vue';
import TaskForm from '@/components/tasks/TaskForm.vue';
import TaskList from '@/components/tasks/TaskList.vue';

const taskStore = useTaskStore();
const taskBeingEdited = ref(null);

function handleTaskSubmit({ title, description, priority }) {
	if (taskBeingEdited.value) {
		const { error } = taskStore.updateTask(taskBeingEdited.value.id, { title, description, priority });

		if (!error) {
			taskBeingEdited.value = null;
			taskStore.isTaskFormVisible = false;
		}
	} else {
		const { error } = taskStore.addTask({ title, description, priority });

		if (!error) taskStore.isTaskFormVisible = false;
	}
}

function handleEditTask(task) {
	taskBeingEdited.value = task;
	taskStore.isTaskFormVisible = true;
}

function handleCancelForm() {
	taskBeingEdited.value = null;
	taskStore.isTaskFormVisible = false;
}
</script>

<template>
	<div class="space-y-5">
		<!-- Filter -->
		<TaskFilter :search-query="taskStore.searchQuery" :selected-priority="taskStore.selectedPriority" @update:search="taskStore.updateSearchQuery" @update:priority="taskStore.updatePriorityFilter" />

		<!-- Kanban Board -->
		<div class="grid gap-4 md:grid-cols-3">
			<div class="rounded-2xl border border-border bg-column-bg/50 p-3">
				<TaskList :tasks="taskStore.todoTasks" title="To Do" accent-color="bg-muted/40" empty-message="No to-do tasks" empty-submessage="Click + New Task to add one" @edit="handleEditTask" @delete="taskStore.removeTask" @status-change="taskStore.changeTaskStatus" />
			</div>

			<div class="rounded-2xl border border-border bg-column-bg/50 p-3">
				<TaskList :tasks="taskStore.inProgressTasks" title="In Progress" accent-color="bg-primary" empty-message="No tasks in progress" empty-submessage="Move a task forward when you start" @edit="handleEditTask" @delete="taskStore.removeTask" @status-change="taskStore.changeTaskStatus" />
			</div>

			<div class="rounded-2xl border border-border bg-column-bg/50 p-3">
				<TaskList :tasks="taskStore.completedTasks" title="Done" accent-color="bg-success" empty-message="No completed tasks" empty-submessage="Finish a task to see it here" @edit="handleEditTask" @delete="taskStore.removeTask" @status-change="taskStore.changeTaskStatus" />
			</div>
		</div>

		<!-- Task Form Modal -->
		<TaskForm v-if="taskStore.isTaskFormVisible || taskBeingEdited" :task-to-edit="taskBeingEdited" @submit="handleTaskSubmit" @cancel="handleCancelForm" />
	</div>
</template>
