const fs = require('fs');
const Parser = require('rss-parser');
const parser = new Parser();

(async () => {
  const feed = await parser.parseURL('https://dev.to/feed/arafatweb');
  let readmeContent = fs.readFileSync('README.md', 'utf8');
  let newBlogContent = '';
  feed.items.slice(0, 5).forEach(item => {
    const formattedDate = new Date(item.pubDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }); // Format the date
    newBlogContent += `\n### [${item.title}](${item.link})\n`;
    newBlogContent += `📅 ${formattedDate}\n\n`; // Add a calendar emoji for visual appeal
  });

  const newReadme = readmeContent.replace(/<!-- BLOG-POST-LIST:START -->.*<!-- BLOG-POST-LIST:END -->/s, `<!-- BLOG-POST-LIST:START -->\n${newBlogContent}<!-- BLOG-POST-LIST:END -->`);
  fs.writeFileSync('README.md', newReadme);
})();
