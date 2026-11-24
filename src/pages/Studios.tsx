import Reveal from '../components/Reveal';
import { ButtonLink, Container, PageHero, SectionHeading } from '../components/ui';
import { pillars, projects, type ProjectStatus } from '../data/studios';
import { useSeo } from '../lib/useSeo';

const statusStyle: Record<ProjectStatus, string> = {
  Concept: 'border-cream/30 text-cream/70',
  'In development': 'border-gold/60 text-gold',
  Released: 'border-gold bg-gold text-charcoal',
};

function StatusTag({ status }: { status: ProjectStatus }) {
  return <span className={`inline-block rounded-full border px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] ${statusStyle[status]}`}>{status}</span>;
}

export default function Studios() {
  useSeo('Shangwe Studios', 'Shangwe Studios is the creative venture of songwriter Makeba Shangwe: original music, fictional and virtual artists, music videos, animation and connected storytelling worlds.', '/studios');

  return (
    <>
      <PageHero
        eyebrow="Shangwe Studios"
        title={<>Where songs become <em className="text-gold">worlds.</em></>}
        intro={
          <p>
            Shangwe Studios is my emerging creative venture. It is built on the idea that a song can be the opening scene of something larger:
            a character, an artist, a story or a whole world.
          </p>
        }
        image="/images/piano-1122.webp"
        imageAlt="Makeba at a grand piano in a warm, dim studio"
        position="50% 20%"
      />

      <section className="bg-charcoal py-24 sm:py-32">
        <Container>
          <Reveal className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="The vision" title="Six threads, one universe.">
              <p>These are the areas the studio is built around. Each is marked with where it stands today.</p>
            </SectionHeading>
            <div className="flex flex-wrap items-center gap-3 text-sm text-cream/50" aria-label="Status key">
              <StatusTag status="Concept" /> <StatusTag status="In development" /> <StatusTag status="Released" />
            </div>
          </Reveal>
          <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-cream/10 bg-cream/10 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 90} className="flex flex-col gap-4 bg-charcoal p-8 sm:p-10">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-sm text-gold">{String(i + 1).padStart(2, '0')}</span>
                  <StatusTag status="Concept" />
                </div>
                <h3 className="font-serif text-3xl text-cream">{p.title}</h3>
                <p className="leading-relaxed text-cream/65">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-espresso py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Projects" title="From the studio." />
          </Reveal>
          {projects.length === 0 ? (
            <Reveal className="mt-12 rounded-sm border border-dashed border-cream/20 p-10 text-center sm:p-16">
              <p className="font-serif text-3xl text-cream">The first projects are in development.</p>
              <p className="mx-auto mt-4 max-w-xl text-cream/60">
                Characters, artists and visual work will appear here as they're ready. Each will be clearly marked as a concept, in development or
                released.
              </p>
            </Reveal>
          ) : (
            <div className="mt-14 grid gap-8 md:grid-cols-2">
              {projects.map((p, i) => (
                <Reveal key={p.title} delay={(i % 2) * 120}>
                  <article className="overflow-hidden rounded-sm border border-cream/10 bg-charcoal/40">
                    {p.image && <img src={p.image} alt="" loading="lazy" className="aspect-video w-full object-cover" />}
                    <div className="p-7">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-cream/50">{p.kind}</p>
                        <StatusTag status={p.status} />
                      </div>
                      <h3 className="mt-4 font-serif text-3xl text-cream">{p.title}</h3>
                      <p className="mt-3 leading-relaxed text-cream/65">{p.description}</p>
                      {p.link && (
                        <a href={p.link.href} target="_blank" rel="noreferrer" className="mt-5 inline-block text-gold underline-offset-4 hover:underline">
                          {p.link.label} ↗
                        </a>
                      )}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="bg-forest py-24 text-center sm:py-28">
        <Container>
          <Reveal>
            <p className="eyebrow">Creative partners</p>
            <h2 className="mx-auto mt-5 max-w-3xl font-serif text-4xl leading-tight text-cream sm:text-5xl">
              Animators, directors, visual artists and storytellers: let's build something together.
            </h2>
            <div className="mt-10 flex justify-center"><ButtonLink to="/contact">Propose a partnership</ButtonLink></div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
