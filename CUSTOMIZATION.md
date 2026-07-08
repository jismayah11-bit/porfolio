/**
 * GUIDE DE PERSONNALISATION - Portfolio Premium
 * Instructions détaillées pour adapter le portfolio à vos besoins
 */

/* =====================================================
   PERSONNALISATION SIMPLE - VARIABLES CSS
   ===================================================== */

/* 
   Toutes les couleurs utilisent des variables CSS.
   Les modifier directement ici affectera tout le portfolio !
*/

:root {
    /* --- COULEURS PRIMAIRES --- */
    /* Changer --color-primary change la couleur dominante partout */
    --color-primary: #6366f1;           /* Bleu indigo par défaut */
    
    /* Essayer :
       --color-primary: #3b82f6;        // Bleu classique
       --color-primary: #10b981;        // Vert
       --color-primary: #f59e0b;        // Orange
       --color-primary: #ec4899;        // Rose
       --color-primary: #8b5cf6;        // Violet
    */

    /* --- COULEUR D'ACCENTUATION --- */
    --color-accent: #ec4899;            /* Rose par défaut */
    
    /* --- COULEUR SECONDAIRE --- */
    --color-secondary: #06b6d4;         /* Cyan par défaut */
}

/* =====================================================
   ÉTAPE 1 : MODIFIER LE CONTENU TEXTE
   ===================================================== */

/* 
   Ouvrir index.html et chercher les sections suivantes
   Remplacer le texte avec votre contenu personnel
*/

/* 
   1. HERO SECTION (Ligne ~85)
   ================================
   
   Chercher:
   <h1 class="hero-title">Bienvenue</h1>
   
   Remplacer par votre nom ou titre
   Exemple:
   <h1 class="hero-title">Jean Dupont</h1>
   <p class="hero-subtitle">Développeur Web Full Stack</p>
   <p class="hero-description">
       Passionné par la création d'applications web modernes...
   </p>
*/

/*
   2. SECTION À PROPOS (Ligne ~180)
   =================================
   
   Chercher:
   <div class="about-text">
       <p>Je suis un développeur web passionné...</p>
   </div>
   
   Remplacer par votre biographie
*/

/*
   3. COMPÉTENCES (Ligne ~265)
   ===========================
   
   Chaque skill est un badge comme:
   <span class="skill-badge">HTML5</span>
   
   Remplacer la liste complète par VOS compétences
   Ajouter/supprimer autant qu'il faut
   
   Exemple:
   <div class="skill-category">
       <h3 class="category-title">Frontend</h3>
       <div class="skills-list">
           <span class="skill-badge">React</span>
           <span class="skill-badge">Vue.js</span>
           <span class="skill-badge">TypeScript</span>
       </div>
   </div>
*/

/*
   4. PROJETS (Ligne ~310)
   =======================
   
   Chaque projet a cette structure:
   
   <article class="project-card">
       <div class="project-image">
           <img src="assets/images/projects/projet1.jpg" alt="...">
           <div class="project-overlay">
               <a href="https://mon-projet.com" class="project-link">Voir</a>
           </div>
       </div>
       <div class="project-content">
           <h3 class="project-title">Titre du Projet</h3>
           <p class="project-description">Description...</p>
           <div class="project-tech">
               <span class="tech-tag">React</span>
               <span class="tech-tag">Node.js</span>
           </div>
       </div>
   </article>
   
   Dupliquer la structure pour chaque projet
   Mettre à jour:
   - Lien de l'image
   - Titre du projet
   - Description
   - Technologies utilisées
   - Lien du projet
*/

/*
   5. EXPÉRIENCE (Ligne ~375)
   ==========================
   
   Structure timeline pour chaque expérience:
   
   <div class="timeline-item">
       <div class="timeline-marker"></div>
       <div class="timeline-content">
           <div class="timeline-header">
               <h3 class="timeline-title">Titre du poste</h3>
               <span class="timeline-date">2021 - 2023</span>
           </div>
           <p class="timeline-company">Nom Entreprise</p>
           <p class="timeline-description">
               Ce que j'ai fait...
           </p>
       </div>
   </div>
   
   Dupliquer pour chaque expérience
*/

