// Navigation Component JavaScript
class Navigation {
    constructor() {
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.dropdownTrigger = document.querySelector('.dropdown-trigger');
        this.dropdownMenu = document.getElementById('sell-dropdown');
        
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupDropdown();
        this.setupScrollEffects();
        this.setupKeyboardNavigation();
    }

    setupMobileMenu() {
        if (this.navToggle && this.navMenu) {
            this.navToggle.addEventListener('click', () => {
                this.navMenu.classList.toggle('active');
                this.navToggle.classList.toggle('active');
            });

            // Close mobile menu when clicking on a link
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.navMenu.classList.remove('active');
                    this.navToggle.classList.remove('active');
                });
            });
        }
    }

    setupDropdown() {
        if (this.dropdownTrigger && this.dropdownMenu) {
            this.dropdownTrigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Toggle dropdown
                this.dropdownMenu.classList.toggle('active');
                this.dropdownTrigger.classList.toggle('active');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.dropdownTrigger.contains(e.target) && !this.dropdownMenu.contains(e.target)) {
                    this.dropdownMenu.classList.remove('active');
                    this.dropdownTrigger.classList.remove('active');
                }
            });
        }
    }

    setupScrollEffects() {
        // Navbar background change on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    setupKeyboardNavigation() {
        // Close mobile menu with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.navMenu && this.navMenu.classList.contains('active')) {
                    this.navMenu.classList.remove('active');
                    this.navToggle.classList.remove('active');
                }
                
                if (this.dropdownMenu && this.dropdownMenu.classList.contains('active')) {
                    this.dropdownMenu.classList.remove('active');
                    this.dropdownTrigger.classList.remove('active');
                }
            }
        });

        // Focus management for mobile menu
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => {
                if (this.navMenu.classList.contains('active')) {
                    // Focus first link when menu opens
                    const firstLink = this.navMenu.querySelector('.nav-link');
                    if (firstLink) {
                        firstLink.focus();
                    }
                }
            });
        }

        // Add focus trap for mobile menu
        if (this.navMenu) {
            this.navMenu.addEventListener('keydown', (e) => {
                if (this.navMenu.classList.contains('active')) {
                    const focusableElements = this.navMenu.querySelectorAll('.nav-link');
                    const firstElement = focusableElements[0];
                    const lastElement = focusableElements[focusableElements.length - 1];
                    
                    if (e.key === 'Tab') {
                        if (e.shiftKey) {
                            if (document.activeElement === firstElement) {
                                e.preventDefault();
                                lastElement.focus();
                            }
                        } else {
                            if (document.activeElement === lastElement) {
                                e.preventDefault();
                                firstElement.focus();
                            }
                        }
                    }
                }
            });
        }
    }

    // Public method to close all menus
    closeAllMenus() {
        if (this.navMenu) {
            this.navMenu.classList.remove('active');
        }
        if (this.navToggle) {
            this.navToggle.classList.remove('active');
        }
        if (this.dropdownMenu) {
            this.dropdownMenu.classList.remove('active');
        }
        if (this.dropdownTrigger) {
            this.dropdownTrigger.classList.remove('active');
        }
    }

    // Public method to set active page
    setActivePage(pageName) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === pageName || link.textContent.toLowerCase().includes(pageName.toLowerCase())) {
                link.classList.add('active');
            }
        });
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.navigation = new Navigation();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Navigation;
}
