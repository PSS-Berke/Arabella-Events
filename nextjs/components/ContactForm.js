'use client';
import { useState } from 'react';
import Image from 'next/image';
import {
  CONTACT_FIELDS,
  CONTACT_EMAIL,
  CONTACT_MAILTO,
  CONTACT_IMG,
  SUBMIT_LABEL,
  CONTACT_SUCCESS_MESSAGE,
  CONTACT_ERROR_MESSAGE,
} from '@/lib/contact-content';

// Vertical gaps (px) below each field, taken from the live Wix mesh layout.
const FIELD_GAPS = [22, 25, 14, 22, 15, 12, 0];

const LABEL_CLASS =
  'mb-[9px] block font-body text-[13px] font-semibold leading-[1.4] text-charcoal';

function inputClass(hasError) {
  return [
    'block w-full border-0 border-b-[7px] border-solid bg-white px-[10px] py-[3px]',
    'font-body text-[15px] font-normal leading-[1.4] text-charcoal',
    'outline-none transition-colors duration-500 placeholder:text-[#7A7370]',
    hasError ? 'border-[#FF4040]' : 'border-[#E6DECA] hover:border-[#7A736F] focus:border-[#E6DECA]',
  ].join(' ');
}

function validate(values) {
  const errors = {};
  for (const field of CONTACT_FIELDS) {
    const value = (values[field.name] || '').trim();
    if (!value) {
      errors[field.name] = 'This field is required.';
    } else if (field.kind === 'email' && !new RegExp(field.pattern).test(value)) {
      errors[field.name] = 'Please enter a valid email address.';
    }
  }
  return errors;
}

// The live envelope is a Wix image-button: one 103x78 spot whose hand-drawn
// artwork swaps on hover (second closed envelope) and on press (open envelope).
// It is not a link on live, so it stays non-interactive here.
function EnvelopeDoodle() {
  const imgClass =
    'absolute left-0 top-1/2 h-auto w-[103px] -translate-y-1/2 transition-opacity duration-500';
  return (
    <div className="group relative h-[78px] w-[103px] shrink-0 select-none" role="img" aria-label="Hand drawn envelope">
      <Image
        src={CONTACT_IMG.envelopeDefault}
        alt=""
        width={206}
        height={124}
        className={`${imgClass} opacity-100 group-hover:opacity-0`}
      />
      <Image
        src={CONTACT_IMG.envelopeHover}
        alt=""
        width={206}
        height={124}
        className={`${imgClass} opacity-0 group-hover:opacity-100 group-active:opacity-0`}
      />
      <Image
        src={CONTACT_IMG.envelopeActive}
        alt=""
        width={206}
        height={124}
        className={`${imgClass} opacity-0 group-active:opacity-100`}
      />
    </div>
  );
}

export default function ContactForm() {
  const [values, setValues] = useState(() =>
    Object.fromEntries(CONTACT_FIELDS.map((f) => [f.name, '']))
  );
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
    if (Object.keys(nextErrors).length > 0) return;
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

  return (
    <form noValidate onSubmit={handleSubmit} className="md:pl-[13px]">
      <div className="flex flex-col md:grid md:grid-cols-[456px_409px] md:gap-x-[71px]">
        {/* Field column */}
        {status === 'success' ? (
          <div className="flex items-start justify-center pt-16 md:pt-24" role="status" aria-live="polite">
            <p className="m-0 font-body text-[17px] font-light tracking-[0.04em] text-charcoal">
              {CONTACT_SUCCESS_MESSAGE}
            </p>
          </div>
        ) : (
          <div>
            {CONTACT_FIELDS.map((field, i) => {
              const id = `contact-${field.name}`;
              const hasError = Boolean(errors[field.name]);
              return (
                <div key={field.name} style={{ marginBottom: FIELD_GAPS[i] }}>
                  <label htmlFor={id} className={LABEL_CLASS}>
                    {field.label}
                  </label>
                  {field.kind === 'textarea' ? (
                    <textarea
                      id={id}
                      name={field.name}
                      required
                      aria-required="true"
                      aria-invalid={hasError}
                      value={values[field.name]}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className={`${inputClass(hasError)} h-[28px] resize-none overflow-auto`}
                    />
                  ) : (
                    <input
                      id={id}
                      name={field.name}
                      type={field.kind === 'email' ? 'email' : 'text'}
                      placeholder={field.placeholder || ''}
                      maxLength={field.maxLength}
                      pattern={field.pattern}
                      autoComplete="off"
                      required
                      aria-required="true"
                      aria-invalid={hasError}
                      value={values[field.name]}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className={`${inputClass(hasError)} h-[32px]`}
                    />
                  )}
                  {hasError && (
                    <p className="m-0 mt-[5px] font-body text-[13px] leading-[1.4] text-[#FF4040]">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Companion column: envelope doodle + mailto link, portrait below */}
        <aside className="mt-14 flex flex-col items-center md:mt-0 md:items-start">
          <div className="flex items-center md:ml-[70px]">
            <EnvelopeDoodle />
            <p className="m-0 -ml-2 font-body text-[16px] font-light leading-[1.8em] text-charcoal">
              <a href={CONTACT_MAILTO} className="underline">
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
          <Image
            src={CONTACT_IMG.portrait}
            alt="Arabella laughing behind a candle-lit tablescape of white florals and autumn foliage"
            width={553}
            height={836}
            sizes="295px"
            className="mt-[10px] h-auto w-[295px]"
          />
        </aside>
      </div>

      {/* Send button — sits centered below the whole form block on live */}
      {status !== 'success' && (
        <div className="mt-12 flex flex-col items-center md:mt-[135px]">
          <button
            type="submit"
            disabled={status === 'sending'}
            aria-disabled={status === 'sending'}
            aria-label={SUBMIT_LABEL}
            className="flex h-[42px] w-[295px] items-center justify-center border-4 border-solid border-white bg-[#ECE4D8]/[0.97] font-display text-[32px] font-bold italic leading-none text-brown transition-colors duration-[400ms] hover:bg-white hover:text-[#7A736F] disabled:cursor-default disabled:bg-[#CCCCCC] disabled:text-white"
          >
            {SUBMIT_LABEL}
          </button>
          {status === 'error' && serverError && (
            <p
              role="alert"
              aria-live="assertive"
              className="m-0 mt-5 max-w-[520px] text-center font-body text-[14px] leading-[1.7] text-[#FF4040]"
            >
              {serverError}
            </p>
          )}
        </div>
      )}
    </form>
  );
}
