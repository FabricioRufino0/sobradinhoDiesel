import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { readFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"
import test from "node:test"
import { installContactConversionTracking } from "../src/contactConversion.ts"

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)))
const consentModulePromise = import("../src/consent.ts").catch(() => null)
const googleTagModulePromise = import("../src/googleTag.ts").catch(() => null)

async function readOrEmpty(path) {
  try {
    return await readFile(path, "utf8")
  } catch (error) {
    if (error?.code === "ENOENT") return ""
    throw error
  }
}

test("production HTML does not request Google tags before a visitor chooses", async () => {
  const html = await readOrEmpty(join(projectRoot, "index.html"))
  const entry = await readOrEmpty(join(projectRoot, "src/site.tsx"))

  assert.doesNotMatch(html, /googletagmanager\.com\/gtag\/js/)
  assert.doesNotMatch(html, /G-STMQ0Z5S1C/)
  assert.match(entry, /CookieConsent/)
})

test("consent choices are read and persisted as granted or denied", async () => {
  const consent = await consentModulePromise
  assert.ok(consent, "expected consent storage helpers to exist")

  const values = new Map()
  const storage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  }

  assert.equal(consent.readConsent(storage), null)
  consent.saveConsent(storage, "denied")
  assert.equal(consent.readConsent(storage), "denied")
  consent.saveConsent(storage, "granted")
  assert.equal(consent.readConsent(storage), "granted")
  values.set(consent.consentStorageKey, "unknown")
  assert.equal(consent.readConsent(storage), null)
})

test("blocked localStorage access does not break consent handling", async () => {
  const consent = await consentModulePromise
  assert.ok(consent, "expected consent storage helpers to exist")

  let storageAccessAttempts = 0
  const blockedStorage = () => {
    storageAccessAttempts += 1
    throw new Error("Storage access denied")
  }
  assert.equal(consent.readConsent(blockedStorage), null)
  assert.equal(storageAccessAttempts, 1)
  assert.doesNotThrow(() => consent.saveConsent(blockedStorage, "granted"))
  assert.equal(storageAccessAttempts, 2)
})

test("contact conversion checks consent through the protected storage getter", async () => {
  const main = await readOrEmpty(join(projectRoot, "src/main.tsx"))

  assert.match(main, /readConsent\(\(\) => window\.localStorage\)/)
})