/*
   6. RÉSEAUX SOCIAUX (Ligne ~450)
   ================================
   
   Mises à jour des liens:
   
   <a href="https://facebook.com/votre-page" class="social-link">
   <a href="https://linkedin.com/in/votre-profil" class="social-card">
   <a href="https://github.com/votre-username" class="social-card">
   
   Remplacer les URLs par vos profils réels
*/

/*
   7. CONTACT (Ligne ~530)
   =======================
   
   Mettre à jour vos informations:
   
   <a href="mailto:votre-email@example.com">votre-email@example.com</a>
   <a href="tel:+33612345678">+33 (0)6 12 34 56 78</a>
   <p>Votre Ville, France</p>
   
   Et configurer le formulaire (voir section suivante)
*/

/* =====================================================
   ÉTAPE 2 : AJOUTER VOS PHOTOS
   ===================================================== */

/*
   Créer les dossiers (une fois, en local):
   
   mkdir -p assets/images/profile
   mkdir -p assets/images/projects
   
   Puis ajouter vos images dans ces dossiers
*/

/*
   Photo de profil (OBLIGATOIRE):
   - Format: JPG, PNG, WebP
   - Taille: 300x300px minimum (idéalement 400x400px)
   - Ratio: Carré (1:1)
   - Taille fichier: < 100KB (utiliser TinyPNG)
   
   Nom: profile.jpg
   Chemin: assets/images/profile/profile.jpg
   
   HTML:
   <img src="assets/images/profile/profile.jpg" alt="Ma photo">
*/

/*
   Screenshots des projets:
   - Format: JPG, PNG
   - Ratio: 4:3 ou 16:9
   - Taille: < 200KB chacun
   
   Noms:
   - assets/images/projects/projet1.jpg
   - assets/images/projects/projet2.jpg
   - assets/images/projects/projet3.jpg
*/

/*
   Smartphone mockup (Facebook section):
   - Format: PNG avec transparence (si possible)
   - Dimensions: 375x812px (ratio iPhone)
   - Montrer le contenu Facebook
   
   Chemin: assets/screenshots/facebook.png
*/

/* =====================================================
   ÉTAPE 3 : CONFIGURER LE FORMULAIRE
   ===================================================== */

/*
   Le formulaire par défaut est SIMULÉ (test en local)
   
   Pour l'activer en production, choisir une solution:
*/

/* OPTION A: FORMSUBMIT.CO (Gratuit, simple) */
/*
   1. Remplacer index.html ligne ~530:
   
   <form class="contact-form" 
         id="contact-form"
         action="https://formsubmit.co/votre-email@example.com" 
         method="POST" 
         novalidate>
   
   2. Remplacer "votre-email@example.com" par votre email réel
   3. C'est tout! Les messages arriveront à votre email
*/

/* OPTION B: NETLIFY FORMS (Si déployé sur Netlify) */
/*
   1. Remplacer index.html ligne ~530:
   
   <form class="contact-form" 
         id="contact-form"
         name="contact" 
         method="POST" 
         netlify 
         novalidate>
   
   2. Déployer sur Netlify
   3. Les messages apparaîtront dans Netlify Dashboard
*/

/* OPTION C: BACKEND PERSONNALISÉ */
/*
   1. Créer une API backend (Node.js, Python, PHP, etc.)
   2. Configurer un endpoint: POST /api/contact
   3. Modifier js/animations.js, fonction sendForm():
   
   async sendForm(data) {
       const response = await fetch('/api/contact', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(data)
       });
       return response.json();
   }
*/

/* =====================================================
   ÉTAPE 4 : PERSONNALISER LES MÉTADONNÉES
   ===================================================== */

/*
   SEO & Open Graph (index.html, ligne ~5)
   
   <meta name="description" 
         content="Votre description personnelle - 160 caractères max">
   
   <meta name="keywords" 
         content="vos, keywords, ici">
   
   <meta property="og:title" 
         content="Votre Nom - Titre Professionnel">
   
   <meta property="og:description" 
         content="Brève description de votre portfolio">
   
   <meta property="og:image" 
         content="assets/images/profile/profile.jpg">
*/

/* =====================================================
   ÉTAPE 5 : CHANGER LES COULEURS
   ===================================================== */

/*
   OPTION 1: Via le sélecteur de thème
   - Utiliser le toggle 🌙/☀️ en haut à droite
   - Les 7 thèmes sont préconfigurés
*/

