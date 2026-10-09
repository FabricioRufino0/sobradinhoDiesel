import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"
import test from "node:test"

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)))

async function readOrEmpty(path) {
  try {
    return await readFile(path, "utf8")
  } catch (error) {
    if (error?.code === "ENOENT") return ""
    throw error
  }
}

test("home links to its text and Markdown representations", async () => {
  const html = await readOrEmpty(join(projectRoot, "index.html"))

  assert.match(html, /rel="alternate"[^>]*type="text\/plain"[^>]*href="\/llms\.txt"/)
  assert.match(html, /rel="alternate"[^>]*type="text\/markdown"[^>]*href="\/index\.md"/)
})

test("Markdown homepage summarizes confirmed business details", async () => {
  const markdown = await readOrEmpty(join(projectRoot, "public/index.md"))

  assert.match(markdown, /sobradinhodiesel\.com\.br/)
  assert.match(markdown, /reparo de bicos injetores e bombas diesel/i)
  assert.match(markdown, /\+55 61 98162-0367/)
  assert.doesNotMatch(markdown, /horário de funcionamento|garantia de .*km/i)
})

test("crawler guidance is published at the requested path", async () => {
  const guidance = await readOrEmpty(join(projectRoot, "public/AGENTS.md"))

  assert.match(guidance, /Sobradinho Injeção Diesel/)
  assert.match(guidance, /sobradinhodiesel\.com\.br/)
  assert.match(guidance, /não invente|nao invente/i)
})

test("not-found page has helpful Portuguese navigation", async () => {
  const page = await readOrEmpty(join(projectRoot, "public/404.html"))

  assert.match(page, /<html\b[^>]*lang="pt-BR"/)
  assert.match(page, /<h1[^>]*>[^<]*(não encontrada|nao encontrada)[^<]*<\/h1>/i)
  assert.match(page, /href="\/"/)
  assert.match(page, /href="\/#(servicos|contato)"/)
})

test("Cloudflare Assets serves the custom page with a 404 status", async () => {
  const config = JSON.parse(await readOrEmpty(join(projectRoot, "wrangler.jsonc")))

  assert.equal(config.assets?.not_found_handling, "404-page")
})

test("README describes the published domain and Search Console property", async () => {
  const readme = await readOrEmpty(join(projectRoot, "README.md"))

  assert.match(readme, /publicado.{0,80}sobradinhodiesel\.com\.br|sobradinhodiesel\.com\.br.{0,80}publicado/i)
  assert.match(readme, /Search Console/i)
  assert.doesNotMatch(readme, /ainda precisam ser configurados para publicar/i)
})

test("sitemap continues to omit unverified lastmod dates", async () => {
  const sitemap = await readOrEmpty(join(projectRoot, "public/sitemap.xml"))

  assert.match(sitemap, /<loc>https:\/\/sobradinhodiesel\.com\.br\//)
  assert.doesNotMatch(sitemap, /<lastmod>/i)
})
