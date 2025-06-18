# Raw HTML Starter

> English documentation available in [README.md](./README.md)

Un starter kit moderne pour le développement de sites web en **HTML brut** (pas de React, pas de Vue, pas de framework JS complexe : ici, c'est du bon vieux HTML, simple, rapide et efficace). Idéal pour ceux qui veulent garder le contrôle, aller à l'essentiel, ou simplement profiter de la puissance des outils modernes (Vite, SCSS, includes, composants) sans la lourdeur d'un framework.

## Fonctionnalités

- Vite pour un développement ultra-rapide
- Support SCSS natif avec auto-import des composants
- Système de composants HTML modulaires
- Hot Module Replacement (HMR)
- Support TypeScript

## Installation

```bash
# Cloner le projet
git clone [URL_DU_REPO]

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

## Scripts disponibles

- `npm run dev` : Lance le serveur de développement
- `npm run build` : Crée une version de production
- `npm run watch:build` : Build en mode watch

## Structure du projet

```
├── src/
│   ├── components/          # Composants réutilisables
│   │   ├── button.html      # Bouton avec styles associés
│   │   ├── button.scss
│   │   ├── card.html        # Carte avec styles associés
│   │   ├── card.scss
│   │   ├── heading.html     # Titre avec styles associés
│   │   ├── heading.scss
│   │   └── icon.html        # Composant générique pour les icônes SVG
│   │
│   ├── layout/              # Layouts et structure
│   │   ├── common.html      # Layout principal (structure globale du site)
│   │   ├── footer.html      # Pied de page
│   │   ├── nav.html         # Navigation
│   │   └── raw-layout.html  # Layout brut
│   │
│   ├── styles/              # Styles globaux
│   └── icons/               # Dossiers d'icônes SVG (par famille)
│        ├── mdi/
│        ├── lucide/
│        ├── lucide-thin/
│        └── phosphor/
│
├── public/                  # Assets statiques
│   ├── images/              # Images du site
│   └── fonts/               # Polices de caractères
│
├── vite/                     # Configuration et plugins Vite
│   ├── getHtmlEntryPoints.ts # Points d'entrée HTML
│   ├── viteAutoImportScss.ts # Plugin d'auto-import SCSS
│   ├── iconsGalleryPlugin.ts # Plugin de génération de galerie d'icônes
│   └── icons-gallery.css     
│
└── dist/                    # Dossier de build
```

## Layout principal

Le layout principal (`src/layout/common.html`) définit la structure globale de toutes les pages du site : balise `<html>`, `<head>`, `<body>`, header, navigation, footer, etc.

- Il centralise les éléments communs (meta, liens CSS, scripts, navigation…)
- Il utilise des slots ou des includes pour injecter le contenu spécifique à chaque page
- C'est le point d'entrée recommandé pour toutes les pages HTML du projet

**Exemple d'utilisation dans une page** :

```html
<include file="src/layout/common.html" $title="Accueil">
  <include file="src/components/heading.html">Bienvenue !</include>
  <p>Contenu de la page d'accueil…</p>
</include>
```

Pour modifier l'apparence globale, ajouter des scripts, des polices, etc., il suffit d'éditer `common.html`.

## Utilisation des composants

Le projet utilise un système de composants basé sur des includes HTML. Exemple :

```html
<include file="src/components/card.html">
  <template slot="title">Titre de la carte</template>
  <template slot="content">
    Contenu de la carte
  </template>
</include>
```

Pour plus d'informations sur le plugin vite-plugin-html-include, consultez la [documentation officielle](https://github.com/Tilty-io/vite-plugin-html-include).

## Styles

Les styles sont organisés en modules SCSS dans le dossier `styles/`. Les fichiers SCSS des composants sont automatiquement importés grâce au plugin `viteAutoImportScss`.

## Gestion des icônes SVG

- Les icônes sont organisées par familles dans `src/icons/` (ex : `mdi`, `lucide`, `phosphor`...)
- Un composant générique `icon.html` permet d'inclure n'importe quelle icône avec une API uniforme
- Exemple d'utilisation du composant :

```html
<include file="/src/components/icon.html" $icon="lucide/heart-pulse.svg" $size="48" $color="#ff3399" />
```

- Les props `$icon`, `$size` (en px) et `$color` (hex ou nom CSS) sont supportées
- Le composant applique la taille et la couleur via des variables CSS pour une intégration flexible

### Galerie d'icônes interactive

- Une page de galerie d'icônes est générée automatiquement : **icons-gallery.html**
- Elle permet de prévisualiser toutes les icônes du projet, de changer dynamiquement la taille et la couleur, et de copier le code d'inclusion
- Accès rapide via la navigation du site

## Documentation

Pour plus d'informations sur le plugin vite-plugin-html-include, consultez la [documentation officielle](https://github.com/Tilty-io/vite-plugin-html-include).