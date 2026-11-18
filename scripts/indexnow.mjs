/**
 * Submit URLs to IndexNow (Bing, Yandex, Seznam, Naver…) after a deploy.
 *
 *   node scripts/indexnow.mjs                  # every URL in the live sitemap
 *   node scripts/indexnow.mjs /blog /about     # only these paths (changed pages)
 *
 * The key file lives at public/<KEY>.txt and must stay published.
 */

const HOST = 'deepdivers.services';
const SITE = `https://${HOST}`;
const KEY = 'd0adb33884bac81fb3ac344d9954f913';

async function sitemapUrls() {
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

const args = process.argv.slice(2);
// Git Bash on Windows rewrites "/path" arguments into "C:/Program Files/Git/path"
if (args.some((a) => /^[A-Za-z]:[\\/]/.test(a))) {
  console.error('An argument looks like a Windows path. Pass full URLs, or run with MSYS_NO_PATHCONV=1.');
  process.exit(1);
}
const urlList = args.length
  ? args.map((p) => (p.startsWith('http') ? p : `${SITE}${p.startsWith('/') ? p : `/${p}`}`))
  : await sitemapUrls();

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
});

console.log(`IndexNow: HTTP ${response.status} for ${urlList.length} URL(s)`);
for (const url of urlList) console.log('  ' + url);
if (response.status >= 300) {
  console.log(await response.text());
  process.exitCode = 1;
}
