import dotenv from "dotenv";
dotenv.config();
import { Client } from "@notionhq/client";
import { NotionConverter } from 'notion-to-md';
import { DefaultExporter } from 'notion-to-md/plugins/exporter';
import { MDXRenderer } from 'notion-to-md/plugins/renderer';
import * as path from 'path';


const notion = new Client({ auth: process.env.NOTION_API_TOKEN });


// below function is for a single page
async function convertAndSavePage() {
  try {
    const pageId = process.env.NOTION_TEST_ID; //just write out the env key yaay
//    const databaseId = (process.env.NOTION_BLOG_ID);
    const outputDir = './src/blog'; // Define where to save the file
    const mediaDir = path.join(outputDir, 'media'); // For downloaded media
    // Configure the DefaultExporter to save to a file
    const exporter = new DefaultExporter({
      outputType: 'file',
      outputPath: path.join(outputDir, `${pageId}.md`),
    });

    // Create the converter and attach the exporter
    const n2m = new NotionConverter(notion)
//    .withPageReferences({
//      UrlPropertyNameNotion: 'url', // The name of your Notion property (required)
//    })
    .withRenderer(
      new MDXRenderer({
        frontmatter: {
          exclude: ['Status','Publish','Published'],
          rename: {CreatedTime: 'dateStarted'},
          
          },
        
      })
    ) // add frontmatter to .md file
    .withExporter(
      exporter
    ) // Configure media downloading
    .downloadMediaTo({
        outputDir: mediaDir,
        // Update the links in markdown to point to the local media path
        transformPath: (localPath) => `/media/${path.basename(localPath)}`,
      })
    ;

    // Convert the page (the exporter handles saving)
    await n2m.convert(pageId);

    console.log(
      `✓ Successfully converted page and saved to ${outputDir}/${pageId}.md`,
    );
    console.log(`✓ Downloaded media to ${mediaDir}`);
  } catch (error) {
    console.error('Conversion failed:', error);
  }
}

convertAndSavePage();