import { useRef, useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Menu,
  X,
  Building,
  Fence,
  InspectionPanel,
  Linkedin,
  Instagram,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

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
const INSTAGRAM_LINK = "https://www.instagram.com/round_indigo_rock/";
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
    icon: Fence,
    title: "Cercos de obra",
    bullets: ["Gran formato", "Montaje seguro", "Visibilidad máxima"],
  },
  {
    icon: Building,
    title: "Tótems",
    bullets: ["Estructuras robustas", "Diseño a medida", "Alto impacto visual"],
  },
  {
    icon: FileText,
    title: "Flyers",
    bullets: [
      "Diferentes pliegos",
      "Acabados brillantes/mate",
      "Diseño incluido",
    ],
  },
];
const PORTFOLIO = [
  {
    src: "/2 stickers comun de 400x200cm c_u.jpg",
    alt: "2 stickers comun de 400x200cm",
    cat: "stickers",
    desc: "Stickers comun - varios tamaños",
  },
  {
    src: "/3 cartel con marco.jpeg",
    alt: "Cartel con marco",
    cat: "lonas",
    desc: "Cartel con marco - muestra de montaje",
  },
  {
    src: "/Cerco de obra 1.jpg",
    alt: "Cerco de obra 1",
    cat: "cercos",
    desc: "Cerco de obra",
  },
  {
    src: "/Cerco de obra 2.png",
    alt: "Cerco de obra 2",
    cat: "cercos",
    desc: "Cerco de obra",
  },
  {
    src: "/Marco con lona front 1.jpeg",
    alt: "Marco con lona front 1",
    cat: "lonas",
    desc: "Marco con lona - frontal",
  },
  {
    src: "/Marco con lona front 2.png",
    alt: "Marco con lona front 2",
    cat: "lonas",
    desc: "Marco con lona - frontal",
  },
  {
    src: "/Stand Alone - 200x100cm.jpeg",
    alt: "Stand Alone 200x100cm",
    cat: "stands",
    desc: "Stand Alone - 200x100cm",
  },
  {
    src: "/Stand Alone 1.jpeg",
    alt: "Stand Alone 1",
    cat: "stands",
    desc: "Stand Alone",
  },
  {
    src: "/Stand Alone 2.jpeg",
    alt: "Stand Alone 2",
    cat: "stands",
    desc: "Stand Alone",
  },
  {
    src: "/Sticker 1.jpeg",
    alt: "Sticker 1",
    cat: "stickers",
    desc: "Sticker",
  },
  {
    src: "/Sticker comun 1.jpg",
    alt: "Sticker comun 1",
    cat: "stickers",
    desc: "Sticker comun",
  },
  {
    src: "/Sticker comun.jpeg",
    alt: "Sticker comun",
    cat: "stickers",
    desc: "Sticker comun - vinilo",
  },
  {
    src: "/Sticker microperforado.jpeg",
    alt: "Sticker microperforado",
    cat: "stickers",
    desc: "Sticker microperforado - para vidrieras",
  },
  {
    src: "/Sticker y cartel con marco.jpeg",
    alt: "Sticker y cartel con marco",
    cat: "stickers",
    desc: "Sticker y cartel con marco - combinación",
  },
  {
    src: "/Totem doble faz.jpeg",
    alt: "Totem doble faz",
    cat: "stands",
    desc: "Tótem doble faz - alto impacto",
  },
  {
    src: "/Cerco de obra.jpeg",
    alt: "Cerco de obra",
    cat: "cercos",
    desc: "Cerco de obra - otra toma",
  },
  {
    src: "/Marco con lona atado con tensores.jpg",
    alt: "Marco con lona atado con tensores",
    cat: "lonas",
    desc: "Marco con lona atado con tensores - montaje",
  },
  {
    src: "/Marco con lona en altura.jpeg",
    alt: "Marco con lona en altura",
    cat: "lonas",
    desc: "Marco con lona en altura - instalación",
  },
  {
    src: "/Marco con lona front copy 2.jpeg",
    alt: "Marco con lona front copy 2",
    cat: "lonas",
    desc: "Marco con lona - frontal",
  },
  {
    src: "/Marco con lona front copy.jpeg",
    alt: "Marco con lona front copy",
    cat: "lonas",
    desc: "Marco con lona - frontal",
  },
  {
    src: "/Marco con lona front.jpeg",
    alt: "Marco con lona front",
    cat: "lonas",
    desc: "Marco con lona - frontal",
  },
  {
    src: "/marco con lona frontal 3.jpg",
    alt: "Marco con lona frontal 3",
    cat: "lonas",
    desc: "Marco con lona - frontal",
  },
  {
    src: "/Mini stand alone.jpg",
    alt: "Mini stand alone",
    cat: "stands",
    desc: "Mini Stand Alone - formato pequeño",
  },
  {
    src: "/Ploteo recorte.jpeg",
    alt: "Ploteo recorte",
    cat: "stickers",
    desc: "Ploteo y recorte - vinilo personalizado",
  },
  {
    src: "/Sticker clear pegando por dentro.jpeg",
    alt: "Sticker clear pegando por dentro",
    cat: "stickers",
    desc: "Sticker clear - pegado por dentro",
  },
  {
    src: "/Sticker comun 2.jpeg",
    alt: "Sticker comun 2",
    cat: "stickers",
    desc: "Sticker común",
  },
  {
    src: "/Sticker comun en altura.jpeg",
    alt: "Sticker comun en altura",
    cat: "stickers",
    desc: "Sticker colocado en altura",
  },
  {
    src: "/Sticker comun nivel peatonal.jpeg",
    alt: "Sticker comun nivel peatonal",
    cat: "stickers",
    desc: "Sticker a nivel peatonal",
  },
  {
    src: "/Sticker esquinera.jpeg",
    alt: "Sticker esquinera",
    cat: "stickers",
    desc: "Sticker esquinera - adaptación de esquina",
  },
  {
    src: "/Sticker microperforado 2.jpeg",
    alt: "Sticker microperforado 2",
    cat: "stickers",
    desc: "Sticker microperforado",
  },
  {
    src: "/Sticker microperforado 3.jpeg",
    alt: "Sticker microperforado 3",
    cat: "stickers",
    desc: "Sticker microperforado",
  },
  {
    // filename on disk contains a non-breaking space between "doble" and "faz"
    // encode it with a Unicode escape so the string matches the actual file name
    src: "/cartel de poste doble\u00A0faz.jpeg",
    alt: "Cartel de poste doble faz",
    cat: "stands",
    desc: "Cartel de poste doble faz",
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

const FILTER_CATEGORIES = [
  { label: "Todos", key: null },
  { label: "Stickers", key: "stickers" },
  { label: "Cercos de Obra", key: "cercos" },
  { label: "Lonas y Marcos", key: "lonas" },
  { label: "Stands y Tótems", key: "stands" },
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
  const [sending, setSending] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt?: string;
    desc?: string;
    cat?: string;
  } | null>(null);

  const filteredPortfolio = useMemo(() => {
    let filtered = PORTFOLIO.filter((img) => !cat || img.cat === cat);
    if (!showAll) {
      filtered = filtered.slice(0, 8);
    }
    return filtered;
  }, [showAll, cat]);

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

  async function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setSending(true);
    const fd = new FormData(form);
    const payload = {
      name: fd.get("nombre")?.toString() || "",
      email: fd.get("email")?.toString() || "",
      phone: fd.get("telefono")?.toString() || "",
      message: fd.get("mensaje")?.toString() || "",
    };

    try {
      const res = await fetch(
        "https://n8n.srv902299.hstgr.cloud/webhook/handle-form-submit",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) throw new Error("Request failed");
      // success
      form.reset();
      toast({
        title: "Mensaje enviado",
        description: "Gracias — te contactamos pronto.",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Error enviando el mensaje. Intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="font-sans bg-white text-black">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/95 border-b border-gray-200 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-white/90 transition-all duration-300">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("home");
            }}
            className="flex items-center gap-3 font-bold text-xl tracking-tight text-black hover:opacity-80 transition-opacity"
          >
            <img
              src="/logo.png"
              alt="Round Indigo Rock"
              className="h-10 w-auto transform scale-125 origin-center"
            />
            <span className="sr-only">Round Indigo Rock</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("home");
              }}
              className="relative text-gray-700 hover:text-indigo-600 transition-colors duration-200 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-indigo-600 after:transition-all after:duration-200 hover:after:w-full"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("about");
              }}
              className="relative text-gray-700 hover:text-indigo-600 transition-colors duration-200 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-indigo-600 after:transition-all after:duration-200 hover:after:w-full"
            >
              Sobre nosotros
            </a>
            <a
              href="#servicios"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("servicios");
              }}
              className="relative text-gray-700 hover:text-indigo-600 transition-colors duration-200 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-indigo-600 after:transition-all after:duration-200 hover:after:w-full"
            >
              Servicios
            </a>
            <a
              href="#trabajos"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("trabajos");
              }}
              className="relative text-gray-700 hover:text-indigo-600 transition-colors duration-200 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-indigo-600 after:transition-all after:duration-200 hover:after:w-full"
            >
              Trabajos
            </a>
            <a
              href="#contacto"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("contacto");
              }}
              className="relative text-gray-700 hover:text-indigo-600 transition-colors duration-200 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-indigo-600 after:transition-all after:duration-200 hover:after:w-full"
            >
              Contacto
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-colors duration-200 shadow-sm"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>
          </nav>
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg absolute w-full left-0 top-full z-40 animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-0 p-4 bg-white">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("home");
                  setMenuOpen(false);
                }}
                className="py-3 px-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
              >
                Home
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("about");
                  setMenuOpen(false);
                }}
                className="py-3 px-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
              >
                Sobre nosotros
              </a>
              <a
                href="#servicios"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("servicios");
                  setMenuOpen(false);
                }}
                className="py-3 px-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
              >
                Servicios
              </a>
              <a
                href="#trabajos"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("trabajos");
                  setMenuOpen(false);
                }}
                className="py-3 px-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
              >
                Trabajos
              </a>
              <a
                href="#contacto"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("contacto");
                  setMenuOpen(false);
                }}
                className="py-3 px-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
              >
                Contacto
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener"
                className="py-3 px-2 text-base font-medium text-green-600 hover:text-green-700 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center gap-2"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section
        id="home"
        className="relative h-screen flex items-center justify-center bg-black"
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
        <div className="relative z-10 max-w-2xl mx-auto text-center px-4 py-16">
          {/* Logo centered above the main headline - place image in public/round-indigo-rock.png */}
          <img
            src="/logo.png"
            alt="Round Indigo Rock logo"
            className="mx-auto mb-3 w-36 md:w-48 lg:w-64 h-auto object-contain"
          />
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
            Impresión e instalación OOH que destaca tu marca en la calle
          </h1>
          <p className="text-lg md:text-2xl text-white/90 mb-8 font-medium">
            Carteles, stickers, cercos de obra, tótems, flyers y folletos.
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
            Más de 17 años de experiencia en impresión y montaje OOH. Entregas
            rápidas, instalación segura y cobertura en AMBA. Nos eligen por
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

          {
            //TESTIMONIALS section commented out for now
            /* <div className="flex flex-col md:flex-row gap-4 mt-4">
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
          </div> */
          }
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
          <div className="flex flex-wrap justify-center items-center gap-2 mb-6">
            {FILTER_CATEGORIES.map((filter) => (
              <Button
                key={filter.key || "all"}
                variant={cat === filter.key ? "default" : "outline"}
                className="px-4 py-2"
                onClick={() => {
                  setCat(filter.key);
                  setShowAll(false);
                }}
              >
                {filter.label}
              </Button>
            ))}
          </div>
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
            {filteredPortfolio.map((img, i) => (
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
          {!showAll && filteredPortfolio.length > 8 && (
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
      <section
        id="contacto"
        ref={contactRef}
        className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
              Contactanos
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Estamos listos para ayudarte con tu proyecto. Envianos un mensaje
              y te respondemos en menos de 24hs.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Formulario */}
            <form
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 space-y-6"
              autoComplete="off"
              onSubmit={handleContactSubmit}
              aria-label="Formulario de contacto"
            >
              <div>
                <Label
                  htmlFor="nombre"
                  className="text-sm font-medium mb-2 block"
                >
                  Nombre completo
                </Label>
                <Input
                  id="nombre"
                  name="nombre"
                  type="text"
                  required
                  placeholder="Tu nombre"
                  className="w-full"
                  autoComplete="name"
                />
              </div>
              <div>
                <Label
                  htmlFor="email"
                  className="text-sm font-medium mb-2 block"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="tu@email.com"
                  className="w-full"
                  autoComplete="email"
                />
              </div>
              <div>
                <Label
                  htmlFor="telefono"
                  className="text-sm font-medium mb-2 block"
                >
                  Teléfono / WhatsApp
                </Label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  required
                  placeholder="+54 9 11 XXXX XXXX"
                  className="w-full"
                  autoComplete="tel"
                />
              </div>
              <div>
                <Label
                  htmlFor="mensaje"
                  className="text-sm font-medium mb-2 block"
                >
                  Mensaje (medidas, tipo de pieza, etc.)
                </Label>
                <Textarea
                  id="mensaje"
                  name="mensaje"
                  required
                  placeholder="Describe tu proyecto..."
                  rows={4}
                  className="w-full resize-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl"
                disabled={sending}
                aria-busy={sending}
              >
                {sending ? "Enviando..." : "Solicitar propuesta"}
              </Button>
              <p className="text-xs text-gray-500 text-center">
                * Tus datos serán usados solo para responder tu consulta. No
                compartimos información con terceros.
              </p>
            </form>
            {/* Datos de contacto */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 flex items-center gap-4 hover:shadow-lg transition-shadow">
                <Phone className="text-indigo-600" size={20} />
                <div>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener"
                    className="text-lg font-medium text-green-600 hover:underline block"
                  >
                    WhatsApp: +54 9 11 2722 7731
                  </a>
                  <p className="text-sm text-gray-500">
                    Llamanos o enviá un mensaje
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 flex items-center gap-4 hover:shadow-lg transition-shadow">
                <Mail className="text-indigo-600" size={20} />
                <div>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-lg font-medium text-indigo-600 hover:underline block"
                  >
                    {EMAIL}
                  </a>
                  <p className="text-sm text-gray-500">Envianos un email</p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 flex items-center gap-4 hover:shadow-lg transition-shadow">
                <Linkedin className="text-indigo-600" size={20} />
                <div>
                  <a
                    href="https://www.linkedin.com/in/cai-von-mühlen-3b55bb11/"
                    target="_blank"
                    rel="noopener"
                    className="text-lg font-medium text-indigo-600 hover:underline block"
                  >
                    LinkedIn
                  </a>
                  <p className="text-sm text-gray-500">
                    Conectemos profesionalmente
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 flex items-center gap-4 hover:shadow-lg transition-shadow">
                <Instagram className="text-indigo-600" size={20} />
                <div>
                  <a
                    href={INSTAGRAM_LINK}
                    target="_blank"
                    rel="noopener"
                    className="text-lg font-medium text-indigo-600 hover:underline block"
                  >
                    Instagram
                  </a>
                  <p className="text-sm text-gray-500">@roundindigorock</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <img
                  src="/logo.png"
                  alt="Round Indigo Rock"
                  className="h-8 w-auto"
                />
                <span className="font-bold text-lg">Round Indigo Rock</span>
              </div>
              <p className="text-sm text-gray-300">
                Más de 17 años creando soluciones OOH que destacan tu marca.
              </p>
              <p className="text-sm text-gray-400">Lunes a Viernes 9 a 18hs</p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Enlaces rápidos</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a
                    href="#home"
                    className="hover:text-indigo-400 transition-colors"
                  >
                    Inicio
                  </a>
                </li>
                <li>
                  <a
                    href="#servicios"
                    className="hover:text-indigo-400 transition-colors"
                  >
                    Servicios
                  </a>
                </li>
                <li>
                  <a
                    href="#trabajos"
                    className="hover:text-indigo-400 transition-colors"
                  >
                    Trabajos
                  </a>
                </li>
                <li>
                  <a
                    href="#contacto"
                    className="hover:text-indigo-400 transition-colors"
                  >
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            {/* Social & Contact */}
            <div className="space-y-4">
              <h4 className="font-semibold mb-4 text-white">Conectate</h4>
              <div className="flex gap-4 mb-4">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener"
                  aria-label="WhatsApp"
                  className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                >
                  <MessageCircle size={20} />
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  aria-label="Email"
                  className="p-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                >
                  <Mail size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/cai-von-mühlen-3b55bb11/"
                  target="_blank"
                  rel="noopener"
                  aria-label="LinkedIn"
                  className="p-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href={INSTAGRAM_LINK}
                  target="_blank"
                  rel="noopener"
                  aria-label="Instagram"
                  className="p-2 bg-pink-600 hover:bg-pink-700 rounded-lg transition-colors"
                >
                  <Instagram size={20} />
                </a>
              </div>
              <p className="text-sm text-gray-400">
                ¿Proyecto urgente?{" "}
                <a
                  href={WHATSAPP_LINK}
                  className="text-indigo-400 underline font-semibold hover:text-indigo-300"
                >
                  Escribinos por WhatsApp
                </a>
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Round Indigo Rock. Todos los derechos
            reservados.
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
