
import { createRoot } from "react-dom/client";
import "./styles/index.css";

const normalizedPath = window.location.pathname.replace(/\/+$/, "") || "/";

async function renderPage() {
  const { default: Page } =
    normalizedPath === "/tatuadora-fortaleza"
      ? await import("./app/LocalSeoPage.tsx")
      : await import("./app/App.tsx");

  createRoot(document.getElementById("root")!).render(<Page />);
}

void renderPage();
