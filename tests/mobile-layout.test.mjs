import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"
import test from "node:test"

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)))
const site = await readFile(join(projectRoot, "src/site.tsx"), "utf8")
const styles = await readFile(join(projectRoot, "src/index.css"), "utf8")

test("hero photograph remains a high-priority responsive image", () => {
  assert.match(site, /<img className="hero-backdrop" src="\/assets\/picapes-modelos-diesel\.webp" alt="" width="320" height="180" fetchPriority="high"\s*\/>/)
  assert.match(styles, /\.hero-backdrop\s*\{[^}]*width:\s*100%[^}]*max-width:\s*100%/s)
  assert.doesNotMatch(site, /className="hero-backdrop"[^>]*loading="lazy"/)
})

test("header emblem is cropped as a CSS background without an oversized image element", () => {
  assert.doesNotMatch(site, /<span className="brand-symbol"[^>]*>\s*<img/)
  assert.match(styles, /\.brand-symbol\s*\{[^}]*background-image:\s*url\("\/assets\/logo-sobradinho-transparente\.png"\)/s)
})

test("remaining content images are constrained to their containing viewport", () => {
  assert.match(styles, /img\s*\{[^}]*max-width:\s*100%[^}]*height:\s*auto/s)
  assert.match(site, /<img className="footer-logo"[^>]*width="160" height="160"/)
})
