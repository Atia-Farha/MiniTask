<script setup>
import { ArrowRight, Check, ListChecks, Sparkles, TrendingUp } from '@lucide/vue';
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

				<!-- Mockup -->

				<div class="relative mx-auto w-full select-none overflow-hidden sm:overflow-visible">
					<div class="rounded-[1.65rem] border border-white/75 bg-surface p-3 sm:p-4 shadow">
						<div class="overflow-hidden rounded-2xl border border-primary/10 bg-board-bg">
							<div class="flex items-center gap-2 border-b border-primary/10 bg-surface px-4 py-3">
								<span class="size-2.5 rounded-full bg-primary-light"></span>
								<span class="size-2.5 rounded-full bg-primary/50"></span>
								<span class="size-2.5 rounded-full bg-primary/20"></span>
								<span class="ml-2 h-2 w-24 rounded-full bg-primary/10"></span>
							</div>
							<div class="overflow-x-auto">
								<div class="grid min-w-120 grid-cols-3 gap-2.5 p-3">
									<!-- To Do -->
									<div class="rounded-xl border border-border bg-column-bg/50 p-2.5">
										<div class="mb-2.5 flex items-center gap-1.5">
											<span class="size-1.5 rounded-full bg-muted/40"></span>
											<span class="text-[9px] font-bold uppercase tracking-wider text-muted">To Do</span>
											<span class="grid size-3.5 place-items-center rounded bg-column-bg text-[8px] font-bold text-muted">2</span>
										</div>

										<div class="space-y-2">
											<!-- Task card 1 -->
											<div class="relative rounded-lg border border-border bg-card-bg p-2.5 shadow-card">
												<div class="absolute left-0 top-2.5 h-6 w-0.5 rounded-r-full bg-danger"></div>
												<p class="pl-1.5 text-[10px] font-semibold text-ink">Design landing page</p>
												<div class="mt-1.5 flex items-center gap-1 pl-1.5">
													<span class="inline-flex items-center gap-0.5 rounded border border-danger/20 bg-danger/10 px-1 py-px text-[7px] font-semibold text-danger"> <span class="size-0.5 rounded-full bg-danger"></span>High </span>
												</div>
											</div>

											<!-- Task card 2 -->
											<div class="relative rounded-lg border border-border bg-card-bg p-2.5 shadow-card">
												<div class="absolute left-0 top-2.5 h-6 w-0.5 rounded-r-full bg-warning"></div>
												<p class="pl-1.5 text-[10px] font-semibold text-ink">Write API docs</p>
												<div class="mt-1.5 flex items-center gap-1 pl-1.5">
													<span class="inline-flex items-center gap-0.5 rounded border border-warning/20 bg-warning/10 px-1 py-px text-[7px] font-semibold text-warning"> <span class="size-0.5 rounded-full bg-warning"></span>Medium </span>
												</div>
											</div>
										</div>
									</div>

									<!-- In Progress column -->
									<div class="rounded-xl border border-border bg-column-bg/50 p-2.5">
										<div class="mb-2.5 flex items-center gap-1.5">
											<span class="size-1.5 rounded-full bg-primary"></span>
											<span class="text-[9px] font-bold uppercase tracking-wider text-muted">In Progress</span>
											<span class="grid size-3.5 place-items-center rounded bg-column-bg text-[8px] font-bold text-muted">1</span>
										</div>

										<div class="space-y-2">
											<!-- Task card 3 -->
											<div class="relative rounded-lg border border-border bg-card-bg p-2.5 shadow-card">
												<div class="absolute left-0 top-2.5 h-6 w-0.5 rounded-r-full bg-danger"></div>
												<p class="pl-1.5 text-[10px] font-semibold text-ink">Implement auth flow</p>
												<p class="mt-0.5 pl-1.5 text-[8px] leading-relaxed text-muted/60 line-clamp-1">OAuth2 integration with Google</p>
												<div class="mt-1.5 flex items-center gap-1 pl-1.5">
													<span class="inline-flex items-center gap-0.5 rounded border border-danger/20 bg-danger/10 px-1 py-px text-[7px] font-semibold text-danger"> <span class="size-0.5 rounded-full bg-danger"></span>High </span>
												</div>
											</div>
										</div>
									</div>

									<!-- Done column -->
									<div class="rounded-xl border border-border bg-column-bg/50 p-2.5">
										<div class="mb-2.5 flex items-center gap-1.5">
											<span class="size-1.5 rounded-full bg-success"></span>
											<span class="text-[9px] font-bold uppercase tracking-wider text-muted">Done</span>
											<span class="grid size-3.5 place-items-center rounded bg-column-bg text-[8px] font-bold text-muted">2</span>
										</div>

										<div class="space-y-2">
											<!-- Task card 4 -->
											<div class="relative rounded-lg border border-border bg-card-bg p-2.5 shadow-card opacity-60">
												<div class="absolute left-0 top-2.5 h-6 w-0.5 rounded-r-full bg-success"></div>
												<p class="pl-1.5 text-[10px] font-semibold text-muted line-through decoration-2 decoration-muted/60">Set up repo</p>
												<div class="mt-1.5 flex items-center gap-1 pl-1.5">
													<span class="inline-flex items-center gap-0.5 rounded border border-success/20 bg-success/10 px-1 py-px text-[7px] font-semibold text-success"> <span class="size-0.5 rounded-full bg-success"></span>Low </span>
												</div>
											</div>

											<!-- Task card 5 -->
											<div class="relative rounded-lg border border-border bg-card-bg p-2.5 shadow-card opacity-60">
												<div class="absolute left-0 top-2.5 h-6 w-0.5 rounded-r-full bg-success"></div>
												<p class="pl-1.5 text-[10px] font-semibold text-muted line-through decoration-2 decoration-muted/60">Install dependencies</p>
												<div class="mt-1.5 flex items-center gap-1 pl-1.5">
													<span class="inline-flex items-center gap-0.5 rounded border border-success/20 bg-success/10 px-1 py-px text-[7px] font-semibold text-success"> <span class="size-0.5 rounded-full bg-success"></span>Low </span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="absolute -bottom-7 -left-4 hidden rounded-2xl border border-white/80 bg-surface px-4 py-3 sm:block shadow">
						<p class="text-xs font-semibold text-primary">Pending tasks</p>

						<p class="mt-1 text-xl font-bold">3</p>
					</div>

					<div class="absolute -right-3 top-16 hidden rounded-2xl border border-white/80 bg-surface px-4 py-3 sm:block shadow">
						<p class="text-xs font-semibold text-primary">Tasks complete</p>

						<p class="mt-1 text-xl font-bold text-success">+38%</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Stats Section -->

		<section class="border-y border-primary/10 bg-surface/65 py-6">
			<div class="container grid grid-cols-2 gap-6 px-5 text-center sm:grid-cols-4 sm:px-8 lg:px-12">
				<div>
					<p class="text-2xl font-bold tracking-tight text-primary">3</p>

					<p class="mt-1 text-sm text-muted">clear task stages</p>
				</div>

				<div>
					<p class="text-2xl font-bold tracking-tight text-primary">3</p>

					<p class="mt-1 text-sm text-muted">priority levels</p>
				</div>

				<div>
					<p class="text-2xl font-bold tracking-tight text-primary">1</p>

					<p class="mt-1 text-sm text-muted">focused workspace</p>
				</div>

				<div>
					<p class="text-2xl font-bold tracking-tight text-primary">0</p>

					<p class="mt-1 text-sm text-muted">sign-ups required</p>
				</div>
			</div>
		</section>

		<!-- Features Section -->

		<section id="features" class="container px-5 py-24 sm:px-8 lg:px-12">
			<div class="mx-auto max-w-2xl text-center">
				<p class="text-sm font-bold uppercase tracking-[0.18em] text-primary">Built for follow-through</p>

				<h2 class="mt-3 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">Everything you need. Nothing pulling you away.</h2>

				<p class="mt-5 text-lg leading-8 text-muted">A small set of thoughtful tools that make it easier to decide, begin, and keep going.</p>
			</div>

			<div class="mt-14 grid gap-5 md:grid-cols-3">
				<article class="rounded-3xl border border-primary/10 bg-surface p-7 shadow transition duration-500 hover:shadow-card-hover">
					<div class="grid size-12 place-items-center rounded-2xl bg-hover text-white"><Sparkles :size="24" /></div>
					<h3 class="mt-6 text-xl font-bold text-primary">A clearer next step</h3>

					<p class="mt-3 leading-7 text-muted">Turn scattered thoughts into a simple, prioritized plan you can trust.</p>
				</article>

				<article class="rounded-3xl border border-primary/10 bg-surface p-7 shadow transition duration-500 hover:shadow-card-hover">
					<div class="grid size-12 place-items-center rounded-2xl bg-hover text-white"><TrendingUp :size="24" /></div>
					<h3 class="mt-6 text-xl font-bold text-primary">Momentum, made visible</h3>

					<p class="mt-3 leading-7 text-muted">Watch your progress build with calm, encouraging signals—not pressure.</p>
				</article>

				<article class="rounded-3xl border border-primary/10 bg-surface p-7 shadow transition duration-500 hover:shadow-card-hover">
					<div class="grid size-12 place-items-center rounded-2xl bg-hover text-white"><ListChecks :size="24" /></div>
					<h3 class="mt-6 text-xl font-bold text-primary">Your work, your rhythm</h3>

					<p class="mt-3 leading-7 text-muted">Organize tasks your way and pick up exactly where you left off.</p>
				</article>
			</div>
		</section>

		<!-- How it works Section -->

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
					<li class="flex gap-5 rounded-2xl border border-white/10 bg-white/5 p-5 transition duration-500 hover:bg-white/10">
						<span class="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-sm font-bold">01</span>

						<div>
							<h3 class="font-bold">Capture what matters</h3>

							<p class="mt-1 leading-7 text-white/60">Add a task the moment it arrives—title, context, and a priority.</p>
						</div>
					</li>

					<li class="flex gap-5 rounded-2xl border border-white/10 bg-white/5 p-5 transition duration-500 hover:bg-white/10">
						<span class="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-light text-sm font-bold text-ink">02</span>

						<div>
							<h3 class="font-bold">Move with intention</h3>

							<p class="mt-1 leading-7 text-white/60">Guide work from To Do to In Progress, without losing the thread.</p>
						</div>
					</li>

					<li class="flex gap-5 rounded-2xl border border-white/10 bg-white/5 p-5 transition duration-500 hover:bg-white/10">
						<span class="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-sm font-bold text-ink">03</span>

						<div>
							<h3 class="font-bold">Celebrate the finish</h3>

							<p class="mt-1 leading-7 text-white/60">See your wins stack up and close the day with a real sense of progress.</p>
						</div>
					</li>
				</ol>
			</div>
		</section>

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
