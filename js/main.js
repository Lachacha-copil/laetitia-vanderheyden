document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ main.js chargé et DOMContentLoaded déclenché');
    
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const header = document.getElementById('header');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Fermer le menu au clic sur un lien
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
                });
        });
    }

    // Définir l'état actif basé sur l'URL de la page courante
    function setActivePage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link:not(.contact-btn)');
        
                navLinks.forEach(link => {
            const href = link.getAttribute('href');
            // Si le lien pointe vers la page courante (et pas vers une ancre)
            if (href && !href.startsWith('#') && href.includes(currentPage)) {
                link.classList.add('active');
            } else if (href === 'index.html' && (currentPage === 'index.html' || currentPage === '')) {
                link.classList.add('active');
            } else {
                    link.classList.remove('active');
            }
        });
        
        // Gestion spéciale pour le bouton Contact
        const contactBtn = document.querySelector('.contact-btn');
        if (contactBtn) {
            const contactHref = contactBtn.getAttribute('href');
            if (contactHref && contactHref.includes('contact.html') && currentPage.includes('contact.html')) {
                contactBtn.classList.add('active');
            } else if (!currentPage.includes('contact.html')) {
                contactBtn.classList.remove('active');
            }
        }
    }
    
    // Appeler au chargement de la page
    setActivePage();
    
    // Header scroll effect
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Active nav link based on scroll position (uniquement sur index.html)
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        if (currentPage === 'index.html' || currentPage === '') {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link:not(.contact-btn)');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= (sectionTop - 150)) {
                    current = section.getAttribute('id');
                }
            });
            
            // Ne gérer que les liens d'ancres (#)
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    if (href === '#' + current) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                }
            });
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            if (this.getAttribute('href') === '#') return;
            
            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
            window.scrollTo({
                    top: targetElement.offsetTop - headerHeight - 20,
                behavior: 'smooth'
            });
            }
        });
    });

    // Intersection Observer for fade-in/fade-out animations (comme Webflow)
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Observer spécial pour le hero avec threshold plus bas
    const heroObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Pour les cards et autres éléments avec styles inline
                if (entry.target.style.opacity === '0') {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
                // Pour les images avec classe CSS - apparition lente
                if (entry.target.classList.contains('hero-image') || 
                    entry.target.classList.contains('formations-image') || 
                    entry.target.classList.contains('services-hero-image') || 
                    entry.target.classList.contains('services-difference-image') || 
                    entry.target.classList.contains('about-image') ||
                    entry.target.classList.contains('approach-image')) {
                entry.target.classList.add('visible');
                }
            } else {
                // Disparition lente quand on sort de la vue (comme Webflow) - seulement pour les images
                if (entry.target.classList.contains('hero-image') || 
                    entry.target.classList.contains('formations-image') || 
                    entry.target.classList.contains('services-hero-image') || 
                    entry.target.classList.contains('services-difference-image') || 
                    entry.target.classList.contains('about-image') ||
                    entry.target.classList.contains('approach-image')) {
                    entry.target.classList.remove('visible');
                }
                // Pour le hero, on ne fait pas disparaître les éléments au scroll (ils restent visibles)
                if (entry.target.closest('#hero')) {
                    return;
                }
            }
        });
    }, observerOptions);
    
    // Observe cards and sections
    document.querySelectorAll('.situation-card, .approach-mode, .timeline-item, .approach-card-vertical').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
    
    // Observe section headers (titres et sous-titres) - EXCLURE le hero h1
    document.querySelectorAll('.section-header, .section-header h2, .section-subtitle').forEach(el => {
        // Ne pas observer les éléments du hero
        if (!el.closest('#hero')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(el);
        }
    });
    
    // Animation du hero - même méthode que les cards (IntersectionObserver)
    const heroH1 = document.querySelector('.hero-h1');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCTA = document.querySelector('.hero-cta');
    const heroCredibility = document.querySelector('.hero-credibility');
    const heroDomainItems = document.querySelectorAll('.domain-item');
    
    // Observer spécial pour le hero avec threshold très bas pour déclenchement immédiat
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.style.opacity === '0') {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });
    
    // H1 hero - même style que les cards
    if (heroH1) {
        heroH1.style.opacity = '0';
        heroH1.style.transform = 'translateY(30px)';
        heroH1.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        heroObserver.observe(heroH1);
    }
    
    // Subtitle hero
    if (heroSubtitle) {
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(30px)';
        heroSubtitle.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s';
        heroObserver.observe(heroSubtitle);
    }
    
    // CTA hero
    if (heroCTA) {
        heroCTA.style.opacity = '0';
        heroCTA.style.transform = 'translateY(30px)';
        heroCTA.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s';
        heroObserver.observe(heroCTA);
    }
    
    // Credibility hero
    if (heroCredibility) {
        heroCredibility.style.opacity = '0';
        heroCredibility.style.transform = 'translateY(30px)';
        heroCredibility.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s';
        heroObserver.observe(heroCredibility);
    }
    
    // Domain items (cards du hero) - même méthode que les autres cards
    heroDomainItems.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${0.8 + (index * 0.1)}s, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${0.8 + (index * 0.1)}s`;
        heroObserver.observe(el);
    });
    
    // Observe services-result avec délai
    document.querySelectorAll('.services-result').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Observe service-card avec délai séquentiel
    document.querySelectorAll('.service-card').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${0.3 + (index * 0.1)}s, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${0.3 + (index * 0.1)}s`;
        observer.observe(el);
    });
    
    // Observe H1 de la page services
    const servicesH1 = document.querySelector('.services-h1');
    if (servicesH1) {
        servicesH1.style.opacity = '0';
        servicesH1.style.transform = 'translateY(30px)';
        servicesH1.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(servicesH1);
    }
    
    // Observe H1 de la page ateliers
    const ateliersH1 = document.querySelector('.ateliers-h1');
    if (ateliersH1) {
        ateliersH1.style.opacity = '0';
        ateliersH1.style.transform = 'translateY(30px)';
        ateliersH1.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(ateliersH1);
    }
    
    // Observe H1 de la page apropos
    const aproposH1 = document.querySelector('.apropos-h1');
    if (aproposH1) {
        aproposH1.style.opacity = '0';
        aproposH1.style.transform = 'translateY(30px)';
        aproposH1.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(aproposH1);
    }
    
    // Observe éléments de la page apropos
    document.querySelectorAll('.about-content, .about-section, .about-highlight, .about-credentials .credential-item').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${0.3 + (index * 0.1)}s, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${0.3 + (index * 0.1)}s`;
        observer.observe(el);
    });
    
    // Observe H1 de la page approche
    const approcheH1 = document.querySelector('.approche-h1');
    if (approcheH1) {
        approcheH1.style.opacity = '0';
        approcheH1.style.transform = 'translateY(30px)';
        approcheH1.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(approcheH1);
    }
    
    // Observe H1 de la page contact
    const contactH1 = document.querySelector('.contact-h1');
    if (contactH1) {
        contactH1.style.opacity = '0';
        contactH1.style.transform = 'translateY(30px)';
        contactH1.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(contactH1);
    }
    
    // Observe autres éléments de la page services (subtitle, paragraphes du hero)
    document.querySelectorAll('.hero-section .section-subtitle, .hero-section > .container > div > div > p').forEach(el => {
        if (!el.closest('.services-highlight')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s';
            observer.observe(el);
        }
    });
    
    // Observe éléments de la page ateliers (subtitle, paragraphes du hero)
    document.querySelectorAll('.hero-section .section-subtitle, .hero-section > .container > div > p').forEach((el, index) => {
        if (el.closest('main') && !el.closest('.services-highlight')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${0.2 + (index * 0.1)}s, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${0.2 + (index * 0.1)}s`;
            observer.observe(el);
        }
    });
    
    // Observe éléments de la page ateliers (sections d'ateliers)
    document.querySelectorAll('.atelier-section h2, .atelier-section .formations-intro, .atelier-section h3, .atelier-section ul, .atelier-section p').forEach((el, index) => {
        if (!el.closest('.services-highlight')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = `opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${0.2 + (index * 0.05)}s, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${0.2 + (index * 0.05)}s`;
            observer.observe(el);
        }
    });
    
    // Observe la section "Pour qui ?"
    document.querySelectorAll('div[style*="background: var(--background)"] h3, div[style*="background: var(--background)"] p, .formations-cta a').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Observe le CTA final (section avec gradient)
    document.querySelectorAll('section[style*="background: linear-gradient"] h2, section[style*="background: linear-gradient"] p, section[style*="background: linear-gradient"] a').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Observe les cards dans services-highlight (options)
    document.querySelectorAll('.services-highlight > div[style*="grid-template-columns"] > div').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${0.4 + (index * 0.1)}s, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${0.4 + (index * 0.1)}s`;
        observer.observe(el);
    });
    
    // Observe le titre et texte de services-highlight
    document.querySelectorAll('.services-highlight > div[style*="text-align: center"] h3, .services-highlight > div[style*="text-align: center"] p').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Observe le CTA final "Prêt à démarrer"
    document.querySelectorAll('section[style*="margin-bottom: 6rem"] h2, section[style*="margin-bottom: 6rem"] p, section[style*="margin-bottom: 6rem"] a').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Observe images for fade-in animation (déjà avec opacity: 0 dans CSS)
    document.querySelectorAll('.hero-image, .formations-image, .services-hero-image, .services-difference-image, .about-image, .approach-image').forEach(el => {
        // Vérifier si l'image est déjà dans le viewport au chargement
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible) {
            // Si l'image est déjà visible, ajouter la classe immédiatement avec un léger délai
            setTimeout(() => {
                el.classList.add('visible');
            }, 100);
        } else {
            // Sinon, observer normalement
            observer.observe(el);
        }
    });
                
    // Bouton retour en haut
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        // Afficher/masquer le bouton selon le scroll
        function toggleScrollToTop() {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
                } else {
                scrollToTopBtn.classList.remove('visible');
                }
        }
        
        window.addEventListener('scroll', toggleScrollToTop);
        toggleScrollToTop(); // Vérifier l'état initial
        
        // Scroll vers le haut au clic
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Modal Tarifs
    const tarifsModal = document.getElementById('tarifs-modal');
    const tarifsLink = document.getElementById('tarifs-link');
    const modalClose = document.querySelector('.modal-close');
    
    if (tarifsLink && tarifsModal) {
        tarifsLink.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
            tarifsModal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Empêcher le scroll
        });
    } else {
        console.warn('Modal tarifs: éléments non trouvés', { tarifsLink, tarifsModal });
    }
    
    if (modalClose && tarifsModal) {
        modalClose.addEventListener('click', function() {
            tarifsModal.classList.remove('show');
            document.body.style.overflow = ''; // Réactiver le scroll
        });
    }
    
    // Fermer le modal en cliquant en dehors
    if (tarifsModal) {
        tarifsModal.addEventListener('click', function(e) {
            if (e.target === tarifsModal) {
                tarifsModal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
        
        // Fermer avec la touche Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && tarifsModal.classList.contains('show')) {
                tarifsModal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ============================================
    // VALIDATION EN TEMPS RÉEL DES FORMULAIRES
    // ============================================
    
    // Fonctions de validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function validatePhone(phone) {
        const re = /^[\d\s\+\-\(\)]{8,}$/;
        return re.test(phone.replace(/\s/g, ''));
    }
    
    function validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const tagName = field.tagName.toLowerCase();
        let isValid = true;
        let errorMessage = '';
        
        // Vérifier si le champ est requis
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Ce champ est obligatoire';
        }
        
        // Validation spécifique selon le type
        if (value) {
            if (type === 'email' && !validateEmail(value)) {
                isValid = false;
                errorMessage = 'Veuillez entrer une adresse email valide';
            } else if (type === 'tel' && !validatePhone(value)) {
                isValid = false;
                errorMessage = 'Veuillez entrer un numéro de téléphone valide';
            } else if (tagName === 'select' && field.value === '') {
                isValid = false;
                errorMessage = 'Veuillez faire un choix';
            } else if (tagName === 'textarea' && value.length < 10) {
                isValid = false;
                errorMessage = 'Veuillez entrer au moins 10 caractères';
            }
        }
        
        return { isValid, errorMessage };
    }
    
    // Afficher/masquer le message d'erreur
    function showFieldError(field, message) {
        let errorMsg = field.parentElement.querySelector('.error-message');
        if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            field.parentElement.appendChild(errorMsg);
        }
        errorMsg.textContent = message;
        errorMsg.classList.add('show');
    }
    
    function hideFieldError(field) {
        const errorMsg = field.parentElement.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.classList.remove('show');
        }
    }
    
    // Appliquer les classes de validation
    function updateFieldValidation(field, isValid) {
        field.classList.remove('valid', 'invalid');
        if (field.value.trim()) {
            field.classList.add(isValid ? 'valid' : 'invalid');
        }
    }
    
    // Initialiser la validation pour un formulaire
    function initFormValidation(form) {
        console.log('initFormValidation appelée pour:', form.id);
        const fields = form.querySelectorAll('input, textarea, select');
        
        fields.forEach(field => {
            // Validation au blur (quand on quitte le champ)
            field.addEventListener('blur', function() {
                const { isValid, errorMessage } = validateField(field);
                updateFieldValidation(field, isValid);
                if (!isValid) {
                    showFieldError(field, errorMessage);
                } else {
                    hideFieldError(field);
                }
            });
            
            // Validation en temps réel (pendant la saisie)
            field.addEventListener('input', function() {
                const { isValid, errorMessage } = validateField(field);
                updateFieldValidation(field, isValid);
                if (!isValid && field.value.trim()) {
                    showFieldError(field, errorMessage);
                } else {
                    hideFieldError(field);
                }
            });
            
            // Validation pour les selects au changement
            if (field.tagName.toLowerCase() === 'select') {
                field.addEventListener('change', function() {
                    const { isValid, errorMessage } = validateField(field);
                    updateFieldValidation(field, isValid);
                    if (!isValid) {
                        showFieldError(field, errorMessage);
                    } else {
                        hideFieldError(field);
                    }
                });
            }
        });
        
        // Validation et soumission AJAX - Version simplifiée comme l'ancien code qui fonctionne
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formMessage = form.querySelector('.form-message') || form.querySelector('#formMessage');
            
            // Validation simple comme dans l'ancien code
            let formIsValid = true;
            fields.forEach(field => {
                const { isValid, errorMessage } = validateField(field);
                updateFieldValidation(field, isValid);
                
                if (!isValid) {
                    formIsValid = false;
                    showFieldError(field, errorMessage);
                } else {
                    hideFieldError(field);
                }
            });
            
            if (!formIsValid) {
                if (formMessage) {
                    formMessage.textContent = 'Veuillez remplir tous les champs obligatoires.';
                    formMessage.className = 'form-message error';
                }
                return;
            }
            
            // Créer FormData exactement comme dans l'ancien code
            const formData = new FormData(form);
            
            // Ajouter _subject dynamiquement comme dans l'ancien code
            const nameField = form.querySelector('input[name="name"]');
            const themeField = form.querySelector('select[name="theme"]');
            if (nameField && nameField.value && themeField && themeField.value) {
                const themeText = themeField.options[themeField.selectedIndex].text;
                const subject = `[${themeText}] ${nameField.value}`;
                formData.append('_subject', subject);
            } else {
                formData.append('_subject', 'Nouvelle demande de contact - Laetitia Vanderheyden');
            }
            
            // NE PAS ajouter _replyto - l'ancien code ne le fait pas et ça fonctionne
            
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                // Comme dans l'ancien code : juste vérifier response.ok, ne pas lire la réponse JSON
                if (response.ok) {
                    if (formMessage) {
                        if (form.id === 'tarifsForm') {
                            formMessage.innerHTML = `
                                <div style="background: linear-gradient(135deg, #0A4D68 0%, #088395 100%); 
                                            color: white; 
                                            padding: 1.25rem 1.5rem; 
                                            border-radius: 12px; 
                                            box-shadow: 0 4px 20px rgba(10, 77, 104, 0.25);
                                            border: 1px solid rgba(255, 255, 255, 0.1);
                                            margin-top: 1rem;">
                                    <div style="display: flex; align-items: center; gap: 1rem;">
                                        <div style="background: rgba(255,255,255,0.15); 
                                                   border-radius: 50%; 
                                                   width: 40px; 
                                                   height: 40px; 
                                                   display: flex; 
                                                   align-items: center; 
                                                   justify-content: center;
                                                   font-size: 1.25rem;
                                                   flex-shrink: 0;">✓</div>
                                        <div style="flex: 1;">
                                            <h4 style="margin: 0 0 0.25rem 0; font-size: 1.1rem; font-weight: 600; font-family: 'Lora', serif;">Demande envoyée avec succès</h4>
                                            <p style="margin: 0; opacity: 0.95; font-size: 0.9rem; line-height: 1.4;">Vous pouvez télécharger ma grille tarifaire complète ci-dessous.</p>
                                        </div>
                                    </div>
                                </div>
                            `;
                            // Rediriger vers la page de remerciement après 2 secondes
                            setTimeout(() => {
                                window.location.href = 'merci-tarifs.html';
                            }, 2000);
                        } else {
                            formMessage.textContent = 'Message envoyé avec succès. Je vous répondrai sous 24 heures ouvrées.';
                        }
                        formMessage.className = 'form-message success';
                    }
                    form.reset();
                    fields.forEach(field => {
                        field.classList.remove('valid', 'invalid');
                        hideFieldError(field);
                    });
                } else {
                    if (formMessage) {
                        formMessage.textContent = 'Une erreur est survenue. Veuillez réessayer.';
                        formMessage.className = 'form-message error';
                    }
                }
            } catch (error) {
                if (formMessage) {
                    formMessage.textContent = 'Une erreur s\'est produite. Vérifiez votre connexion.';
                    formMessage.className = 'form-message error';
                }
            }
        });
        }
    
    // Le formulaire de contact est géré par un script inline dans contact.html et index.html (comme l'ancien site qui fonctionne)
    // Mais on ajoute la validation visuelle en temps réel pour les checks
    
    // Validation visuelle en temps réel pour le formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const fields = contactForm.querySelectorAll('input, textarea, select');
        fields.forEach(field => {
            field.addEventListener('blur', function() {
                const value = this.value.trim();
                const type = this.type;
                const tagName = this.tagName.toLowerCase();
                
                let isValid = true;
                
                if (this.required && !value) {
                    isValid = false;
                } else if (type === 'email' && value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    isValid = emailRegex.test(value);
                } else if (type === 'tel' && value) {
                    const phoneRegex = /^[\d\s\+\-\(\)]{8,}$/;
                    isValid = phoneRegex.test(value.replace(/\s/g, ''));
                } else if (tagName === 'select' && value === '') {
                    isValid = false;
                }
                
                // Appliquer les classes de validation
                this.classList.remove('valid', 'invalid');
                if (value) {
                    this.classList.add(isValid ? 'valid' : 'invalid');
                }
            });
            
            field.addEventListener('input', function() {
                if (this.classList.contains('invalid')) {
                    const value = this.value.trim();
                    if (value) {
                        const type = this.type;
                        let isValid = true;
                        
                        if (type === 'email' && value) {
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            isValid = emailRegex.test(value);
                        } else if (type === 'tel' && value) {
                            const phoneRegex = /^[\d\s\+\-\(\)]{8,}$/;
                            isValid = phoneRegex.test(value.replace(/\s/g, ''));
                        }
                        
                        this.classList.remove('invalid');
                        if (isValid) {
                            this.classList.add('valid');
                        }
                    }
            }
        });
    });
    }
    
    // Initialiser le formulaire de tarifs
    const tarifsForm = document.getElementById('tarifsForm');
    if (tarifsForm) {
        initFormValidation(tarifsForm);
    }
    
    // Défilement automatique continu des logos partenaires (boucle infinie)
    const partnersGrid = document.querySelector('.partners-grid');
    if (partnersGrid) {
        const logos = partnersGrid.querySelectorAll('.partner-logo');
        const containerWidth = partnersGrid.offsetWidth;
        
        // Calculer la largeur totale des logos
        let totalWidth = 0;
        const gap = 64; // 4rem en pixels
        logos.forEach(logo => {
            totalWidth += logo.offsetWidth + gap;
        });
        
        // Si le contenu dépasse la largeur du conteneur, activer le défilement continu
        if (totalWidth > containerWidth) {
            // Dupliquer les logos pour créer une boucle infinie sans saut
            logos.forEach(logo => {
                const clone = logo.cloneNode(true);
                clone.setAttribute('aria-hidden', 'true');
                partnersGrid.appendChild(clone);
            });
            
            let scrollPosition = 0;
            const scrollSpeed = 0.3; // Vitesse de défilement (pixels par frame) - ralenti pour voir tous les logos
            let isScrolling = true;
            let animationFrameId = null;
            
            function autoScroll() {
                if (!isScrolling) {
                    animationFrameId = null;
                    return;
                }
                
                scrollPosition += scrollSpeed;
                const firstSetWidth = totalWidth;
                
                // Quand on arrive à la fin de la première série, revenir au début sans saut visible
                if (scrollPosition >= firstSetWidth) {
                    scrollPosition = scrollPosition - firstSetWidth;
                }
                
                partnersGrid.scrollLeft = scrollPosition;
                animationFrameId = requestAnimationFrame(autoScroll);
            }
            
            // Pause au survol
            partnersGrid.addEventListener('mouseenter', () => {
                isScrolling = false;
            });
            
            partnersGrid.addEventListener('mouseleave', () => {
                isScrolling = true;
                if (!animationFrameId) {
                    autoScroll();
                }
            });
            
            // Démarrer le défilement après un court délai pour laisser le temps de voir le premier logo
            setTimeout(() => {
                autoScroll();
            }, 2000);
        }
    }
});
