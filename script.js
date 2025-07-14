// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link, .btn-primary, .btn-secondary');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if the link has a hash
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Calculate offset to account for fixed navbar
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    
    // Dynamic text color change for About section when overlapping with hero
    const heroSection = document.querySelector('.hero');
    const aboutSection = document.querySelector('.about');
    const aboutText = document.querySelectorAll('.about-text p, .about h2, .skills-section h3, .skills-section h4');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        } else {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        }
        
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

    function highlightActiveSection() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navItems.forEach(item => {
                    item.classList.remove('active');
                });
                
                // Add active class to current section's nav link
                const activeNavItem = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeNavItem) {
                    activeNavItem.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection);

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe timeline items and project cards
    const animatedElements = document.querySelectorAll('.timeline-item, .project-card, .about-text, .skills-section');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Typing effect for hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = function() {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a small delay
        setTimeout(typeWriter, 500);
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Mobile menu toggle (for future enhancement)
    const createMobileMenu = function() {
        const navContainer = document.querySelector('.nav-container');
        const navMenu = document.querySelector('.nav-menu');
        
        if (window.innerWidth <= 768) {
            // Check if hamburger button already exists
            let existingHamburger = document.querySelector('.hamburger');
            
            if (!existingHamburger) {
                const hamburger = document.createElement('button');
                hamburger.classList.add('hamburger');
                hamburger.innerHTML = '☰';
                hamburger.style.cssText = `
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    display: block;
                `;
                
                hamburger.addEventListener('click', function() {
                    navMenu.classList.toggle('mobile-active');
                });
                
                // Insert hamburger before nav menu
                navContainer.insertBefore(hamburger, navMenu);
                
                // Add mobile styles
                navMenu.style.cssText = `
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    background: rgba(26, 26, 26, 0.98);
                    flex-direction: column;
                    padding: 1rem;
                    transform: translateY(-100%);
                    opacity: 0;
                    transition: all 0.3s ease;
                    pointer-events: none;
                `;
                
                // Add mobile styles only once
                if (!document.querySelector('#mobile-menu-styles')) {
                    const style = document.createElement('style');
                    style.id = 'mobile-menu-styles';
                    style.textContent = `
                        .nav-menu.mobile-active {
                            transform: translateY(0);
                            opacity: 1;
                            pointer-events: all;
                        }
                    `;
                    document.head.appendChild(style);
                }
            }
        } else {
            // Remove hamburger button on desktop
            const hamburger = document.querySelector('.hamburger');
            if (hamburger) {
                hamburger.remove();
            }
            
            // Reset nav menu styles for desktop
            navMenu.style.cssText = '';
            navMenu.classList.remove('mobile-active');
        }
    };

    // Initialize mobile menu on load and resize
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);

    // Add subtle hover effects to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Smooth reveal animation for skills tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateX(-20px)';
        tag.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'translateX(0)';
        }, 1000 + (index * 100));
    });
});