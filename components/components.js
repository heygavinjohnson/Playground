// Component Loading System
window.components = {
    // Load a component into a container
    async loadComponent(containerId, componentPath) {
        try {
            console.log(`Loading component: ${componentPath} into ${containerId}`);
            const response = await fetch(componentPath);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const html = await response.text();
            console.log(`Component HTML loaded successfully: ${componentPath}`);
            
            const container = document.getElementById(containerId);
            if (!container) {
                throw new Error(`Container not found: ${containerId}`);
            }
            
            container.innerHTML = html;
            console.log(`Component inserted into container: ${containerId}`);
            
            return true;
        } catch (error) {
            console.error(`Error loading component ${componentPath}:`, error);
            this.showFallback(containerId, componentPath, error);
            return false;
        }
    },

    // Show fallback content when component fails to load
    showFallback(containerId, componentPath, error) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `
                <div style="padding: 20px; background: #f0f0f0; border: 1px solid #ccc; margin: 20px; text-align: center;">
                    <h3>Component Loading Error</h3>
                    <p>Failed to load ${componentPath}</p>
                    <p>This is likely due to CORS restrictions. Please use a local server to view this page properly.</p>
                    <p>Try running: <code>python -m http.server 8000</code> or <code>npx http-server</code></p>
                    <p><small>Error: ${error.message}</small></p>
                </div>
            `;
        }
    },

    // Load navigation component
    async loadNavigation() {
        return await this.loadComponent('navigation-container', 'components/navigation.html');
    },

    // Load footer component
    async loadFooter() {
        return await this.loadComponent('footer-container', 'components/footer.html');
    },

    // Load both navigation and footer
    async loadAll() {
        const navLoaded = await this.loadNavigation();
        const footerLoaded = await this.loadFooter();
        
        if (navLoaded && footerLoaded) {
            console.log('All components loaded successfully');
            this.initializeNavigation();
        }
        
        return navLoaded && footerLoaded;
    },

    // Initialize navigation functionality after loading
    initializeNavigation() {
        // Mobile Navigation Toggle
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }

        // Dropdown Toggle
        const dropdownTrigger = document.querySelector('.dropdown-trigger');
        const dropdownMenu = document.getElementById('sell-dropdown');

        if (dropdownTrigger && dropdownMenu) {
            dropdownTrigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Toggle dropdown
                dropdownMenu.classList.toggle('active');
                dropdownTrigger.classList.toggle('active');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!dropdownTrigger.contains(e.target) && !dropdownMenu.contains(e.target)) {
                    dropdownMenu.classList.remove('active');
                    dropdownTrigger.classList.remove('active');
                }
            });

            // Close dropdown on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    dropdownMenu.classList.remove('active');
                    dropdownTrigger.classList.remove('active');
                }
            });
        }

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu) navMenu.classList.remove('active');
                if (navToggle) navToggle.classList.remove('active');
            });
        });

        console.log('Navigation functionality initialized');
    },

    // Set active page for navigation highlighting
    setActivePage(pageName) {
        // This can be used to highlight the current page in navigation
        console.log(`Setting active page: ${pageName}`);
        // Implementation can be added here if needed
    }
};

// Auto-load components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing components...');
    window.components.loadAll();
});
