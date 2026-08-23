<script setup>
import { ref } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import TaskFilter from '@/components/tasks/TaskFilter.vue';
import TaskForm from '@/components/tasks/TaskForm.vue';
import TaskList from '@/components/tasks/TaskList.vue';

const store = useTaskStore();
const editingTask = ref(null);

function onSubmit({ title, description, priority }) {
	if (editingTask.value) {
		const { error } = store.updateTask(editingTask.value.id, { title, description, priority });

		if (!error) {
			editingTask.value = null;
			store.showForm = false;
		}
	} else {
		const { error } = store.addTask({ title, description, priority });

		if (!error) store.showForm = false;
	}
}

function onEdit(task) {
	editingTask.value = task;
	store.showForm = true;
}

function onCancel() {
	editingTask.value = null;
	store.showForm = false;
}
</script>

<template>
	<div class="space-y-5">
		<!-- Filter -->
		<TaskFilter :search-query="store.searchQuery" :selected-priority="store.selectedPriority" @update:search="store.setSearch" @update:priority="store.setPriority" />

		<!-- Kanban Board -->
		<div class="grid gap-4 md:grid-cols-3">
			<div class="rounded-2xl border border-border bg-column-bg/50 p-3">
				<TaskList :tasks="store.todoTasks" title="To Do" accent-color="bg-muted/40" empty-message="Nothing to do yet" empty-sub='Click "New Task" to add one' @edit="onEdit" @delete="store.removeTask" @status-change="store.changeStatus" />
			</div>

			<div class="rounded-2xl border border-border bg-column-bg/50 p-3">
				<TaskList :tasks="store.inProgressTasks" title="In Progress" accent-color="bg-primary" empty-message="No tasks in progress yet" empty-sub="Start working on a task to see it here" @edit="onEdit" @delete="store.removeTask" @status-change="store.changeStatus" />
			</div>

			<div class="rounded-2xl border border-border bg-column-bg/50 p-3">
				<TaskList :tasks="store.doneTasks" title="Done" accent-color="bg-success" empty-message="No completed tasks yet" empty-sub="Finish a task to see it here" @edit="onEdit" @delete="store.removeTask" @status-change="store.changeStatus" />
			</div>
		</div>

		<!-- Task Form Modal -->
		<TaskForm v-if="store.showForm || editingTask" :edit-task="editingTask" @submit="onSubmit" @cancel="onCancel" />
	</div>
</template>
