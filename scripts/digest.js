/**
 * AI Weekly Digest script
 * Fetches sources and writes a Markdown digest to the updates directory.
 */

import fs from "fs";
import path from "path";

const SOURCES = [
  { name: "OpenAI blog", url: "https://openai.com/blog/rss.xml", type: "rss" },
  { name: "Anthropic blog", url: "https://www.anthropic.com/news.xml", type: "rss" },
  { name: "DeepMind", url: "https://deepmind.google/discover/rss.xml", type: "rss" },
  { name: "ArXiv cs.CL", url: "https://export.arxiv.org/rss/cs.CL", type: "rss" },
];

async function fetchText(url) {
  const res = await fetch(url, { headers: { "User-Agent": "LaplandAILabBot/1.0" } });
  if (!res.ok) throw new Error(`Fetch failed ${url}: ${res.status}`);
  return await res.text();
}

function parseRSS(xml, limit = 5) {
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
    .slice(0, limit)
    .map((m) => {
      const block = m[1];
      const title =
        (block.match(/<title>(<!\[CDATA\[)?([\s\S]*?)(\]\]>)?<\/title>/) || [, "", ""])[2].trim();
      const link = (block.match(/<link>([\s\S]*?)<\/link>/) || [, ""])[1].trim();
      const pub = (block.match(/<pubDate>([\s\S]*?)<\/pubDate>/) || [, ""])[1].trim();
      return { title, link, pubDate: pub };
    });
  return items;
}

function formatDate(d = new Date()) {
  const y = d.getFullYear();
  const ww = (function (d) {
    const dt = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = (dt.getUTCDay() + 6) % 7;
    dt.setUTCDate(dt.getUTCDate() - dayNum + 3);
    const firstThursday = new Date(Date.UTC(dt.getUTCFullYear(), 0, 4));
    const week = 1 + Math.round(((dt - firstThursday) / 86400000 - 3 + ((firstThursday.getUTCDay() + 6) % 7)) / 7);
    return week;
  })(d);
  return { y, ww };
}

async function main() {
  const collected = [];
  for (const s of SOURCES) {
    try {
      const raw = await fetchText(s.url);
      const items = s.type === "rss" ? parseRSS(raw, 5) : [];
      collected.push({ source: s.name, items });
    } catch (e) {
      collected.push({ source: s.name, items: [], error: String(e) });
    }
  }

  const { y, ww } = formatDate();
  const title = `AI Weekly Digest – Viikko ${ww}/${y}`;
  const dateISO = new Date().toISOString().slice(0, 10);
  const slug = `${y}-w${String(ww).padStart(2, "0")}`;

  let md = `# ${title}\n\n_Päiväys: ${dateISO}_\n\n`;
  md += `Tämän viikon kooste valituista lähteistä. Kevyt tiivistelmä ja linkit alkuperäisiin.\n\n`;

  for (const b of collected) {
    md += `## ${b.source}\n`;
    if (b.items.length === 0) {
      md += `– Ei nostoja tai lähde ei vastannut.\n\n`;
      continue;
    }
    for (const it of b.items) {
      md += `- **${it.title}** — ${it.link}\n`;
    }
    md += `\n`;
  }

  const outDir = path.join(process.cwd(), "updates");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
  const outFile = path.join(outDir, `${slug}.md`);
  fs.writeFileSync(outFile, md, "utf8");
  console.log(`Wrote ${outFile}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
