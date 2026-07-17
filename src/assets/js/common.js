// Common layout injector and animation controller for NorthLite Solar website

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Navigation Drawer (Mobile)
    initMobileDrawer();

    // 2. Initialize Scroll Reveal Animations
    initScrollReveal();

    // 3. Initialize Fluid Scroll Effects & Progress Bar
    initScrollEffects();

    // 4. Initialize Solar Panel Project Slideshow
    initHeroSlideshow();
});

// Controls the mobile drawer behavior
function initMobileDrawer() {
    const openBtn = document.getElementById('drawer-open-btn');
    const closeBtn = document.getElementById('drawer-close-btn');
    const drawer = document.getElementById('nav-drawer');
    const overlay = document.getElementById('drawer-overlay');

    if (!openBtn || !drawer || !overlay) return;

    function openDrawer() {
        // Remove native hidden attribute so transition can trigger
        drawer.removeAttribute('hidden');
        overlay.removeAttribute('hidden');
        
        // Wait a frame for browser layout to update, then transition style changes
        setTimeout(() => {
            drawer.classList.remove('-translate-x-full');
            drawer.classList.add('open-drawer-links');
            overlay.classList.add('open-overlay');
            overlay.classList.remove('opacity-0', 'pointer-events-none');
        }, 20);

        document.body.classList.add('overflow-hidden');
    }

    function closeDrawer() {
        drawer.classList.add('-translate-x-full');
        drawer.classList.remove('open-drawer-links');
        overlay.classList.remove('open-overlay');
        overlay.classList.add('opacity-0', 'pointer-events-none');
        document.body.classList.remove('overflow-hidden');

        // Apply native hidden back only after transitions complete (300ms)
        setTimeout(() => {
            if (!drawer.classList.contains('open-drawer-links')) {
                drawer.setAttribute('hidden', '');
                overlay.setAttribute('hidden', '');
            }
        }, 300);
    }

    openBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);

    // Also close drawer when custom navigation links inside the drawer are clicked
    const drawerLinks = drawer.querySelectorAll('a');
    drawerLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    // Auto-close mobile drawer if the screen is resized to desktop width (>= 768px)
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && drawer.classList.contains('open-drawer-links')) {
            closeDrawer();
        }
    });
}

// Intersection Observer for scroll animated elements
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length === 0) return;

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Unobserve once revealed
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => {
        revealObserver.observe(el);
    });
}

// Custom fluid scroll effects and flat progress indicator
function initScrollEffects() {
    const header = document.getElementById('site-header');
    const progressBar = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
        // 1. Update Scroll Progress Bar (using scaleX on GPU layer)
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolledPercent = height > 0 ? (winScroll / height) * 100 : 0;
        
        if (progressBar) {
            progressBar.style.transform = `scaleX(${scrolledPercent / 100})`;
        }

        // 2. Shrink/Style Header on Scroll
        if (header) {
            if (window.scrollY > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // Run once at start in case page is loaded scrolled down
    if (header && window.scrollY > 40) {
        header.classList.add('scrolled');
    }
}

// Hero Slideshow Controller (Simplified class cycler)
function initHeroSlideshow() {
    const slideshow = document.getElementById('hero-slideshow');
    if (!slideshow) return;

    const slides = slideshow.querySelectorAll('.hero-slide');
    if (slides.length === 0) return;

    let currentSlide = 0;
    const slideDuration = 6000; // 6 seconds

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.remove('opacity-0');
                slide.classList.add('opacity-100', 'active-slide');
            } else {
                slide.classList.remove('opacity-100', 'active-slide');
                slide.classList.add('opacity-0');
            }
        });
    }

    // Init first slide
    showSlide(0);

    // Set interval for slides
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, slideDuration);
}

