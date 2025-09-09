// Agent Carousel Component JavaScript
window.AgentCarousel = {
    // Sample agent data
    sampleAgents: [
        {
            id: 1,
            name: "Sarah Mitchell",
            agency: "Ray White Melbourne",
            photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
            specialties: ["First Home Buyers", "Investment Properties"],
            suburb: "Richmond",
            rating: 4.9,
            reviewCount: 127,
            experience: "8 years",
            recentSales: 23,
            isVerified: true
        },
        {
            id: 2,
            name: "Michael Chen",
            agency: "Barry Plant Real Estate",
            photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
            specialties: ["Luxury Properties", "Commercial"],
            suburb: "Toorak",
            rating: 4.8,
            reviewCount: 89,
            experience: "12 years",
            recentSales: 31,
            isVerified: true
        },
        {
            id: 3,
            name: "Emma Thompson",
            agency: "Harcourts Real Estate",
            photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
            specialties: ["Family Homes", "First Home Buyers"],
            suburb: "Hawthorn",
            rating: 4.7,
            reviewCount: 156,
            experience: "6 years",
            recentSales: 18,
            isVerified: true
        },
        {
            id: 4,
            name: "David Rodriguez",
            agency: "Jellis Craig",
            photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
            specialties: ["Investment Properties", "Auction Specialist"],
            suburb: "South Yarra",
            rating: 4.9,
            reviewCount: 203,
            experience: "15 years",
            recentSales: 42,
            isVerified: true
        },
        {
            id: 5,
            name: "Lisa Wang",
            agency: "Marshall White",
            photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
            specialties: ["Luxury Properties", "International Buyers"],
            suburb: "Brighton",
            rating: 4.8,
            reviewCount: 94,
            experience: "10 years",
            recentSales: 27,
            isVerified: true
        },
        {
            id: 6,
            name: "James Wilson",
            agency: "Buxton Real Estate",
            photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
            specialties: ["First Home Buyers", "Family Homes"],
            suburb: "Prahran",
            rating: 4.6,
            reviewCount: 78,
            experience: "5 years",
            recentSales: 15,
            isVerified: true
            }
    ],

    // Initialize carousel
    init: function(containerId, options = {}) {
        this.containerId = containerId;
        this.options = {
            cardsPerView: options.cardsPerView || 3,
            autoPlay: options.autoPlay || false,
            autoPlayInterval: options.autoPlayInterval || 5000,
            showNavigation: options.showNavigation !== false,
            ...options
        };
        
        this.currentSlide = 0;
        this.autoPlayTimer = null;
        
        this.setupEventListeners();
        this.updateCarousel();
        
        if (this.options.autoPlay) {
            this.startAutoPlay();
        }
    },

    // Setup event listeners
    setupEventListeners: function() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        const prevBtn = container.querySelector('.carousel-prev');
        const nextBtn = container.querySelector('.carousel-next');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousSlide());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // Pause auto-play on hover
        if (this.options.autoPlay) {
            const carousel = container.querySelector('.agents-carousel');
            if (carousel) {
                carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
                carousel.addEventListener('mouseleave', () => this.startAutoPlay());
            }
        }
    },

    // Populate carousel with agents
    populateCarousel: function(agents = this.sampleAgents) {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        const carousel = container.querySelector('.agents-carousel');
        if (!carousel) return;

        carousel.innerHTML = agents.map(agent => this.createAgentCard(agent)).join('');
        this.updateCarousel();
    },

    // Create agent card HTML
    createAgentCard: function(agent) {
        return `
            <div class="agent-card">
                <div class="agent-photo">
                    <img src="${agent.photo}" alt="${agent.name}" loading="lazy">
                    ${agent.isVerified ? '<div class="verified-badge"><i class="fas fa-check"></i></div>' : ''}
                </div>
                <div class="agent-info">
                    <h3>${agent.name}</h3>
                    <p class="agency">${agent.agency}</p>
                    <div class="specialties">
                        ${agent.specialties.map(specialty => `<span class="specialty-tag">${specialty}</span>`).join('')}
                    </div>
                    <div class="agent-details">
                        <div class="rating">
                            <div class="stars">
                                ${'★'.repeat(Math.floor(agent.rating))}${'☆'.repeat(5 - Math.floor(agent.rating))}
                            </div>
                            <span class="rating-text">${agent.rating} (${agent.reviewCount} reviews)</span>
                        </div>
                        <div class="experience">${agent.experience} experience</div>
                        <div class="recent-sales">${agent.recentSales} recent sales</div>
                    </div>
                    <div class="agent-actions">
                        <button class="btn-view-profile" onclick="AgentCarousel.viewAgentProfile(${agent.id})">
                            View Profile
                        </button>
                        <button class="btn-contact" onclick="AgentCarousel.contactAgent(${agent.id})">
                            Contact
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    // Navigate to previous slide
    previousSlide: function() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
            this.updateCarousel();
        }
    },

    // Navigate to next slide
    nextSlide: function() {
        const maxSlide = Math.max(0, this.sampleAgents.length - this.options.cardsPerView);
        if (this.currentSlide < maxSlide) {
            this.currentSlide++;
            this.updateCarousel();
        }
    },

    // Update carousel position and button states
    updateCarousel: function() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        const carousel = container.querySelector('.agents-carousel');
        const prevBtn = container.querySelector('.carousel-prev');
        const nextBtn = container.querySelector('.carousel-next');

        if (carousel) {
            const cardWidth = 320; // Approximate card width + gap
            const translateX = -this.currentSlide * cardWidth;
            carousel.style.transform = `translateX(${translateX}px)`;
        }

        // Update button states
        if (prevBtn) {
            prevBtn.style.opacity = this.currentSlide === 0 ? '0.5' : '1';
        }

        if (nextBtn) {
            const maxSlide = Math.max(0, this.sampleAgents.length - this.options.cardsPerView);
            nextBtn.style.opacity = this.currentSlide >= maxSlide ? '0.5' : '1';
        }
    },

    // Start auto-play
    startAutoPlay: function() {
        this.stopAutoPlay();
        this.autoPlayTimer = setInterval(() => {
            const maxSlide = Math.max(0, this.sampleAgents.length - this.options.cardsPerView);
            if (this.currentSlide >= maxSlide) {
                this.currentSlide = 0;
            } else {
                this.currentSlide++;
            }
            this.updateCarousel();
        }, this.options.autoPlayInterval);
    },

    // Stop auto-play
    stopAutoPlay: function() {
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
    },

    // Agent actions
    viewAgentProfile: function(agentId) {
        const agent = this.sampleAgents.find(a => a.id === agentId);
        if (agent) {
            alert(`Viewing profile for ${agent.name} from ${agent.agency}`);
            
            // Track event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'view_agent_profile', {
                    agent_id: agentId,
                    agent_name: agent.name,
                    event_category: 'agent_interaction'
                });
            }
        }
    },

    contactAgent: function(agentId) {
        const agent = this.sampleAgents.find(a => a.id === agentId);
        if (agent) {
            alert(`Contacting ${agent.name} from ${agent.agency}`);
            
            // Track event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'contact_agent', {
                    agent_id: agentId,
                    agent_name: agent.name,
                    event_category: 'agent_interaction'
                });
            }
        }
    },

    // Sort agents
    sortAgents: function(sortBy) {
        let sortedAgents = [...this.sampleAgents];
        
        switch(sortBy) {
            case 'rating':
                sortedAgents.sort((a, b) => b.rating - a.rating);
                break;
            case 'experience':
                sortedAgents.sort((a, b) => parseInt(b.experience) - parseInt(a.experience));
                break;
            case 'recent':
                sortedAgents.sort((a, b) => b.recentSales - a.recentSales);
                break;
            default:
                // Keep original order for relevance
                break;
        }
        
        this.populateCarousel(sortedAgents);
    },

    // Destroy carousel
    destroy: function() {
        this.stopAutoPlay();
        const container = document.getElementById(this.containerId);
        if (container) {
            container.innerHTML = '';
        }
    }
};
