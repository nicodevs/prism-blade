import { readFile, writeFile } from 'fs/promises';
import { marked } from 'marked';

const template = await readFile('template.html', 'utf8');
const readme = await readFile('../README.md', 'utf8');
const html = template.replace('<!-- CONTENT -->', marked.parse(readme));
await writeFile('index.html', html);
