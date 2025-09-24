/**
 * AI Weekly Digest script
 * Fetches sources and writes a Markdown digest to the updates directory.
 */

import fs from "fs/promises";
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
      const titleMatch = block.match(/<title>(<!\[CDATA\[)?([\s\S]*?)(\]\]>)?<\/title>/);
      const linkMatch = block.match(/<link>([\s\S]*?)<\/link>/);
      const pubMatch = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
      const title = titleMatch?.[2]?.trim() ?? '';
      const link = linkMatch?.[1]?.trim() ?? '';
      const pub = pubMatch?.[1]?.trim() ?? '';
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
  const errors = [];
  for (const s of SOURCES) {
    try {
      const raw = await fetchText(s.url);
      const items = s.type === "rss" ? parseRSS(raw, 5) : [];
      if (items.length === 0) {
        errors.push({ source: s.name, reason: "No entries returned" });
      }
      collected.push({ source: s.name, items });
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      errors.push({ source: s.name, reason: message });
      collected.push({ source: s.name, items: [], error: message });
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
  await fs.mkdir(outDir, { recursive: true });
  const outFile = path.join(outDir, `${slug}.md`);
  await fs.writeFile(outFile, md, "utf8");
  console.log(`Weekly digest kirjoitettu tiedostoon: ${outFile}`);

  if (errors.length > 0) {
    console.warn("Digest-prosessissa havaittuja ongelmia:");
    for (const err of errors) {
      console.warn(`- ${err.source}: ${err.reason}`);
    }
    const allFailed = errors.length === SOURCES.length;
    if (allFailed) {
      throw new Error("Kaikki lähteet epäonnistuivat – tarkista verkko tai lähteiden URL-osoitteet.");
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
