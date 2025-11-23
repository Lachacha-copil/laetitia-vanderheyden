# Stockage des données Formspree

## 📍 Où sont stockées vos données actuellement ?

### **Dashboard Formspree (Stockage principal)**

Toutes les soumissions de formulaires (emails, sélections, cases cochées) sont stockées dans votre **dashboard Formspree** :

1. **Accéder au dashboard :**
   - Aller sur https://formspree.io
   - Se connecter avec votre compte
   - Cliquer sur votre formulaire (ID: `mjkwqowb`)

2. **Voir les soumissions :**
   - Onglet **"Submissions"** dans le dashboard
   - Vous verrez toutes les soumissions avec :
     - ✅ Email
     - ✅ Nom
     - ✅ Téléphone
     - ✅ Type d'entreprise (sélection)
     - ✅ Sujet de demande (sélection)
     - ✅ Case RGPD cochée
     - ✅ Date et heure
     - ✅ Message (si présent)

3. **Exporter les données :**
   - Bouton **"Export"** dans le dashboard
   - Format CSV ou JSON
   - Téléchargement manuel

### ⚠️ Limitations du plan gratuit

- ✅ Stockage illimité des soumissions
- ✅ Accès au dashboard
- ✅ Export manuel en CSV/JSON
- ❌ Pas d'export automatique vers Google Sheets
- ❌ Pas de notifications par email (sauf basiques)
- ❌ Pas d'API pour accéder aux données automatiquement

---

## 🔄 Options pour automatiser le stockage

### **Option 1 : Zapier → Google Sheets (Gratuit - Recommandé)**

**Avantages :**
- ✅ Automatique dès qu'une soumission arrive
- ✅ Gratuit jusqu'à 100 soumissions/mois
- ✅ Toutes les données dans Google Sheets (facile à partager/modifier)
- ✅ Accessible depuis n'importe où

**Configuration :**

1. **Créer un compte Zapier** (gratuit)
   - https://zapier.com

2. **Créer un "Zap" :**
   - **Trigger** : Formspree → "New Submission"
   - **Action** : Google Sheets → "Create Spreadsheet Row"
   
3. **Mapper les champs dans Google Sheets :**
   ```
   Colonne A : Email
   Colonne B : Nom
   Colonne C : Téléphone
   Colonne D : Type d'entreprise
   Colonne E : Sujet de demande
   Colonne F : Message
   Colonne G : Date
   Colonne H : RGPD accepté (Oui/Non)
   ```

4. **Tester et activer**

**Résultat :** Chaque soumission crée automatiquement une ligne dans votre Google Sheet avec toutes les données.

---

### **Option 2 : Make (ex-Integromat) → Google Sheets**

Similaire à Zapier mais avec 1000 opérations gratuites/mois au lieu de 100.

---

### **Option 3 : Export manuel (Simple mais manuel)**

1. Aller sur votre dashboard Formspree
2. Cliquer sur "Export"
3. Choisir CSV ou JSON
4. Importer dans Google Sheets ou Excel

**Inconvénient :** Pas automatique, nécessite une action manuelle régulière.

---

### **Option 4 : Formspree Pro (Payant)**

Avec Formspree Pro (~49$/mois) :
- ✅ Export automatique vers Google Sheets
- ✅ Webhooks pour automatisation
- ✅ API complète
- ✅ Plus de fonctionnalités

---

## 📊 Structure des données dans Formspree

Pour le formulaire de tarifs, vous recevrez :
- `email` : Email du demandeur
- `name` : Nom (optionnel)
- `companyType` : Type d'entreprise (TPE, PME, ASBL, Indépendant, Autre)
- `rgpd` : Consentement RGPD (case cochée)

Pour le formulaire de contact, vous recevrez :
- `name` : Nom complet
- `email` : Email
- `phone` : Téléphone
- `companyType` : Type d'entreprise
- `subject` : Sujet de demande (sélection)
- `message` : Message
- `rgpd` : Consentement RGPD

---

## 🎯 Recommandation

**Pour commencer :**
1. ✅ Utilisez le dashboard Formspree pour voir les soumissions
2. ✅ Configurez Zapier (gratuit) pour exporter automatiquement vers Google Sheets
3. ✅ Vous aurez ainsi :
   - Vue en temps réel dans Formspree
   - Archive organisée dans Google Sheets
   - Facile à partager avec votre équipe

**Si vous avez beaucoup de soumissions :**
- Passez à Make (1000 opérations gratuites/mois)
- Ou Formspree Pro pour tout centraliser

---

## 📝 Accès rapide

- **Dashboard Formspree :** https://formspree.io/forms/mjkwqowb
- **Zapier :** https://zapier.com
- **Make :** https://www.make.com

