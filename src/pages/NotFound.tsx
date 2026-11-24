import { ButtonLink, Container } from '../components/ui';
import { useSeo } from '../lib/useSeo';

export default function NotFound() {
  useSeo('Page not found', 'This page could not be found.', '/404');
  return (
    <section className="flex min-h-[80vh] items-center bg-charcoal pt-20">
      <Container>
        <p className="eyebrow">404</p>
        <h1 className="mt-5 font-serif text-6xl text-cream">This track isn't on the record.</h1>
        <div className="mt-10"><ButtonLink to="/">Back home</ButtonLink></div>
      </Container>
    </section>
  );
}
