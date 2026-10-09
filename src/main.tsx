import React from "react"
import { createRoot, hydrateRoot } from "react-dom/client"
import { HomePage } from "./site"
import { installContactConversionTracking } from "./contactConversion"
import { readConsent } from "./consent"
import "./index.css"

installContactConversionTracking(
  document,
  () => window.gtag,
  (href) => window.location.assign(href),
  setTimeout,
  () => readConsent(window.localStorage) === "granted",
)

const root = document.getElementById("root")!
const app = <React.StrictMode><HomePage /></React.StrictMode>

if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
