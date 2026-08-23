<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { RouterLink } from 'vue-router';
import { Plus, Menu, X, CheckSquare, BarChart3, PanelLeftClose, PanelLeft } from '@lucide/vue';
import { useTaskStore } from '@/stores/taskStore';

const route = useRoute();
const router = useRouter();
const taskStore = useTaskStore();
const isSidebarOpen = ref(false);
const isSidebarCollapsed = ref(localStorage.getItem('minitask.sidebar.collapsed') === 'true');

const currentPageTitle = computed(() => route.meta.title || 'Dashboard');
const currentPageSubtitle = computed(() => route.meta.subtitle || '');

function toggleSidebarCollapse() {
	isSidebarCollapsed.value = !isSidebarCollapsed.value;
	localStorage.setItem('minitask.sidebar.collapsed', isSidebarCollapsed.value);
}

function openNewTaskForm() {
	taskStore.isTaskFormVisible = true;
	if (route.name !== 'tasks') {
		router.push('/dashboard/tasks');
	}
}
</script>

<template>
	<div class="flex h-screen overflow-hidden">
		<!-- Mobile overlay -->
		<div v-if="isSidebarOpen" class="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs lg:hidden" @click="isSidebarOpen = false"></div>

		<!-- Sidebar -->
		<aside class="fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-card-bg transition-all duration-500 ease-out lg:static lg:translate-x-0" :class="[isSidebarOpen ? 'translate-x-0' : '-translate-x-full', isSidebarCollapsed ? 'w-15' : 'w-50']">
			<div class="flex h-14 shrink-0 items-center gap-2.5 border-b border-border px-4">
				<div class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary">
					<span class="text-sm font-bold text-white">M</span>
				</div>
				<span v-if="!isSidebarCollapsed" class="text-sm font-bold tracking-tight text-ink">MiniTask</span>
				<button class="ml-auto grid size-7 shrink-0 place-items-center rounded-md text-muted transition hover:bg-column-bg hover:text-ink lg:hidden" aria-label="Close sidebar" @click="isSidebarOpen = false">
					<X :size="16" />
				</button>
			</div>

			<nav class="flex-1 overflow-y-auto py-3" :class="isSidebarCollapsed ? 'px-2' : 'px-2.5'">
				<RouterLink to="/dashboard" class="flex items-center gap-2.5 rounded-lg py-2 text-[13px] font-medium text-muted transition hover:bg-column-bg hover:text-ink" :class="isSidebarCollapsed ? 'justify-center px-0' : 'px-2.5'" exact-active-class="!bg-primary/5 !font-semibold !text-primary">
					<BarChart3 :size="17" class="shrink-0" />
					<span v-if="!isSidebarCollapsed">Overview</span>
				</RouterLink>
				<RouterLink to="/dashboard/tasks" class="flex items-center gap-2.5 rounded-lg py-2 text-[13px] font-medium text-muted transition hover:bg-column-bg hover:text-ink" :class="isSidebarCollapsed ? 'justify-center px-0' : 'px-2.5'" exact-active-class="!bg-primary/5 !font-semibold !text-primary">
					<CheckSquare :size="17" class="shrink-0" />
					<span v-if="!isSidebarCollapsed">Tasks</span>
				</RouterLink>
			</nav>

			<div class="hidden shrink-0 border-t border-border py-2 lg:block" :class="isSidebarCollapsed ? 'px-2' : 'px-2.5'">
				<button class="flex w-full items-center gap-2.5 rounded-lg py-2 text-[13px] font-medium text-muted transition hover:bg-column-bg hover:text-ink" :class="isSidebarCollapsed ? 'justify-center px-0' : 'px-2.5'" @click="toggleSidebarCollapse">
					<PanelLeftClose v-if="!isSidebarCollapsed" :size="17" class="shrink-0" />
					<PanelLeft v-else :size="17" class="shrink-0" />
					<span v-if="!isSidebarCollapsed">Collapse</span>
				</button>
			</div>
		</aside>

		<!-- Main content -->
		<div class="flex min-w-0 flex-1 flex-col">
			<!-- Topbar -->
			<header class="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card-bg px-4 backdrop-blur-sm sm:px-6">
				<div class="flex items-center gap-3">
					<button class="grid size-8 place-items-center rounded-lg text-muted transition hover:bg-column-bg hover:text-ink lg:hidden" aria-label="Open sidebar" @click="isSidebarOpen = true">
						<Menu :size="20" />
					</button>
					<div>
						<h1 class="text-base font-bold leading-tight text-primary">{{ currentPageTitle }}</h1>
						<p v-if="currentPageSubtitle" class="text-xs text-muted">{{ currentPageSubtitle }}</p>
					</div>
				</div>
				<button class="btn btn-primary btn-sm btn-rounded-xl" @click="openNewTaskForm">
					<Plus :size="16" />
					New Task
				</button>
			</header>

			<main class="flex-1 overflow-auto p-4 sm:p-6 bg-board-bg">
				<RouterView />
			</main>
		</div>
	</div>
</template>
