// scripts/add-reading-time.js
const fs = require('fs').promises;
const path = require('path');
const readingTime = require('reading-time');
const matter = require('gray-matter');

const postsDir = path.join(__dirname, '../pages/posts');

async function addReadingTime() {
  const files = await fs.readdir(postsDir);
  const mdxFiles = files.filter((file) => file.endsWith('.mdx') || file.endsWith('.md'));

  for (const file of mdxFiles) {
    const filePath = path.join(postsDir, file);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const { content, data } = matter(fileContent);

    const stats = readingTime(content);
    data.readingTime = stats.text;

    const updatedContent = matter.stringify(content, data);
    await fs.writeFile(filePath, updatedContent, 'utf-8');
    console.log(`Updated reading time for ${file}: ${stats.text}`);
  }
}

addReadingTime().catch(console.error);