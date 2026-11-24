import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Track from '../components/Track';
import { ButtonLink, Container, StreamLinks } from '../components/ui';
import { site } from '../data/site';
import { songs } from '../data/songs';
import { useSeo } from '../lib/useSeo';

const lookingFor = [
  { who: 'Vocalists', what: 'to bring finished demos to full, release-ready performances.' },
  { who: 'Producers', what: 'who can take a complete composition and make it commercially competitive.' },
  { who: 'Engineers', what: 'to mix and master records to industry standard.' },
  { who: 'Artists and managers', what: 'looking for original songs that fit their sound.' },
  { who: 'Publishers and A&R', what: 'looking for placements and new writers.' },
];

export default function Home() {
  useSeo('', 'Makeba Shangwe is an independent songwriter, developing producer and aspiring A&R professional. Listen to original compositions and get in touch about placements and collaboration.', '/');
  const featured = songs.filter((s) => s.featured).slice(0, 3);

  useEffect(() => {
    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: site.name,
      jobTitle: 'Songwriter',
      url: site.url,
      image: site.url + '/images/headshot-768.webp',
      description: 'Independent songwriter, developing producer and aspiring A&R professional.',
      sameAs: site.socials.map((s) => s.href),
    });
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  return (
    <>
      {/* Hero: text left, photo right with a hard edge */}
      <section className="bg-charcoal pt-20 lg:pt-0">
        <div className="mx-auto grid max-w-[90rem] lg:min-h-[100svh] lg:grid-cols-[1fr_minmax(0,40rem)]">
          <div className="order-2 flex flex-col justify-end px-6 pb-16 pt-10 sm:px-10 lg:order-1 lg:pb-24 lg:pl-[max(2.5rem,calc((100vw-72rem)/2))] lg:pt-40">
            <h1 className="settle max-w-[13ch] text-[3.25rem] font-semibold leading-[0.98] text-cream sm:text-7xl xl:text-[6.25rem]">
              Every world begins with a song.
            </h1>
            <p className="settle mt-8 max-w-md text-lg text-cream/70" style={{ animationDelay: '150ms' }}>
              Makeba Shangwe <span className="text-gold">|</span> Songwriter • Creative Producer • Artist Development
            </p>
            <div className="settle mt-10 flex flex-wrap items-center gap-x-8 gap-y-4" style={{ animationDelay: '300ms' }}>
              <ButtonLink to="/songwriting">Listen to the songs</ButtonLink>
              <ButtonLink to="/contact" variant="outline">Get in touch</ButtonLink>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <img
              src="/images/hero-942.webp"
              srcSet="/images/hero-600.webp 600w, /images/hero-942.webp 942w"
              sizes="(min-width: 1024px) 40rem, 100vw"
              alt="Makeba Shangwe in a warm-lit recording studio"
              className="aspect-[4/5] w-full object-cover object-[50%_20%] lg:aspect-auto lg:h-full"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      {/* Featured songs */}
      <section className="bg-charcoal py-24 sm:py-32">
        <Container>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <h2 className="text-4xl text-cream sm:text-5xl">Start here</h2>
            <p className="max-w-sm text-cream/60">Short previews of complete demos. Full demos are available to industry professionals on request.</p>
          </div>
          <ol className="mt-10 border-b border-cream/12">
            {featured.map((s) => (
              <Track key={s.slug} song={s} number={songs.indexOf(s) + 1} />
            ))}
          </ol>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link to="/songwriting" className="text-cream underline decoration-gold/60 underline-offset-[6px] hover:decoration-gold">
              All {songs.length} songs
            </Link>
            <div className="flex flex-wrap items-center gap-x-6 text-cream/60">
              <span>More published demos on</span>
              <StreamLinks />
            </div>
          </div>
        </Container>
      </section>

      {/* Intro */}
      <section className="bg-cream py-24 text-charcoal sm:py-32">
        <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-20">
          <img
            src="/images/notes-1122.webp"
            srcSet="/images/notes-600.webp 600w, /images/notes-1122.webp 1122w"
            sizes="(min-width: 1024px) 26rem, 100vw"
            alt="Makeba writing lyrics in a notebook, with a keyboard, guitar and headphones nearby"
            loading="lazy"
            className="aspect-[4/5] w-full object-cover"
          />
          <div className="max-w-xl">
            <h2 className="text-4xl leading-[1.1] sm:text-5xl">I write the whole song.</h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-charcoal/80">
              <p>
                Lyrics, melody, harmony, rhythm and the instrumental arrangement. Each song leaves my notebook as a complete demo, ready for
                the right voice and the right production.
              </p>
              <p>
                I'm building a career as a songwriter, and growing into artist development and A&R: finding the song that fits the artist,
                and helping a project find its sound.
              </p>
            </div>
            <div className="mt-8">
              <ButtonLink to="/about" variant="dark">About me</ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Who I'm looking for */}
      <section className="bg-forest py-24 sm:py-32">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <h2 className="text-4xl leading-[1.1] text-cream sm:text-5xl">The songs are written. Now I need the people who make records.</h2>
            <div className="mt-8">
              <ButtonLink to="/contact">Start a conversation</ButtonLink>
            </div>
          </div>
          <dl className="divide-y divide-cream/15 border-y border-cream/15">
            {lookingFor.map((l) => (
              <div key={l.who} className="py-5">
                <dt className="font-serif text-2xl text-cream">{l.who}</dt>
                <dd className="mt-1 text-cream/65">{l.what}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Closing */}
      <section className="bg-charcoal py-28 sm:py-36">
        <Container>
          <h2 className="max-w-3xl text-5xl leading-[1.05] text-cream sm:text-6xl">Have an artist who needs the right song?</h2>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ButtonLink to="/contact">Get in touch</ButtonLink>
            <ButtonLink to="/songwriting" variant="outline">Hear the catalogue</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
