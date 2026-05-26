// Common layout injector and animation controller for NorthLite Solar website

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Navigation Drawer (Mobile)
    initMobileDrawer();

    // 2. Initialize Scroll Reveal Animations
    initScrollReveal();

    // 3. Initialize Fluid Scroll Effects & Progress Bar
    initScrollEffects();

    // 4. Initialize Solar Panel Project Slideshow (Premium Visual Layout)
    initHeroSlideshow();

    // 5. Initialize Spotlight Cards hover tracking
    initSpotlightHover();

    // 6. Initialize Magnetic CTA Buttons
    initMagneticButtons();

    // 7. Initialize Scroll Ticker stats counters
    initTickers();

    // 8. Initialize Flip Box touch toggle behavior
    initFlipBox();
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

// Custom fluid scroll effects, progress indicator, and button glows
function initScrollEffects() {
    const header = document.getElementById('site-header');
    const progressBar = document.getElementById('scroll-progress');
    
    // Add button glow to main primary action elements
    const primaryCTAs = document.querySelectorAll('a[href*="contact"], button[type="submit"], a[href="solutions.html"]');
    primaryCTAs.forEach(btn => {
        if (!btn.classList.contains('bg-transparent')) {
            btn.classList.add('btn-glow');
        }
    });

    window.addEventListener('scroll', () => {
        // 1. Update Scroll Progress Bar (using scaleX on GPU layer to prevent layout reflows)
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

// 5. Solar Panel Project Slideshow Controller (Premium visual slider)
function initHeroSlideshow() {
    const slideshow = document.getElementById('hero-slideshow');
    if (!slideshow) return;

    const slides = slideshow.querySelectorAll('.hero-slide');
    const captionTag = document.getElementById('slide-caption-tag');
    const captionTitle = document.getElementById('slide-caption-title');
    const indexCurr = document.getElementById('slide-index-curr');
    const progressBar = document.getElementById('slide-progress-bar');

    if (slides.length === 0) return;

    const projectDetails = [
        { tag: "Project 01 / Infrastructure", title: "NorthLite Solar Commercial Array" },
        { tag: "Project 02 / Commercial", title: "Akayet Hotel Utility Plant" },
        { tag: "Project 03 / Industrial", title: "Goldfields MW Grid Integration" },
        { tag: "Project 04 / Infrastructure", title: "Decentralized Community Micro-Grid" }
    ];

    let currentSlide = 0;
    const slideDuration = 6000; // 6 seconds

    function resetProgressBar() {
        if (!progressBar) return;
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
        // Force reflow to restart transition
        progressBar.offsetHeight;
        progressBar.style.transition = `width ${slideDuration}ms linear`;
        progressBar.style.width = '100%';
    }

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

        // Update Captions
        if (captionTag && projectDetails[index]) {
            captionTag.textContent = projectDetails[index].tag;
        }
        if (captionTitle && projectDetails[index]) {
            captionTitle.textContent = projectDetails[index].title;
        }
        if (indexCurr) {
            indexCurr.textContent = String(index + 1).padStart(2, '0');
        }

        resetProgressBar();
    }

    // Init first slide
    showSlide(0);

    // Set interval for slides
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, slideDuration);
}

// 6. Spotlight Cards Mouse Glow Tracking
function initSpotlightHover() {
    const cards = document.querySelectorAll('.spotlight-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// 7. Magnetic CTA Button Cursor Pull
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-magnetic');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });
}

// 8. Statistics Counter Tick Interpolators
function initTickers() {
    const tickers = document.querySelectorAll('.count-ticker');
    if (tickers.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetVal = parseFloat(target.getAttribute('data-target'));
                const decimals = parseInt(target.getAttribute('data-decimals') || '0', 10);
                const duration = 1500;
                let startTimestamp = null;

                function step(timestamp) {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                    const easeProgress = 1 - Math.pow(1 - progress, 4);
                    const currentVal = easeProgress * targetVal;
                    target.textContent = currentVal.toFixed(decimals);

                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    } else {
                        target.textContent = targetVal.toFixed(decimals);
                    }
                }
                window.requestAnimationFrame(step);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.1 });

    tickers.forEach(t => observer.observe(t));
}

// 8. Initialize Flip Box touch toggle behavior
function initFlipBox() {
    const flipBoxes = document.querySelectorAll('.flip-box');
    flipBoxes.forEach(box => {
        box.addEventListener('click', () => {
            box.classList.toggle('flipped');
        });
    });
}
