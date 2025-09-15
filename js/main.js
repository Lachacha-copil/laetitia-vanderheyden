document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Navigation Active State
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    function makeNavActive() {
        let scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Header Scroll Effect
    const header = document.getElementById('header');
    
    function headerScroll() {
        if (header && window.scrollY > 50) {
            header.classList.add('scrolled');
        } else if (header) {
            header.classList.remove('scrolled');
        }
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    
    function toggleBackToTop() {
        if (backToTopBtn && window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else if (backToTopBtn) {
            backToTopBtn.classList.remove('show');
        }
    }

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Intersection Observer for animations
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // Animation for service cards and project cards
    const animatedCards = document.querySelectorAll('.service-card, .project-card, .conseil-card');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    
    animatedCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });

    // Contact Form - Version robuste
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (!contactForm) {
        console.error('Formulaire de contact non trouvé!');
        return;
    }

    if (!formMessage) {
        console.error('Élément formMessage non trouvé!');
        return;
    }

    console.log('Initialisation du formulaire de contact...');
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Form validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const sector = document.getElementById('sector').value;
        const interest = document.getElementById('interest').value;
        const message = document.getElementById('message').value.trim();
        const privacy = document.getElementById('privacy').checked;

        if (!name || !email || !phone || !sector || !interest || !message || !privacy) {
            formMessage.textContent = "❌ Veuillez remplir tous les champs obligatoires.";
            formMessage.style.color = "#DC6F6F";
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formMessage.textContent = "❌ Veuillez entrer une adresse email valide.";
            formMessage.style.color = "#DC6F6F";
            return;
        }

        // Créer l'objet email avec la problématique
        const interestText = document.querySelector(`#interest option[value="${interest}"]`).textContent;
        const sectorText = document.querySelector(`#sector option[value="${sector}"]`).textContent;
        const emailSubject = `[${sectorText}] ${interestText} - ${name}`;

        const formData = new FormData(contactForm);
        formData.append('_subject', emailSubject);

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formMessage.textContent = "✅ Merci ! Votre demande a été envoyée. Je vous contacte sous 24h pour échanger sur votre situation.";
                formMessage.style.color = "#7DA87B";
                contactForm.reset();
            } else {
                formMessage.textContent = "❌ Une erreur est survenue. Veuillez réessayer.";
                formMessage.style.color = "#DC6F6F";
            }
        } catch (error) {
            formMessage.textContent = "❌ Une erreur s’est produite. Vérifiez votre connexion.";
            formMessage.style.color = "#DC6F6F";
        }

        setTimeout(() => {
            formMessage.textContent = "";
        }, 6000);
    });
}

    // Scroll Progress Bar
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }
    }

    // Initialize scroll events
    window.addEventListener('scroll', function() {
        makeNavActive();
        headerScroll();
        toggleBackToTop();
        updateScrollProgress();
    });

    // Cookie Banner
    function initCookieBanner() {
        const cookieBanner = document.getElementById('cookie-banner');
        const acceptBtn = document.getElementById('accept-cookies');
        const declineBtn = document.getElementById('decline-cookies');
        
        // Vérifier si l'utilisateur a déjà fait un choix
        if (!localStorage.getItem('cookieConsent')) {
            setTimeout(() => {
                cookieBanner.classList.add('show');
            }, 1000);
        }
        
        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => {
                localStorage.setItem('cookieConsent', 'accepted');
                cookieBanner.classList.remove('show');
            });
        }
        
        if (declineBtn) {
            declineBtn.addEventListener('click', () => {
                localStorage.setItem('cookieConsent', 'declined');
                cookieBanner.classList.remove('show');
            });
        }
    }

    // FAQ Accordion - Version corrigée
    function initFAQ() {
        console.log('Initializing FAQ...');
        
        // Attendre que le DOM soit chargé
        setTimeout(() => {
            const faqItems = document.querySelectorAll('.faq-item');
            console.log('FAQ Items found:', faqItems.length);
            
            if (faqItems.length === 0) {
                console.log('No FAQ items found, retrying in 1 second...');
                setTimeout(initFAQ, 1000);
                return;
            }
            
            // Ajouter les event listeners directement sur les faq-items
            faqItems.forEach((faqItem, index) => {
                const question = faqItem.querySelector('.faq-question');
                if (question) {
                    question.style.cursor = 'pointer';
                    question.style.userSelect = 'none';
                    
                    // Supprimer les anciens listeners
                    question.removeEventListener('click', handleFAQClick);
                    
                    // Ajouter le nouveau listener
                    question.addEventListener('click', handleFAQClick);
                    
                    function handleFAQClick(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        console.log('FAQ clicked:', index);
                        console.log('FAQ item:', faqItem);
                        
                        // Fermer tous les autres
                        faqItems.forEach(item => {
                            if (item !== faqItem) {
                                item.classList.remove('active');
                            }
                        });
                        
                        // Toggle l'actuel
                        faqItem.classList.toggle('active');
                        console.log('FAQ active:', faqItem.classList.contains('active'));
                    }
                }
            });
            
            console.log('FAQ initialized successfully');
        }, 500);
    }

    // Initialize scroll on page load
    makeNavActive();
    headerScroll();
    toggleBackToTop();
    updateScrollProgress();
    initCookieBanner();
    initFAQ();
    
    // FAQ sera initialisée par initFAQ()
    
    // Version ultra-simple pour FAQ
    function setupFAQ() {
        console.log('Setting up FAQ...');
        
        // Attendre que tout soit chargé
        setTimeout(() => {
            const faqItems = document.querySelectorAll('.faq-item');
            console.log('FAQ items found for setup:', faqItems.length);
            
            faqItems.forEach((item, index) => {
                // Ajouter un event listener sur tout l'item
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    console.log('FAQ item clicked:', index);
                    
                    // Fermer tous les autres
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Toggle l'actuel
                    item.classList.toggle('active');
                    console.log('FAQ active:', item.classList.contains('active'));
                });
                
                // Style pour indiquer que c'est cliquable
                item.style.cursor = 'pointer';
            });
            
            console.log('FAQ setup complete');
        }, 1000);
    }
    
    // Lancer le setup
    setupFAQ();
    
    // Setup des cartes conseils interactives - Système à piocher
    function setupConseilsCards() {
        console.log('Setting up conseils cards...');
        
        // Créer l'overlay
        const overlay = document.createElement('div');
        overlay.className = 'conseil-overlay';
        document.body.appendChild(overlay);
        
        setTimeout(() => {
            const conseilsCards = document.querySelectorAll('.conseil-card');
            console.log('Conseils cards found:', conseilsCards.length);
            
            conseilsCards.forEach((card, index) => {
                card.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    console.log('Conseil card clicked:', index);
                    
                    // Si la carte est déjà sélectionnée, la fermer
                    if (card.classList.contains('selected')) {
                        card.classList.remove('selected');
                        overlay.classList.remove('show');
                        document.body.style.overflow = '';
                        return;
                    }
                    
                    // Retirer la sélection des autres cartes
                    conseilsCards.forEach(otherCard => {
                        otherCard.classList.remove('selected');
                    });
                    
                    // Sélectionner la carte actuelle
                    card.classList.add('selected');
                    overlay.classList.add('show');
                    document.body.style.overflow = 'hidden';
                    
                    // Ajouter un effet de "pulse" temporaire
                    card.style.animation = 'pulse 0.6s ease-in-out';
                    setTimeout(() => {
                        card.style.animation = '';
                    }, 600);
                    
                    // Scroll vers la carte sélectionnée
                    setTimeout(() => {
                        card.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center' 
                        });
                    }, 100);
                });
                
                // Effet de survol pour indiquer l'interactivité
                card.addEventListener('mouseenter', function() {
                    if (!card.classList.contains('selected')) {
                        card.style.transform = `translateX(-50%) translateY(-10px) rotate(0deg) scale(1.02)`;
                        card.style.zIndex = '20';
                    }
                });
                
                card.addEventListener('mouseleave', function() {
                    if (!card.classList.contains('selected')) {
                        const rotations = [-3, 2, -1, 1.5, -2];
                        const translations = [0, 10, 20, 30, 40];
                        card.style.transform = `translateX(-50%) translateY(${translations[index]}px) rotate(${rotations[index]}deg)`;
                        card.style.zIndex = index + 1;
                    }
                });
                
                // Améliorer la détection de clic
                card.addEventListener('mousedown', function(e) {
                    e.preventDefault();
                    card.style.transform = `translateX(-50%) translateY(-5px) rotate(0deg) scale(0.98)`;
                });
                
                card.addEventListener('mouseup', function(e) {
                    if (!card.classList.contains('selected')) {
                        const rotations = [-3, 2, -1, 1.5, -2];
                        const translations = [0, 10, 20, 30, 40];
                        card.style.transform = `translateX(-50%) translateY(${translations[index]}px) rotate(${rotations[index]}deg)`;
                    }
                });
            });
            
            // Fermer l'overlay en cliquant dessus
            overlay.addEventListener('click', function() {
                conseilsCards.forEach(card => {
                    card.classList.remove('selected');
                });
                overlay.classList.remove('show');
                document.body.style.overflow = '';
            });
            
            // Fermer avec Escape
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    conseilsCards.forEach(card => {
                        card.classList.remove('selected');
                    });
                    overlay.classList.remove('show');
                    document.body.style.overflow = '';
                }
            });
            
            console.log('Conseils cards setup complete');
            
            // Ajouter la navigation après le setup initial
            addConseilsNavigation(conseilsCards);
        }, 1000);
    }
    
    // Fonction pour ajouter la navigation aux cartes conseils
    function addConseilsNavigation(conseilsCards) {
        // Créer les boutons de navigation
        const navPrev = document.createElement('div');
        navPrev.className = 'conseil-navigation conseil-nav-prev';
        navPrev.innerHTML = '‹';
        document.body.appendChild(navPrev);
        
        const navNext = document.createElement('div');
        navNext.className = 'conseil-navigation conseil-nav-next';
        navNext.innerHTML = '›';
        document.body.appendChild(navNext);
        
        const navClose = document.createElement('div');
        navClose.className = 'conseil-navigation conseil-nav-close';
        navClose.innerHTML = '×';
        document.body.appendChild(navClose);
        
        let currentCardIndex = -1;
        
        // Navigation précédente
        navPrev.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (currentCardIndex > 0) {
                selectConseilCard(conseilsCards[currentCardIndex - 1], currentCardIndex - 1);
            }
        });
        
        // Navigation suivante
        navNext.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (currentCardIndex < conseilsCards.length - 1) {
                selectConseilCard(conseilsCards[currentCardIndex + 1], currentCardIndex + 1);
            }
        });
        
        // Fermer
        navClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeConseilCard();
        });
        
        // Navigation clavier
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft' && currentCardIndex > 0) {
                selectConseilCard(conseilsCards[currentCardIndex - 1], currentCardIndex - 1);
            } else if (e.key === 'ArrowRight' && currentCardIndex < conseilsCards.length - 1) {
                selectConseilCard(conseilsCards[currentCardIndex + 1], currentCardIndex + 1);
            }
        });
        
        function selectConseilCard(card, index) {
            // Fermer la carte actuelle
            closeConseilCard();
            
            currentCardIndex = index;
            card.classList.add('selected');
            document.querySelector('.conseil-overlay').classList.add('show');
            navPrev.classList.add('show');
            navNext.classList.add('show');
            navClose.classList.add('show');
            
            // Masquer la flèche précédente si c'est la première carte
            if (index === 0) {
                navPrev.style.opacity = '0.3';
                navPrev.style.pointerEvents = 'none';
            } else {
                navPrev.style.opacity = '1';
                navPrev.style.pointerEvents = 'auto';
            }
            
            // Masquer la flèche suivante si c'est la dernière carte
            if (index === conseilsCards.length - 1) {
                navNext.style.opacity = '0.3';
                navNext.style.pointerEvents = 'none';
            } else {
                navNext.style.opacity = '1';
                navNext.style.pointerEvents = 'auto';
            }
            
            // Empêcher le scroll du body
            document.body.style.overflow = 'hidden';
        }
        
        function closeConseilCard() {
            const selectedCard = document.querySelector('.conseil-card.selected');
            if (selectedCard) {
                selectedCard.classList.remove('selected');
            }
            document.querySelector('.conseil-overlay').classList.remove('show');
            navPrev.classList.remove('show');
            navNext.classList.remove('show');
            navClose.classList.remove('show');
            currentCardIndex = -1;
            
            // Restaurer le scroll du body
            document.body.style.overflow = 'auto';
        }
    }
    
    // Lancer le setup des cartes conseils
    setupConseilsCards();
    
    // Test immédiat FAQ
    setTimeout(() => {
        console.log('Testing FAQ...');
        const faqItems = document.querySelectorAll('.faq-item');
        console.log('FAQ items found:', faqItems.length);
        
        if (faqItems.length > 0) {
            console.log('First FAQ item classes:', faqItems[0].classList.toString());
            const firstQuestion = faqItems[0].querySelector('.faq-question');
            console.log('First FAQ question:', firstQuestion);
            console.log('First FAQ answer:', faqItems[0].querySelector('.faq-answer'));
            
            // Test de clic direct
            if (firstQuestion) {
                firstQuestion.addEventListener('click', function() {
                    console.log('Direct click test successful!');
                });
            }
        }
    }, 2000);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            if (this.getAttribute('href') === '#') return;
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });


    // FAQ Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Fermer tous les autres items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle l'item actuel
                if (isActive) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
            });
        }
    });
});

// Formulaire de contact géré en inline dans index.html

// Fallback géré en inline dans index.html