import Reveal from '../components/Reveal';
import { ButtonLink, Container, PageHero, SectionHeading } from '../components/ui';
import { site } from '../data/site';
import { useSeo } from '../lib/useSeo';

const process = [
  { title: 'The idea', body: 'A phrase, a feeling or a story, caught in the notebook before it disappears.' },
  { title: 'Melody & lyric', body: 'Shaping the top line and the words together so each one carries the other.' },
  { title: 'Harmony & rhythm', body: 'Building the chords and groove that give the song its emotional weight.' },
  { title: 'Arrangement & demo', body: 'Arranging the instruments and recording a demo that shows what the song can become.' },
];

const allAmbitions = [
  { title: 'Songwriting placements', body: 'Placing original songs with recording artists whose sound and story they fit.' },
  { title: 'Publishing', body: 'Building a professional songwriting career with a catalogue that keeps growing.' },
  { title: 'A&R & artist development', body: 'Helping artists find their sound, the right songs and a clear creative identity.' },
  { title: 'Shangwe Studios', body: 'Growing a creative venture where music, characters and stories share one world.' },
];
const ambitions = allAmbitions.filter((a) => site.showStudios || a.title !== 'Shangwe Studios');

export default function About() {
  useSeo('About', 'Makeba Shangwe is an independent songwriter and developing producer growing into A&R and artist development.', '/about');

  return (
    <>
      <PageHero
        eyebrow="About Makeba"
        title={<>A songwriter with an <em className="text-gold">ear for artists.</em></>}
        intro={<p>Independent songwriter, developing producer and aspiring A&R professional{site.showStudios && ', and founder of Shangwe Studios'}.</p>}
        image="/images/portrait-700.webp"
        imageAlt="Portrait of Makeba Shangwe in a black blazer and gold-rimmed glasses"
        position="50% 25%"
      />

      <section className="bg-cream py-24 text-charcoal sm:py-32">
        <Container className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <Reveal>
            <img
              src="/images/headshot-768.webp"
              srcSet="/images/headshot-768.webp 768w, /images/headshot-1536.webp 1536w"
              sizes="(min-width: 1024px) 35vw, 100vw"
              alt="Headshot of Makeba Shangwe"
              loading="lazy"
              className="aspect-[4/5] w-full rounded-sm object-cover object-[50%_30%]"
            />
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">Biography</p>
            <div className="mt-6 space-y-6 text-lg leading-relaxed text-charcoal/80">
              <p className="font-serif text-3xl leading-snug text-charcoal">
                Makeba Shangwe writes complete songs. She writes the lyrics, melodies, harmonies, rhythms and instrumental arrangements herself, and produces her own demos.
              </p>
              <p>
                She is an independent songwriter and developing producer with a growing catalogue of original demos. Every song starts in her
                notebook and is built through to a full arrangement. She shapes the idea and the emotion as well as the structure that makes a
                song land.
              </p>
              <p>
                Her focus now is taking those songs further. She is looking for professional vocalists, producers and engineers to develop her
                demos into commercially competitive recordings, and for artists and teams looking for the right song for their next release.
              </p>
              <p>
                Alongside her writing, Makeba is growing into A&R and artist development. She is drawn to the space where a song meets an artist,
                and to helping a project find its sound and identity.
                {site.showStudios && ' That same instinct drives Shangwe Studios, her creative venture built around original music, characters and storytelling.'}
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-charcoal py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Creative process" title="From a notebook to a finished demo." />
          </Reveal>
          <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <ol className="space-y-10">
              {process.map((p, i) => (
                <Reveal key={p.title} delay={i * 90}>
                  <li className="flex gap-6 border-t border-cream/10 pt-6">
                    <span className="font-serif text-3xl text-gold">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className="font-serif text-2xl text-cream">{p.title}</h3>
                      <p className="mt-2 leading-relaxed text-cream/65">{p.body}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
            <Reveal delay={150}>
              <img
                src="/images/process-1122.webp"
                srcSet="/images/process-600.webp 600w, /images/process-1122.webp 1122w"
                sizes="(min-width: 1024px) 45vw, 100vw"
                alt="Makeba writing notation in a notebook beside a keyboard"
                loading="lazy"
                className="h-full min-h-[360px] w-full rounded-sm object-cover"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-forest py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Where I'm headed" title="Career focus" />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {ambitions.map((a, i) => (
              <Reveal key={a.title} delay={i * 90} className="rounded-sm border border-cream/15 p-7">
                <h3 className="font-serif text-2xl text-cream">{a.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/65">{a.body}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-14 flex flex-wrap gap-4">
            <ButtonLink to="/songwriting">Listen to the catalogue</ButtonLink>
            <ButtonLink to="/contact" variant="outline">Work with me</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
