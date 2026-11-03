import { useEffect, useState } from 'react'

/*
 * Lien avec Incub-OS, la plateforme d'incubation d'ICES : la page Incubation lit son API
 * publique (cohortes, chiffres, alumni) plutôt que de recopier des chiffres à la main.
 * Sans adresse configurée (.env.example) ou si l'API ne répond pas, la page le dit et
 * n'affiche aucun chiffre : jamais de valeur inventée.
 */

const API = (import.meta.env.VITE_INCUBOS_API_URL ?? '').replace(/\/$/, '')
const SITE = (import.meta.env.VITE_INCUBOS_SITE_URL ?? '').replace(/\/$/, '')

export interface CohortePublique {
  id: string
  nom: string
  secteur: string | null
  ouverte: boolean
  placesRestantes: number
  dateCloture: string | null
  dateDebutProgramme: string | null
}

export interface StatistiquesPubliques {
  metrics: { incubesTotal: number; alumni: number; cohortes: number; partenaires: number }
  alumni: { id: string; projet: string; secteur: string | null; cohorte: string; annee: number | null }[]
}

export type Chargement<T> = { etat: 'chargement' } | { etat: 'pret'; donnees: T } | { etat: 'indisponible' }

/** Lien de candidature pour une cohorte, ou null sans vitrine configurée. */
export function lienCandidature(cohorte: string): string | null {
  return SITE ? `${SITE}/candidater/${encodeURIComponent(cohorte)}` : null
}

function usePublic<T>(chemin: string): Chargement<T> {
  const [etat, setEtat] = useState<Chargement<T>>(API ? { etat: 'chargement' } : { etat: 'indisponible' })
  useEffect(() => {
    if (!API) return
    const controle = new AbortController()
    fetch(`${API}/api/v1/public${chemin}`, { signal: controle.signal })
      .then((r) => (r.ok ? (r.json() as Promise<T>) : Promise.reject(new Error(String(r.status)))))
      .then((donnees) => setEtat({ etat: 'pret', donnees }))
      .catch((e: unknown) => {
        if (!(e instanceof DOMException && e.name === 'AbortError')) setEtat({ etat: 'indisponible' })
      })
    return () => controle.abort()
  }, [chemin])
  return etat
}

export const useCohortes = () => usePublic<{ cohortes: CohortePublique[] }>('/cohortes')
export const useStatistiques = () => usePublic<StatistiquesPubliques>('/statistiques')
