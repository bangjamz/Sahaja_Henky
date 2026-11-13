import { buatTeks } from '@sahaja/ui'
import kamus from './id.json'

export type KunciTeks = keyof typeof kamus
export const t = buatTeks(kamus)
