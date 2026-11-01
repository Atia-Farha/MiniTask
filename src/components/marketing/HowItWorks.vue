<script setup>
import { RouterLink } from 'vue-router';
import { ArrowRight } from '@lucide/vue';

const steps = [
	{
		number: '01',
		accent: 'bg-primary text-white',
		title: 'Capture what matters',
		body: 'Add a task the moment it arrives—title, context, and a priority.',
	},
	{
		number: '02',
		accent: 'bg-primary-light text-ink',
		title: 'Move with intention',
		body: 'Guide work from To Do to In Progress, without losing the thread.',
	},
	{
		number: '03',
		accent: 'bg-white text-ink',
		title: 'Celebrate the finish',
		body: 'See your wins stack up and close the day with a real sense of progress.',
	},
];
</script>

<template>
	<section id="how-it-works" class="bg-ink py-24 text-white">
		<div class="container grid gap-14 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-12">
			<div>
				<p class="text-sm font-bold uppercase tracking-[0.18em] text-primary-light">Simple by design</p>

				<h2 class="mt-4 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">From "I should" to "it's done."</h2>

				<p class="mt-6 max-w-md text-lg leading-8 text-white/65">MiniTask helps you shape a quieter workday in three unhurried moves.</p>

				<RouterLink to="/dashboard" class="btn btn-primary btn-lg rounded-xl mt-8">
					Create your first task
					<ArrowRight :size="18" />
				</RouterLink>
			</div>

			<ol class="space-y-4">
				<li v-for="step in steps" :key="step.number" class="flex gap-5 rounded-2xl border border-white/10 bg-white/5 p-5 transition duration-500 hover:bg-white/10">
					<span class="grid size-10 shrink-0 place-items-center rounded-xl text-sm font-bold" :class="step.accent">{{ step.number }}</span>

					<div>
						<h3 class="font-bold">{{ step.title }}</h3>

						<p class="mt-1 leading-7 text-white/60">{{ step.body }}</p>
					</div>
				</li>
			</ol>
		</div>
	</section>
</template>