test("Google tags use the verified GA4 ID and default consent to denied", async () => {
  const googleTag = await googleTagModulePromise
  assert.ok(googleTag, "expected the consent-gated Google tag loader to exist")

  const scripts = []
  const window = { dataLayer: [] }
  const document = {
    head: { appendChild: (script) => scripts.push(script) },
    createElement: (tagName) => ({ tagName }),
    querySelector: () => null,
  }

  googleTag.loadGoogleTags(document, window)

  assert.equal(scripts.length, 1)
  assert.equal(scripts[0].async, true)
  assert.equal(scripts[0].src, "https://www.googletagmanager.com/gtag/js?id=G-Q0ET20C21G")
  assert.deepEqual(window.dataLayer[0], ["consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  }])
  assert.deepEqual(window.dataLayer.find((call) => call[0] === "config" && call[1] === "G-Q0ET20C21G"), ["config", "G-Q0ET20C21G"])
  assert.deepEqual(window.dataLayer.find((call) => call[0] === "config" && call[1] === "AW-18483826712"), ["config", "AW-18483826712"])
  assert.deepEqual(window.dataLayer[1], ["consent", "update", {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
    analytics_storage: "granted",
  }])
})

test("Google tag loader updates consent without inserting a duplicate script", async () => {
  const googleTag = await googleTagModulePromise
  assert.ok(googleTag, "expected the consent-gated Google tag loader to exist")

  const scripts = []
  const window = { dataLayer: [] }
  const document = {
    head: { appendChild: (script) => scripts.push(script) },
    createElement: (tagName) => ({ tagName }),
    querySelector: () => scripts[0] ?? null,
  }

  googleTag.loadGoogleTags(document, window)
  googleTag.updateGoogleConsent(window, "denied")

  assert.equal(scripts.length, 1)
  assert.deepEqual(window.dataLayer.at(-1), ["consent", "update", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  }])
})

test("cookie banner offers acceptance, refusal, and a way to reopen preferences", async () => {
  const component = await readOrEmpty(join(projectRoot, "src/components/CookieConsent.tsx"))

  assert.match(component, /Aceitar cookies opcionais/)
  assert.match(component, /Recusar cookies opcionais/)
  assert.match(component, /Preferências de cookies/)
  assert.match(component, /salvarConsentimento|saveConsent/)
  assert.match(component, /readConsent\(\(\) => window\.localStorage\)/)
  assert.match(component, /saveConsent\(\(\) => window\.localStorage/)
})

test("contact links navigate normally when consent is denied", () => {
  let clickHandler
  const document = { addEventListener: (_type, handler) => { clickHandler = handler } }
  const calls = []
  let prevented = false
  const link = { href: "tel:+5561981620367", target: "" }
  const event = {
    target: { closest: () => link },
    preventDefault: () => { prevented = true },
  }

  installContactConversionTracking(
    document,
    (...args) => calls.push(args),
    () => assert.fail("native phone navigation should continue"),
    () => {},
    () => false,
  )
  clickHandler(event)

  assert.equal(prevented, false)
  assert.deepEqual(calls, [])
})

test("Cloudflare static assets publish all seven security headers and a restrictive CSP", async () => {
  const headers = await readOrEmpty(join(projectRoot, "public/_headers"))
  const html = await readOrEmpty(join(projectRoot, "index.html"))
  const jsonLd = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1]
  assert.ok(jsonLd, "expected JSON-LD structured data")
  const jsonLdHash = createHash("sha256").update(jsonLd).digest("base64")

  for (const header of [
    "Strict-Transport-Security",
    "Content-Security-Policy",
    "X-Frame-Options",
    "X-Content-Type-Options",
    "Cross-Origin-Opener-Policy",
    "Referrer-Policy",
    "Permissions-Policy",
  ]) {
    assert.match(headers, new RegExp(`^\\s*${header}:`, "im"), `missing ${header}`)
  }
  assert.match(headers, /max-age=31536000/)
  assert.match(headers, /X-Frame-Options:\s*DENY/i)
  assert.match(headers, /X-Content-Type-Options:\s*nosniff/i)
  assert.match(headers, /Cross-Origin-Opener-Policy:\s*same-origin/i)
  assert.match(headers, /Referrer-Policy:\s*strict-origin-when-cross-origin/i)
  assert.match(headers, /Permissions-Policy:/i)
  assert.match(headers, new RegExp(`sha256-${jsonLdHash.replaceAll("+", "\\+").replaceAll("/", "\\/")}`))
  assert.doesNotMatch(headers, /script-src[^\r\n]*'unsafe-inline'/i)
})

test("Cloudflare responses prevent automatic edge injection of the RUM beacon", async () => {
  const headers = await readOrEmpty(join(projectRoot, "public/_headers"))

  const htmlCachePolicy = /Cache-Control:\s*public,\s*max-age=0,\s*must-revalidate,\s*no-transform/i

  assert.match(headers, /^\/\r?\n\s+Cache-Control:.*no-transform/im)
  assert.match(headers, /^\/\*\.html\r?\n\s+Cache-Control:.*no-transform/im)
  assert.doesNotMatch(headers, /^\/\*\r?\n\s+Cache-Control:.*no-transform/im)
  assert.match(headers, htmlCachePolicy)
})

test("CSP allows Google Analytics and Ads resources when consent is granted", async () => {
  const headers = await readOrEmpty(join(projectRoot, "public/_headers"))
  const csp = headers.match(/Content-Security-Policy:\s*([^\r\n]+)/i)?.[1]
  assert.ok(csp, "expected a Content-Security-Policy header")

  const directives = Object.fromEntries(csp.split(";").map((part) => {
    const [name, ...sources] = part.trim().split(/\s+/)
    return [name, sources]
  }))
  const requiredSources = [
    ["script-src", "https://www.googletagmanager.com"],
    ["script-src", "https://www.googleadservices.com"],
    ["script-src", "https://www.google.com"],
    ["img-src", "https://*.google-analytics.com"],
    ["img-src", "https://*.google.com"],
    ["img-src", "https://www.googleadservices.com"],
    ["img-src", "https://pagead2.googlesyndication.com"],
    ["connect-src", "https://*.google-analytics.com"],
    ["connect-src", "https://*.google.com"],
    ["connect-src", "https://www.googleadservices.com"],
    ["connect-src", "https://pagead2.googlesyndication.com"],
    ["connect-src", "https://ad.doubleclick.net"],
    ["frame-src", "https://www.googletagmanager.com"],
  ]

  for (const [directive, source] of requiredSources) {
    assert.ok(directives[directive]?.includes(source), `missing ${source} from ${directive}`)
  }
})
