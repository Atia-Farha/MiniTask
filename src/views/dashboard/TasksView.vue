<script setup>
import { useTaskStore } from '@/stores/taskStore';
import TaskFilter from '@/components/tasks/TaskFilter.vue';
import TaskForm from '@/components/tasks/TaskForm.vue';
import TaskList from '@/components/tasks/TaskList.vue';

const store = useTaskStore();

function onSubmit({ title, description, priority }) {
	if (store.editingTask) {
		const { error } = store.updateTask(store.editingTask.id, { title, description, priority });

		if (!error) store.closeForm();
	} else {
		const { error } = store.addTask({ title, description, priority });

		if (!error) store.closeForm();
	}
}

function onEdit(task) {
	store.openForm(task);
}

function onCancel() {
	store.closeForm();
}
</script>

<template>
	<div class="space-y-5">
		<!-- Filter -->

		<TaskFilter :search-query="store.searchQuery" :selected-priority="store.selectedPriority" @update:search="store.setSearch" @update:priority="store.setPriority" />

		<!-- Kanban Board -->

		<div class="grid min-w-0 gap-4 md:grid-cols-3">
			<div class="min-w-0 overflow-hidden rounded-2xl border border-border bg-column-bg/50 p-3">
				<TaskList :tasks="store.todoTasks" title="To Do" accent-color="bg-muted/40" empty-message="Nothing to do yet" empty-sub='Click "New Task" to add one' @edit="onEdit" @delete="store.removeTask" @status-change="store.changeStatus" @reorder="(orderedIds) => store.reorderTasks('todo', orderedIds)" />
			</div>

			<div class="min-w-0 overflow-hidden rounded-2xl border border-border bg-column-bg/50 p-3">
				<TaskList :tasks="store.inProgressTasks" title="In Progress" accent-color="bg-primary" empty-message="No tasks in progress yet" empty-sub="Start working on a task to see it here" @edit="onEdit" @delete="store.removeTask" @status-change="store.changeStatus" @reorder="(orderedIds) => store.reorderTasks('in-progress', orderedIds)" />
			</div>

			<div class="min-w-0 overflow-hidden rounded-2xl border border-border bg-column-bg/50 p-3">
				<TaskList :tasks="store.doneTasks" title="Done" accent-color="bg-success" empty-message="No completed tasks yet" empty-sub="Finish a task to see it here" @edit="onEdit" @delete="store.removeTask" @status-change="store.changeStatus" @reorder="(orderedIds) => store.reorderTasks('done', orderedIds)" />
			</div>
		</div>

		<!-- Task Form Modal -->

		<TaskForm v-if="store.editingTask || store.formOpen" :edit-task="store.editingTask" @submit="onSubmit" @cancel="onCancel" />
	</div>
</template>
