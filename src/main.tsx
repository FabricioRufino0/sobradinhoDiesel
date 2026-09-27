import React from "react"
import { createRoot } from "react-dom/client"
import { HomePage, SalesPage } from "./site"
import "./index.css"

const isSalesPage = location.pathname.endsWith("/bicos-a-venda.html")

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>{isSalesPage ? <SalesPage /> : <HomePage />}</React.StrictMode>
)
