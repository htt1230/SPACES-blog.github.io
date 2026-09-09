const fs = require('fs');
const path = require('path');

const root = __dirname;
const files = fs.readdirSync(root)
  .filter((name) => name.endsWith('.html') && name !== 'index.html')
  .sort((a, b) => a.localeCompare(b, 'ja'));

const extractTitle = (html) => {
  const match = html.match(/<title>(.*?)<\/title>/i);
  if (match && match[1]) return match[1].trim();

  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1 && h1[1]) {
    return h1[1].replace(/<[^>]+>/g, '').trim();
  }

  return '無題のブログ';
};

const extractDate = (html) => {
  const match = html.match(/<time[^>]*datetime="([^"]+)"[^>]*>([\s\S]*?)<\/time>/i);
  if (match && match[1]) return match[1];
  return '';
};

const extractSummary = (html) => {
  const lead = html.match(/<p class="log-lead">([\s\S]*?)<\/p>/i);
  if (lead && lead[1]) {
    return lead[1].replace(/<[^>]+>/g, '').trim();
  }

  const firstParagraph = html.match(/<p>([\s\S]*?)<\/p>/i);
  if (firstParagraph && firstParagraph[1]) {
    return firstParagraph[1].replace(/<[^>]+>/g, '').trim();
  }

  return 'ブログの詳細を確認できます。';
};

const entries = files.map((fileName, index) => {
  const filePath = path.join(root, fileName);
  const html = fs.readFileSync(filePath, 'utf8');

  return {
    title: extractTitle(html),
    file: fileName,
    date: extractDate(html),
    summary: extractSummary(html),
    order: index + 1
  };
});

fs.writeFileSync(path.join(root, 'log-index.json'), JSON.stringify(entries, null, 2));
console.log(`Generated ${entries.length} activity log entries.`);
for (const entry of entries) {
  console.log(`- ${entry.file} | ${entry.title}`);
}
