/**
 * Catalogue des visuels locaux : Vite resout chaque fichier en URL hashee.
 * Le contenu reference les images par nom de fichier (cf. src/content).
 */
const files = import.meta.glob<string>('./*.{jpg,png}', { eager: true, import: 'default' })

export function image(name: string): string {
  const url = files[`./${name}`]
  if (!url) throw new Error(`Image introuvable dans src/assets/images : ${name}`)
  return url
}
