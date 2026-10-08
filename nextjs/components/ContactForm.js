'use client';
import { useState } from 'react';
import {
  CONTACT_FIELDS,
  SUBMIT_LABEL,
  CONTACT_SUCCESS_MESSAGE,
  CONTACT_ERROR_MESSAGE,
} from '@/lib/contact-content';

// Inquiry form (redesigned Oct 2026): soft-bordered fields in a two-column
// grid on desktop, a dropdown for the package question, and a clear thank-you
// state. Field list and validation rules live in lib/contact-content.js; the
// server re-checks everything in app/api/contact/route.js.

const LABEL = 'mb-2 block text-[11px] font-light uppercase tracking-[0.2em] text-brown';
const INPUT_BASE =
  'block w-full border bg-white px-4 py-3 font-body text-[15px] font-light text-[#443221] outline-none transition-colors placeholder:text-[#b3a597]';

function inputClass(hasError) {
  return `${INPUT_BASE} ${hasError ? 'border-[#c0392b]' : 'border-[#e0d6ca] hover:border-[#c9bba9] focus:border-[#443221]'}`;
}

function validate(values) {
  const errors = {};
  for (const field of CONTACT_FIELDS) {
    const value = (values[field.name] || '').trim();
    if (!value) {
      if (!field.optional) errors[field.name] = 'Please fill this in.';
    } else if (field.kind === 'email' && !new RegExp(field.pattern).test(value)) {
      errors[field.name] = 'Please enter a valid email address.';
    }
  }
  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState(() => Object.fromEntries(CONTACT_FIELDS.map((f) => [f.name, ''])));
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [serverError, setServerError] = useState('');

  function handleChange(name, value) {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === 'sending') return;
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      document.getElementById(`contact-${Object.keys(nextErrors)[0]}`)?.focus();
      return;
    }
    setStatus('sending');
    setServerError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setServerError(data.error || CONTACT_ERROR_MESSAGE);
        setStatus('error');
        return;
      }
      setStatus('success');
    } catch {
      setServerError(CONTACT_ERROR_MESSAGE);
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div role="status" aria-live="polite" className="flex min-h-[420px] flex-col items-center justify-center text-center">
        <div className="font-script text-[48px] leading-none text-[#443221] md:text-[60px]">Thank you</div>
        <p className="m-0 mt-5 max-w-[420px] text-[15.5px] font-light leading-[1.9] text-[#4a3a2c]">{CONTACT_SUCCESS_MESSAGE}</p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
      {CONTACT_FIELDS.map((field) => {
        const id = `contact-${field.name}`;
        const hasError = Boolean(errors[field.name]);
        const common = {
          id,
          name: field.name,
          required: !field.optional,
          'aria-required': !field.optional,
          'aria-invalid': hasError,
          'aria-describedby': hasError ? `${id}-error` : undefined,
          value: values[field.name],
          onChange: (e) => handleChange(field.name, e.target.value),
          className: inputClass(hasError),
        };
        return (
          <div key={field.name} className={field.wide ? 'sm:col-span-2' : ''}>
            <label htmlFor={id} className={LABEL}>
              {field.label}
              {field.optional ? <span className="ml-1 normal-case tracking-normal text-[#b3a597]">(optional)</span> : null}
            </label>
            {field.kind === 'select' ? (
              <select {...common} className={`${common.className} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22><path d=%22M1 1l5 5 5-5%22 fill=%22none%22 stroke=%22%2380695a%22 stroke-width=%221.5%22/></svg>')] bg-[right_1rem_center] bg-no-repeat pr-10`}>
                <option value="">Choose one</option>
                {field.options.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            ) : field.kind === 'textarea' ? (
              <textarea {...common} rows={field.rows || 4} placeholder={field.placeholder || ''} maxLength={field.maxLength} className={`${common.className} resize-y`} />
            ) : (
              <input
                {...common}
                type={field.kind === 'email' ? 'email' : field.kind === 'tel' ? 'tel' : 'text'}
                inputMode={field.kind === 'tel' ? 'tel' : undefined}
                autoComplete={field.autoComplete || 'off'}
                placeholder={field.placeholder || ''}
                maxLength={field.maxLength}
              />
            )}
            {hasError ? (
              <p id={`${id}-error`} className="m-0 mt-2 text-[13px] text-[#c0392b]">{errors[field.name]}</p>
            ) : null}
          </div>
        );
      })}

      <div className="flex flex-col items-center gap-4 pt-2 sm:col-span-2">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full cursor-pointer border border-[#443221] bg-[#443221] px-8 py-4 text-[12px] font-light uppercase tracking-[0.24em] text-white transition-colors hover:bg-transparent hover:text-[#443221] disabled:cursor-default disabled:opacity-50 sm:w-auto sm:min-w-[260px]"
        >
          {status === 'sending' ? 'Sending…' : SUBMIT_LABEL}
        </button>
        {status === 'error' && serverError ? (
          <p role="alert" className="m-0 max-w-[520px] text-center text-[14px] leading-[1.7] text-[#c0392b]">{serverError}</p>
        ) : null}
      </div>
    </form>
  );
}
