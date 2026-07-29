
import { createRoot } from "react-dom/client";
import "./styles/index.css";

declare global {
  interface Window {
    gtag_report_conversion?: (url?: string) => boolean;
  }
}

const normalizedPath = window.location.pathname.replace(/\/+$/, "") || "/";
const sectionRoutes: Record<string, string> = {
  "/sobre": "sobre",
  "/portfolio": "estilos",
  "/estilos": "estilos",
  "/flash-desenhos": "flash",
  "/projetos-grande-escala": "escala",
  "/como-funciona": "processo",
  "/duvidas": "duvidas",
  "/cuidados": "cuidados",
  "/depoimentos": "depoimentos",
  "/orcamento": "orcamento",
  "/instagram": "instagram",
};

document.addEventListener("click", (event) => {
  const element = event.target;
  if (
    element instanceof Element &&
    element.closest<HTMLAnchorElement>('a[href*="wa.me"]')
  ) {
    window.gtag_report_conversion?.();
  }
});

function scrollToRequestedSection() {
  const sectionId = sectionRoutes[normalizedPath];
  if (!sectionId) return;

  const scroll = () =>
    document.getElementById(sectionId)?.scrollIntoView({ block: "start" });

  window.requestAnimationFrame(() => window.requestAnimationFrame(scroll));
  window.setTimeout(scroll, 400);
}

async function renderPage() {
  const { default: Page } =
    normalizedPath === "/tatuadora-fortaleza"
      ? await import("./app/LocalSeoPage.tsx")
      : normalizedPath === "/politica-de-privacidade"
        ? await import("./app/PrivacyPolicyPage.tsx")
      : await import("./app/App.tsx");

  createRoot(document.getElementById("root")!).render(<Page />);
  scrollToRequestedSection();
}

void renderPage();
