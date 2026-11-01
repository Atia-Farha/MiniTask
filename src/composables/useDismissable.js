import { onUnmounted, watch } from 'vue';

export function useDismissable(isOpen, onDismiss) {
	function onKeydown(event) {
		if (event.key === 'Escape') {
			event.stopPropagation();
			onDismiss();
		}
	}

	watch(
		isOpen,
		(open) => {
			if (open) {
				window.addEventListener('keydown', onKeydown);
			} else {
				window.removeEventListener('keydown', onKeydown);
			}
		},
		{ immediate: true },
	);

	onUnmounted(() => window.removeEventListener('keydown', onKeydown));
}

export function useFocusTrap(containerRef, isOpen, onDismiss) {
	let previouslyFocused = null;

	function focusableElements() {
		const container = containerRef.value;
		if (!container) return [];

		return Array.from(container.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter((el) => el.offsetParent !== null);
	}

	function onKeydown(event) {
		if (event.key === 'Escape') {
			event.stopPropagation();
			onDismiss();
			return;
		}

		if (event.key !== 'Tab') return;

		const elements = focusableElements();
		if (!elements.length) return;

		const first = elements[0];
		const last = elements[elements.length - 1];

		if (event.shiftKey && document.activeElement === first) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && document.activeElement === last) {
			event.preventDefault();
			first.focus();
		}
	}

	watch(
		isOpen,
		(open) => {
			if (open) {
				previouslyFocused = document.activeElement;
				window.addEventListener('keydown', onKeydown);
				requestAnimationFrame(() => {
					const elements = focusableElements();
					elements[0]?.focus();
				});
			} else {
				window.removeEventListener('keydown', onKeydown);
				previouslyFocused?.focus?.();
				previouslyFocused = null;
			}
		},
		{ immediate: true },
	);

	onUnmounted(() => {
		window.removeEventListener('keydown', onKeydown);
		previouslyFocused?.focus?.();
	});
}
