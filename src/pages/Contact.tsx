import { useState, type FormEvent } from 'react';
import { Container, PageHero } from '../components/ui';
import { site } from '../data/site';
import { useSeo } from '../lib/useSeo';

const inquiries = [
  { title: 'Songwriting placements', body: 'For artists, managers and labels looking for an original song.' },
  { title: 'Publishing', body: 'For publishers interested in the catalogue or representation.' },
  { title: 'Producer collaborations', body: 'For producers who want to develop a composition into a finished record.' },
  { title: 'Vocalists', body: 'For singers who want to record, perform or demo a song.' },
  { title: 'A&R opportunities', body: 'For roles, internships and projects in A&R and artist development.' },
  { title: 'Creative partnerships', body: 'For directors, visual artists and storytellers who want to work together.' },
];

type Status = 'idle' | 'sending' | 'sent' | 'error';

const field = 'w-full rounded-sm border border-cream/15 bg-charcoal/60 px-4 py-3.5 text-cream placeholder:text-cream/30 transition-colors focus:border-gold focus:outline-none';
const label = 'mb-2 block text-sm text-cream/70';

function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const configured = Boolean(site.formspreeId);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!configured) return;
    const form = e.currentTarget;
    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="rounded-sm border border-gold/50 bg-forest/60 p-10">
        <p className="font-serif text-3xl text-cream">Thank you. Your message is on its way.</p>
        <p className="mt-3 text-cream/65">I read every message and will get back to you as soon as I can.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2" noValidate={false}>
      <div>
        <label htmlFor="name" className={label}>Name</label>
        <input id="name" name="name" required autoComplete="name" className={field} />
      </div>
      <div>
        <label htmlFor="email" className={label}>Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" className={field} />
      </div>
      <div>
        <label htmlFor="company" className={label}>Role / company <span className="text-cream/40">(optional)</span></label>
        <input id="company" name="company" autoComplete="organization" className={field} placeholder="e.g. A&R, Label name" />
      </div>
      <div>
        <label htmlFor="inquiry" className={label}>Inquiry</label>
        <select id="inquiry" name="inquiry" required defaultValue="" className={field}>
          <option value="" disabled>Choose one</option>
          {inquiries.map((i) => <option key={i.title}>{i.title}</option>)}
          <option>Demo request</option>
          <option>Something else</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className={label}>Message</label>
        <textarea id="message" name="message" required rows={6} className={field} placeholder="Tell me about the project, the artist or the song you're interested in." />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="links" className={label}>Links <span className="text-cream/40">(optional)</span></label>
        <input id="links" name="links" className={field} placeholder="Portfolio, artist page, Spotify, etc." />
      </div>
      {/* Spam honeypot */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <input type="hidden" name="_subject" value="New inquiry from makebashangwe website" />

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={!configured || status === 'sending'}
          className="rounded-[2px] bg-gold px-7 py-3.5 text-[0.95rem] font-medium text-charcoal transition-colors hover:bg-cream disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
        <p aria-live="polite" className="text-sm text-cream/55">
          {status === 'error' && <span className="text-[#e8a48a]">Something went wrong. Please try again in a moment.</span>}
          {!configured && 'The contact form is not connected yet. Set VITE_FORMSPREE_ID to turn it on.'}
        </p>
      </div>
    </form>
  );
}

export default function Contact() {
  useSeo('Collaborate', 'Contact songwriter Makeba Shangwe about songwriting placements, publishing, producer and vocalist collaborations, A&R opportunities and creative partnerships.', '/contact');

  return (
    <>
      <PageHero
        title="Let's make the record"
        intro={<p>For placements, publishing, collaborations, A&R and creative partnerships. Tell me what you're working on.</p>}
        image="/images/hero-942.webp"
        imageAlt="Makeba Shangwe in a recording studio"
        position="50% 20%"
      />

      <section className="bg-charcoal py-24 sm:py-28">
        <Container className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <div>
            <h2 className="text-3xl text-cream">What I'm open to</h2>
            <ul className="mt-6 divide-y divide-cream/10 border-y border-cream/10">
              {inquiries.map((i) => (
                <li key={i.title} className="py-5">
                  <h3 className="text-xl text-cream">{i.title}</h3>
                  <p className="mt-1 text-sm text-cream/55">{i.body}</p>
                </li>
              ))}
            </ul>
            {site.email && (
              <p className="mt-8 text-cream/60">
                Prefer email? <a href={`mailto:${site.email}`} className="text-gold underline-offset-4 hover:underline">{site.email}</a>
              </p>
            )}
          </div>
          <div>
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
