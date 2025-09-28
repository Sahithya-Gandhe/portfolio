// Front Page JavaScript - Click anywhere to enter portfolio

document.addEventListener('DOMContentLoaded', function() {
    const frontPageOverlay = document.getElementById('frontPageOverlay');
    const particlesContainer = document.querySelector('.particles-container');
    
    // Create floating particles
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particlesContainer.contains(particle)) {
                particlesContainer.removeChild(particle);
            }
        }, 8000);
    }
    
    // Create particles periodically
    const particleInterval = setInterval(createParticle, 300);
    
    // Handle click anywhere to redirect
    function handleClick(event) {
        // Prevent event bubbling
        event.preventDefault();
        event.stopPropagation();
        
        // Add exit animation
        frontPageOverlay.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        frontPageOverlay.style.opacity = '0';
        frontPageOverlay.style.transform = 'scale(1.1)';
        
        // Clear particle interval
        clearInterval(particleInterval);
        
        // Redirect to main portfolio after animation
        setTimeout(() => {
            window.location.href = 'portfolio.html';
        }, 800);
    }
    
    // Add click event listeners
    frontPageOverlay.addEventListener('click', handleClick);
    frontPageOverlay.addEventListener('touchstart', handleClick, { passive: false });
    
    // Handle keyboard navigation (Enter or Space)
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleClick(event);
        }
        
        // ESC key to prevent accidental exits
        if (event.key === 'Escape') {
            event.preventDefault();
        }
    });
    
    // Prevent context menu
    frontPageOverlay.addEventListener('contextmenu', function(event) {
        event.preventDefault();
    });
    
    // Add loading animation for slow connections
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });
    
    // Initial particle burst
    for (let i = 0; i < 10; i++) {
        setTimeout(createParticle, i * 100);
    }
    
    // Add ripple effect on click
    function createRipple(event) {
        const ripple = document.createElement('div');
        const rect = frontPageOverlay.getBoundingClientRect();
        const size = 60;
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        // Create ripple styles
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(0, 212, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple-animation 0.6s linear';
        ripple.style.pointerEvents = 'none';
        
        frontPageOverlay.appendChild(ripple);
        
        setTimeout(() => {
            if (frontPageOverlay.contains(ripple)) {
                frontPageOverlay.removeChild(ripple);
            }
        }, 600);
    }
    
    // Add ripple on click
    frontPageOverlay.addEventListener('mousedown', createRipple);
    frontPageOverlay.addEventListener('touchstart', function(event) {
        if (event.touches.length === 1) {
            const touch = event.touches[0];
            createRipple({
                clientX: touch.clientX,
                clientY: touch.clientY
            });
        }
    });
    
    // Performance optimization: Pause animations when tab is not visible
    document.addEventListener('visibilitychange', function() {
        const animations = document.querySelectorAll('*');
        if (document.hidden) {
            animations.forEach(el => {
                el.style.animationPlayState = 'paused';
            });
        } else {
            animations.forEach(el => {
                el.style.animationPlayState = 'running';
            });
        }
    });
});

// Add CSS for ripple animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(0, 212, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
`;
document.head.appendChild(style);