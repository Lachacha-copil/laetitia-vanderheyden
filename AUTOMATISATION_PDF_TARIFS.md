# Automatisation de l'envoi du PDF des tarifs

## Situation actuelle

- ✅ Formulaire Formspree configuré (ID: `mjkwqowb`)
- ✅ Page de remerciement avec téléchargement direct du PDF
- ❌ Pas d'envoi automatique du PDF par email (limitation Formspree gratuit)

## Option recommandée : Zapier (Gratuit)

### Configuration étape par étape

#### 1. Créer un compte Zapier
- Aller sur https://zapier.com
- Créer un compte gratuit (100 tâches/mois)

#### 2. Créer un "Zap"

**Étape 1 - Trigger (Déclencheur) :**
- Sélectionner "Formspree" comme app
- Choisir "New Submission" comme événement
- Connecter votre compte Formspree
- Sélectionner le formulaire : celui avec l'ID `mjkwqowb`

**Étape 2 - Action : Envoyer un email avec PDF**
- Sélectionner "Email by Zapier" ou "Gmail" (si vous utilisez Gmail)
- Choisir "Send Outbound Email"
- Configurer :
  - **To** : `{{Email}}` (récupéré du formulaire)
  - **Subject** : "Vos tarifs détaillés - Laetitia Vanderheyden"
  - **Body** : 
    ```
    Bonjour,

    Merci pour votre demande de tarifs. Vous trouverez ma grille tarifaire complète en pièce jointe.

    N'hésitez pas à me contacter si vous avez des questions.

    Cordialement,
    Laetitia Vanderheyden
    Consultante administrative indépendante
    ```
  - **Attachment** : Uploader le fichier `TARIFS_LV_2025.pdf`

#### 3. Tester et activer
- Tester avec une soumission de test
- Activer le Zap

### Alternative : Make (ex-Integromat)

Si vous préférez Make :
- Plan gratuit : 1000 opérations/mois (plus généreux)
- Interface similaire à Zapier
- URL : https://www.make.com

## Option payante : Formspree Pro

Si vous souhaitez une solution tout-en-un :
- **Formspree Starter** : ~19$/mois
  - Envoi automatique d'emails avec pièces jointes
  - Configuration directement dans Formspree
  - Pas besoin d'automatisation externe

- **Formspree Pro** : ~49$/mois
  - Toutes les fonctionnalités Starter
  - Plus de soumissions/mois
  - Support prioritaire

## Recommandation

**Pour commencer : Utilisez Zapier (gratuit)**
- ✅ Automatique dès qu'une soumission arrive
- ✅ Gratuit jusqu'à 100 soumissions/mois
- ✅ Simple à configurer
- ✅ Fiable

**Si vous avez beaucoup de demandes : Passez à Formspree Pro**
- Plus simple (tout dans Formspree)
- Pas de dépendance externe
- Mais payant

## Fichier PDF

Assurez-vous que le fichier `TARIFS_LV_2025.pdf` est :
- ✅ Dans le dossier `public/` de votre site
- ✅ Accessible via le lien direct sur `merci-tarifs.html`
- ✅ Uploadé dans Zapier/Make pour l'envoi automatique

