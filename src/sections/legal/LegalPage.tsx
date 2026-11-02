import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../../components/icons/Icon'
import { useInView } from '../../hooks/useInView'
import { useContent } from '../../i18n/useLanguage'
import type { LegalBlock, LegalPageContent, LegalSlug } from '../../types/content'
import { ArticleHero, ArticleTag } from '../article/Article'

/*
 * Pages légales (mentions légales, confidentialité, cookies), dans le gabarit des sous-pages :
 * hero sombre plein écran, puis un texte de lecture sur fond blanc avec sommaire collant
 * (ordinateur) et liens vers les deux autres pages en bas.
 */

const LEGAL_ORDER: LegalSlug[] = ['mentions-legales', 'confidentialite', 'cookies']

/** En développement, une information à fournir s'affiche « À compléter » ; en production, elle est masquée. */
const SHOW_MISSING = import.meta.env.DEV

const pad = (n: number) => String(n).padStart(2, '0')

/** `[libellé](/adresse)` devient un lien : route interne, adresse e-mail ou site externe. */
function rich(text: string): ReactNode[] {
  const out: ReactNode[] = []
  const re = /\[([^\]]+)\]\(([^)]+)\)/g
  let last = 0
  for (let m = re.exec(text); m; m = re.exec(text)) {
    if (m.index > last) out.push(text.slice(last, m.index))
    const [, label, to] = m
    if (to.startsWith('/'))
      out.push(
        <Link key={m.index} to={to}>
          {label}
        </Link>
      )
    else if (to.startsWith('mailto:'))
      out.push(
        <a key={m.index} href={to}>
          {label}
        </a>
      )
    else
      out.push(
        <a key={m.index} href={to} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      )
    last = m.index + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

/** Retire ce qui reste à fournir quand on ne l'affiche pas (production). */
function visibleBlocks(blocks: LegalBlock[]): LegalBlock[] {
  if (SHOW_MISSING) return blocks
  return blocks
    .map((b) =>
      typeof b === 'object' && 'facts' in b ? { facts: b.facts.filter((f) => f.value !== null) } : b
    )
    .filter((b) => !(typeof b === 'object' && 'facts' in b && b.facts.length === 0))
}

function Block({ block, missing }: { block: LegalBlock; missing: string }) {
  if (typeof block === 'string') return <p>{rich(block)}</p>
  if ('list' in block)
    return (
      <ul>
        {block.list.map((item) => (
          <li key={item}>{rich(item)}</li>
        ))}
      </ul>
    )
  return (
    <dl className="alegal__facts">
      {block.facts.map((f) => (
        <div key={f.label}>
          <dt>{f.label}</dt>
          <dd>
            {f.value === null ? <span className="alegal__missing">{missing}</span> : rich(f.value)}
          </dd>
        </div>
      ))}
    </dl>
  )
}

/** Garde la description de la page pour les moteurs de recherche, puis rend celle d'origine. */
function useMetaDescription(text: string) {
  useEffect(() => {
    const tag = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!tag) return
    const previous = tag.content
    tag.content = text
    return () => {
      tag.content = previous
    }
  }, [text])
}

function LegalBody({ page, slug }: { page: LegalPageContent; slug: LegalSlug }) {
  const { legal } = useContent()
  const { labels, pages } = legal
  const sections = useMemo(
    () =>
      page.sections
        .map((s) => ({ ...s, blocks: visibleBlocks(s.blocks) }))
        .filter((s) => s.blocks.length > 0),
    [page]
  )
  const [active, setActive] = useState(sections[0]?.id)
  const { ref: headRef, inView: headIn } = useInView<HTMLDivElement>(0.2)

  // Section en cours de lecture, soulignée dans le sommaire.
  useEffect(() => {
    const nodes = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length) setActive(visible[0].target.id)
      },
      { rootMargin: '-25% 0px -65% 0px' }
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [sections])

  const related = LEGAL_ORDER.filter((s) => s !== slug)

  return (
    <section className="alegal">
      <div className="container">
        <div ref={headRef} className={headIn ? 'alegal__head is-in' : 'alegal__head'}>
          <ArticleTag>{page.tag}</ArticleTag>
          <p className="alegal__updated">
            {labels.updated} : {page.updated}
          </p>
        </div>

        <div className="alegal__grid">
          <nav className="alegal__toc" aria-label={labels.summary}>
            <p className="alegal__toc-title">{labels.summary}</p>
            <ol>
              {sections.map((s, i) => (
                <li key={s.id}>
                  <Link
                    to={`#${s.id}`}
                    className={active === s.id ? 'is-active' : undefined}
                    aria-current={active === s.id ? 'location' : undefined}
                  >
                    <span className="alegal__toc-num">{pad(i + 1)}</span>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          <div className="alegal__body">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="alegal__section">
                <h2>
                  <span className="alegal__num">{pad(i + 1)}</span>
                  {s.title}
                </h2>
                {s.blocks.map((b, j) => (
                  <Block key={j} block={b} missing={labels.toComplete} />
                ))}
              </section>
            ))}
          </div>
        </div>

        <div className="alegal__related">
          <p className="alegal__toc-title">{labels.related}</p>
          <div className="alegal__related-grid">
            {related.map((r) => (
              <Link key={r} to={`/${r}`} className="alegal__card">
                <span className="alegal__card-tag">{pages[r].tag}</span>
                <span className="alegal__card-title">{pages[r].title}</span>
                <span className="alegal__card-icon" aria-hidden="true">
                  <Icon name="arrow" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function LegalPage({ slug }: { slug: LegalSlug }) {
  const page = useContent().legal.pages[slug]
  useMetaDescription(page.description)
  return (
    <div data-page="legal" key={slug}>
      <ArticleHero tag={page.tag} title={page.title} text={page.text} image={page.image} />
      <LegalBody page={page} slug={slug} />
    </div>
  )
}
