# Portfolio Premium — One Page

Portfolio personnel moderne, responsive, accessible, basé sur **HTML5 / CSS3 / JavaScript vanilla**.
Design Glassmorphism inspiré d'Apple, VisionOS et Windows 11.

## Structure

```
portfolio/
├── index.html          # Structure HTML sémantique + SEO
├── css/style.css       # Design system, thèmes, glass, animations
├── js/script.js        # Thèmes, menu, scroll reveal, particules, form
├── assets/
│   ├── images/         # Photo de profil, screenshots projets, OG image
│   ├── icons/          # favicon.svg, icônes
│   └── screenshots/    # Mockups, captures Facebook, etc.
└── README.md
```

## Démarrage

Aucun build requis. Ouvrir `index.html` dans un navigateur ou servir le dossier :

```bash
npx serve portfolio
# ou
python3 -m http.server -d portfolio 8080
```

## Personnalisation du contenu

| Élément | Où modifier |
|---|---|
| Nom, titre, présentation | `index.html` — section `#hero` |
| Photo de profil | Remplacer `avatar__initials` par `<img src="assets/images/profile.jpg" alt="...">` |
| Biographie | Section `#about` |
| Compétences | Section `#skills` — listes `.chips` |
| Projets | Section `#projects` — dupliquer `<article class="project">` |
| Expérience | Section `#experience` — éléments `<li class="timeline__item">` |
| Mockup Facebook | Section `#social` — contenu `.phone__app` ; lien CTA vers votre page |
| Contact | Section `#contact` — email, téléphone, réseaux |
| Meta SEO / OG | `<head>` de `index.html` |

## Système de thèmes

Tous les tokens visuels sont des **variables CSS** définies en haut de `css/style.css` :

- `[data-theme="dark"]` — thème par défaut
- `[data-theme="light"]` — thème clair

L'utilisateur peut basculer via le bouton de la nav. Le choix est sauvegardé
dans `localStorage` (`portfolio-theme`). Sans choix utilisateur, le thème
système est détecté automatiquement (`prefers-color-scheme`).

### Ajouter un nouveau thème

1. Ajouter un bloc CSS dans `style.css` :

```css
[data-theme="cyberpunk"] {
  --bg-1: #0a0014;
  --primary: #ff00aa;
  --primary-2: #00ffe1;
  --accent: #fff200;
  --grad-primary: linear-gradient(135deg, #ff00aa, #00ffe1);
  /* ...redéfinir les variables nécessaires... */
}
```

2. L'activer côté JS :

```js
document.documentElement.setAttribute('data-theme', 'cyberpunk');
localStorage.setItem('portfolio-theme', 'cyberpunk');
```

Thèmes pré-pensés : Dark Blue, Purple Neon, Emerald, Cyberpunk, Minimal White, Custom.

## Accessibilité

- HTML sémantique (`header`, `nav`, `main`, `section`, `footer`)
- Skip link, focus visibles, ARIA sur menu mobile et toggle thème
- Contrastes conformes WCAG AA sur les deux thèmes
- `prefers-reduced-motion` respecté (animations coupées)
- Cibles tactiles ≥ 44×44 px

## SEO

- Title, description, canonical, Open Graph, Twitter Card
- JSON-LD `Person` à compléter dans `<head>`
- Un seul `<h1>`, hiérarchie de titres cohérente
- `lang="fr"` sur `<html>`

## Performance

- Aucune dépendance JS externe (vanilla)
- Polices préchargées via `preconnect`
- Particules canvas adaptatives (densité réduite sur mobile)
- Animations désactivées si `prefers-reduced-motion`
- Images : ajouter `loading="lazy"` et `width/height` lors de l'intégration

## Déploiement

Fichiers statiques — déployables sur :

- **Netlify / Vercel** : glisser-déposer le dossier `portfolio/`
- **GitHub Pages** : push sur une branche, activer Pages
- **OVH / hébergement classique** : FTP du dossier `portfolio/`
- **Cloudflare Pages** : connecter le repo

## Licence

Libre d'usage personnel et commercial. Mentionnez l'auteur si vous le souhaitez.
