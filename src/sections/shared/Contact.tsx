import { useEffect, useRef, useState, type FormEvent } from 'react'
import { image } from '../../assets/images'
import { Icon } from '../../components/icons/Icon'
import { FallbackImg } from '../../components/ui/FallbackImg'
import { useReducedMotion } from '../../hooks/useMediaQuery'
import { useContent } from '../../i18n/useLanguage'
import { submitForm } from '../../services/forms'

/**
 * Contact (réf. « You Have Questions, We Have Answers ») : grande carte photo (le building
 * existant) avec le titre, les implantations et les réseaux à gauche, formulaire blanc à
 * droite. Animation : plus la section approche du centre de l'écran, plus la carte grandit
 * jusqu'à occuper tout l'écran (marges et arrondis qui disparaissent). Progression posée
 * en variable CSS (--grow) à chaque image, sans re-render React.
 */
export function Contact() {
  const { contact, footer } = useContent()
  const [note, setNote] = useState('')
  const [type, setType] = useState(contact.form.types[0])
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (reduceMotion) {
      el.style.setProperty('--grow', '1')
      return
    }
    // Cible (d'après le scroll) puis valeur affichée qui la rejoint en douceur à chaque image :
    // les à-coups de la molette sont lissés ; la boucle s'arrête une fois arrivée.
    let target = 0
    let shown = 0
    let frame = 0
    let last = 0
    const measure = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      // État initial (encart arrondi) tant que la carte monte dans l'écran ; elle s'ouvre
      // ensuite jusqu'au plein écran quand son haut arrive sous le header.
      const start = vh * 0.5
      const end = 0
      const p = Math.min(1, Math.max(0, (start - rect.top) / (start - end)))
      target = p * p * (3 - 2 * p)
    }
    const tick = (now: number) => {
      const dt = last ? Math.min(64, now - last) : 16.67
      last = now
      shown += (target - shown) * (1 - Math.pow(1 - 0.14, dt / 16.67))
      if (Math.abs(target - shown) < 0.001) shown = target
      el.style.setProperty('--grow', shown.toFixed(4))
      frame = shown === target ? 0 : requestAnimationFrame(tick)
    }
    const onScroll = () => {
      measure()
      if (!frame) {
        last = 0
        frame = requestAnimationFrame(tick)
      }
    }
    measure()
    shown = target
    el.style.setProperty('--grow', shown.toFixed(4))
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [reduceMotion])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }
    try {
      await submitForm('contact', form)
      setNote(contact.form.success)
      form.reset()
      setType(contact.form.types[0])
    } catch (error) {
      console.error(error)
    }
  }

  const f = contact.form

  return (
    <section ref={sectionRef} className="ctc" id="contact" aria-labelledby="contact-title">
      <div className="ctc__card">
        <FallbackImg className="ctc__bg" src={image(contact.image)} alt="" loading="lazy" />
        <div className="ctc__inner">
          <div className="ctc__info">
            <p className="ctc__kicker">{contact.title}</p>
            <h2 className="ctc__title" id="contact-title">
              {contact.headline}
            </h2>
            <p className="ctc__intro">{contact.intro}</p>

            <div className="ctc__grid">
              {contact.offices.map((office) => (
                <div key={office.title} className="ctc__block">
                  <h3>{office.title}</h3>
                  <p>
                    {office.address.map((line) => (
                      <span key={line}>{line.replace(/^Adresse\s*:\s*/, '')}</span>
                    ))}
                  </p>
                  <p>
                    <a href={office.phone.href}>{office.phone.label}</a>
                    <a href={`mailto:${office.email}`}>{office.email}</a>
                  </p>
                </div>
              ))}
              <div className="ctc__block">
                <h3>{contact.socialsLabel}</h3>
                <p>
                  {footer.socials.map((s) => (
                    <a key={s.label} href={s.href}>
                      {s.label}
                    </a>
                  ))}
                </p>
              </div>
              <div className="ctc__block">
                <h3>Web</h3>
                <p>
                  <a href={`https://${contact.offices[0].website}`}>{contact.offices[0].website}</a>
                </p>
              </div>
            </div>
          </div>

          <form className="ctc__form" data-contact-form noValidate onSubmit={onSubmit}>
            <h3 className="ctc__form-title">{f.title}</h3>
            <p className="ctc__form-sub">{f.subtitle}</p>
            <div className="ctc__fields">
              <input
                name="prenom"
                type="text"
                autoComplete="given-name"
                required
                placeholder={f.firstName}
                aria-label={f.firstName}
              />
              <input
                name="nom"
                type="text"
                autoComplete="family-name"
                required
                placeholder={f.lastName}
                aria-label={f.lastName}
              />
              <input
                name="pays"
                type="text"
                autoComplete="country-name"
                placeholder={f.country}
                aria-label={f.country}
              />
              <input
                name="telephone"
                type="tel"
                autoComplete="tel"
                placeholder={f.phone}
                aria-label={f.phone}
              />
              <input
                className="is-wide"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder={f.email}
                aria-label={f.email}
              />
            </div>

            <fieldset className="ctc__types">
              <legend>{f.typeLabel}</legend>
              {f.types.map((t) => (
                <label key={t} className={t === type ? 'is-active' : undefined}>
                  <input
                    type="radio"
                    name="type"
                    value={t}
                    checked={t === type}
                    onChange={() => setType(t)}
                  />
                  {t}
                </label>
              ))}
            </fieldset>

            <textarea
              name="message"
              rows={3}
              required
              placeholder={f.message}
              aria-label={f.message}
            />
            <label className="ctc__consent">
              <input type="checkbox" name="consentement" required />
              <span>{f.consent}</span>
            </label>
            <button className="ctc__submit" type="submit">
              {f.submit} <Icon name="arrow" />
            </button>
            <p className="form-note" role="status" aria-live="polite">
              {note}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
