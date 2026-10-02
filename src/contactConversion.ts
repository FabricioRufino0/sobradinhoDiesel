const adsContactConversion = "AW-18483826712/iK0dCMTCrIwdEJig4-1E"

type GoogleTagEvent = (
  command: "event",
  eventName: string,
  parameters: Record<string, string | number | (() => void)>,
) => void

declare global {
  interface Window {
    gtag: GoogleTagEvent
  }
}

type ContactMethod = "phone" | "whatsapp"

function getContactMethod(href: string): ContactMethod | null {
  if (href.trim().toLowerCase().startsWith("tel:")) return "phone"

  try {
    const url = new URL(href, "https://sobradinhodiesel.com.br")
    if (["wa.me", "api.whatsapp.com", "web.whatsapp.com"].includes(url.hostname)) {
      return "whatsapp"
    }
  } catch {
    return null
  }

  return null
}

export function isContactConversionLink(href: string): boolean {
  return getContactMethod(href) !== null
}

export function installContactConversionTracking(
  document: Pick<Document, "addEventListener">,
  gtag: GoogleTagEvent,
  navigate: (href: string) => void,
  scheduleFallback: typeof setTimeout = setTimeout,
): void {
  document.addEventListener("click", (event) => {
    const target = event.target as (Element | null)
    if (!target || typeof target.closest !== "function") return

    const link = target.closest("a[href]") as HTMLAnchorElement | null
    if (!link) return

    const contactMethod = getContactMethod(link.href)
    if (!contactMethod) return

    gtag("event", "contact_click", {
      contact_method: contactMethod,
      link_url: link.href,
    })

    if (link.target === "_blank") {
      gtag("event", "conversion", { send_to: adsContactConversion })
      return
    }

    event.preventDefault()
    let hasNavigated = false
    const continueToPhone = () => {
      if (hasNavigated) return
      hasNavigated = true
      navigate(link.href)
    }

    scheduleFallback(continueToPhone, 2500)
    gtag("event", "conversion", {
      send_to: adsContactConversion,
      event_callback: continueToPhone,
      event_timeout: 2000,
    })
  }, true)
}
