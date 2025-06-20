import { defineConfig } from 'vite'
import htmlInclude from 'vite-plugin-html-include'
import { getHtmlEntryPoints } from './vite/getHtmlEntryPoints.js'
import viteAutoImportScss from "./vite/viteAutoImportScss";
import iconsGalleryPlugin from "./vite/iconsGalleryPlugin";

export default defineConfig({
    base: '/raw-html-starter/',
    plugins: [
        // Plugin to include HTML files in the build process with slots and variables
        htmlInclude(),
        // Automatically import all SCSS files from specified directories
        viteAutoImportScss([
            {
                inputDir: 'src/components/**/*.scss',
                outputFile: 'src/styles/components-all.scss'
            },
            {
                inputDir: 'src/layout/**/*.scss',
                outputFile: 'src/styles/layout-all.scss'
            }
        ]),
        // Plugin to generate an icons gallery HTML file
        iconsGalleryPlugin({
            dirs: ['src/icons'],
            output: 'icons-gallery.html'
        })
    ],
    build: {
        rollupOptions: {
            input: getHtmlEntryPoints()
        }
    },
    resolve: {
        alias: {
            '@comp': 'src/components/',
            '@layout': 'src/layout/',
            '@icons': 'src/icons/',
            '@style': 'src/styles/',
            // ...others alias
        }
    }
})
