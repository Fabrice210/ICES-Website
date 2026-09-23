import { useState, type FormEvent } from 'react'
import { image } from '../../assets/images'
import { FallbackImg } from '../../components/ui/FallbackImg'
import { useContent } from '../../i18n/useLanguage'
import { submitForm } from '../../services/forms'

const SEPARATOR = ' \u00a0|\u00a0 '

export function Contact() {
  const { contact } = useContent()
  const [note, setNote] = useState('')

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
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section className="section section--flush-bottom" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <h2 className="section-label" id="contact-title">
          {contact.title}
        </h2>
        <div className="contact">
          <div className="contact__info">
            <FallbackImg src={image(contact.image)} alt="" loading="lazy" />
            <div>
              {contact.offices.map((office) => (
                <div key={office.title} className="contact__office">
                  <h3>{office.title}</h3>
                  <p>
                    <a href={`https://${office.website}`}>{office.website}</a>
                    {SEPARATOR}
                    <a href={office.phone.href}>{office.phone.label}</a>
                    {SEPARATOR}
                    <a href={`mailto:${office.email}`}>{office.email}</a>
                  </p>
                  <p>
                    {office.address.map((line, i) => (
                      <span key={line}>
                        {i > 0 && <br />}
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <form className="contact__form" data-contact-form noValidate onSubmit={onSubmit}>
            <div className="field-line">
              <label htmlFor="c-name">{contact.form.name}</label>
              <input id="c-name" name="name" type="text" autoComplete="name" required />
            </div>
            <div className="field-line">
              <label htmlFor="c-email">{contact.form.email}</label>
              <input id="c-email" name="email" type="email" autoComplete="email" required />
            </div>
            <div className="field-line">
              <label htmlFor="c-msg">{contact.form.message}</label>
              <textarea id="c-msg" name="message" rows={3} required />
            </div>
            <button className="btn btn--primary" type="submit">
              {contact.form.submit}
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
