<script setup>
import { Sparkles, TrendingUp, ListChecks } from '@lucide/vue';

const features = [
	{
		icon: Sparkles,
		title: 'A clearer next step',
		body: 'Turn scattered thoughts into a simple, prioritized plan you can trust.',
	},
	{
		icon: TrendingUp,
		title: 'Momentum, made visible',
		body: 'Watch your progress build with calm, encouraging signals—not pressure.',
	},
	{
		icon: ListChecks,
		title: 'Your work, your rhythm',
		body: 'Organize tasks your way and pick up exactly where you left off.',
	},
];
</script>

<template>
	<section id="features" class="container px-5 py-24 sm:px-8 lg:px-12">
		<div class="mx-auto max-w-2xl text-center">
			<p class="text-sm font-bold uppercase tracking-[0.18em] text-primary">Built for follow-through</p>

			<h2 class="mt-3 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">Everything you need. Nothing pulling you away.</h2>

			<p class="mt-5 text-lg leading-8 text-muted">A small set of thoughtful tools that make it easier to decide, begin, and keep going.</p>
		</div>

		<div class="mt-14 grid gap-5 md:grid-cols-3">
			<article v-for="feature in features" :key="feature.title" class="rounded-3xl border border-primary/10 bg-surface p-7 shadow transition duration-500 hover:shadow-card-hover">
				<div class="grid size-12 place-items-center rounded-2xl bg-hover text-white">
					<component :is="feature.icon" :size="24" />
				</div>

				<h3 class="mt-6 text-xl font-bold text-primary">{{ feature.title }}</h3>

				<p class="mt-3 leading-7 text-muted">{{ feature.body }}</p>
			</article>
		</div>
	</section>
</template>
