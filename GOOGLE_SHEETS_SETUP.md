# Configuration Google Sheets avec Formspree

## Option 1 : Formspree + Zapier (Recommandé - Automatique)

### Étapes :

1. **Créer un compte Zapier** (gratuit jusqu'à 100 tâches/mois)
   - Aller sur https://zapier.com
   - Créer un compte gratuit

2. **Créer un "Zap"** :
   - **Trigger (Déclencheur)** : "Formspree"
     - Sélectionner "New Submission"
     - Connecter votre compte Formspree
     - Sélectionner le formulaire correspondant (celui avec l'ID `mjkwqowb`)
   
   - **Action** : "Google Sheets"
     - Sélectionner "Create Spreadsheet Row"
     - Connecter votre compte Google
     - Sélectionner ou créer un Google Sheet
     - Mapper les champs :
       - Email → Colonne A
       - Nom → Colonne B
       - Type d'entreprise → Colonne C
       - Date → Colonne D (automatique)

3. **Tester et activer le Zap**

**Avantages** : Automatique, gratuit jusqu'à 100 soumissions/mois, très fiable

---

## Option 2 : Formspree + Make (ex-Integromat) (Alternative)

Similaire à Zapier, mais avec un plan gratuit plus généreux (1000 opérations/mois).

---

## Option 3 : Webhook personnalisé (Avancé)

Si vous avez des compétences techniques, vous pouvez utiliser un webhook Formspree vers un script Google Apps Script qui ajoute automatiquement les données dans Sheets.

---

## Option 4 : Export manuel depuis Formspree (Simple mais manuel)

1. Aller sur votre dashboard Formspree
2. Exporter les soumissions en CSV
3. Importer dans Google Sheets

**Inconvénient** : Pas automatique, nécessite une action manuelle

---

## Recommandation

**Pour votre cas, je recommande l'Option 1 (Zapier)** car :
- ✅ Automatique dès qu'une soumission arrive
- ✅ Gratuit jusqu'à 100 soumissions/mois (largement suffisant pour commencer)
- ✅ Très simple à configurer (interface visuelle)
- ✅ Fiable et utilisé par des milliers d'entreprises

---

## Configuration du PDF dans Formspree

Pour envoyer automatiquement le PDF en pièce jointe :

1. **Option A - Email automatique avec PDF** :
   - Dans Formspree, aller dans "Settings" → "Email Notifications"
   - Configurer un email automatique de réponse
   - Joindre le PDF `TARIFS_LV_2025.pdf` (à uploader dans Formspree ou héberger ailleurs)

2. **Option B - Lien de téléchargement** :
   - Héberger le PDF sur votre serveur (dans le dossier `public/`)
   - Dans le formulaire, après soumission, rediriger vers une page de remerciement avec un lien de téléchargement

3. **Option C - Email manuel** :
   - Recevoir les notifications Formspree
   - Envoyer manuellement le PDF (plus personnalisé mais moins automatisé)

---

## Emplacement du PDF

Placez le fichier `TARIFS_LV_2025.pdf` dans le dossier `public/` de votre projet.

Ensuite, vous pouvez :
- L'utiliser comme lien direct : `public/TARIFS_LV_2025.pdf`
- Ou le référencer dans Formspree pour l'envoi automatique

