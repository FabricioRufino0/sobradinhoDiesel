import assert from "node:assert/strict"
import { readFile, access } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"
import test from "node:test"

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)))
const distRoot = join(projectRoot, "dist")
const canonicalUrl = "https://sobradinhodiesel.com.br/"
const html = await readFile(join(distRoot, "index.html"), "utf8")
const robots = await readFile(join(projectRoot, "public/robots.txt"), "utf8")
const sitemap = await readFile(join(projectRoot, "public/sitemap.xml"), "utf8")
const llms = await readFile(join(projectRoot, "public/llms.txt"), "utf8")
const siteSource = await readFile(join(projectRoot, "src/site.tsx"), "utf8")
const sheetSource = await readFile(join(projectRoot, "src/components/ui/sheet.tsx"), "utf8")

test("production HTML contains the main page content before JavaScript runs", () => {
  assert.match(html, /<main\b/)
  assert.match(html, /<h1\b[^>]*id="hero-title"[^>]*>Reparo de bicos e bombas diesel<\/h1>/)
  assert.match(html, /Avaliamos sua peça e mostramos o resultado antes de qualquer reparo\./)
  assert.match(html, /Reparo de bicos injetores/)
  assert.match(html, /Reparo de bombas diesel/)
  assert.match(html, /Temos bicos diesel novos e recondicionados/)
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1)
  assert.doesNotMatch(html, /id="root">\s*<\/div>/)
})

test("production HTML initializes the Sobradinho Diesel GA4 and Ads destinations exactly once", () => {
  assert.equal(
    [...html.matchAll(/https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-STMQ0Z5S1C/g)].length,
    1,
  )
  assert.match(html, /gtag\('config',\s*'G-STMQ0Z5S1C'\)/)
  assert.equal(
    [...html.matchAll(/gtag\('config',\s*'AW-18483826712'\)/g)].length,
    1,
  )
})

test("page metadata consistently names the canonical business page", () => {
  assert.match(html, /<title>Sobradinho Injeção Diesel \| Reparo de bicos e bombas<\/title>/)
  assert.match(html, /<meta name="description" content="[^"]+"\s*\/>/)
  assert.match(html, new RegExp(`<link rel="canonical" href="${canonicalUrl.replaceAll(".", "\\.")}"`))
  assert.match(html, /property="og:url" content="https:\/\/sobradinhodiesel\.com\.br\/"/)
  assert.match(html, /name="twitter:title"/)
  assert.match(html, /name="twitter:description"/)
  assert.match(html, /name="twitter:image"/)
  assert.doesNotMatch(html, /name="robots" content="noindex"/i)
})

test("search favicon is a square PNG large enough for search results", async () => {
  assert.match(html, /<link rel="icon" href="\/assets\/favicon-sobradinho\.png" type="image\/png" sizes="256x256"/)
  const png = await readFile(join(distRoot, "assets/favicon-sobradinho.png"))
  assert.equal(png.toString("ascii", 1, 4), "PNG")
  assert.equal(png.readUInt32BE(16), png.readUInt32BE(20), "favicon must be square")
  assert.ok(png.readUInt32BE(16) >= 48, "favicon must be at least 48px wide")
  assert.ok(png.byteLength < 200_000, "favicon should stay below 200 KB")
})

test("mobile navigation controls expose Portuguese accessible names", () => {
  assert.match(siteSource, /aria-label=\{menuOpen \? "Fechar menu" : "Abrir menu"\}/)
  assert.match(sheetSource, /<span className="sr-only">Fechar menu<\/span>/)
})

test("structured data identifies both the website and the visible local business", () => {
  const jsonLd = html.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/)?.[1]
  assert.ok(jsonLd, "expected one JSON-LD block in the production HTML")
  const data = JSON.parse(jsonLd)
  const graph = data["@graph"] ?? [data]
  const website = graph.find((item) => item["@type"] === "WebSite")
  const business = graph.find((item) => item["@type"] === "AutoRepair")

  assert.equal(website?.name, "Sobradinho Injeção Diesel")
  assert.equal(website?.url, canonicalUrl)
  assert.equal(business?.name, "Sobradinho Injeção Diesel")
  assert.equal(business?.url, canonicalUrl)
  assert.equal(business?.telephone, "+5561981620367")
  assert.equal(business?.address?.addressLocality, "Brasília")
  assert.equal(business?.address?.addressRegion, "DF")
})

test("robots, sitemap, and llms summary agree on the published domain", () => {
  assert.match(robots, /User-agent:\s*\*\s*\r?\nAllow:\s*\/\s*\r?\n/i)
  assert.match(robots, /User-agent:\s*OAI-SearchBot\s*\r?\nAllow:\s*\/\s*\r?\n/i)
  assert.match(robots, new RegExp(`Sitemap:\\s*${canonicalUrl.replaceAll(".", "\\.")}sitemap\\.xml`, "i"))
  assert.deepEqual([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]), [canonicalUrl])
  assert.match(llms, new RegExp(`\\(${canonicalUrl.replaceAll(".", "\\.")}\\)`))
  assert.match(llms, /reparo de bicos injetores e bombas diesel/i)
  assert.match(llms, /\+55 61 98162-0367/)
})

test("rendered internal links resolve to sections and local assets exist", async () => {
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]))
  const anchors = [...html.matchAll(/<a\b[^>]*\bhref="#([^"]+)"[^>]*>/g)].map((match) => match[1])
  const images = [...html.matchAll(/<img\b[^>]*>/g)].map((match) => match[0])
  const newTabLinks = [...html.matchAll(/<a\b[^>]*\btarget="_blank"[^>]*>/g)].map((match) => match[0])
  const assetPaths = [...html.matchAll(/\b(?:src|href)="(\/assets\/[^"#?]+)"/g)].map((match) => match[1])

  assert.ok(anchors.length > 0, "expected navigable section links")
  for (const anchor of anchors) assert.ok(ids.has(anchor), `missing target #${anchor}`)
  for (const image of images) assert.match(image, /\balt="[^"]*"/, `image has no alt text: ${image}`)
  for (const link of newTabLinks) assert.match(link, /\brel="[^"]*noopener[^"]*noreferrer[^"]*"/, `new-tab link is missing safe rel values: ${link}`)
  for (const assetPath of new Set(assetPaths)) {
    await access(join(distRoot, assetPath.slice(1)))
  }
})
