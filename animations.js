document.addEventListener('DOMContentLoaded', () => {
    gsap.from('.hero-content', {
        duration: 1,
        opacity: 0,
        y: 50,
        ease: 'power3.out'
    });

    gsap.from('.product-card', {
        duration: 1,
        opacity: 0,
        y: 100,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    });
});