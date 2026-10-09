import type { ConsentChoice } from "./consent"

export const GOOGLE_ANALYTICS_ID = "G-Q0ET20C21G"
export const GOOGLE_ADS_ID = "AW-18483826712"

export type GoogleTagFunction = (...args: unknown[]) => void

type GoogleTagWindow = Pick<Window, "dataLayer" | "gtag">
type GoogleTagDocument = Pick<Document, "head" | "createElement" | "querySelector">

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: GoogleTagFunction
  }
}

const consentValues = (choice: ConsentChoice) => {
  const status = choice === "granted" ? "granted" : "denied"
  return {
    ad_storage: status,
    ad_user_data: status,
    ad_personalization: status,
    analytics_storage: status,
  }
}

function ensureGoogleTag(windowLike: GoogleTagWindow): GoogleTagFunction {
  windowLike.dataLayer ??= []
  windowLike.gtag ??= (...args) => windowLike.dataLayer?.push(args)
  return windowLike.gtag
}

export function updateGoogleConsent(windowLike: GoogleTagWindow, choice: ConsentChoice): void {
  ensureGoogleTag(windowLike)("consent", "update", consentValues(choice))
}

export function loadGoogleTags(document: GoogleTagDocument, windowLike: GoogleTagWindow): void {
  const scriptUrl = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`
  const existingScript = document.querySelector(`script[src="${scriptUrl}"]`)

  if (existingScript) {
    updateGoogleConsent(windowLike, "granted")
    return
  }

  const gtag = ensureGoogleTag(windowLike)
  gtag("consent", "default", consentValues("denied"))
  gtag("consent", "update", consentValues("granted"))
  gtag("js", new Date())
  gtag("config", GOOGLE_ANALYTICS_ID)
  gtag("config", GOOGLE_ADS_ID)

  const script = document.createElement("script")
  script.async = true
  script.src = scriptUrl
  document.head.appendChild(script)
}
