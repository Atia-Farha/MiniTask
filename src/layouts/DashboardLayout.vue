<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { RouterLink } from 'vue-router';
import { Plus, Menu, X, CheckSquare, BarChart3, PanelLeftClose, PanelLeft } from '@lucide/vue';
import { useTaskStore } from '@/stores/taskStore';

const route = useRoute();
const router = useRouter();
const store = useTaskStore();
const sidebarOpen = ref(false);
const collapsed = ref(localStorage.getItem('minitask.sidebar.collapsed') === 'true');

const pageTitle = computed(() => route.meta.title || 'Dashboard');

function toggleCollapse() {
	collapsed.value = !collapsed.value;
	localStorage.setItem('minitask.sidebar.collapsed', collapsed.value);
}

function openNewTask() {
	store.showForm = true;
	if (route.name !== 'tasks') {
		router.push('/dashboard/tasks');
	}
}
</script>

<template>
	<div class="flex h-screen overflow-hidden">
		<!-- Mobile overlay -->
		<div v-if="sidebarOpen" class="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs lg:hidden" @click="sidebarOpen = false"></div>

		<!-- Sidebar -->
		<aside class="fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-card-bg transition-all duration-500 ease-out lg:static lg:translate-x-0" :class="[sidebarOpen ? 'translate-x-0' : '-translate-x-full', collapsed ? 'w-15' : 'w-50']">
			<div class="flex h-14 shrink-0 items-center gap-2.5 border-b border-border px-4">
				<div class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary">
					<span class="text-sm font-bold text-white">M</span>
				</div>

				<span v-if="!collapsed" class="text-sm font-bold tracking-tight text-ink">MiniTask</span>

				<button class="ml-auto grid size-7 shrink-0 place-items-center rounded-md text-muted transition hover:bg-column-bg hover:text-ink lg:hidden" @click="sidebarOpen = false">
					<X :size="16" />
				</button>
			</div>

			<nav class="flex-1 overflow-y-auto py-3 space-y-1" :class="collapsed ? 'px-2' : 'px-2.5'">
				<RouterLink to="/dashboard" class="flex items-center gap-2.5 rounded-lg py-2 text-[13px] font-medium text-muted transition hover:bg-column-bg hover:text-ink" :class="collapsed ? 'justify-center px-0' : 'px-2.5'" exact-active-class="!bg-primary/5 !font-semibold !text-primary">
					<BarChart3 :size="17" class="shrink-0" />

					<span v-if="!collapsed">Overview</span>
				</RouterLink>

				<RouterLink to="/dashboard/tasks" class="flex items-center gap-2.5 rounded-lg py-2 text-[13px] font-medium text-muted transition hover:bg-column-bg hover:text-ink" :class="collapsed ? 'justify-center px-0' : 'px-2.5'" exact-active-class="!bg-primary/5 !font-semibold !text-primary">
					<CheckSquare :size="17" class="shrink-0" />

					<span v-if="!collapsed">Tasks</span>
				</RouterLink>
			</nav>

			<div class="hidden shrink-0 border-t border-border py-2 lg:block" :class="collapsed ? 'px-2' : 'px-2.5'">
				<button class="flex w-full items-center gap-2.5 rounded-lg py-2 text-[13px] font-medium text-muted transition hover:bg-column-bg hover:text-ink" :class="collapsed ? 'justify-center px-0' : 'px-2.5'" @click="toggleCollapse">
					<PanelLeftClose v-if="!collapsed" :size="17" class="shrink-0" />

					<PanelLeft v-else :size="17" class="shrink-0" />

					<span v-if="!collapsed">Collapse</span>
				</button>
			</div>
		</aside>

		<!-- Main content -->
		<div class="flex min-w-0 flex-1 flex-col">
			<!-- Topbar -->
			<header class="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card-bg px-4 backdrop-blur-sm sm:px-6">
				<div class="flex items-center gap-3">
					<button class="grid size-8 place-items-center rounded-lg text-muted transition hover:bg-column-bg hover:text-ink lg:hidden" @click="sidebarOpen = true">
						<Menu :size="20" />
					</button>

					<div>
						<h1 class="text-xl font-bold leading-tight text-primary">{{ pageTitle }}</h1>
					</div>
				</div>

				<button class="btn btn-primary btn-sm btn-rounded-xl" @click="openNewTask">
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
