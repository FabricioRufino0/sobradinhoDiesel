import { useEffect, useState } from "react"
import { readConsent, saveConsent, type ConsentChoice } from "@/consent"
import { loadGoogleTags, updateGoogleConsent } from "@/googleTag"

export function CookieConsent() {
  const [choice, setChoice] = useState<ConsentChoice | null>(null)
  const [preferencesOpen, setPreferencesOpen] = useState(false)

  useEffect(() => {
    const savedChoice = readConsent(() => window.localStorage)
    setChoice(savedChoice)
    if (savedChoice === "granted") loadGoogleTags(document, window)
  }, [])

  function chooseConsent(nextChoice: ConsentChoice) {
    saveConsent(() => window.localStorage, nextChoice)
    setChoice(nextChoice)
    setPreferencesOpen(false)

    if (nextChoice === "granted") {
      loadGoogleTags(document, window)
    } else if (window.gtag) {
      updateGoogleConsent(window, "denied")
    }
  }

  const showPreferences = choice === null || preferencesOpen

  return <>
    {showPreferences ? <section className="cookie-consent-panel" aria-label="Preferências de cookies">
      <div>
        <h2>Cookies e privacidade</h2>
        <p>Cookies de análise e publicidade só são ativados se você permitir. Você pode recusar e alterar sua escolha a qualquer momento.</p>
      </div>
      <div className="cookie-consent-actions">
        <button type="button" className="cookie-consent-secondary" onClick={() => chooseConsent("denied")}>Recusar cookies opcionais</button>
        <button type="button" className="cookie-consent-primary" onClick={() => chooseConsent("granted")}>Aceitar cookies opcionais</button>
      </div>
    </section> : <button type="button" className="cookie-settings" onClick={() => setPreferencesOpen(true)}>Preferências de cookies</button>}
  </>
}
