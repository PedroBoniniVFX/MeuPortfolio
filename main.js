// Main JavaScript functionality
class PedroBoniniPortfolio {
    constructor() {
        this.currentSection = 'home';
        this.isLoading = true;
        this.mobileMenuOpen = false;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.handleLoading();
        this.setupFormValidation();
        
        // Load portfolio after a short delay to ensure DOM is ready
        setTimeout(() => {
            this.loadPortfolioItems();
            this.setupIntersectionObserver();
        }, 500);
    }

    setupEventListeners() {
        // Window events
        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
        window.addEventListener('load', this.handleWindowLoad.bind(this));

        // Navigation events
        document.addEventListener('click', this.handleNavigation.bind(this));
        
        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeyboard.bind(this));

        // Form events
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleFormSubmit.bind(this));
        }
    }

    handleLoading() {
        const loadingScreen = document.getElementById('loading');
        
        // Simulate loading time
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }
            this.isLoading = false;
        }, 1500);
    }

    handleWindowLoad() {
        // Ensure all images are loaded
        const images = document.querySelectorAll('img');
        let loadedImages = 0;
        
        images.forEach(img => {
            if (img.complete) {
                loadedImages++;
            } else {
                img.addEventListener('load', () => {
                    loadedImages++;
                    if (loadedImages === images.length) {
                        this.handleLoading();
                    }
                });
            }
        });
    }

    handleScroll() {
        const header = document.getElementById('header');
        if (!header) return;

        const scrolled = window.pageYOffset;
        const opacity = Math.min(scrolled / 100, 0.95);
        
        header.style.background = `rgba(0, 0, 0, ${opacity})`;
        
        // Add/remove scrolled class for additional styling
        if (scrolled > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && this.mobileMenuOpen) {
            this.toggleMobileMenu();
        }
    }

    handleNavigation(event) {
        const target = event.target;
        
        // Handle navigation buttons
        if (target.classList.contains('nav-btn')) {
            const section = target.textContent.toLowerCase()
                .replace('í', 'i')
                .replace('ó', 'o')
                .replace(' ', '');
            
            if (section === 'inicio') {
                this.showSection('home');
            } else if (section === 'sobremim') {
                this.showSection('sobre');
            } else if (section === 'portfolio') {
                this.showSection('portfolio');
            } else if (section === 'contato') {
                this.showSection('contato');
            }
        }

        // Handle logo click
        if (target.closest('.logo')) {
            this.showSection('home');
        }

        // Handle portfolio items
        if (target.closest('.portfolio-item')) {
            this.handlePortfolioClick(target.closest('.portfolio-item'));
        }

        // Handle scroll arrow
        if (target.closest('.scroll-arrow')) {
            this.scrollToProjects();
        }
    }

    handleKeyboard(event) {
        // ESC key to close mobile menu
        if (event.key === 'Escape' && this.mobileMenuOpen) {
            this.toggleMobileMenu();
        }

        // Arrow keys for navigation (optional enhancement)
        if (event.ctrlKey || event.metaKey) {
            switch(event.key) {
                case '1':
                    event.preventDefault();
                    this.showSection('home');
                    break;
                case '2':
                    event.preventDefault();
                    this.showSection('sobre');
                    break;
                case '3':
                    event.preventDefault();
                    this.showSection('portfolio');
                    break;
                case '4':
                    event.preventDefault();
                    this.showSection('contato');
                    break;
            }
        }
    }

    showSection(sectionName) {
        if (this.isLoading) return;

        // Remove active class from all sections
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => section.classList.remove('active'));
        
        // Remove active class from all buttons
        const buttons = document.querySelectorAll('.nav-btn');
        buttons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to selected section
        const targetSection = document.getElementById(sectionName);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Add active class to corresponding button
        const targetButton = Array.from(buttons).find(btn => {
            const btnText = btn.textContent.toLowerCase()
                .replace('í', 'i')
                .replace('ó', 'o')
                .replace(' ', '');
            
            return (
                (sectionName === 'home' && btnText === 'inicio') ||
                (sectionName === 'sobre' && btnText === 'sobremim') ||
                (sectionName === 'portfolio' && btnText === 'portfolio') ||
                (sectionName === 'contato' && btnText === 'contato')
            );
        });
        
        if (targetButton) {
            targetButton.classList.add('active');
        }
        
        // Update current section
        this.currentSection = sectionName;
        
        // Load portfolio if switching to portfolio section
        if (sectionName === 'portfolio') {
            this.loadPortfolioItems();
            setTimeout(() => this.loadPortfolioItems(), 100);
            setTimeout(() => this.loadPortfolioItems(), 500);
        }
        
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Close mobile menu if open
        if (this.mobileMenuOpen) {
            this.toggleMobileMenu();
        }

        // Update URL without page reload
        if (history.pushState) {
            const newUrl = sectionName === 'home' ? '/' : `/#${sectionName}`;
            history.pushState({ section: sectionName }, '', newUrl);
        }
    }

    toggleMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mainNav = document.querySelector('.main-nav');
        
        if (!mobileMenuBtn || !mainNav) return;

        this.mobileMenuOpen = !this.mobileMenuOpen;
        
        mobileMenuBtn.classList.toggle('active');
        mainNav.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : '';
    }

    loadPortfolioItems() {
        const portfolioGrid = document.getElementById('projects-grid');
        if (!portfolioGrid) {
            console.log('Portfolio grid not found');
            return;
        }

        // Clear existing items
        portfolioGrid.innerHTML = '';

        // Use portfolioData from the global scope
        if (typeof portfolioData !== 'undefined') {
            console.log('Loading', portfolioData.length, 'portfolio items');
            portfolioData.forEach((item, index) => {
                const portfolioItem = this.createPortfolioItem(item, index);
                portfolioGrid.appendChild(portfolioItem);
            });
            
            // Setup intersection observer for new items
            setTimeout(() => this.setupIntersectionObserver(), 100);
        } else {
            console.error('portfolioData not found');
        }
    }

    createPortfolioItem(item, index) {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item fade-in';
        portfolioItem.dataset.category = item.category;
        portfolioItem.dataset.id = item.id;
        
        portfolioItem.innerHTML = `
            <div class="portfolio-image">
                <img src="${item.image}" alt="${item.title}" onerror="this.src='./assets/images/profile.jpg'">
                <div class="portfolio-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            </div>
        `;

        // Add staggered animation delay
        portfolioItem.style.animationDelay = `${index * 0.1}s`;
        portfolioItem.style.opacity = '0';
        portfolioItem.style.transform = 'translateY(30px)';

        return portfolioItem;
    }

    handlePortfolioClick(item) {
        const itemId = item.dataset.id;
        const itemData = window.portfolioData.find(data => data.id === itemId);
        
        if (itemData) {
            // Add click animation
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                item.style.transform = '';
            }, 150);

            // Here you could open a modal or navigate to a detailed view
            console.log('Portfolio item clicked:', itemData);
        }
    }

    scrollToProjects() {
        const projectsGrid = document.getElementById('projects-grid');
        if (projectsGrid) {
            const offsetTop = projectsGrid.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe fade-in elements
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(element => {
            observer.observe(element);
        });
    }

    setupFormValidation() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error styling
        field.classList.remove('error');
        this.removeErrorMessage(field);

        // Validation rules
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Este campo é obrigatório';
        } else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Por favor, insira um email válido';
            }
        }

        if (!isValid) {
            field.classList.add('error');
            this.showErrorMessage(field, errorMessage);
        }

        return isValid;
    }

    clearFieldError(field) {
        field.classList.remove('error');
        this.removeErrorMessage(field);
    }

    showErrorMessage(field, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        
        field.parentNode.insertBefore(errorElement, field.nextSibling);
    }

    removeErrorMessage(field) {
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    handleFormSubmit(event) {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);
        const inputs = form.querySelectorAll('input, textarea');
        
        let isFormValid = true;

        // Validate all fields
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'ENVIANDO...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual implementation)
        setTimeout(() => {
            // Reset form
            form.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            this.showSuccessMessage('Mensagem enviada com sucesso!');
        }, 2000);
    }

    showSuccessMessage(message) {
        const successElement = document.createElement('div');
        successElement.className = 'success-message';
        successElement.textContent = message;
        successElement.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(successElement);

        setTimeout(() => {
            successElement.remove();
        }, 5000);
    }
}

