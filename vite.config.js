import { defineConfig } from 'vite'
import htmlInclude from 'vite-plugin-html-include'
import { getHtmlEntryPoints } from './vite/getHtmlEntryPoints.js'
import viteAutoImportScss from "./vite/viteAutoImportScss";
import iconsGalleryPlugin from "./vite/iconsGalleryPlugin";

export default defineConfig({
    plugins: [
        htmlInclude(),
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
        iconsGalleryPlugin({
            dirs: ['src/icons'],
            output: 'icons-gallery.html'
        })
    ],
    build: {
        rollupOptions: {
            input: getHtmlEntryPoints()
        }
    }
})
