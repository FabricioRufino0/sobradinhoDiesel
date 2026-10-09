export type ConsentChoice = "granted" | "denied"

export const consentStorageKey = "sobradinho-cookie-consent-v1"

type ConsentStorage = Pick<Storage, "getItem" | "setItem">

export function readConsent(storage: ConsentStorage): ConsentChoice | null {
  try {
    const saved = storage.getItem(consentStorageKey)
    return saved === "granted" || saved === "denied" ? saved : null
  } catch {
    return null
  }
}

export function saveConsent(storage: ConsentStorage, choice: ConsentChoice): void {
  try {
    storage.setItem(consentStorageKey, choice)
  } catch {
    // The current page still honors the in-memory choice if storage is unavailable.
  }
}
