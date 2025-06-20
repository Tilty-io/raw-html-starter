# Raw HTML Starter

> Documentation en français disponible dans [LISEZMOI.md](./LISEZMOI.md)

A modern starter kit for building websites in **plain HTML** (no React, no Vue, no heavy JS frameworks—just good old HTML, simple, fast, and efficient). Perfect for those who want full control, go straight to the point, or simply enjoy modern tooling (Vite, SCSS, includes, components) without the bloat of a framework.

## Features

- Ultra-fast development with Vite
- Native SCSS and auto-import of components
- Reusable HTML component system
- Multi-page ready
- Hot Module Replacement (HMR)
- TypeScript support
- [Full documentation](README.md)
- [Interactive icon gallery](icons-gallery.html)

## Installation

```bash
# Clone the project
git clone [REPO_URL]

# Install dependencies
npm install

# Start development server
npm run dev
```

## Available Scripts

- `npm run dev` : Start development server
- `npm run build` : Create production build
- `npm run watch:build` : Build in watch mode

## Project Structure

```
├── src/
│   ├── components/          # Reusable components
│   │   ├── button.html      # Button with associated styles
│   │   ├── button.scss
│   │   ├── card.html        # Card with associated styles
│   │   ├── card.scss
│   │   ├── heading.html     # Heading with associated styles
│   │   ├── heading.scss
│   │   └── icon.html        # Generic SVG icon component
│   │
│   ├── layout/              # Layouts and structure
│   │   ├── common.html      # Main layout (global site structure)
│   │   ├── footer.html      # Footer
│   │   ├── nav.html         # Navigation
│   │   └── raw-layout.html  # Raw layout
│   │
│   ├── styles/              # Global styles
│   └── icons/               # SVG icon folders (by family)
│        ├── mdi/
│        ├── lucide/
│        ├── lucide-thin/
│        └── phosphor/
│
├── public/                  # Static assets
│   ├── images/              # Site images
│   └── fonts/               # Font files
│
├── vite/                    # Vite config and plugins
│   ├── getHtmlEntryPoints.ts # HTML entry points
│   ├── viteAutoImportScss.ts # SCSS auto-import plugin
│   ├── iconsGalleryPlugin.ts # Icon gallery generator plugin
│   └── icons-gallery.css     # Icon gallery styles
│
└── dist/                    # Build output
```

## Available Aliases

To simplify importing components and resources, the project uses several aliases:

- `@comp`: Points to `src/components/`
  ```html
  <include file="@comp/button.html" />
  ```

- `@layout`: Points to `src/layout/`
  ```html
  <include file="@layout/common.html" />
  ```

- `@icons`: Points to `src/icons/`
  ```html
  <include file="@comp/icon.html" $icon="@icons/lucide/heart.svg" />
  ```

These aliases help avoid complex relative paths and make the code more maintainable. They are configured in the `vite.config.ts` file and work in both HTML and SCSS files.

## Main Layout

The main layout (`src/layout/common.html`) defines the global structure of all site pages: `<html>`, `<head>`, `<body>`, header, navigation, footer, etc.

- Centralizes common elements (meta, CSS links, scripts, navigation…)
- Uses slots or includes to inject page-specific content
- Recommended entry point for all HTML pages in the project

**Example usage in a page:**

```html
<include file="@layout/common.html" $title="Home">
  <include file="@comp/heading.html">Welcome!</include>
  <p>Homepage content…</p>
</include>
```

To change the global appearance, add scripts, fonts, etc., simply edit `common.html`.

## Using Components

The project uses a component system based on HTML includes. Example:

```html
<include file="@comp/card.html">
  <template slot="title">Card Title</template>
  <template slot="content">
    Card content
  </template>
</include>
```

For more information about the vite-plugin-html-include, see the [official documentation](https://github.com/Tilty-io/vite-plugin-html-include).

## Styles

Styles are organized in SCSS modules in the `styles/` folder. Component SCSS files are auto-imported thanks to the `viteAutoImportScss` plugin.

## SVG Icon Management

- Icons are organized by family in `src/icons/` (e.g. `mdi`, `lucide`, `phosphor`...)
- A generic `icon.html` component lets you include any icon with a uniform API
- Example usage:

```html
<include file="@comp/icon.html" $icon="@icons/lucide/heart-pulse.svg" $size="48" $color="#ff3399" />
```