export type ConsentChoice = "granted" | "denied"

export const consentStorageKey = "sobradinho-cookie-consent-v1"

type ConsentStorage = Pick<Storage, "getItem" | "setItem">
type ConsentStorageSource = ConsentStorage | (() => ConsentStorage)

function resolveStorage(source: ConsentStorageSource): ConsentStorage {
  return typeof source === "function" ? source() : source
}

export function readConsent(storageSource: ConsentStorageSource): ConsentChoice | null {
  try {
    const storage = resolveStorage(storageSource)
    const saved = storage.getItem(consentStorageKey)
    return saved === "granted" || saved === "denied" ? saved : null
  } catch {
    return null
  }
}

export function saveConsent(storageSource: ConsentStorageSource, choice: ConsentChoice): void {
  try {
    const storage = resolveStorage(storageSource)
    storage.setItem(consentStorageKey, choice)
  } catch {
    // The current page still honors the in-memory choice if storage is unavailable.
  }
}
