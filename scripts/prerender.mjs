import { createElement } from "react"
import { renderToString } from "react-dom/server"
import { createServer } from "vite"
import { readFile, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)))
const outputFile = join(projectRoot, "dist/index.html")
const vite = await createServer({
  configFile: join(projectRoot, "vite.config.ts"),
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
})

try {
  const { HomePage } = await vite.ssrLoadModule("/src/site.tsx")
  const markup = renderToString(createElement(HomePage))
  const document = await readFile(outputFile, "utf8")
  const appShell = '<div id="root"></div>'

  if (!document.includes(appShell)) throw new Error(`Expected ${appShell} in ${outputFile}`)
  await writeFile(outputFile, document.replace(appShell, `<div id="root">${markup}</div>`))
} finally {
  await vite.close()
}
