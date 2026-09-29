import React from "react"
import { createRoot, hydrateRoot } from "react-dom/client"
import { HomePage } from "./site"
import "./index.css"

const root = document.getElementById("root")!
const app = <React.StrictMode><HomePage /></React.StrictMode>

if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
