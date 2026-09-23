import { useEffect, useRef, useState, type FormEvent, type RefObject } from 'react'
import { useContent } from '../../i18n/useLanguage'
import { submitForm } from '../../services/forms'
import { Icon } from '../icons/Icon'

const SUPPORTS_CLOSEDBY =
  typeof HTMLDialogElement !== 'undefined' && 'closedBy' in HTMLDialogElement.prototype

export function PartnerModal({ dialogRef }: { dialogRef: RefObject<HTMLDialogElement | null> }) {
  const { partner } = useContent()
  const { fields } = partner
  const formRef = useRef<HTMLFormElement>(null)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    // `closedby` n'est pas typé par React : posé à la main, comme dans l'original.
    dialog.setAttribute('closedby', 'any')
    if (SUPPORTS_CLOSEDBY) return

    // Repli « clic hors de la modale » pour Safari.
    const onClick = (event: MouseEvent) => {
      if (event.target !== dialog) return
      const r = dialog.getBoundingClientRect()
      const inside =
        r.top <= event.clientY &&
        event.clientY <= r.bottom &&
        r.left <= event.clientX &&
        event.clientX <= r.right
      if (!inside) dialog.close()
    }
    dialog.addEventListener('click', onClick)
    return () => dialog.removeEventListener('click', onClick)
  }, [dialogRef])

  const close = () => dialogRef.current?.close()

  const onClose = () => {
    if (!sent) return
    formRef.current?.reset()
    setSent(false)
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }
    try {
      await submitForm('partenaire', form)
      setSent(true)
    } catch (error) {
      // Pas de faux succès si l'envoi réel échoue : le formulaire reste affiché.
      console.error(error)
    }
  }

  const required = <span className="req">*</span>

  return (
    <dialog
      className="modal"
      id="partner-modal"
      aria-labelledby="partner-title"
      ref={dialogRef}
      onClose={onClose}
    >
      <div className="modal__inner">
        <div className="modal__head">
          <div>
            <h2 id="partner-title">{partner.title}</h2>
            <p>{partner.subtitle}</p>
          </div>
          <button
            className="modal__close"
            type="button"
            data-close
            aria-label={partner.closeLabel}
            onClick={close}
          >
            <Icon name="close" />
          </button>
        </div>

        <form className="pform" noValidate ref={formRef} onSubmit={onSubmit} hidden={sent}>
          <div className="pfield full">
            <label htmlFor="p-company">
              {fields.company.label} {required}
            </label>
            <input
              id="p-company"
              name="entreprise"
              type="text"
              placeholder={fields.company.placeholder}
              autoComplete="organization"
              required
            />
          </div>
          <div className="pfield">
            <label htmlFor="p-sector">
              {fields.sector.label} {required}
            </label>
            <div className="select-wrap">
              <select id="p-sector" name="secteur" required defaultValue="">
                <option value="" disabled>
                  {fields.sector.placeholder}
                </option>
                {fields.sector.options.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <Icon name="down" />
            </div>
          </div>
          <div className="pfield">
            <label htmlFor="p-size">
              {fields.size.label} {required}
            </label>
            <div className="select-wrap">
              <select id="p-size" name="taille" required defaultValue="">
                <option value="" disabled>
                  {fields.size.placeholder}
                </option>
                {fields.size.options.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <Icon name="down" />
            </div>
          </div>
          <div className="pfield">
            <label htmlFor="p-first">
              {fields.firstName.label} {required}
            </label>
            <input
              id="p-first"
              name="prenom"
              type="text"
              placeholder={fields.firstName.placeholder}
              autoComplete="given-name"
              required
            />
          </div>
          <div className="pfield">
            <label htmlFor="p-last">
              {fields.lastName.label} {required}
            </label>
            <input
              id="p-last"
              name="nom"
              type="text"
              placeholder={fields.lastName.placeholder}
              autoComplete="family-name"
              required
            />
          </div>
          <div className="pfield">
            <label htmlFor="p-email">
              {fields.email.label} {required}
            </label>
            <input
              id="p-email"
              name="email"
              type="email"
              placeholder={fields.email.placeholder}
              autoComplete="email"
              required
            />
          </div>
          <div className="pfield">
            <label htmlFor="p-phone">
              {fields.phone.label} {required}
            </label>
            <input
              id="p-phone"
              name="telephone"
              type="tel"
              placeholder={fields.phone.placeholder}
              autoComplete="tel"
              required
            />
          </div>
          <div className="pfield full">
            <label htmlFor="p-site">
              {fields.website.label} <span className="opt">{fields.website.optional}</span>
            </label>
            <input
              id="p-site"
              name="site"
              type="url"
              placeholder={fields.website.placeholder}
              autoComplete="url"
            />
          </div>
          <div className="pfield full">
            <label htmlFor="p-why">
              {fields.motivation.label} {required}
            </label>
            <textarea
              id="p-why"
              name="motivation"
              placeholder={fields.motivation.placeholder}
              required
            />
          </div>
          <label className="consent full">
            <input type="checkbox" name="consentement" required />
            <span className="consent__box">
              <Icon name="check" />
            </span>
            <span>{fields.consent}</span>
          </label>
          <div className="pform__footer">
            <button className="pform__submit" type="submit">
              {partner.submit} <Icon name="arrow" />
            </button>
            <p className="pform__note">{partner.note}</p>
          </div>
        </form>

        <div className="pform__success" hidden={!sent} role="status">
          <h3>{partner.success.title}</h3>
          <p>{partner.success.text}</p>
          <button
            className="btn btn--primary btn--spaced"
            type="button"
            data-close
            onClick={close}
          >
            {partner.success.close}
          </button>
        </div>
      </div>
    </dialog>
  )
}
