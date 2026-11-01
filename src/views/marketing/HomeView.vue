<script setup>
import { ArrowRight, Check } from '@lucide/vue';
import { RouterLink } from 'vue-router';
import BoardMockup from '@/components/marketing/BoardMockup.vue';
import FeatureGrid from '@/components/marketing/FeatureGrid.vue';
import HowItWorks from '@/components/marketing/HowItWorks.vue';

const stats = [
	{ value: '3', label: 'clear task stages' },
	{ value: '3', label: 'priority levels' },
	{ value: '1', label: 'focused workspace' },
	{ value: '0', label: 'sign-ups required' },
];
</script>

<template>
	<!-- Navbar -->

	<header class="fixed container z-20 px-3 py-3 sm:px-8 lg:px-12">
		<nav class="flex items-center justify-between rounded-2xl border border-primary/10 bg-surface/85 px-4 py-3 shadow-soft backdrop-blur sm:px-5">
			<RouterLink to="/" class="flex items-center gap-2.5 font-semibold tracking-tight">
				<span class="grid size-9 place-items-center rounded-xl bg-primary text-lg font-black text-white shadow-md shadow-primary/25">M</span>

				<span>MiniTask</span>
			</RouterLink>

			<div class="hidden items-center gap-7 text-sm font-medium text-muted md:flex">
				<a class="hover:text-primary" href="#features">Features</a>

				<a class="hover:text-primary" href="#how-it-works">How it works</a>

				<a class="hover:text-primary" href="#start">Get started</a>
			</div>

			<RouterLink to="/dashboard" class="btn btn-primary btn-sm rounded-xl">Open workspace</RouterLink>
		</nav>
	</header>

	<main>
		<!-- Hero Section -->

		<section class="container relative px-5 pb-24 pt-34 sm:px-8 sm:pt-38 lg:px-12 lg:pb-32">
			<div class="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
				<div class="max-w-xl text-center sm:text-left">
					<p class="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-surface px-3 py-1.5 text-sm font-semibold text-primary">
						<span class="size-2 rounded-full bg-primary"></span>
						Your calm, focused workspace
					</p>

					<h1 class="text-5xl font-bold leading-[1.03] tracking-[-0.055em] text-ink sm:text-6xl lg:text-7xl">
						Less juggling.
						<br />
						More <span class="relative whitespace-nowrap text-primary">doing<span class="absolute -bottom-2 left-0 h-2 w-full -rotate-1 rounded-full bg-primary-light/45"></span></span>.
					</h1>

					<p class="mt-7 max-w-lg text-lg leading-8 text-muted">A beautifully simple place to capture the work that matters, keep momentum visible, and finish each day feeling lighter.</p>

					<div class="mt-8 flex flex-col gap-3 sm:flex-row">
						<RouterLink to="/dashboard" class="btn btn-primary btn-lg rounded-xl">
							Start for free
							<ArrowRight :size="18" />
						</RouterLink>

						<a href="#how-it-works" class="btn btn-secondary btn-lg rounded-xl">See how it works</a>
					</div>

					<p class="mt-5 flex items-center gap-2 text-sm text-muted">
						<Check class="text-primary" :size="17" />
						No setup. No clutter. Just your next step.
					</p>
				</div>

				<BoardMockup />
			</div>
		</section>

		<!-- Stats Section -->

		<section class="border-y border-primary/10 bg-surface/65 py-6">
			<div class="container grid grid-cols-2 gap-6 px-5 text-center sm:grid-cols-4 sm:px-8 lg:px-12">
				<div v-for="stat in stats" :key="stat.label">
					<p class="text-2xl font-bold tracking-tight text-primary">{{ stat.value }}</p>

					<p class="mt-1 text-sm text-muted">{{ stat.label }}</p>
				</div>
			</div>
		</section>

		<!-- Features Section -->

		<FeatureGrid />

		<!-- How it works Section -->

		<HowItWorks />

		<!-- CTA Section -->

		<section id="start" class="container px-5 py-24 sm:px-8 lg:px-12">
			<div class="relative overflow-hidden rounded-4xl border border-primary/15 bg-surface px-6 py-12 shadow-soft sm:px-12 sm:py-14">
				<div class="absolute -right-24 -top-28 size-72 rounded-full bg-primary-light/25 blur-3xl"></div>
				<div class="absolute -bottom-36 left-1/3 size-80 rounded-full bg-accent/10 blur-3xl"></div>

				<div class="relative mx-auto max-w-2xl text-center">
					<p class="text-sm font-bold uppercase tracking-[0.18em] text-primary">Ready when you are</p>

					<h2 class="mt-3 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">Make a little more room for the work you care about.</h2>

					<p class="mx-auto mt-5 max-w-xl text-lg leading-8 text-muted">Start with one task. Build a rhythm that feels good. MiniTask keeps the rest beautifully simple.</p>

					<div class="mt-8 flex flex-col items-center gap-3">
						<RouterLink to="/dashboard" class="btn btn-primary btn-lg rounded-xl">
							Open your workspace
							<ArrowRight :size="18" />
						</RouterLink>

						<p class="text-center text-sm text-muted">No account needed</p>
					</div>
				</div>
			</div>
		</section>
	</main>

	<!-- Footer Section -->

	<footer class="border-t border-primary/10 px-5 py-8 sm:px-8 lg:px-12">
		<div class="container text-sm text-muted text-center">
			<p>© 2026 <RouterLink to="/" class="text-primary hover:text-hover">MiniTask</RouterLink> — Developed by <a href="https://atia-farha.netlify.app" class="hover:text-primary" target="_blank">Atia Farha</a></p>
		</div>
	</footer>
</template>
