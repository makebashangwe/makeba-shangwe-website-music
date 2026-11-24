import { useEffect } from 'react';
import { site } from '../data/site';

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = value;
}

/** Sets per-page title, description, Open Graph tags and canonical URL. */
export function useSeo(title: string, description: string, path: string) {
  useEffect(() => {
    const full = title ? `${title} | ${site.name}` : `${site.name} | ${site.roles.join(' • ')}`;
    document.title = full;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', full);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', site.url + path);
    setMeta('property', 'og:image', site.url + '/images/og.jpg');
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = site.url + path;
  }, [title, description, path]);
}
