import { useEffect } from 'react';
import AudioCard from '../components/AudioCard';
import Reveal from '../components/Reveal';
import { ButtonLink, Container, SectionHeading, SpotifyButton, AppleMusicButton } from '../components/ui';
import { site } from '../data/site';
import { songs } from '../data/songs';
import { useSeo } from '../lib/useSeo';

const lookingFor = [
  { title: 'Vocalists', body: 'Professional singers to bring finished demos to full, release-ready performances.' },
  { title: 'Producers', body: 'Producers who can take a complete composition and make it commercially competitive.' },
  { title: 'Engineers', body: 'Mix and mastering engineers to finish records to industry standard.' },
  { title: 'Artists & managers', body: 'Recording artists looking for original songs that fit their sound.' },
  { title: 'Publishers & A&R', body: 'Publishing and A&R teams looking for placements and new writers.' },
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
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-charcoal">
        <div className="absolute inset-x-0 top-0 h-[62%] overflow-hidden sm:h-[70%] lg:inset-y-0 lg:left-auto lg:right-0 lg:h-full lg:w-[52%]">
          <img
            src="/images/hero-942.webp"
            srcSet="/images/hero-600.webp 600w, /images/hero-942.webp 942w"
            sizes="(min-width: 1024px) 52vw, 100vw"
            alt="Makeba Shangwe in a warm-lit recording studio"
            className="hero-zoom size-full object-cover object-[50%_20%]"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-charcoal/30 lg:bg-gradient-to-r lg:from-charcoal lg:via-charcoal/40 lg:to-transparent" />
        </div>
        <Container className="relative pb-16 pt-40 sm:pb-28">
          <div className="max-w-3xl">
            <p className="eyebrow fade-up">Songwriter · Creative Producer · Artist Development</p>
            <h1 className="fade-up mt-6 font-serif text-[2.9rem] leading-[0.98] tracking-tight text-cream sm:text-8xl" style={{ animationDelay: '120ms' }}>
              Every world begins <em className="font-light text-gold">with a song.</em>
            </h1>
            <p className="fade-up mt-8 max-w-xl text-lg text-cream/75" style={{ animationDelay: '260ms' }}>
              Makeba Shangwe <span className="text-gold">|</span> Songwriter • Creative Producer • Artist Development
            </p>
            <div className="fade-up mt-10 flex flex-wrap gap-4" style={{ animationDelay: '380ms' }}>
              <ButtonLink to="/songwriting">Listen to the songs</ButtonLink>
              <ButtonLink to="/contact" variant="outline">Collaborate</ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Intro */}
      <section className="bg-cream py-24 text-charcoal sm:py-32">
        <Container className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="Introduction" title={<>Complete songs, written from the <em className="text-espresso">first line to the last chord.</em></>} light>
              <p>
                I write original music: lyrics, melodies, harmonies, rhythms and instrumental arrangements. My catalogue of demos is ready to
                grow. I'm looking for vocalists, producers and engineers to turn these songs into competitive records, and for artists ready
                for their next placement.
              </p>
              <p className="mt-5">
                Alongside songwriting, I'm growing into artist development and A&R.
                {site.showStudios && " I'm also building Shangwe Studios, a home for original music, characters and the worlds they live in."}
              </p>
            </SectionHeading>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink to="/about" variant="dark">Read my story</ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <img
              src="/images/notes-1122.webp"
              srcSet="/images/notes-600.webp 600w, /images/notes-1122.webp 1122w"
              sizes="(min-width: 1024px) 40vw, 100vw"
              alt="Makeba writing lyrics in a notebook, surrounded by a keyboard, guitar and headphones"
              loading="lazy"
              className="aspect-[4/5] w-full rounded-sm object-cover shadow-2xl shadow-espresso/30"
            />
          </Reveal>
        </Container>
      </section>

      {/* Featured compositions */}
      <section className="bg-charcoal py-24 sm:py-32">
        <Container>
          <Reveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading eyebrow="Featured compositions" title="Press play.">
              <p>Short previews of complete demos. More published demos are streaming on Spotify and Apple Music, and full demos are available to industry professionals on request.</p>
            </SectionHeading>
            <div className="flex flex-wrap gap-4">
              <ButtonLink to="/songwriting" variant="outline">Full catalogue</ButtonLink>
              <SpotifyButton href={site.spotify} label="Spotify" />
              <AppleMusicButton href={site.appleMusic} label="Apple Music" />
            </div>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {featured.map((s, i) => (
              <Reveal key={s.slug} delay={i * 120}>
                <AudioCard song={s} index={i} compact />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Looking for */}
      <section className="bg-espresso py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Open to collaboration" title="The songs are written. Let's make the records.">
              <p>I'm not looking for someone to write with me from scratch. I'm looking for the people who take great songs the rest of the way.</p>
            </SectionHeading>
          </Reveal>
          <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-cream/10 bg-cream/10 sm:grid-cols-2 lg:grid-cols-5">
            {lookingFor.map((l, i) => (
              <Reveal key={l.title} delay={i * 80} className="bg-espresso p-7">
                <p className="font-serif text-sm text-gold">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-4 font-serif text-2xl text-cream">{l.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/65">{l.body}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-12"><ButtonLink to="/contact">Start a conversation</ButtonLink></div>
        </Container>
      </section>

      {/* Studios preview */}
      {site.showStudios && (
      <section className="relative overflow-hidden bg-forest">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[420px] lg:min-h-[680px]">
            <img
              src="/images/piano-1122.webp"
              srcSet="/images/piano-600.webp 600w, /images/piano-1122.webp 1122w"
              sizes="(min-width: 1024px) 50vw, 100vw"
              alt="Makeba seated at a grand piano in a dim studio"
              loading="lazy"
              className="absolute inset-0 size-full object-cover object-[50%_25%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/80 to-transparent lg:bg-gradient-to-l lg:from-forest lg:via-transparent" />
          </div>
          <Container className="flex items-center py-20 lg:py-28 lg:pl-16">
            <Reveal>
              <p className="eyebrow">Shangwe Studios</p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.08] text-cream sm:text-5xl">Songs that open into <em className="text-gold">whole worlds.</em></h2>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-cream/70">
                Shangwe Studios is my growing creative venture. It brings together original music, fictional and virtual artists, music videos,
                animation and storytelling, all part of connected creative worlds.
              </p>
              <p className="mt-4 text-sm text-cream/50">Currently in development.</p>
              <div className="mt-10"><ButtonLink to="/studios" variant="outline">Explore the vision</ButtonLink></div>
            </Reveal>
          </Container>
        </div>
      </section>
      )}

      {/* Closing CTA */}
      <section className="bg-charcoal py-28 text-center sm:py-36">
        <Container>
          <Reveal>
            <p className="eyebrow">Placements · Publishing · Collaboration</p>
            <h2 className="mx-auto mt-6 max-w-3xl font-serif text-5xl leading-[1.05] text-cream sm:text-6xl">Have an artist who needs the right song?</h2>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <ButtonLink to="/contact">Get in touch</ButtonLink>
              <ButtonLink to="/songwriting" variant="outline">Hear the catalogue</ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
