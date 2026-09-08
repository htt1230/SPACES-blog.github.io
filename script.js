document.querySelectorAll('a[href^="#"]').forEach((link) => {
	link.addEventListener('click', (event) => {
		const target = document.querySelector(link.getAttribute('href'));
		if (!target) return;
		event.preventDefault();
		target.scrollIntoView({ behavior: 'smooth', block: 'start' });
	});
});

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
