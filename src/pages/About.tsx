import { ButtonLink, Container, PageHero } from '../components/ui';
import { site } from '../data/site';
import { useSeo } from '../lib/useSeo';

const process = [
  { title: 'Notebook', body: 'Most songs start as a line or a melody written down by hand.' },
  { title: 'Top line and lyric', body: 'I shape the melody and the words together until each one carries the other.' },
  { title: 'Harmony and rhythm', body: 'Chords and groove come next, to set how the song should feel.' },
  { title: 'Arrangement and demo', body: 'I arrange the instruments and record a demo that shows what the song can become.' },
];

const allFocus = [
  { title: 'Songwriting placements', body: 'Placing original songs with artists whose sound and story they fit.' },
  { title: 'Publishing', body: 'Building a professional songwriting career and a catalogue that keeps growing.' },
  { title: 'A&R and artist development', body: 'Helping artists find their sound, the right songs and a clear identity.' },
  { title: 'Shangwe Studios', body: 'A creative venture where music, characters and stories share one world.' },
];
const focus = allFocus.filter((a) => site.showStudios || a.title !== 'Shangwe Studios');

export default function About() {
  useSeo('About', 'Makeba Shangwe is an independent songwriter and developing producer growing into A&R and artist development.', '/about');

  return (
    <>
      <PageHero
        title="About Makeba"
        intro={<p>Independent songwriter, developing producer and aspiring A&R professional{site.showStudios && ', and founder of Shangwe Studios'}.</p>}
      />

      <section className="bg-cream py-24 text-charcoal sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-20">
          <img
            src="/images/headshot-768.webp"
            srcSet="/images/headshot-768.webp 768w, /images/headshot-1536.webp 1536w"
            sizes="(min-width: 1024px) 24rem, 100vw"
            alt="Headshot of Makeba Shangwe in a black blazer and gold-rimmed glasses"
            className="aspect-[4/5] w-full object-cover object-[50%_30%]"
          />
          <div className="max-w-[38rem] space-y-6 text-lg leading-[1.7] text-charcoal/80">
            <p className="font-serif text-3xl leading-snug text-charcoal">
              Makeba Shangwe writes complete songs. She writes the lyrics, melodies, harmonies, rhythms and instrumental arrangements herself,
              and produces her own demos.
            </p>
            <p>
              She is an independent songwriter and developing producer with a growing catalogue of original demos. Every song starts in her
              notebook and is built through to a full arrangement.
            </p>
            <p>
              Her focus now is taking those songs further. She is looking for professional vocalists, producers and engineers to develop her
              demos into commercially competitive recordings, and for artists and teams looking for the right song for their next release.
            </p>
            <p>
              Alongside her writing, Makeba is growing into A&R and artist development. She is drawn to the point where a song meets an
              artist, and to helping a project find its sound and identity.
              {site.showStudios && ' That same instinct drives Shangwe Studios, her creative venture built around original music, characters and storytelling.'}
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-charcoal py-24 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_minmax(0,28rem)] lg:gap-20">
          <div>
            <h2 className="text-4xl text-cream sm:text-5xl">How a song gets made</h2>
            <ol className="mt-10 space-y-8">
              {process.map((p, i) => (
                <li key={p.title} className="grid grid-cols-[2rem_1fr] gap-4">
                  <span className="font-serif text-2xl text-gold">{i + 1}</span>
                  <div>
                    <h3 className="text-2xl text-cream">{p.title}</h3>
                    <p className="mt-1 max-w-md text-cream/65">{p.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <img
            src="/images/process-1048.webp"
            srcSet="/images/process-600.webp 600w, /images/process-1048.webp 1048w"
            sizes="(min-width: 1024px) 28rem, 100vw"
            alt="Makeba writing in a notebook beside a keyboard"
            loading="lazy"
            className="aspect-[4/5] w-full object-cover"
          />
        </Container>
      </section>

      <section className="bg-forest py-24 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <h2 className="text-4xl text-cream sm:text-5xl">What I'm working towards</h2>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <ButtonLink to="/songwriting">Listen to the catalogue</ButtonLink>
              <ButtonLink to="/contact" variant="outline">Work with me</ButtonLink>
            </div>
          </div>
          <dl className="divide-y divide-cream/15 border-y border-cream/15">
            {focus.map((a) => (
              <div key={a.title} className="py-5">
                <dt className="font-serif text-2xl text-cream">{a.title}</dt>
                <dd className="mt-1 text-cream/65">{a.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>
    </>
  );
}
