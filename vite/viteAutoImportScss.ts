import { Plugin } from 'vite'
import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { join, dirname, relative } from 'path'
import { globSync } from 'glob'

// Configuration pour un bloc de génération automatique SCSS.
// inputDir peut être un glob relatif au dossier projet (ex: 'components/**/*.scss')
// outputFile est le chemin de sortie du fichier .scss généré
interface AutoImportScssConfig {
    inputDir: string
    outputFile: string
}

// Fonction réutilisable pour générer les fichiers SCSS d'import
export function regenerateScssIndexes(configs: AutoImportScssConfig[], root: string) {
    configs.forEach(({ inputDir, outputFile }) => {
        const globPattern = join(root, inputDir).replace(/\\/g, '/')
        const absOutput = join(root, outputFile)

        const matchedFiles = globSync(globPattern, { nodir: true })

        const now = new Date()
        const timestamp = now.toLocaleString('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })

        const header = `// Auto-generated on ${timestamp}\n// ⚠️ Do not edit this file manually. Changes will be overwritten.\n`

        const imports = matchedFiles
            .filter(absFilePath => existsSync(absFilePath))
            .map((absFilePath) => {
                const rel = '/' + relative(root, absFilePath).replace(/\\/g, '/').replace(/\.scss$/, '')
                return `@use '${rel}';`
            })

        const outputDir = dirname(absOutput)
        if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true })

        writeFileSync(absOutput, header + imports.join('\n') + '\n')

        console.log(`✅ [vite-auto-import-scss] Generated ${outputFile} with ${imports.length} imports.`)
    })
}

// Plugin Vite principal (sans watcher)
export default function viteAutoImportScss(configs: AutoImportScssConfig[]): Plugin {
    return {
        name: 'vite-auto-import-scss',

        configResolved(config) {
            regenerateScssIndexes(configs, config.root)
        }
    }
}
