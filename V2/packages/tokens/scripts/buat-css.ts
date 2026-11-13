import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { buatThemeCss, buatTokensCss } from '../src/css.ts'

const keluar = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist-css')
mkdirSync(keluar, { recursive: true })
writeFileSync(join(keluar, 'tokens.css'), buatTokensCss())
writeFileSync(join(keluar, 'theme.css'), buatThemeCss())
console.warn(`CSS token ditulis ke ${keluar}`)
