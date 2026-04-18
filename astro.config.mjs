// @ts-check
import { defineConfig } from 'astro/config';

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: "https://diy-dames-and-dives.netlify.app/",
  integrations: [preact()]
});