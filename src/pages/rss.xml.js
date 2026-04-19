//import rss, { pagesGlobToRssItems } from '@astrojs/rss'; noon colleciton based
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content'; //collection based
export async function GET(context) {
  const posts = await getCollection("blog");

  return rss({
    title: 'diy dames and dives | blog',
    description: 'i am literally blogging now -Linette Keown-Keys',
    site: context.site,
    items: posts.map((post) =>({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/posts/${post.id}/`,
    })),
//    items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')), //non collection based
    customData: `<language>en-us</language>`,
  });
}
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://diy-dames-and-dives.netlify.app/"
});