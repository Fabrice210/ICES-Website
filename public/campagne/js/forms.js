// Formulaires « Précisez votre besoin » : validation champ par champ, puis envoi en JSON à la
// fonction /api/demande du site ICES (champ formulaire = data-formulaire), qui transmet la demande
// à l'adresse de data-mailto. En cas d'échec, la page propose d'écrire à cette adresse ou de copier la demande.
const ENDPOINT = '/api/demande';
(() => {
  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const PHONE = /^[+()\d\s.-]{6,}$/;

  const labelOf = el => el.dataset.label || el.name;

  function setError(target, id, message) {
    const box = document.getElementById(`${id}-error`);
    if (!box) return;
    box.textContent = message || '';
    box.hidden = !message;
    target.setAttribute('aria-invalid', message ? 'true' : 'false');
  }

  function check(form) {
    const errors = [];
    form.querySelectorAll('.field--group').forEach(group => {
      const ok = !group.hasAttribute('data-required') || group.querySelector('input:checked');
      const message = ok ? '' : `Choisissez au moins une réponse pour « ${labelOf(group)} ».`;
      setError(group, group.id, message);
      if (message) errors.push({ focus: group.querySelector('input'), message });
    });
    form.querySelectorAll('input:not([type="radio"]):not([name="site"]), select, textarea').forEach(el => {
      if (el.closest('.field--group')) return;
      const value = el.type === 'checkbox' ? el.checked : el.value.trim();
      let message = '';
      if (el.required && !value) {
        message = el.type === 'checkbox'
          ? 'Merci d’accepter l’utilisation de vos informations pour que nous puissions vous répondre.'
          : `Le champ « ${labelOf(el)} » est obligatoire.`;
      } else if (value && el.type === 'email' && !EMAIL.test(value)) {
        message = 'Saisissez une adresse e-mail valide, par exemple nom@organisation.org.';
      } else if (value && el.type === 'tel' && !PHONE.test(value)) {
        message = 'Saisissez un numéro de téléphone valide, par exemple +229 01 98 41 23 23.';
      }
      setError(el, el.id, message);
      if (message) errors.push({ focus: el, message });
    });
    return errors;
  }

  function summary(form, errors, focus) {
    const box = form.querySelector('.form__summary');
    if (!errors.length) { box.hidden = true; box.replaceChildren(); return; }
    const title = document.createElement('strong');
    title.textContent = errors.length === 1 ? 'Un point à corriger :' : `${errors.length} points à corriger :`;
    const list = document.createElement('ul');
    errors.forEach(e => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${e.focus.id}`;
      a.textContent = e.message;
      a.addEventListener('click', ev => { ev.preventDefault(); e.focus.focus(); });
      li.append(a);
      list.append(li);
    });
    box.replaceChildren(title, list);
    box.hidden = false;
    if (focus) box.focus();
  }

  function message(form) {
    const lines = [];
    form.querySelectorAll('.form__block').forEach(block => {
      lines.push(block.querySelector('legend').textContent.trim().toUpperCase());
      block.querySelectorAll('.field').forEach(f => {
        const label = (f.querySelector('legend, .field__label')?.textContent || '').replace('*', '').trim();
        const value = f.classList.contains('field--group')
          ? [...f.querySelectorAll('input:checked')].map(i => i.value).join(', ')
          : f.querySelector('input, select, textarea')?.value.trim();
        if (value) lines.push(`${label} : ${value}`);
      });
      lines.push('');
    });
    lines.push('Consentement : accepté');
    return lines.join('\n');
  }

  function show(form, nodes) {
    const box = form.querySelector('.form__done');
    box.replaceChildren(...nodes);
    box.hidden = false;
    box.focus();
  }

  function sent(form) {
    const h = document.createElement('h2');
    h.textContent = 'Votre demande est envoyée';
    const p = document.createElement('p');
    p.textContent = 'Merci. Notre équipe l’a bien reçue et revient vers vous rapidement.';
    form.querySelectorAll('.form__block, .field--consent, .form__actions, .form__required').forEach(el => { el.hidden = true; });
    show(form, [h, p]);
  }

  function failed(form, subject, body) {
    const h = document.createElement('h2');
    h.textContent = 'L’envoi n’a pas abouti';
    const p1 = document.createElement('p');
    p1.textContent = 'Votre demande n’a pas pu nous parvenir. Réessayez dans un instant, ou écrivez-nous directement à ';
    const mail = document.createElement('strong');
    mail.textContent = form.dataset.mailto;
    p1.append(mail, '.');
    const p2 = document.createElement('p');
    const a = document.createElement('a');
    a.href = `mailto:${form.dataset.mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    a.textContent = 'ouvrir votre messagerie avec la demande';
    p2.append('Vous pouvez aussi ', a, ' ou la copier pour l’envoyer vous-même.');
    const copy = document.createElement('button');
    copy.type = 'button';
    copy.textContent = 'Copier la demande';
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(`À : ${form.dataset.mailto}\nObjet : ${subject}\n\n${body}`);
        copy.textContent = 'Demande copiée';
      } catch {
        copy.textContent = 'Copie impossible : sélectionnez le texte manuellement';
      }
    });
    show(form, [h, p1, p2, copy]);
  }

  // Corps JSON : un champ à choix multiples devient une liste ; les champs vides sont omis.
  function payload(form) {
    const data = { formulaire: form.dataset.formulaire };
    for (const [name, value] of new FormData(form)) {
      if (value === '') continue;
      if (name in data) data[name] = [].concat(data[name], value);
      else data[name] = form.querySelectorAll(`[name="${name}"][type="checkbox"]`).length > 1 ? [value] : value;
    }
    return data;
  }

  document.querySelectorAll('form[data-formulaire]').forEach(form => {
    form.querySelectorAll('input, select, textarea').forEach(el => {
      const type = el.type === 'checkbox' || el.type === 'radio' || el.tagName === 'SELECT' ? 'change' : 'blur';
      el.addEventListener(type, () => {
        if (form.dataset.tried) summary(form, check(form), false);
      });
    });

    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (form.elements.site?.value) return; // champ piège rempli : envoi ignoré
      form.dataset.tried = '1';
      const errors = check(form);
      summary(form, errors, true);
      if (errors.length) return;

      const submit = form.querySelector('.form__submit');
      const label = submit.textContent;
      submit.disabled = true;
      submit.textContent = 'Envoi en cours…';
      form.querySelector('.form__done').hidden = true;
      const org = form.elements.organisation?.value.trim();
      const subject = `[ICES] ${form.dataset.subject}${org ? ` — ${org}` : ''}`;
      try {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload(form)),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        sent(form);
      } catch (err) {
        console.error('Envoi du formulaire impossible :', err);
        failed(form, subject, message(form));
        submit.disabled = false;
        submit.textContent = label;
      }
    });
  });
})();
