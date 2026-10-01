import React from "react"
import { createRoot, hydrateRoot } from "react-dom/client"
import { HomePage } from "./site"
import "./index.css"

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, parameters: Record<string, string>) => void
  }
}

document.addEventListener("click", event => {
  if (!(event.target instanceof Element)) return

  const link = event.target.closest<HTMLAnchorElement>("a[href]")
  if (!link) return

  const url = new URL(link.href, window.location.href)
  const contactMethod = url.protocol === "tel:" ? "phone" : url.hostname === "wa.me" ? "whatsapp" : undefined
  if (contactMethod) window.gtag?.("event", "contact_click", { contact_method: contactMethod })
}, true)

const root = document.getElementById("root")!
const app = <React.StrictMode><HomePage /></React.StrictMode>

if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
