import Track from '../components/Track';
import VideoCard from '../components/VideoCard';
import { ButtonLink, Container, PageHero, StreamLinks } from '../components/ui';
import { earlierWork } from '../data/earlierWork';
import { songs } from '../data/songs';
import { useSeo } from '../lib/useSeo';

export default function Portfolio() {
  useSeo('Songwriting Portfolio', 'Listen to original compositions by songwriter Makeba Shangwe: short previews of complete demos, with full songwriting credits. Full demos available on request.', '/songwriting');

  return (
    <>
      <PageHero
        title="The catalogue"
        intro={
          <>
            <p>
              {songs.length} complete demos. I wrote and arranged every one: lyrics, melodies, harmonies, rhythms and arrangements. Most are
              produced by me too, and each song lists its full credits.
            </p>
            <p className="mt-4 text-base text-cream/55">
              Each song plays a short preview. Full-length demos are available to publishers, A&R, artists and their teams on request.
            </p>
          </>
        }
        image="/images/process-1048.webp"
        imageAlt="Makeba writing in a notebook beside a keyboard"
        position="40% 60%"
      />

      <section className="bg-charcoal pb-24">
        <Container>
          <ol className="border-b border-cream/12">
            {songs.map((s, i) => (
              <Track key={s.slug} song={s} number={i + 1} />
            ))}
          </ol>
          <p className="mt-6 max-w-2xl text-sm text-cream/45">
            All songs © Makeba Shangwe. All rights reserved. On Narnia and Levitatin', the copyright covers the lyrics, composition and
            vocals; the instrumentals were produced by others.
          </p>
        </Container>
      </section>

      <section className="bg-forest py-20">
        <Container className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <h2 className="text-4xl leading-tight text-cream">Zero Gravity</h2>
            <p className="mt-3 max-w-xl text-cream/70">My album of published demos, streaming now.</p>
          </div>
          <StreamLinks className="text-lg" />
        </Container>
      </section>

      <section className="bg-espresso py-20">
        <Container className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <h2 className="max-w-2xl text-4xl leading-tight text-cream">Want the full demo, or to put a song on hold?</h2>
          <div><ButtonLink to="/contact">Request a demo</ButtonLink></div>
        </Container>
      </section>

      <section className="bg-charcoal py-20">
        <Container>
          <h2 className="text-3xl text-cream">Earlier work</h2>
          <p className="mt-3 max-w-xl text-cream/55">Older published pieces: theatre writing and a live performance.</p>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:max-w-4xl">
            {earlierWork.map((w) => (
              <VideoCard key={w.youtubeId} work={w} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
