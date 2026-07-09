/**
 * Animations & Interactions
 * Gestion des animations au scroll, micro-interactions et effets visuels
 */

class AnimationManager {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.init();
    }

    /**
     * Initialiser les animations
     */
    init() {
        this.setupIntersectionObserver();
        this.setupSmoothScroll();
        this.setupMobileMenu();
        this.preventMotion();
    }

    /**
     * Configuration de l'Intersection Observer pour l'apparition au scroll
     */
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);

        // Observer les éléments animables
        const animableElements = document.querySelectorAll(
            'section, .project-card, .skill-category, .timeline-item, .highlight-card, .contact-card'
        );

        animableElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            observer.observe(element);
        });
    }

    /**
     * Configuration du scroll lisse
     */
    setupSmoothScroll() {
        // Gérer les clics sur les liens d'ancre
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();

                // Fermer le menu mobile si ouvert
                const navMenu = document.getElementById('nav-menu');
                const menuToggle = document.getElementById('menu-toggle');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }

                // Scroller vers le target
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });
    }

    /**
     * Configuration du menu mobile
     */
    setupMobileMenu() {
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (!menuToggle || !navMenu) return;

        menuToggle.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isActive);
        });

        // Fermer le menu quand on clique sur un lien
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Fermer le menu quand on clique en dehors
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /**
     * Respecter les préférences de mouvement réduit
     */
    preventMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            document.documentElement.style.setProperty('--motion-safe', '0');
        }

        // Écouter les changements de préférence
        window.matchMedia('(prefers-reduce-motion: reduce)').addEventListener('change', (e) => {
            document.documentElement.style.setProperty('--motion-safe', e.matches ? '0' : '1');
        });
    }
}

/**
 * Gestion du formulaire de contact
 */
class ContactFormManager {
    constructor() {
        this.form = document.getElementById('contact-form');
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.setupFormValidation();
    }

    /**
     * Configurer la validation du formulaire
     */
    setupFormValidation() {
        const inputs = this.form.querySelectorAll('input[required], textarea[required]');

        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('change', () => this.validateField(input));
        });
    }

    /**
     * Valider un champ
     */
    validateField(field) {
        const errorContainer = field.parentElement.querySelector('.error-message');
        let isValid = true;
        let errorMessage = '';

        if (!field.value.trim()) {
            isValid = false;
            errorMessage = 'Ce champ est requis';
        } else if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                errorMessage = 'Veuillez entrer une adresse email valide';
            }
        }

        if (!isValid) {
            field.setAttribute('aria-invalid', 'true');
            if (errorContainer) {
                errorContainer.textContent = errorMessage;
            }
        } else {
            field.setAttribute('aria-invalid', 'false');
            if (errorContainer) {
                errorContainer.textContent = '';
            }
        }

        return isValid;
    }

    /**
     * Valider tout le formulaire
     */
    validateForm() {
        const inputs = this.form.querySelectorAll('input[required], textarea[required]');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        return isFormValid;
    }

    /**
     * Gérer la soumission du formulaire
     */
    async handleSubmit(e) {
        e.preventDefault();

        // Valider le formulaire
        if (!this.validateForm()) {
            this.showMessage('Veuillez corriger les erreurs du formulaire', 'error');
            return;
        }

        // Récupérer les données
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        // Afficher l'état de chargement
        const submitButton = this.form.querySelector('button[type="submit"]');
        submitButton.classList.add('loading');
        submitButton.disabled = true;

        try {
            // Simuler l'envoi du formulaire
            // À remplacer par une vraie API
            await this.sendForm(data);

            // Message de succès
            this.showMessage('Message envoyé avec succès! Je vous répondrai bientôt.', 'success');

            // Réinitialiser le formulaire
            this.form.reset();

            // Réinitialiser les erreurs
            this.form.querySelectorAll('.error-message').forEach(el => {
                el.textContent = '';
            });
        } catch (error) {
            console.error('Erreur lors de l\'envoi:', error);
            this.showMessage('Une erreur s\'est produite. Veuillez réessayer.', 'error');
        } finally {
            // Retirer l'état de chargement
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
        }
    }

    /**
     * Envoyer le formulaire
     */
    async sendForm(data) {
        // Exemple avec FormSubmit.co (service gratuit)
        // À adapter selon votre backend
        
        return new Promise((resolve, reject) => {
            // Simulation d'un délai réseau
            setTimeout(() => {
                // Dans un vrai projet, faire un appel fetch/axios ici
                // fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
                console.log('Formulaire envoyé:', data);
                resolve();
            }, 1000);
        });
    }

    /**
     * Afficher un message
     */
    showMessage(message, type) {
        const messageContainer = this.form.querySelector('.form-message');
        if (!messageContainer) return;

        messageContainer.textContent = message;
        messageContainer.className = `form-message ${type}`;

        // Faire défiler vers le message
        messageContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Retirer le message après 5 secondes
        setTimeout(() => {
            messageContainer.textContent = '';
            messageContainer.className = 'form-message';
        }, 5000);
    }
}

/**
 * Animation de l'arrière-plan avec Canvas
 */
class BackgroundAnimation {
    constructor() {
        this.canvas = document.getElementById('animated-bg');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.config = {
            particleCount: 50,
            particleSize: 2,
            particleOpacity: 0.5,
            speed: 0.5,
            color: '#6366f1'
        };

        this.init();
    }

    init() {
        // Redimensionner le canvas
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // Créer les particules
        this.createParticles();

        // Démarrer l'animation
        this.animate();

        // Observer les changements de thème
        document.addEventListener('themechange', () => this.updateColor());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        
        for (let i = 0; i < this.config.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * this.config.speed,
                vy: (Math.random() - 0.5) * this.config.speed,
                size: Math.random() * this.config.particleSize + 1,
                opacity: Math.random() * this.config.particleOpacity
            });
        }
    }

    animate() {
        // Effacer le canvas
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Mettre à jour et dessiner les particules
        this.particles.forEach(particle => {
            // Mise à jour de la position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Rebondir sur les bords
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // Garder les particules dans les limites
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));

            // Dessiner la particule
            this.drawParticle(particle);
        });

        // Continuer l'animation
        requestAnimationFrame(() => this.animate());
    }

    drawParticle(particle) {
        this.ctx.fillStyle = this.getColorWithOpacity(particle.opacity);
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();

        // Dessiner les connexions entre particules proches
        this.drawConnections(particle);
    }

    drawConnections(particle) {
        const connectionDistance = 150;

        this.particles.forEach(otherParticle => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                const opacity = (1 - distance / connectionDistance) * 0.3;
                this.ctx.strokeStyle = this.getColorWithOpacity(opacity);
                this.ctx.lineWidth = 0.5;
                this.ctx.beginPath();
                this.ctx.moveTo(particle.x, particle.y);
                this.ctx.lineTo(otherParticle.x, otherParticle.y);
                this.ctx.stroke();
            }
        });
    }

    getColorWithOpacity(opacity) {
        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();
        // Convertir hex en rgba ou utiliser directement
        return `rgba(99, 102, 241, ${opacity})`;
    }

    updateColor() {
        // Mettre à jour la couleur si le thème change
        // Cette méthode peut être étendue pour d'autres changements
    }
}

/**
 * Initialiser tous les gestionnaires au chargement du DOM
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new AnimationManager();
        new ContactFormManager();
        new BackgroundAnimation();
    });
} else {
    new AnimationManager();
    new ContactFormManager();
    new BackgroundAnimation();
}

// Export pour utilisation en modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AnimationManager,
        ContactFormManager,
        BackgroundAnimation
    };
}
