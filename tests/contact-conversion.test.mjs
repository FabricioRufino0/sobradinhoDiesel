import assert from "node:assert/strict"
import test from "node:test"
import {
  installContactConversionTracking,
  isContactConversionLink,
} from "../src/contactConversion.ts"

const sendTo = "AW-18483826712/iK0dCMTCrIwdEJig4-1E"

test("classifies WhatsApp and telephone links as contact conversions", () => {
  assert.equal(isContactConversionLink("https://wa.me/5561981620367?text=Oi"), true)
  assert.equal(isContactConversionLink("https://api.whatsapp.com/send?phone=5561981620367"), true)
  assert.equal(isContactConversionLink("tel:+5561981620367"), true)
  assert.equal(isContactConversionLink("https://sobradinhodiesel.com.br/#servicos"), false)
  assert.equal(isContactConversionLink("https://maps.google.com/?q=oficina"), false)
})

test("tracks WhatsApp contact clicks without interrupting their new tab", () => {
  let clickHandler
  const document = { addEventListener: (_type, handler) => { clickHandler = handler } }
  const calls = []
  const gtag = (...args) => calls.push(args)
  const navigate = (href) => assert.fail(`WhatsApp link should keep its own navigation: ${href}`)
  const link = { href: "https://wa.me/5561981620367", target: "_blank" }
  const event = {
    target: { closest: () => link },
    preventDefault: () => assert.fail("WhatsApp navigation should not be blocked"),
  }

  installContactConversionTracking(document, gtag, navigate)
  clickHandler(event)

  assert.deepEqual(calls, [
    ["event", "contact_click", {
      contact_method: "whatsapp",
      link_url: "https://wa.me/5561981620367",
    }],
    ["event", "conversion", { send_to: sendTo }],
  ])
})

test("waits briefly for the Ads conversion before opening a telephone link", () => {
  let clickHandler
  const document = { addEventListener: (_type, handler) => { clickHandler = handler } }
  const calls = []
  const destinations = []
  let prevented = false
  let fallback
  const link = { href: "tel:+5561981620367", target: "" }
  const event = {
    target: { closest: () => link },
    preventDefault: () => { prevented = true },
  }

  installContactConversionTracking(
    document,
    (...args) => calls.push(args),
    (href) => destinations.push(href),
    (callback, delay) => { assert.equal(delay, 2500); fallback = callback },
  )
  clickHandler(event)

  assert.equal(prevented, true)
  assert.deepEqual(calls[0], ["event", "contact_click", {
    contact_method: "phone",
    link_url: "tel:+5561981620367",
  }])
  assert.equal(calls[1][0], "event")
  assert.equal(calls[1][1], "conversion")
  assert.equal(calls[1][2].send_to, sendTo)
  assert.equal(calls[1][2].event_timeout, 2000)
  calls[1][2].event_callback()
  calls[1][2].event_callback()
  fallback()
  assert.deepEqual(destinations, ["tel:+5561981620367"])
})

test("continues a phone call if the tag never returns its conversion callback", () => {
  let clickHandler
  let fallback
  const document = { addEventListener: (_type, handler) => { clickHandler = handler } }
  const destinations = []
  const link = { href: "tel:+5561981620367", target: "" }
  const event = {
    target: { closest: () => link },
    preventDefault: () => {},
  }

  installContactConversionTracking(
    document,
    () => {},
    (href) => destinations.push(href),
    (callback) => { fallback = callback },
  )
  clickHandler(event)
  fallback()

  assert.deepEqual(destinations, ["tel:+5561981620367"])
})
