import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function GET(context) {
  return rss({
    title: 'diy dames and dives | blog',
    description: 'i am literally blogging now -Linette Keown-Keys',
    site: context.site,
    items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')),
    customData: `<language>en-us</language>`,
  });
}
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://diy-dames-and-dives.netlify.app/"
});