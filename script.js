document.addEventListener("DOMContentLoaded", () => {
    // Add hero-loaded class for hero entrance animations
    setTimeout(() => {
        document.body.classList.add('hero-loaded');
    }, 100);

    const heroBg = document.getElementById("hero-bg");
    const rotatingLeaves = document.getElementById("rotating-leaves");
    const navbar = document.querySelector(".navbar");
    const mobileToggle = document.querySelector(".mobile-toggle");
    
    if (mobileToggle) {
        mobileToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            navbar.classList.toggle("mobile-menu-open");
            // Change SVG icon to X when open
            if (navbar.classList.contains("mobile-menu-open")) {
                mobileToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
            } else {
                mobileToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
            }
        });

        // Close mobile menu when clicking any link inside the menu
        const menuLinks = document.querySelectorAll(".nav-menu a");
        menuLinks.forEach(link => {
            link.addEventListener("click", () => {
                if (navbar.classList.contains("mobile-menu-open")) {
                    navbar.classList.remove("mobile-menu-open");
                    mobileToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener("click", (e) => {
            if (navbar.classList.contains("mobile-menu-open") && !navbar.contains(e.target)) {
                navbar.classList.remove("mobile-menu-open");
                mobileToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
            }
        });
    }

    window.addEventListener("scroll", () => {
        // Get the current scroll position
        const scrollPosition = window.pageYOffset;
        
        // Navbar sticky styling on scroll
        if (navbar) {
            if (scrollPosition > 50) {
                navbar.classList.add('is-scrolled');
            } else {
                navbar.classList.remove('is-scrolled');
            }
        }
        
        // Calculate the translation amount for hero background.
        const yPos = scrollPosition * 0.4;
        
        // Calculate the zoom (scale) amount
        const scale = 1 + scrollPosition * 0.0005;
        
        // Apply the transformation to hero background
        if (heroBg) {
            heroBg.style.transform = `translateY(${yPos}px) scale(${scale})`;
        }

        // Apply rotation to the leaves in the Why Choose Us section
        if (rotatingLeaves) {
            // Rotating slightly based on scroll position
            rotatingLeaves.style.transform = `rotate(${scrollPosition * 0.1}deg)`;
        }
    });

    // Intersection Observer for scroll reveal animations
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-scale');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Carousel logic
    const track = document.getElementById("carousel-track");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    if (track && prevBtn && nextBtn) {
        const getScrollAmount = () => {
            const firstCard = track.querySelector(".project-card");
            if (firstCard) {
                const style = window.getComputedStyle(track);
                const gap = parseInt(style.gap) || 20;
                return firstCard.offsetWidth + gap;
            }
            return 320;
        };

        prevBtn.addEventListener("click", () => {
            track.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
        });

        nextBtn.addEventListener("click", () => {
            track.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
        });
    }

    // Tab switching logic for Gardering page
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabPanels = document.querySelectorAll(".tab-panel");

    if (tabBtns.length > 0 && tabPanels.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const targetId = btn.getAttribute("data-tab");

                tabBtns.forEach(b => b.classList.remove("active"));
                tabPanels.forEach(p => p.classList.remove("active"));

                btn.classList.add("active");
                const targetPanel = document.getElementById(targetId);
                if (targetPanel) {
                    targetPanel.classList.add("active");
                }
            });
        });
    }

    // FAQ Accordion logic
    const faqItems = document.querySelectorAll(".faq-item");
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const questionBtn = item.querySelector(".faq-question");
            if (questionBtn) {
                questionBtn.addEventListener("click", () => {
                    const isOpen = item.classList.contains("active");
                    // Close others for clean accordion feel
                    faqItems.forEach(i => i.classList.remove("active"));
                    if (!isOpen) {
                        item.classList.add("active");
                    }
                });
            }
        });
    }

});


