import AudioCard from '../components/AudioCard';
import Reveal from '../components/Reveal';
import { ButtonLink, Container, PageHero, SpotifyButton, AppleMusicButton } from '../components/ui';
import VideoCard from '../components/VideoCard';
import { earlierWork } from '../data/earlierWork';
import { site } from '../data/site';
import { songs, type SongStatus } from '../data/songs';
import { useSeo } from '../lib/useSeo';

const groups: { status: SongStatus; title: string; blurb: string }[] = [
  { status: 'Complete demo', title: 'Complete demos', blurb: 'Fully written and arranged, ready for a producer, vocalist or artist to take the rest of the way.' },
  { status: 'Work in progress', title: 'In progress', blurb: 'Songs still being written.' },
];

export default function Portfolio() {
  useSeo('Songwriting Portfolio', 'Listen to original compositions by songwriter Makeba Shangwe: 45-second previews, songwriting credits and demo status. Full demos available on request.', '/songwriting');

  return (
    <>
      <PageHero
        eyebrow="Songwriting portfolio"
        title={<>The <em className="text-gold">catalogue.</em></>}
        intro={
          <>
            <p>
              Every song here is an original work that I wrote and arranged: lyrics, melodies, harmonies, rhythms and arrangements. Most are produced by me too; each card lists the full credits. Each card plays a
              short preview.
            </p>
            <p className="mt-4 text-base text-cream/55">Full-length demos are available to publishers, A&R, artists and their teams on request.</p>
          </>
        }
        image="/images/process-1122.webp"
        imageAlt="Makeba writing notes at a keyboard in the studio"
        position="40% 50%"
      />

      {groups.map((g) => {
        const list = songs.filter((s) => s.status === g.status);
        if (!list.length) return null;
        return (
          <section key={g.status} className="bg-charcoal py-20 sm:py-24">
            <Container>
              <Reveal className="flex flex-col gap-3 border-b border-cream/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="font-serif text-4xl text-cream">{g.title}</h2>
                  <p className="mt-2 text-cream/60">{g.blurb}</p>
                </div>
                <p className="text-sm tabular-nums text-cream/40">{list.length} {list.length === 1 ? 'song' : 'songs'}</p>
              </Reveal>
              <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {list.map((s, i) => (
                  <Reveal key={s.slug} delay={(i % 3) * 100}>
                    <AudioCard song={s} index={songs.indexOf(s)} />
                  </Reveal>
                ))}
              </div>
            </Container>
          </section>
        );
      })}

      <section className="bg-forest py-20">
        <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="eyebrow">Zero Gravity · Streaming now</p>
            <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight text-cream">Hear the rest of my published demos.</h2>
            <p className="mt-3 text-cream/65">The album of published demos is streaming on Spotify and Apple Music.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <SpotifyButton href={site.spotify} />
            <AppleMusicButton href={site.appleMusic} />
          </div>
        </Container>
      </section>

      <section className="bg-espresso py-24">
        <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="eyebrow">For industry professionals</p>
            <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight text-cream">Need a full demo or want to put a song on hold?</h2>
          </div>
          <ButtonLink to="/contact">Request a demo</ButtonLink>
        </Container>
      </section>

      <section className="border-t border-cream/10 bg-charcoal py-20">
        <Container>
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Archive</p>
            <h2 className="mt-4 font-serif text-3xl text-cream">Earlier work</h2>
            <p className="mt-3 text-cream/55">Older published pieces, including theatre writing and live performance.</p>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:max-w-4xl">
            {earlierWork.map((w, i) => (
              <Reveal key={w.youtubeId} delay={i * 100}>
                <VideoCard work={w} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
