const fs = require('fs');
const Parser = require('rss-parser');
const parser = new Parser();

(async () => {
  const feed = await parser.parseURL('https://dev.to/feed/arafatweb');
  let readmeContent = fs.readFileSync('README.md', 'utf8');
  let newBlogContent = '';
  feed.items.slice(0, 5).forEach(item => {
    newBlogContent += `## [${item.title}](${item.link})\n`;
    newBlogContent += `${item.pubDate}\n\n`;
  });

  const newReadme = readmeContent.replace(/<!-- BLOG-POST-LIST:START -->.*<!-- BLOG-POST-LIST:END -->/s, `<!-- BLOG-POST-LIST:START -->\n${newBlogContent}<!-- BLOG-POST-LIST:END -->`);
  fs.writeFileSync('README.md', newReadme);
})();
