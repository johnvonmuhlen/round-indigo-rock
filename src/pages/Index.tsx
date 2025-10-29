import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Star,
  Layers,
  Sticker,
  Zap,
  FileText,
  Monitor,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const INDIGO = "indigo-600";
const INDIGO_HOVER = "indigo-700";
const INDIGO_TEXT = "text-indigo-600";
const INDIGO_BG = "bg-indigo-600";
const INDIGO_BG_HOVER = "hover:bg-indigo-700";
const INDIGO_BORDER = "border-indigo-600";
const INDIGO_RING = "focus:ring-indigo-500";

const WHATSAPP_NUMBER = "5491127227731";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola%20Round%20Indigo%20Rock%2C%20quiero%20un%20presupuesto`;
const EMAIL = "roundindigorock@gmail.com";
const ADDRESS = "Av. Corrientes 1234, CABA";
const MAP_EMBED =
  "https://www.openstreetmap.org/export/embed.html?bbox=-58.4100,-34.6037,-58.3700,-34.5837&layer=mapnik&marker=-34.5937,-58.3900";
const CATEGORIES = [
  { label: "Vía pública", key: "publica" },
  { label: "Retail", key: "retail" },
  { label: "Eventos", key: "eventos" },
  { label: "Vehículos", key: "vehiculos" },
  { label: "Web", key: "web" },
];
const SERVICES = [
  {
    icon: Layers,
    title: "Carteles",
    bullets: [
      "Impresión UV resistente",
      "Instalación certificada",
      "Materiales premium",
    ],
  },
  {
    icon: Sticker,
    title: "Stickers",
    bullets: ["Corte personalizado", "Adhesivo duradero", "Colocación prolija"],
  },
  {
    icon: FileText,
    title: "Cercos de obra",
    bullets: ["Gran formato", "Montaje seguro", "Visibilidad máxima"],
  },
  {
    icon: Zap,
    title: "Tótems",
    bullets: ["Estructuras robustas", "Diseño a medida", "Alto impacto visual"],
  },
  {
    icon: FileText,
    title: "Flyers",
    bullets: ["Papeles de calidad", "Colores vibrantes", "Entrega rápida"],
  },
  {
    icon: FileText,
    title: "Folletos",
    bullets: [
      "Diferentes pliegos",
      "Acabados brillantes/mate",
      "Diseño incluido",
    ],
  },
  {
    icon: Monitor,
    title: "Desarrollo Web",
    bullets: ["Sitios modernos", "Optimización SEO", "Soporte técnico"],
  },
];
const PORTFOLIO = [
  {
    src: "/2 stickers comun de 400x200cm c_u.jpg",
    alt: "2 stickers comun de 400x200cm",
    cat: "retail",
    desc: "Stickers comun - varios tamaños",
  },
  {
    src: "/3 cartel con marco.jpeg",
    alt: "Cartel con marco",
    cat: "publica",
    desc: "Cartel con marco - muestra de montaje",
  },
  {
    src: "/Cerco de obra 1.jpg",
    alt: "Cerco de obra 1",
    cat: "publica",
    desc: "Cerco de obra",
  },
  {
    src: "/Cerco de obra 2.png",
    alt: "Cerco de obra 2",
    cat: "publica",
    desc: "Cerco de obra",
  },
  {
    src: "/Marco con lona front 1.jpeg",
    alt: "Marco con lona front 1",
    cat: "publica",
    desc: "Marco con lona - frontal",
  },
  {
    src: "/Marco con lona front 2.png",
    alt: "Marco con lona front 2",
    cat: "publica",
    desc: "Marco con lona - frontal",
  },
  {
    src: "/Stand Alone - 200x100cm.jpeg",
    alt: "Stand Alone 200x100cm",
    cat: "eventos",
    desc: "Stand Alone - 200x100cm",
  },
  {
    src: "/Stand Alone 1.jpeg",
    alt: "Stand Alone 1",
    cat: "eventos",
    desc: "Stand Alone",
  },
  {
    src: "/Stand Alone 2.jpeg",
    alt: "Stand Alone 2",
    cat: "eventos",
    desc: "Stand Alone",
  },
  {
    src: "/Sticker 1.jpeg",
    alt: "Sticker 1",
    cat: "retail",
    desc: "Sticker",
  },
  {
    src: "/Sticker comun 1.jpg",
    alt: "Sticker comun 1",
    cat: "retail",
    desc: "Sticker comun",
  },
  {
    src: "/Sticker comun.jpeg",
    alt: "Sticker comun",
    cat: "retail",
    desc: "Sticker comun - vinilo",
  },
  {
    src: "/Sticker microperforado.jpeg",
    alt: "Sticker microperforado",
    cat: "retail",
    desc: "Sticker microperforado - para vidrieras",
  },
  {
    src: "/Sticker y cartel con marco.jpeg",
    alt: "Sticker y cartel con marco",
    cat: "retail",
    desc: "Sticker y cartel con marco - combinación",
  },
  {
    src: "/Totem doble faz.jpeg",
    alt: "Totem doble faz",
    cat: "publica",
    desc: "Tótem doble faz - alto impacto",
  },
];
const TESTIMONIALS = [
  {
    name: "Café Sur",
    text: "¡El cartel quedó increíble y la instalación fue rapidísima!",
  },
  {
    name: "Tienda Nova",
    text: "Stickers de calidad y atención personalizada. ¡Recomiendo!",
  },
  {
    name: "ExpoTech",
    text: "El tótem fue el centro de todas las miradas en nuestro evento.",
  },
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cat, setCat] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt?: string;
    desc?: string;
    cat?: string;
  } | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSelectedImage(null);
    }
    if (selectedImage) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [selectedImage]);

  // SEO meta tags
  document.title =
    "Impresión e instalación OOH | Round Indigo Rock | Buenos Aires";
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute(
      "content",
      "Servicios de impresión, instalación OOH, carteles, stickers, cercos de obra, tótems, flyers, folletos y desarrollo web en Buenos Aires. Cobertura en CABA. Round Indigo Rock."
    );

  // Responsive sticky WhatsApp
  const isMobile = window.innerWidth < 768;

  return (
    <div className="font-sans bg-white text-black">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-30 bg-white/90 border-b border-gray-200 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-2">
          <a
            href="#home"
            className="flex items-center gap-2 font-bold text-xl tracking-tight text-black"
          >
            <img
              src="/logo.png"
              alt="Round Indigo Rock"
              className="h-10 w-auto"
            />
            <span className="sr-only">Round Indigo Rock</span>
          </a>
          <nav className="hidden md:flex gap-4 text-sm font-medium">
            <a href="#home" className="hover:text-indigo-600 transition-colors">
              Home
            </a>
            <a
              href="#about"
              className="hover:text-indigo-600 transition-colors"
            >
              Sobre nosotros
            </a>
            <a
              href="#servicios"
              className="hover:text-indigo-600 transition-colors"
            >
              Servicios
            </a>
            <a
              href="#trabajos"
              className="hover:text-indigo-600 transition-colors"
            >
              Trabajos
            </a>
            <a
              href="#contacto"
              className="hover:text-indigo-600 transition-colors"
            >
              Contacto
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener"
              className="text-green-600 hover:text-green-700 flex items-center gap-1"
            >
              <MessageCircle size={18} /> WhatsApp
            </a>
          </nav>
          <button
            className="md:hidden p-2 rounded hover:bg-gray-100"
            aria-label="Abrir menú"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <nav className="md:hidden bg-white border-t border-gray-200 shadow-lg absolute w-full left-0 top-full z-40 animate-in fade-in">
            <div className="flex flex-col gap-2 p-4">
              <a
                href="#home"
                onClick={() => setMenuOpen(false)}
                className="py-2"
              >
                Home
              </a>
              <a
                href="#about"
                onClick={() => setMenuOpen(false)}
                className="py-2"
              >
                Sobre nosotros
              </a>
              <a
                href="#servicios"
                onClick={() => setMenuOpen(false)}
                className="py-2"
              >
                Servicios
              </a>
              <a
                href="#trabajos"
                onClick={() => setMenuOpen(false)}
                className="py-2"
              >
                Trabajos
              </a>
              <a
                href="#contacto"
                onClick={() => setMenuOpen(false)}
                className="py-2"
              >
                Contacto
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener"
                className="py-2 text-green-600 flex items-center gap-1"
              >
                <MessageCircle size={18} /> WhatsApp
              </a>
            </div>
          </nav>
        )}
      </header>

      {/* Hero */}
      <section
        id="home"
        className="relative min-h-[90vh] flex items-center justify-center bg-black"
      >
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
          alt="Mockup OOH"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-60"
          loading="eager"
          style={{ zIndex: 0 }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-2xl mx-auto text-center px-4 py-24">
          {/* Logo centered above the main headline - place image in public/round-indigo-rock.png */}
          <img
            src="/logo.png"
            alt="Round Indigo Rock logo"
            className="mx-auto mb-3 w-28 md:w-36 lg:w-44 h-auto object-contain"
          />
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
            Impresión e instalación OOH que destaca tu marca en la calle
          </h1>
          <p className="text-lg md:text-2xl text-white/90 mb-8 font-medium">
            Carteles, stickers, cercos de obra, tótems, flyers, folletos y
            desarrollo web.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg rounded-lg px-8 py-3 text-lg font-semibold"
              onClick={() => scrollToId("contacto")}
            >
              Pedir presupuesto
            </Button>
            <Button
              variant="outline"
              className="border-indigo-300 text-indigo-300 shadow-lg rounded-lg px-8 py-3 text-lg font-semibold"
              onClick={() => scrollToId("trabajos")}
            >
              Ver trabajos
            </Button>
          </div>
        </div>
      </section>

      {/* Sobre nosotros */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-black">
            Sobre nosotros
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Más de 10 años de experiencia en impresión y montaje OOH. Entregas
            rápidas, instalación segura y cobertura en CABA. Nos eligen por
            nuestra atención personalizada y resultados que destacan.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <li className="flex items-center gap-2">
              <CheckCircle className="text-indigo-600" /> Materiales de calidad
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-indigo-600" /> Acabados prolijos
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-indigo-600" /> Entregas en tiempo
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-indigo-600" /> Soporte
              post-instalación
            </li>
          </ul>
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Star className="text-indigo-500" size={18} />
                  <span className="font-semibold">{t.name}</span>
                </div>
                <p className="text-gray-700 text-sm italic">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-black text-center">
            Nuestros servicios
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col items-center hover:shadow-lg transition-shadow"
              >
                <s.icon
                  className="text-indigo-600 mb-3"
                  size={40}
                  aria-hidden="true"
                />
                <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                <ul className="text-gray-700 text-sm space-y-1">
                  {s.bullets.map((b, i) => (
                    <li key={i} className="flex items-center gap-1">
                      <ChevronRightIcon className="text-indigo-500" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trabajos */}
      <section id="trabajos" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-black text-center">
            Trabajos realizados
          </h2>
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
            {(showAll ? PORTFOLIO : PORTFOLIO.slice(0, 8))
              .filter((img) => !cat || img.cat === cat)
              .map((img, i) => (
                <div
                  key={i}
                  className="relative mb-4 rounded-lg overflow-hidden shadow group cursor-pointer"
                  tabIndex={0}
                  aria-label={img.desc}
                  onClick={() => setSelectedImage(img)}
                  onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                    if (e.key === "Enter") setSelectedImage(img);
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="text-white text-sm font-medium">
                      {img.desc}
                    </span>
                  </div>
                </div>
              ))}
          </div>
          {!showAll && (
            <div className="flex justify-center mt-6">
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white shadow rounded-lg px-6 py-2"
                onClick={() => setShowAll(true)}
              >
                Ver más trabajos <ChevronDown className="ml-2" />
              </Button>
            </div>
          )}
          {showAll && (
            <div className="flex justify-center mt-4">
              <Button
                variant="outline"
                className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-lg px-6 py-2"
                onClick={() => setShowAll(false)}
              >
                Ver menos <ChevronUp className="ml-2" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" ref={contactRef} className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-black text-center">
            Contacto
          </h2>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Formulario */}
            <form
              className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex-1 flex flex-col gap-4"
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
                window.open(WHATSAPP_LINK, "_blank");
              }}
              aria-label="Formulario de contacto"
            >
              <label className="font-medium text-sm" htmlFor="nombre">
                Nombre
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                required
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                autoComplete="name"
              />
              <label className="font-medium text-sm" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                autoComplete="email"
              />
              <label className="font-medium text-sm" htmlFor="telefono">
                Teléfono/WhatsApp
              </label>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                required
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                autoComplete="tel"
              />
              <label className="font-medium text-sm" htmlFor="mensaje">
                Mensaje (medidas, tipo de pieza, etc.)
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                required
                rows={3}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white shadow rounded-lg px-6 py-2 mt-2"
              >
                Solicitar propuesta
              </Button>
              <span className="text-xs text-gray-500 mt-2">
                * Tus datos serán usados solo para responder tu consulta. No
                compartimos información con terceros.
              </span>
            </form>
            {/* Datos de contacto */}
            <div className="flex-1 bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col gap-8 justify-center">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Phone className="text-indigo-600" size={28} />
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener"
                  className="text-lg text-green-600 hover:underline"
                >
                  WhatsApp: +54 9 11 2345-6789
                </a>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Mail className="text-indigo-600" size={28} />
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-lg text-indigo-600 hover:underline"
                >
                  {EMAIL}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="font-bold text-lg mb-2">Round Indigo Rock</div>
            <div className="text-sm mb-1">Av. Corrientes 1234, CABA</div>
            <div className="text-sm mb-1">Lunes a Viernes 9 a 18hs</div>
            <div className="flex gap-3 mt-2">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener"
                aria-label="WhatsApp"
                className="hover:text-green-400"
              >
                <MessageCircle />
              </a>
              <a
                href={`mailto:${EMAIL}`}
                aria-label="Email"
                className="hover:text-indigo-400"
              >
                <Mail />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
                className="hover:text-indigo-300"
              >
                <svg
                  width="22"
                  height="22"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5a5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5zm6 1.25a1 1 0 1 1-2 0a1 1 0 0 1 2 0z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="text-center md:text-right">
            <div className="mb-2">
              ¿Proyecto urgente?{" "}
              <a
                href={WHATSAPP_LINK}
                className="text-indigo-400 underline font-semibold"
              >
                Escribinos por WhatsApp
              </a>
            </div>
            <div className="text-xs text-gray-400">
              © {new Date().getFullYear()} Round Indigo Rock. Todos los derechos
              reservados.
            </div>
          </div>
        </div>
      </footer>

      {/* Fullscreen image modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.alt || "Imagen en pantalla completa"}
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            aria-label="Cerrar"
            className="absolute top-6 right-6 z-60 bg-white text-black rounded-full p-2 shadow hover:opacity-90"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <X />
          </button>

          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            className="max-w-[95%] max-h-[90%] object-contain rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
          />

          {selectedImage.desc && (
            <div className="absolute bottom-8 text-white text-sm text-center px-4">
              {selectedImage.desc}
            </div>
          )}
        </div>
      )}

      {/* Sticky WhatsApp mobile */}
      {isMobile && (
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener"
          className="fixed bottom-5 right-5 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg p-4 flex items-center justify-center animate-bounce"
          aria-label="WhatsApp"
        >
          <MessageCircle size={28} />
        </a>
      )}
    </div>
  );
}

// Icono de bullet para servicios
function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("w-4 h-4", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}