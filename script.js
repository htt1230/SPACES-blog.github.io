document.querySelectorAll('a[href^="#"]').forEach((link) => {
	link.addEventListener('click', (event) => {
		const target = document.querySelector(link.getAttribute('href'));
		if (!target) return;
		event.preventDefault();
		target.scrollIntoView({ behavior: 'smooth', block: 'start' });
	});
});

const pageBackgrounds = document.querySelectorAll('.page-background');
const backgroundSections = document.querySelectorAll('main#top > section[data-background]');

if (pageBackgrounds.length && backgroundSections.length) {
	let activeBackground = null;

	const backgroundObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;
			const nextBackground = activeBackground === pageBackgrounds[0] ? pageBackgrounds[1] : pageBackgrounds[0];
			nextBackground.style.backgroundImage = `url("${entry.target.dataset.background}")`;
			nextBackground.classList.add('is-active');
			if (activeBackground) activeBackground.classList.remove('is-active');
			activeBackground = nextBackground;
		});
	}, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

	backgroundSections.forEach((section) => backgroundObserver.observe(section));
}

const revealItems = document.querySelectorAll('.hero-copy, .hero-visual, .section-grid > *, .project > *, .system-card, .timeline > div');
const revealObserver = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('is-visible');
			revealObserver.unobserve(entry.target);
		}
	});
}, { threshold: 0.12 });

revealItems.forEach((item) => {
	item.classList.add('reveal');
	revealObserver.observe(item);
});
