import { useState } from "react"
import { ArrowDown, ArrowUpRight, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const whatsapp = "https://wa.me/5561981620367"
const askService = `${whatsapp}?text=Ol%C3%A1%2C%20preciso%20de%20atendimento%20para%20um%20bico%20ou%20bomba%20diesel.`
const askInjector = `${whatsapp}?text=Ol%C3%A1%2C%20gostaria%20de%20consultar%20o%20reparo%20de%20um%20bico%20diesel.`
const askPump = `${whatsapp}?text=Ol%C3%A1%2C%20gostaria%20de%20consultar%20o%20reparo%20de%20uma%20bomba%20diesel.`
const askPart = `${whatsapp}?text=Ol%C3%A1%2C%20quero%20consultar%20a%20disponibilidade%20de%20um%20bico%20injetor.%20C%C3%B3digo%2Faplica%C3%A7%C3%A3o%3A%20`
const askGeneral = `${whatsapp}?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20atendimento.`
const mapsRoute = "https://www.google.com/maps/dir/?api=1&destination=-15.6635357%2C-47.7968178&travelmode=driving"

const brands = [
  { name: "Bosch", file: "bosch-official.svg" },
  { name: "DENSO", file: "denso.png" },
  { name: "John Deere", file: "johndeere-official.svg" },
  { name: "Siemens", file: "siemens-official-white.svg", dark: true },
  { name: "Delphi", file: "delphi-official.svg" },
]

function InjectorIcon() {
  return <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M27 4h10v8H27zM24 12h16v12H24zM22 24h20l4 6v9l-5 4H23l-5-4v-9l4-6zM25 43v9h14v-9M28 52l1 6h6l1-6M29 58l3 4 3-4M18 33h28M42 27h8v7h-4" /></svg>
}

function PumpIcon() {
  return <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 22V11h9v11M37 22V8h8v14M14 22h36l6 7v21H8V29l6-7zM8 34H3v10h5M56 34h5v10h-5M16 50v7h10v-7M39 50v7h10v-7" /><circle cx="32" cy="37" r="11" /><circle cx="32" cy="37" r="4" /></svg>
}

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const links = [
    { label: "Serviços", href: "#servicos" },
    { label: "Bicos à venda", href: "#pecas" },
    { label: "Contato", href: "#contato" },
  ]

  return <header className="site-header" id="inicio">
    <div className="wrap flex h-full items-center gap-5">
      <a className="brand-link" href="/" aria-label="Sobradinho Injeção Diesel, página inicial">
        <img src="/assets/simbolo-injetor.png" alt="" width="185" height="825" />
        <span>SOBRADINHO <small>INJEÇÃO DIESEL</small></span>
      </a>
      <nav className="ml-auto hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
        {links.map(link => <a key={link.label} href={link.href} className="nav-link">{link.label}</a>)}
      </nav>
      <a className={cn(buttonVariants({ size: "lg" }), "ml-auto hidden lg:inline-flex lg:ml-3")} href={askGeneral} target="_blank" rel="noopener noreferrer">
        Falar no WhatsApp <ArrowUpRight data-icon="inline-end" />
      </a>
      <a className={cn(buttonVariants({ size: "sm" }), "ml-auto hidden sm:inline-flex lg:hidden")} href={askGeneral} target="_blank" rel="noopener noreferrer">WhatsApp</a>
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon-lg" }), "ml-auto mr-3 lg:hidden")} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}><Menu /></SheetTrigger>
        <SheetContent side="right" className="w-[min(86vw,360px)]">
          <SheetHeader><SheetTitle>Navegação</SheetTitle><SheetDescription className="sr-only">Páginas e seções do site</SheetDescription></SheetHeader>
          <nav className="flex flex-col gap-1 px-4" aria-label="Navegação móvel">
            {links.map(link => <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)} className="mobile-nav-link">{link.label}</a>)}
            <a href={askGeneral} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ size: "lg" }), "mt-5 justify-center")}>Falar no WhatsApp <ArrowUpRight data-icon="inline-end" /></a>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  </header>
}

function SiteFooter() {
  return <footer className="bg-brand-ink text-white">
    <div className="wrap grid items-center gap-6 py-8 sm:grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_auto_auto]">
      <a href="/" aria-label="Sobradinho Injeção Diesel, página inicial" className="w-fit"><img className="footer-logo" src="/assets/logo-sobradinho.png" alt="Sobradinho Injeção Diesel" width="1025" height="825" /></a>
      <p className="text-sm text-white/65">Sobradinho, Distrito Federal</p>
      <a href="#inicio" className="text-sm font-bold text-white/80 hover:text-white">Voltar ao topo</a>
      <small className="text-xs text-white/55">© {new Date().getFullYear()} Sobradinho Injeção Diesel.</small>
    </div>
  </footer>
}

function ServiceCard({ title, description, href, icon }: { title: string; description: string; href: string; icon: "injector" | "pump" }) {
  return <Card className="service-card">
    <CardHeader>
      <div className="service-icon">{icon === "injector" ? <InjectorIcon /> : <PumpIcon />}</div>
      <CardTitle><h3 className="text-2xl font-extrabold tracking-tight">{title}</h3></CardTitle>
      <CardDescription className="text-base leading-relaxed">{description}</CardDescription>
    </CardHeader>
    <CardFooter className="mt-auto justify-between bg-transparent">
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-bold text-primary hover:underline">Consultar reparo <span aria-hidden="true">↗</span></a>
    </CardFooter>
  </Card>
}