// Initialize the portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing portfolio...');
    window.portfolioApp = new PedroBoniniPortfolio();
    
    // Force load portfolio after 1 second
    setTimeout(() => {
        if (window.portfolioApp) {
            console.log('Force loading portfolio items...');
            window.portfolioApp.loadPortfolioItems();
        }
    }, 1000);
});

// Global functions for backward compatibility
window.showSection = function(section) {
    if (window.portfolioApp) {
        window.portfolioApp.showSection(section);
    }
};

window.toggleMobileMenu = function() {
    if (window.portfolioApp) {
        window.portfolioApp.toggleMobileMenu();
    }
};

window.scrollToProjects = function() {
    if (window.portfolioApp) {
        window.portfolioApp.scrollToProjects();
    }
};

// Handle browser back/forward buttons
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.section && window.portfolioApp) {
        window.portfolioApp.showSection(event.state.section);
    }
});

// Add CSS for form validation
const style = document.createElement('style');
style.textContent = `
    .field-error {
        color: #ff4444;
        font-size: 0.8rem;
        margin-top: 0.25rem;
        margin-bottom: 0.5rem;
    }
    
    .contact-form input.error,
    .contact-form textarea.error {
        border-color: #ff4444;
        box-shadow: 0 0 0 2px rgba(255, 68, 68, 0.2);
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);