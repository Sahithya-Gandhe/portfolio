// Mobile menu toggle functionality
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('show');
});

// Smooth scrolling for navigation links
const navLinksElements = document.querySelectorAll('.nav-link');

navLinksElements.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Close mobile menu if open
        hamburger.classList.remove('open');
        navLinks.classList.remove('show');

        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Adjust for fixed navbar

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            // Update URL hash without scrolling
            history.pushState(null, null, `#${targetId}`);
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('show') &&
        !hamburger.contains(e.target) &&
        !navLinks.contains(e.target)) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('show');
    }
});

// Handle scroll events to update active navigation
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Add active class styling for navigation
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
        font-weight: 600;
    }
`;
document.head.appendChild(style);

// Handle page load with hash in URL
window.addEventListener('load', () => {
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            setTimeout(() => {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
});

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);

// Update icon based on current theme
function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

// Initialize icon
updateThemeIcon(currentTheme);

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);

    // Add a subtle animation effect
    themeToggle.style.transform = 'scale(0.9)';
    setTimeout(() => {
        themeToggle.style.transform = 'scale(1)';
    }, 150);
});

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });
}

// Typing effect for hero text
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Parallax effect for hero section
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroImage = document.querySelector('.hero-image img');

        if (hero && heroImage) {
            const rate = scrolled * -0.5;
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Add floating animation to skill tags
function initSkillTagAnimations() {
    const skillTags = document.querySelectorAll('.skill-tag');

    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;

        tag.addEventListener('mouseenter', () => {
            tag.style.animation = 'pulse 0.6s ease-in-out';
        });

        tag.addEventListener('animationend', () => {
            tag.style.animation = '';
        });
    });
}

// Add ripple effect to buttons
function addRippleEffect() {
    const buttons = document.querySelectorAll('.project-link, .theme-toggle');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Smooth reveal animation for cards
function initCardRevealAnimations() {
    const cards = document.querySelectorAll('.project-card, .experience-card, .achievement-card');

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        cardObserver.observe(card);
    });
}

// Add hover sound effect (optional)
function initHoverEffects() {
    const interactiveElements = document.querySelectorAll('.project-card, .nav-links a, .theme-toggle');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
}

// Matrix rain effect
function createMatrixRain() {
    const matrixContainer = document.createElement('div');
    matrixContainer.className = 'matrix-rain';
    document.body.appendChild(matrixContainer);

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    function createMatrixChar() {
        const char = document.createElement('div');
        char.className = 'matrix-char';
        char.textContent = chars[Math.floor(Math.random() * chars.length)];
        char.style.left = Math.random() * 100 + 'vw';
        char.style.animationDuration = (Math.random() * 3 + 2) + 's';
        char.style.opacity = Math.random();
        matrixContainer.appendChild(char);

        setTimeout(() => {
            char.remove();
        }, 5000);
    }

    // Only show matrix effect in dark mode
    function toggleMatrixEffect() {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        matrixContainer.style.display = isDark ? 'block' : 'none';
        
        if (isDark) {
            setInterval(createMatrixChar, 100);
        }
    }

    toggleMatrixEffect();
    
    // Listen for theme changes
    const observer = new MutationObserver(toggleMatrixEffect);
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });
}

// Neural network nodes animation
function createNeuralNodes() {
    const nodeCount = 15;
    
    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.className = 'neural-node';
        node.style.left = Math.random() * 100 + 'vw';
        node.style.top = Math.random() * 100 + 'vh';
        node.style.animationDelay = Math.random() * 3 + 's';
        document.body.appendChild(node);
    }
}

// Advanced cursor trail effect
function initCursorTrail() {
    const trail = [];
    const trailLength = 20;

    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.style.position = 'fixed';
        dot.style.width = '4px';
        dot.style.height = '4px';
        dot.style.backgroundColor = 'var(--primary-color)';
        dot.style.borderRadius = '50%';
        dot.style.pointerEvents = 'none';
        dot.style.zIndex = '9999';
        dot.style.opacity = (i / trailLength).toString();
        dot.style.transition = 'all 0.1s ease';
        document.body.appendChild(dot);
        trail.push(dot);
    }

    document.addEventListener('mousemove', (e) => {
        trail.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.left = e.clientX + 'px';
                dot.style.top = e.clientY + 'px';
            }, index * 10);
        });
    });
}

// Enhanced typing effect with cursor
function enhancedTypeWriter(element, text, speed = 80) {
    element.style.borderRight = '2px solid var(--primary-color)';
    element.style.animation = 'blink 1s infinite';
    
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed + Math.random() * 50);
        } else {
            setTimeout(() => {
                element.style.borderRight = 'none';
                element.style.animation = 'none';
            }, 1000);
        }
    }
    type();
}

// Performance optimized scroll animations
function initOptimizedScrollAnimations() {
    let ticking = false;
    
    function updateAnimations() {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Parallax for hero section
        const hero = document.querySelector('.hero-image img');
        if (hero) {
            const heroRect = hero.getBoundingClientRect();
            if (heroRect.top < windowHeight && heroRect.bottom > 0) {
                const rate = scrolled * -0.3;
                hero.style.transform = `translateY(${rate}px) rotateY(${scrolled * 0.05}deg)`;
            }
        }
        
        // Navbar blur effect
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            const blurAmount = Math.min(scrolled / 100, 1) * 20;
            navbar.style.backdropFilter = `blur(${blurAmount}px)`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// AI-inspired particle system
function initParticleSystem() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.3';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2
        };
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Only show particles in dark mode
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        if (!isDark) {
            requestAnimationFrame(animate);
            return;
        }
        
        ctx.fillStyle = '#00d4ff';
        
        particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            ctx.globalAlpha = particle.opacity;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Initialize particles
    for (let i = 0; i < 50; i++) {
        particles.push(createParticle());
    }
    
    animate();
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 AI-Enhanced Portfolio Loaded Successfully!');

    // Initialize all animation functions
    initScrollAnimations();
    initOptimizedScrollAnimations();
    initSkillTagAnimations();
    addRippleEffect();
    initCardRevealAnimations();
    initHoverEffects();
    
    // Initialize advanced effects
    createMatrixRain();
    createNeuralNodes();
    initCursorTrail();
    initParticleSystem();

    // Enhanced typing effect for hero title
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-text h1');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            enhancedTypeWriter(heroTitle, originalText, 100);
        }
    }, 1500);
});
