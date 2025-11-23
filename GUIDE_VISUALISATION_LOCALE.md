# 🌐 Guide : Visualiser votre site en local

## Méthode 1 : Serveur HTTP simple avec Python (RECOMMANDÉ)

### Étape 1 : Ouvrir PowerShell dans le dossier du projet

1. Ouvrez PowerShell
2. Naviguez vers votre dossier :
```powershell
cd "C:\Users\Mediamonster\Documents\laetitia-vanderheyden"
```

### Étape 2 : Lancer le serveur

**Si vous avez Python 3 installé :**
```powershell
python -m http.server 8000
```

**Ou si `python` ne fonctionne pas, essayez :**
```powershell
python3 -m http.server 8000
```

**Ou avec py :**
```powershell
py -m http.server 8000
```

### Étape 3 : Ouvrir dans le navigateur

Une fois le serveur lancé, ouvrez votre navigateur et allez à :
```
http://localhost:8000
```

Vous verrez votre page d'accueil `index.html` !

### Pour arrêter le serveur
Appuyez sur `Ctrl + C` dans PowerShell.

---

## Méthode 2 : Avec Node.js (si installé)

### Étape 1 : Installer http-server (une seule fois)
```powershell
npm install -g http-server
```

### Étape 2 : Lancer le serveur
```powershell
cd "C:\Users\Mediamonster\Documents\laetitia-vanderheyden"
http-server -p 8000
```

### Étape 3 : Ouvrir dans le navigateur
```
http://localhost:8000
```

---

## Méthode 3 : Extension Live Server dans VS Code (FACILE)

### Étape 1 : Installer l'extension
1. Ouvrez VS Code
2. Allez dans Extensions (Ctrl + Shift + X)
3. Cherchez "Live Server" (par Ritwick Dey)
4. Cliquez sur "Install"

### Étape 2 : Lancer le serveur
1. Ouvrez votre fichier `index.html` dans VS Code
2. Cliquez avec le bouton droit sur le fichier
3. Sélectionnez "Open with Live Server"
4. Votre navigateur s'ouvrira automatiquement !

### Avantages :
- ✅ Recharge automatique quand vous modifiez les fichiers
- ✅ Très simple à utiliser
- ✅ Pas besoin de commandes

---

## Méthode 4 : Ouvrir directement le fichier (LIMITÉ)

⚠️ **Attention :** Cette méthode peut causer des problèmes avec les chemins relatifs et certaines fonctionnalités.

1. Faites un clic droit sur `index.html`
2. Sélectionnez "Ouvrir avec" → Votre navigateur

**Problèmes possibles :**
- Les liens peuvent ne pas fonctionner correctement
- Les formulaires peuvent avoir des problèmes
- Les chemins relatifs peuvent être cassés

**Recommandation :** Utilisez plutôt une des méthodes avec serveur HTTP ci-dessus.

---

## 🎯 Recommandation

**Pour un test rapide :** Utilisez la **Méthode 1 (Python)** - c'est simple et ne nécessite pas d'installation supplémentaire si Python est déjà installé.

**Pour le développement :** Utilisez **Live Server dans VS Code** - c'est le plus pratique avec rechargement automatique.

---

## ⚠️ Notes importantes

1. **reCAPTCHA ne fonctionnera pas en local** - Il faut ajouter `localhost` dans les domaines autorisés de Google reCAPTCHA, ou tester directement en production.

2. **Les formulaires Formspree fonctionneront** - Mais vous devrez vérifier que les emails arrivent bien.

3. **Tous les liens internes fonctionneront** - Avec un serveur HTTP, tous vos liens relatifs fonctionneront correctement.

---

## 🚀 Test rapide

Pour tester rapidement si tout fonctionne :

1. Lancez le serveur (Méthode 1 ou 2)
2. Ouvrez `http://localhost:8000`
3. Cliquez sur tous les liens du menu
4. Testez le formulaire de contact (il enverra un email via Formspree)
5. Vérifiez que toutes les images se chargent

---

## 📝 Commandes utiles

**Vérifier si Python est installé :**
```powershell
python --version
```

**Vérifier si Node.js est installé :**
```powershell
node --version
```

**Arrêter un serveur :**
Appuyez sur `Ctrl + C` dans le terminal

