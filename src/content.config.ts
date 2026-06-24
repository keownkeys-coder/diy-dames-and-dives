// Import the glob loader
import { glob } from "astro/loaders";
// Import utilities from `astro:content`
import { defineCollection } from "astro:content";
// Import Zod
import { z } from "astro/zod";
// Define a `loader` and `schema` for each collection
const blog = defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: "./src/blog" }),
    schema: z.object({
      title: z.string(),
      pubDate: z.coerce.date(),
      description: z.string(),
      author: z.string(),
      image: z.object({
        url: z.string(),
        alt: z.string()
      }).optional(),
      tags: z.array(z.string()),
      updatedDate: z.coerce.date().optional(),
    })
});
// Export a single `collections` object to register your collection(s)
//export const collections = { blog };

//collection for gallery?
const photos = defineCollection({
  loader: glob({ pattern: '**/[^_]*.jpg', base: "./src/gallery/photos/"}),
//  type:"data",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      cover: image(),
    }),
});

const drawings = defineCollection({
  loader: glob({ pattern: '**/[^_]*.jpg', base: "./src/gallery/drawings/"}),
//  type:"data",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      cover: image(),
    }),
});

export const collections = { photos, blog, drawings };