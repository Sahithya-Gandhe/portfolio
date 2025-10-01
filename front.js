// Optimized Front Page JavaScript - Fast Loading

document.addEventListener('DOMContentLoaded', function() {
    const frontPageOverlay = document.getElementById('frontPageOverlay');
    const mainQuote = document.getElementById('mainQuote');
    const secondaryText = document.getElementById('secondaryText');
    const portfolioButton = document.querySelector('.portfolio-button');
    const buttonContainer = document.querySelector('.button-container');
    
    // Writing effect animation for text elements
    function animateElements() {
        // Show main quote container first
        mainQuote.style.opacity = '1';
        mainQuote.style.transform = 'translateY(0)';
        
        // Show cursor after words finish appearing
        setTimeout(() => {
            const cursor = mainQuote.querySelector('::after');
            if (mainQuote) {
                mainQuote.style.setProperty('--show-cursor', '1');
            }
        }, 1200);
        
        // Hide cursor and show secondary text
        setTimeout(() => {
            if (mainQuote) {
                mainQuote.style.setProperty('--show-cursor', '0');
            }
            secondaryText.style.opacity = '1';
            secondaryText.style.transform = 'translateY(0)';
        }, 1800);
        
        // Show button
        setTimeout(() => {
            if (buttonContainer) {
                buttonContainer.style.opacity = '1';
                buttonContainer.style.transform = 'translateY(0)';
            }
        }, 2200);
    }
    
    // Handle button click
    function handleButtonClick(event) {
        event.preventDefault();
        
        // Quick fade transition
        frontPageOverlay.style.transition = 'opacity 0.3s ease';
        frontPageOverlay.style.opacity = '0';
        
        // Navigate to portfolio page
        setTimeout(() => {
            window.location.href = 'portfolio.html';
        }, 300);
    }
    
    // Handle overlay click for portfolio navigation
    function handleOverlayClick(event) {
        if (!event.target.closest('.portfolio-button')) {
            frontPageOverlay.style.transition = 'opacity 0.3s ease';
            frontPageOverlay.style.opacity = '0';
            
            setTimeout(() => {
                window.location.href = 'portfolio.html';
            }, 300);
        }
    }
    
    // Keyboard navigation
    function handleKeyPress(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleOverlayClick(event);
        }
    }
    
    // Create flowing dots effect
    function createFlowingDots() {
        const particlesContainer = document.querySelector('.particles-container');
        if (!particlesContainer) return;
        
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random speed class
            const speeds = ['slow', 'medium', 'fast'];
            particle.classList.add(speeds[Math.floor(Math.random() * speeds.length)]);
            
            // Random horizontal position
            particle.style.left = Math.random() * 100 + '%';
            
            // Random horizontal drift
            particle.style.setProperty('--random-x', (Math.random() - 0.5) * 200 + 'px');
            
            particlesContainer.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 15000);
        }
        
        // Create particles at intervals
        setInterval(createParticle, 800);
        
        // Create initial particles
        for (let i = 0; i < 5; i++) {
            setTimeout(createParticle, i * 200);
        }
    }
    
    // Initialize immediately for fast loading
    animateElements();
    createFlowingDots();
    
    // Add event listeners
    if (portfolioButton) {
        portfolioButton.addEventListener('click', handleButtonClick);
    }
    frontPageOverlay.addEventListener('click', handleOverlayClick);
    document.addEventListener('keydown', handleKeyPress);
    
    // Accessibility
    frontPageOverlay.setAttribute('tabindex', '0');
    frontPageOverlay.setAttribute('aria-label', 'Enter portfolio');
    if (portfolioButton) {
        portfolioButton.setAttribute('aria-label', 'Navigate to portfolio page');
    }
});