/*
   OPTION 2: Créer un thème personnalisé
   - Via JavaScript (console):
   
   const monTheme = {
       'bg-primary': '#0a0e27',
       'bg-secondary': '#111835',
       'text-primary': '#ffffff',
       'primary': '#ff006e',
       'secondary': '#00f5ff',
       'accent': '#ffbe0b',
       'success': '#10b981',
       'warning': '#f59e0b',
       'error': '#ef4444',
       'glass-bg': 'rgba(255, 0, 110, 0.05)',
       'glass-border': 'rgba(255, 0, 110, 0.1)',
   };
   
   window.themeManager.addCustomTheme('cyberpunk', monTheme);
   window.themeManager.applyTheme('cyberpunk');
*/

/*
   OPTION 3: Modifier directement css/style.css
   
   Chercher:
   :root {
       --color-primary: #6366f1;
       ...
   }
   
   Remplacer les valeurs hex par vos couleurs
   
   Couleurs populaires:
   - Bleu: #3b82f6
   - Rose: #ec4899
   - Violet: #8b5cf6
   - Vert: #10b981
   - Orange: #f59e0b
   - Cyan: #06b6d4
*/

/* =====================================================
   ÉTAPE 6 : CHANGER LES IMAGES D'ARRIÈRE-PLAN
   ===================================================== */

/*
   L'arrière-plan animé est généré par Canvas (js/animations.js)
   Aucune image requise!
   
   Si vous voulez un arrière-plan statique:
   
   Dans css/style.css, modifier:
   
   .background-gradient {
       background-image: url('assets/background.jpg');
       background-size: cover;
       background-attachment: fixed;
   }
   
   Puis ajouter votre image: assets/background.jpg
*/

/* =====================================================
   ÉTAPE 7 : AJOUTER GOOGLE ANALYTICS
   ===================================================== */

/*
   Ajouter après </head> dans index.html:
   
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   
   Remplacer G-XXXXXXXXXX par votre ID Google Analytics
*/

/* =====================================================
   ÉTAPE 8 : FAVICON
   ===================================================== */

/*
   Par défaut, utilise un emoji (💻)
   
   Pour personnaliser:
   
   1. Créer/générer un favicon.ico (16x16px minimum)
   2. Placer dans le dossier racine
   3. Optionnel: ajouter dans index.html ligne ~20:
   
   <link rel="icon" type="image/x-icon" href="favicon.ico">
*/

/* =====================================================
   CHECKLIST DE PERSONNALISATION
   ===================================================== */

/*
   ☐ 1. Modifier tous les textes (nom, titre, bio)
   ☐ 2. Ajouter photo de profil
   ☐ 3. Ajouter screenshots des projets
   ☐ 4. Mettre à jour les liens des projets
   ☐ 5. Ajouter expériences/formations
   ☐ 6. Configurer formulaire de contact
   ☐ 7. Mettre à jour liens réseaux sociaux
   ☐ 8. Personnaliser couleurs si désiré
   ☐ 9. Mettre à jour meta tags (SEO)
   ☐ 10. Ajouter Google Analytics
   ☐ 11. Tester sur mobile
   ☐ 12. Tester tous les thèmes
   ☐ 13. Vérifier Lighthouse score
   ☐ 14. Déployer!
*/

/* =====================================================
   RESSOURCES POUR IMAGES
   ===================================================== */

/*
   Où trouver des images?
   
   - Unsplash: unsplash.com (gratuit, haute qualité)
   - Pexels: pexels.com (gratuit)
   - Pixabay: pixabay.com (gratuit)
   - Votre propre galerie!
   
   Optimiser les images?
   
   - TinyPNG: tinypng.com (compresser)
   - ImageOptim: imageoptim.com (Mac)
   - JPEGmini: jpegmini.com
   
   Générateur favicon?
   
   - favicon-generator.org
   - favicon.io
*/

/* =====================================================
   BESOIN D'AIDE?
   ===================================================== */

/*
   Consulter README.md pour:
   - Déploiement
   - Performances
   - Accessibilité
   - Système de thèmes avancé
   - API JavaScript
   
   Questions?
   - Vérifier GitHub Issues
   - Consulter web.dev
   - Lire MDN Web Docs
*/
