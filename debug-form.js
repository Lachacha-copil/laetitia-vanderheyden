// Script de débogage pour le formulaire de contact
console.log('=== DÉBOGAGE FORMULAIRE DE CONTACT ===');

// Vérifier si les éléments existent
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

console.log('1. Éléments trouvés:');
console.log('- contactForm:', contactForm);
console.log('- formMessage:', formMessage);

if (contactForm) {
    console.log('2. Structure du formulaire:');
    console.log('- Nombre d\'inputs:', contactForm.querySelectorAll('input').length);
    console.log('- Nombre de selects:', contactForm.querySelectorAll('select').length);
    console.log('- Nombre de textareas:', contactForm.querySelectorAll('textarea').length);
    
    // Vérifier chaque champ
    const inputs = contactForm.querySelectorAll('input');
    const selects = contactForm.querySelectorAll('select');
    const textareas = contactForm.querySelectorAll('textarea');
    
    console.log('3. Détails des champs:');
    inputs.forEach((input, index) => {
        console.log(`Input ${index + 1}:`, {
            type: input.type,
            id: input.id,
            name: input.name,
            required: input.required,
            disabled: input.disabled,
            readonly: input.readOnly,
            style: input.style.cssText
        });
    });
    
    selects.forEach((select, index) => {
        console.log(`Select ${index + 1}:`, {
            id: select.id,
            name: select.name,
            required: select.required,
            disabled: select.disabled,
            options: select.options.length,
            style: select.style.cssText
        });
    });
    
    textareas.forEach((textarea, index) => {
        console.log(`Textarea ${index + 1}:`, {
            id: textarea.id,
            name: textarea.name,
            required: textarea.required,
            disabled: textarea.disabled,
            readonly: textarea.readOnly,
            style: textarea.style.cssText
        });
    });
    
    // Test d'interaction
    console.log('4. Test d\'interaction:');
    
    // Test des inputs
    const nameInput = document.getElementById('name');
    if (nameInput) {
        console.log('Test input name - focusable:', nameInput.tabIndex !== -1);
        nameInput.addEventListener('focus', () => console.log('✅ Input name focusé'));
        nameInput.addEventListener('click', () => console.log('✅ Input name cliqué'));
    }
    
    // Test des selects
    const sectorSelect = document.getElementById('sector');
    if (sectorSelect) {
        console.log('Test select sector - focusable:', sectorSelect.tabIndex !== -1);
        sectorSelect.addEventListener('focus', () => console.log('✅ Select sector focusé'));
        sectorSelect.addEventListener('click', () => console.log('✅ Select sector cliqué'));
        sectorSelect.addEventListener('change', () => console.log('✅ Select sector changé'));
    }
    
    // Test du formulaire
    contactForm.addEventListener('submit', (e) => {
        console.log('✅ Formulaire soumis!');
        e.preventDefault();
    });
    
    console.log('5. CSS appliqué:');
    const computedStyle = window.getComputedStyle(contactForm);
    console.log('- position:', computedStyle.position);
    console.log('- z-index:', computedStyle.zIndex);
    console.log('- pointer-events:', computedStyle.pointerEvents);
    console.log('- user-select:', computedStyle.userSelect);
    
} else {
    console.log('❌ ERREUR: Formulaire de contact non trouvé!');
}

console.log('=== FIN DÉBOGAGE ===');