export function HomePage() {
  return <>
    <a href="#conteudo" className="skip-link">Ir para o conteúdo</a>
    <SiteHeader />
    <main id="conteudo">
      <section className="hero" aria-labelledby="hero-title">
        <img className="hero-backdrop" src="/assets/picapes-modelos-diesel.webp" alt="" width="1672" height="941" fetchPriority="high" />
        <div className="wrap hero-shell">
          <div className="hero-copy">
            <p className="overline text-signal">INJEÇÃO DIESEL · SOBRADINHO, DF</p>
            <h1 id="hero-title">Reparo de bicos e bombas diesel</h1>
            <p className="hero-lead">Avaliamos sua peça e mostramos o resultado antes de qualquer reparo.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={askService} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ size: "lg" }), "hero-primary")}>Solicitar atendimento <ArrowUpRight data-icon="inline-end" /></a>
              <a href="#pecas" className="hero-link">Bicos à venda <ArrowUpRight aria-hidden="true" /></a>
            </div>
          </div>
          <div className="hero-bottom">
            <ul className="hero-facts" aria-label="Especialidades e localização">
              <li><strong>Bicos injetores</strong><span>Teste e reparo</span></li>
              <li><strong>Bombas diesel</strong><span>Alta e injetoras</span></li>
              <li><strong>Sobradinho, DF</strong><span>Atendimento local</span></li>
            </ul>
            <a className="hero-scroll" href="#marcas"><span>Conheça as marcas</span><ArrowDown aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      <section className="brands-section" id="marcas" aria-labelledby="brands-title">
        <div className="wrap">
          <div className="section-intro compact"><div><p className="overline text-primary">MARCAS</p><h2 id="brands-title">Marcas com que trabalhamos</h2></div><p>Informe a marca e o código da peça para confirmar o atendimento.</p></div>
          <div className="brand-grid">
            {brands.map(brand => <div key={brand.name} className={cn("brand-cell", brand.dark && "dark-brand")}><img src={`/assets/${brand.file}`} alt={brand.name} loading="lazy" /></div>)}
          </div>
        </div>
      </section>

      <section className="section-pad bg-muted/40" id="servicos" aria-labelledby="services-title">
        <div className="wrap">
          <div className="section-intro"><div><p className="overline text-primary">SERVIÇOS</p><h2 id="services-title">Serviços de reparo</h2></div><p>Consulte o teste e o reparo pelo modelo ou código da sua peça.</p></div>
          <div className="grid gap-4 md:grid-cols-2">
            <ServiceCard title="Reparo de bicos injetores" description="Testamos os bicos para identificar quais precisam de reparo. Mostramos o resultado antes do serviço, e você decide. O teste e o reparo são filmados e registrados; se quiser acompanhar o teste e conhecer a oficina, será bem-vindo." href={askInjector} icon="injector" />
            <ServiceCard title="Reparo de bombas diesel" description="Atendemos bombas de alta e injetoras. Testamos a peça antes de indicar o reparo e mostramos o resultado para você decidir. O teste e o serviço são filmados e registrados, e você pode acompanhar o teste na oficina." href={askPump} icon="pump" />
          </div>
        </div>
      </section>

      <section className="section-pad" id="pecas" aria-labelledby="parts-title">
        <div className="wrap parts-teaser">
          <div><p className="overline text-signal">BICOS À VENDA</p><h2 id="parts-title" className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">Bicos injetores à venda</h2><p className="mt-5 max-w-xl text-base leading-relaxed text-white/75">Temos bicos diesel novos e recondicionados. Consulte disponibilidade e valores pelo WhatsApp.</p></div>
          <a href={askPart} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ size: "lg" }), "justify-self-start")}>
            Consultar pelo WhatsApp <ArrowUpRight data-icon="inline-end" /><span className="sr-only"> (abre em nova aba)</span>
          </a>
        </div>
      </section>

      <section className="section-pad bg-muted/40" id="contato" aria-labelledby="contact-title">
        <div className="wrap grid items-start gap-10 lg:grid-cols-2 lg:gap-20">
          <div><p className="overline text-primary">CONTATO E LOCALIZAÇÃO</p><h2 id="contact-title" className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">Fale com a oficina</h2><p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">Consulte valores, testes, peças e reparos pelo WhatsApp ou telefone.</p><div className="mt-7 flex flex-wrap items-center gap-4"><a href={askGeneral} target="_blank" rel="noopener noreferrer" className={buttonVariants({ size: "lg" })}>Chamar no WhatsApp <ArrowUpRight data-icon="inline-end" /></a><a href="tel:+5561981620367" className="font-bold text-primary hover:underline">Ligar agora</a></div></div>
          <Card className="contact-card"><CardHeader><CardTitle><h3 className="text-xl font-extrabold">Endereço e telefone</h3></CardTitle></CardHeader><CardContent className="flex flex-col gap-5"><div><p className="detail-label">TELEFONE / WHATSAPP</p><a href="tel:+5561981620367" className="text-xl font-bold hover:text-primary">(61) 98162-0367</a></div><Separator /><div><p className="detail-label">ENDEREÇO</p><address className="text-lg font-bold not-italic">Setor de Expansão Econômica, Q 1 - DNOCS<br />Brasília - DF, 73000-000</address><a href={mapsRoute} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex font-bold text-primary hover:underline">Traçar rota ↗</a></div></CardContent></Card>
        </div>
      </section>
    </main>
    <SiteFooter />
  </>
}
