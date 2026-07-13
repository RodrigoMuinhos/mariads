import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Toaster, toast } from "sonner";
import * as Accordion from "@radix-ui/react-accordion";
import {
  MessageCircle,
  Instagram,
  ArrowUpRight,
  Menu,
  X,
  Star,
  Edit3,
  Plus,
  Trash2,
  Upload,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Settings,
  Save,
  Bold,
  Italic,
  ChevronUp,
  ChevronDown,
  GripVertical,
  Sun,
  Moon,
  Globe,
  Shield,
  ChevronRight,
  Cookie,
} from "lucide-react";

// ─── Translations ─────────────────────────────────────────────────────────────

type Lang = "pt" | "en";

const T = {
  pt: {
    nav_cta: "Solicitar orçamento",
    nav_about: "Sobre",
    nav_styles: "Estilos",
    nav_scale: "Grande Escala",
    nav_process: "Como Funciona",
    nav_testimonials: "Depoimentos",
    sec_about: "Sobre",
    sec_portfolio: "Portfolio",
    sec_scale: "Grande Escala",
    sec_process: "Processo",
    sec_clients: "Clientes",
    sec_contact: "Contato",
    follow_ig: "Seguir no Instagram",
    see_profile: "Ver perfil",
    wa_float: "Solicitar orçamento no WhatsApp",
    footer_contact: "Contato",
    footer_follow: "Redes sociais",
    footer_rights: "Todos os direitos reservados",
    drag_hint: "Arraste para reordenar",
    add_style: "+ Adicionar estilo",
    add_img: "+ Adicionar imagem",
    add_testimonial: "+ Adicionar depoimento",
    add_step: "+ Adicionar passo",
    remove: "Remover",
    insta_hint:
      "Clique em cada imagem para substituir pelas suas postagens reais.",
    settings_wa: "WhatsApp",
    settings_ig: "Instagram (URL)",
    settings_wa_hint: "Código do país + DDD + número, sem espaços",
    settings_hint_title: "Como usar o editor",
    settings_hint:
      "Pressione F8 5x para entrar no modo edição e 1x para sair. Duplo clique em texto para editar. Clique em imagem para substituir.",
    settings_danger: "Zona de perigo",
    settings_reset: "Restaurar conteúdo padrão",
    settings_reset_confirm:
      "Restaurar todo o conteúdo para o padrão? Esta ação não pode ser desfeita.",
    edit_bar: "Modo de edição",
    edit_hint:
      "· F8 para sair · para entrar: F8 5x · duplo clique = editar texto · clique na imagem = substituir · arraste = reordenar",
    publish: "Publicar",
    config: "Config",
    published_ok: "Site publicado!",
    published_desc: "Todas as alterações foram salvas com sucesso.",
    theme_label: "Tema",
    theme_dark: "Escuro",
    theme_light: "Claro",
    lang_label: "Idioma",
    flash_label: "Flash & Desenhos",
    flash_sec: "Disponíveis",
    flash_desc_ph: "Descrição do desenho",
    flash_price_ph: "Valor",
    flash_cta: "Tenho interesse",
    flash_add: "+ Adicionar desenho",
    flash_drag: "Arraste para reordenar",
    stats_years: "anos de carreira",
    stats_projects: "projetos realizados",
    stats_states: "estados atendidos",
    stats_styles: "estilos dominados",
    faq_label: "Dúvidas",
    faq_title: "Perguntas frequentes",
    aftercare_label: "Cuidados",
    aftercare_title: "Pós-tatuagem",
    cookie_msg:
      "Este site usa cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa",
    cookie_policy: "Política de Privacidade",
    cookie_accept: "Aceitar tudo",
    cookie_essential: "Apenas essenciais",
    privacy_title: "Política de Privacidade",
    privacy_close: "Fechar",
  },
  en: {
    nav_cta: "Request a quote",
    nav_about: "About",
    nav_styles: "Styles",
    nav_scale: "Large Scale",
    nav_process: "How it works",
    nav_testimonials: "Reviews",
    sec_about: "About",
    sec_portfolio: "Portfolio",
    sec_scale: "Large Scale",
    sec_process: "Process",
    sec_clients: "Clients",
    sec_contact: "Contact",
    follow_ig: "Follow on Instagram",
    see_profile: "View profile",
    wa_float: "Request a quote on WhatsApp",
    footer_contact: "Contact",
    footer_follow: "Social media",
    footer_rights: "All rights reserved",
    drag_hint: "Drag to reorder",
    add_style: "+ Add style",
    add_img: "+ Add image",
    add_testimonial: "+ Add testimonial",
    add_step: "+ Add step",
    remove: "Remove",
    insta_hint: "Click each image to replace with your real Instagram posts.",
    settings_wa: "WhatsApp",
    settings_ig: "Instagram (URL)",
    settings_wa_hint: "Country code + area code + number, no spaces",
    settings_hint_title: "How to use the editor",
    settings_hint:
      "Press F8 5x to enter edit mode and 1x to exit. Double-click text to edit. Click image to replace.",
    settings_danger: "Danger zone",
    settings_reset: "Restore default content",
    settings_reset_confirm:
      "Restore all content to default? This cannot be undone.",
    edit_bar: "Edit mode",
    edit_hint:
      "· F8 to exit · to enter: F8 5x · double-click = edit text · click image = replace · drag = reorder",
    publish: "Publish",
    config: "Settings",
    published_ok: "Site published!",
    published_desc: "All changes saved successfully.",
    theme_label: "Theme",
    theme_dark: "Dark",
    theme_light: "Light",
    lang_label: "Language",
    flash_label: "Flash & Designs",
    flash_sec: "Available",
    flash_desc_ph: "Design description",
    flash_price_ph: "Price",
    flash_cta: "I'm interested",
    flash_add: "+ Add design",
    flash_drag: "Drag to reorder",
    stats_years: "years of experience",
    stats_projects: "projects completed",
    stats_states: "states served",
    stats_styles: "styles mastered",
    faq_label: "FAQ",
    faq_title: "Frequently asked questions",
    aftercare_label: "Aftercare",
    aftercare_title: "Post-tattoo care",
    cookie_msg:
      "This site uses cookies to improve your experience. By continuing, you agree to our",
    cookie_policy: "Privacy Policy",
    cookie_accept: "Accept all",
    cookie_essential: "Essential only",
    privacy_title: "Privacy Policy",
    privacy_close: "Close",
  },
} as const;

// ─── Theme tokens ─────────────────────────────────────────────────────────────

type Theme = "dark" | "light";

const LIGHT_VARS: React.CSSProperties = {
  "--background": "#f2ece4",
  "--foreground": "#1a1917",
  "--card": "#e8e0d6",
  "--card-foreground": "#1a1917",
  "--popover": "#e8e0d6",
  "--popover-foreground": "#1a1917",
  "--primary": "#8c6d45",
  "--primary-foreground": "#f2ece4",
  "--secondary": "#ddd5c9",
  "--secondary-foreground": "#1a1917",
  "--muted": "#ddd5c9",
  "--muted-foreground": "#6b5e4e",
  "--accent": "#8c6d45",
  "--accent-foreground": "#f2ece4",
  "--border": "rgba(26,25,23,0.13)",
  "--ring": "#8c6d45",
} as React.CSSProperties;

// ─── Types ────────────────────────────────────────────────────────────────────

interface TextStyle {
  fontWeight?: "normal" | "bold";
  fontStyle?: "normal" | "italic";
  textAlign?: "left" | "center" | "right";
  color?: string;
  fontSize?: string;
}

interface StyleItem {
  id: string;
  name: string;
  desc: string;
  image: string;
}
interface GalleryItem {
  id: string;
  src: string;
  alt: string;
}
interface Testimonial {
  id: string;
  text: string;
  author: string;
  city: string;
  stars: number;
}
interface Step {
  id: string;
  num: string;
  title: string;
  desc: string;
}

interface InstaPost {
  id: string;
  src: string;
  alt: string;
}
interface FlashCard {
  id: string;
  image: string;
  description: string;
  price: string;
}

interface FaqItem {
  id: string;
  q: string;
  a: string;
}
interface StatItem {
  id: string;
  value: string;
  label: string;
}
interface AfterStep {
  id: string;
  day: string;
  text: string;
}

interface SiteContent {
  waNumber: string;
  instagram: string;
  textStyles: Record<string, TextStyle>;
  hero: {
    badge: string;
    title: string;
    titleItalic: string;
    subtitle: string;
    specialty: string;
    image: string;
    ctaLabel: string;
  };
  stats: StatItem[];
  about: { headline: string; body: string; ctaLabel: string };
  styles: StyleItem[];
  flashCards: FlashCard[];
  scale: {
    title: string;
    titleItalic: string;
    body: string;
    ctaLabel: string;
    images: GalleryItem[];
  };
  process: { steps: Step[]; ctaLabel: string };
  faq: FaqItem[];
  aftercare: AfterStep[];
  testimonials: Testimonial[];
  cta: { title: string; titleItalic: string; body: string; ctaLabel: string };
  instagramPosts: InstaPost[];
  footer: { tagline: string };
}

const API_BASE = (
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080"
).replace(/\/$/, "");
const DEFAULT_WA_NUMBER = "5585996327634";

function normalizeWaNumber(raw: string): string {
  const digits = (raw ?? "").replace(/\D/g, "");
  if (!digits) return DEFAULT_WA_NUMBER;
  if (digits === "5585999999999") return DEFAULT_WA_NUMBER;
  if (digits.startsWith("55")) return digits;
  if (digits.length === 10 || digits.length === 11) return `55${digits}`;
  return digits;
}

async function uploadImageToBackend(
  file: File,
  title: string,
  category = "site",
): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  form.append("title", title);
  form.append("altText", title);
  form.append("category", category);

  const response = await fetch(`${API_BASE}/api/images`, {
    method: "POST",
    body: form,
  });

  if (!response.ok) {
    throw new Error(`Falha no upload (${response.status})`);
  }

  const data = await response.json();
  if (!data?.imageUrl) {
    throw new Error("Backend não retornou imageUrl");
  }

  return data.imageUrl as string;
}

// ─── Default content ──────────────────────────────────────────────────────────

const DEFAULT: SiteContent = {
  waNumber: DEFAULT_WA_NUMBER,
  instagram: "https://instagram.com",
  textStyles: {},
  stats: [
    { id: "st1", value: "10+", label: "anos de carreira" },
    { id: "st2", value: "500+", label: "projetos realizados" },
    { id: "st3", value: "8", label: "estados atendidos" },
    { id: "st4", value: "8", label: "estilos dominados" },
  ],
  faq: [
    {
      id: "fq1",
      q: "Como funciona o processo de orçamento?",
      a: "Você entra em contato pelo WhatsApp, envia suas referências e informações sobre o projeto. Em seguida, recebo um orçamento personalizado em até 48 horas.",
    },
    {
      id: "fq2",
      q: "Com quanto tempo devo agendar?",
      a: "Recomendo agendar com pelo menos 2 a 4 semanas de antecedência. Projetos maiores podem exigir mais tempo de planejamento.",
    },
    {
      id: "fq3",
      q: "A tatuagem dói muito?",
      a: "A sensação varia conforme o local do corpo e o limiar de dor de cada pessoa. Trabalho com pausas e técnicas que tornam a sessão mais confortável.",
    },
    {
      id: "fq4",
      q: "Vocês fazem cover-up?",
      a: "Sim, faço projetos de cover-up mediante avaliação prévia da tatuagem existente. Entre em contato e envie uma foto para análise.",
    },
    {
      id: "fq5",
      q: "Como é calculado o valor?",
      a: "O valor é calculado com base no tamanho, complexidade do design, localização no corpo e número de sessões necessárias.",
    },
    {
      id: "fq6",
      q: "Posso parcelar o pagamento?",
      a: "Sim, trabalhamos com diversas formas de pagamento. Entre em contato para saber as opções disponíveis.",
    },
  ],
  aftercare: [
    {
      id: "ac1",
      day: "Dia 1–2",
      text: "Mantenha o curativo por 2 a 4 horas. Lave suavemente com água e sabão neutro. Não esfregue.",
    },
    {
      id: "ac2",
      day: "Dia 3–7",
      text: "Aplique hidratante sem perfume 2 a 3 vezes ao dia. Evite exposição solar direta e não mergulhe em piscinas ou mar.",
    },
    {
      id: "ac3",
      day: "Dia 7–14",
      text: "A pele começa a descamar. Não arranque. Continue hidratando e evite roupas que atritam na área.",
    },
    {
      id: "ac4",
      day: "Dia 15–30",
      text: "A tatuagem estará cicatrizada externamente. Proteja com protetor solar (FPS 50+) sempre que exposta ao sol.",
    },
  ],
  hero: {
    badge: "Tatuadora · Fortaleza, CE",
    title: "Ísis",
    titleItalic: "Mariana",
    subtitle: "Tatuagens autorais em Fortaleza",
    specialty:
      "Especialista em blackwork, ornamental e projetos de grande escala.",
    image:
      "https://images.unsplash.com/photo-1759096326551-9ad3745f0431?w=800&h=1000&fit=crop&auto=format",
    ctaLabel: "Solicitar orçamento",
  },
  about: {
    headline:
      "Com mais de 10 anos de carreira, Ísis Mariana desenvolve projetos autorais que unem técnica, composição e identidade visual.",
    body: "Atendendo em Fortaleza e também em outros estados através de guest spots e eventos, seu trabalho é voltado para clientes que buscam projetos personalizados e de longa duração.",
    ctaLabel: "Falar no WhatsApp",
  },
  styles: [
    {
      id: "s1",
      name: "Blackwork",
      desc: "Contraste, composição e presença.",
      image:
        "https://images.unsplash.com/photo-1640202352521-66c98a02e612?w=500&h=700&fit=crop&auto=format",
    },
    {
      id: "s2",
      name: "Ornamental",
      desc: "Inspirado em padrões decorativos, simetria e fluidez.",
      image:
        "https://images.unsplash.com/photo-1566485763217-b5dfcc375a09?w=500&h=700&fit=crop&auto=format",
    },
    {
      id: "s3",
      name: "Tribal",
      desc: "Linhas marcantes, movimento e identidade.",
      image:
        "https://images.unsplash.com/photo-1561377455-190afb395ed7?w=500&h=700&fit=crop&auto=format",
    },
    {
      id: "s4",
      name: "Geométrico",
      desc: "Precisão, equilíbrio e contraste.",
      image:
        "https://images.unsplash.com/photo-1714996073606-576df88a10ef?w=500&h=700&fit=crop&auto=format",
    },
    {
      id: "s5",
      name: "Preto e Cinza",
      desc: "Profundidade, textura e sutileza.",
      image:
        "https://images.unsplash.com/photo-1635527948959-1b47e7903cb9?w=500&h=700&fit=crop&auto=format",
    },
    {
      id: "s6",
      name: "Neo Tradicional",
      desc: "Cores marcantes e personalidade.",
      image:
        "https://images.unsplash.com/photo-1706300367311-6721c63ff826?w=500&h=700&fit=crop&auto=format",
    },
    {
      id: "s7",
      name: "Suminagashi",
      desc: "Fluxo, movimento e composições orgânicas.",
      image:
        "https://images.unsplash.com/photo-1586243287039-23f4c8e2e7ab?w=500&h=700&fit=crop&auto=format",
    },
    {
      id: "s8",
      name: "Anime",
      desc: "Referências da cultura pop traduzidas para a linguagem da tatuagem.",
      image:
        "https://images.unsplash.com/photo-1759096326551-9ad3745f0431?w=500&h=700&fit=crop&auto=format",
    },
  ],
  scale: {
    title: "Projetos de",
    titleItalic: "Grande Escala",
    body: "Braços, costas, pernas e composições completas desenvolvidas para acompanhar a anatomia e contar uma história através da tatuagem.",
    ctaLabel: "Quero desenvolver meu projeto",
    images: [
      {
        id: "g1",
        src: "https://images.unsplash.com/photo-1540174053853-1cc5d1fa8814?w=600&h=900&fit=crop&auto=format",
        alt: "Tatuagem nas costas",
      },
      {
        id: "g2",
        src: "https://images.unsplash.com/photo-1759247943094-38c725526a5d?w=600&h=900&fit=crop&auto=format",
        alt: "Fechamento de costas",
      },
      {
        id: "g3",
        src: "https://images.unsplash.com/photo-1566485763217-b5dfcc375a09?w=600&h=900&fit=crop&auto=format",
        alt: "Composição blackwork",
      },
      {
        id: "g4",
        src: "https://images.unsplash.com/photo-1561377455-190afb395ed7?w=600&h=900&fit=crop&auto=format",
        alt: "Projeto ornamental",
      },
    ],
  },
  process: {
    steps: [
      {
        id: "p1",
        num: "01",
        title: "Enviar referências",
        desc: "Compartilhe imagens, ideias e referências visuais do projeto que você deseja criar.",
      },
      {
        id: "p2",
        num: "02",
        title: "Informar o local do corpo",
        desc: "Indique onde a tatuagem será realizada para melhor planejamento da composição.",
      },
      {
        id: "p3",
        num: "03",
        title: "Informar o tamanho aproximado",
        desc: "Descreva as dimensões estimadas para que o orçamento seja preciso e personalizado.",
      },
      {
        id: "p4",
        num: "04",
        title: "Receber o orçamento",
        desc: "Você receberá um orçamento detalhado e personalizado para o seu projeto.",
      },
      {
        id: "p5",
        num: "05",
        title: "Agendar mediante sinal",
        desc: "Após aprovação, a sessão é confirmada com o pagamento de um sinal.",
      },
    ],
    ctaLabel: "Solicitar orçamento agora",
  },
  testimonials: [
    {
      id: "t1",
      text: "Trabalho impecável, atendimento cuidadoso e resultado acima do esperado.",
      author: "Mariana L.",
      city: "Fortaleza, CE",
      stars: 5,
    },
    {
      id: "t2",
      text: "Projeto feito com muita atenção aos detalhes. A tatuagem ficou exatamente como eu imaginava.",
      author: "Rafael S.",
      city: "São Paulo, SP",
      stars: 5,
    },
    {
      id: "t3",
      text: "Além da técnica, a composição ficou perfeita no corpo.",
      author: "Ana C.",
      city: "Fortaleza, CE",
      stars: 5,
    },
  ],
  cta: {
    title: "Vamos desenvolver",
    titleItalic: "seu próximo projeto?",
    body: "Entre em contato e solicite seu orçamento personalizado.",
    ctaLabel: "Conversar no WhatsApp",
  },
  flashCards: [
    {
      id: "f01",
      image:
        "https://images.unsplash.com/photo-1640202352521-66c98a02e612?w=540&h=960&fit=crop&auto=format",
      description: "Blackwork geométrico — braço",
      price: "R$ 450",
    },
    {
      id: "f02",
      image:
        "https://images.unsplash.com/photo-1566485763217-b5dfcc375a09?w=540&h=960&fit=crop&auto=format",
      description: "Ornamental mandala — costela",
      price: "R$ 600",
    },
    {
      id: "f03",
      image:
        "https://images.unsplash.com/photo-1561377455-190afb395ed7?w=540&h=960&fit=crop&auto=format",
      description: "Tribal perna completa",
      price: "Consultar",
    },
    {
      id: "f04",
      image:
        "https://images.unsplash.com/photo-1714996073606-576df88a10ef?w=540&h=960&fit=crop&auto=format",
      description: "Dragão blackwork — antebraço",
      price: "R$ 550",
    },
    {
      id: "f05",
      image:
        "https://images.unsplash.com/photo-1635527948959-1b47e7903cb9?w=540&h=960&fit=crop&auto=format",
      description: "Retrato em preto e cinza",
      price: "R$ 800",
    },
    {
      id: "f06",
      image:
        "https://images.unsplash.com/photo-1706300367311-6721c63ff826?w=540&h=960&fit=crop&auto=format",
      description: "Floral neo tradicional",
      price: "R$ 380",
    },
    {
      id: "f07",
      image:
        "https://images.unsplash.com/photo-1586243287039-23f4c8e2e7ab?w=540&h=960&fit=crop&auto=format",
      description: "Suminagashi — costas",
      price: "Consultar",
    },
    {
      id: "f08",
      image:
        "https://images.unsplash.com/photo-1759096326551-9ad3745f0431?w=540&h=960&fit=crop&auto=format",
      description: "Anime — personagem autoral",
      price: "R$ 420",
    },
    {
      id: "f09",
      image:
        "https://images.unsplash.com/photo-1540174053853-1cc5d1fa8814?w=540&h=960&fit=crop&auto=format",
      description: "Anjo blackwork — costas",
      price: "Consultar",
    },
    {
      id: "f10",
      image:
        "https://images.unsplash.com/photo-1759247943094-38c725526a5d?w=540&h=960&fit=crop&auto=format",
      description: "Fechamento — costas completo",
      price: "Consultar",
    },
  ],
  instagramPosts: [
    {
      id: "ig1",
      src: "https://images.unsplash.com/photo-1640202352521-66c98a02e612?w=600&h=600&fit=crop&auto=format",
      alt: "Postagem Instagram 1",
    },
    {
      id: "ig2",
      src: "https://images.unsplash.com/photo-1566485763217-b5dfcc375a09?w=600&h=600&fit=crop&auto=format",
      alt: "Postagem Instagram 2",
    },
    {
      id: "ig3",
      src: "https://images.unsplash.com/photo-1561377455-190afb395ed7?w=600&h=600&fit=crop&auto=format",
      alt: "Postagem Instagram 3",
    },
  ],
  footer: {
    tagline:
      "Tatuagens autorais, blackwork, ornamental e projetos de grande escala.",
  },
};

// ─── Storage ──────────────────────────────────────────────────────────────────

const STORAGE_KEY = "isis_site_v2";
const PLACEHOLDER_UPLOAD_IMAGE = "/placeholder-upload.svg";

function sanitizeImageUrl(url: string): string {
  if (!url) return PLACEHOLDER_UPLOAD_IMAGE;
  return url.includes("images.unsplash.com") ? PLACEHOLDER_UPLOAD_IMAGE : url;
}

function sanitizeContentImages(content: SiteContent): SiteContent {
  return {
    ...content,
    hero: { ...content.hero, image: sanitizeImageUrl(content.hero.image) },
    styles: content.styles.map((s) => ({
      ...s,
      image: sanitizeImageUrl(s.image),
    })),
    flashCards: content.flashCards.map((f) => ({
      ...f,
      image: sanitizeImageUrl(f.image),
    })),
    scale: {
      ...content.scale,
      images: content.scale.images.map((i) => ({
        ...i,
        src: sanitizeImageUrl(i.src),
      })),
    },
    instagramPosts: content.instagramPosts.map((i) => ({
      ...i,
      src: sanitizeImageUrl(i.src),
    })),
  };
}

function loadContent(): SiteContent {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    if (!s) return sanitizeContentImages(DEFAULT);
    const parsed = JSON.parse(s);
    // Merge with defaults so new fields are always present
    const merged: SiteContent = {
      ...DEFAULT,
      ...parsed,
      waNumber: normalizeWaNumber(parsed.waNumber ?? DEFAULT_WA_NUMBER),
      textStyles: parsed.textStyles ?? {},
      instagramPosts: parsed.instagramPosts ?? DEFAULT.instagramPosts,
      flashCards: parsed.flashCards ?? DEFAULT.flashCards,
      stats: parsed.stats ?? DEFAULT.stats,
      faq: parsed.faq ?? DEFAULT.faq,
      aftercare: parsed.aftercare ?? DEFAULT.aftercare,
    };
    return sanitizeContentImages(merged);
  } catch {
    return sanitizeContentImages(DEFAULT);
  }
}

function saveContent(c: SiteContent) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
  } catch {}
}

// ─── Drag-sort hook ───────────────────────────────────────────────────────────

function useDragSort<T extends { id: string }>(
  items: T[],
  onReorder: (next: T[]) => void,
  enabled: boolean,
) {
  const dragging = useRef<string | null>(null);

  return (item: T) => ({
    draggable: enabled,
    onDragStart: () => {
      dragging.current = item.id;
    },
    onDragOver: (e: React.DragEvent) => {
      e.preventDefault();
    },
    onDrop: () => {
      const fromId = dragging.current;
      dragging.current = null;
      if (!fromId || fromId === item.id) return;
      const from = items.findIndex((x) => x.id === fromId);
      const to = items.findIndex((x) => x.id === item.id);
      if (from < 0 || to < 0) return;
      const next = [...items];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      onReorder(next);
    },
    onDragEnd: () => {
      dragging.current = null;
    },
  });
}

// ─── EditableText ─────────────────────────────────────────────────────────────

function EditableText({
  id,
  value,
  onChange,
  editMode,
  onFocused,
  onBlurred,
  className,
  inlineStyle,
  as: Tag = "span",
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  editMode: boolean;
  onFocused?: (id: string) => void;
  onBlurred?: () => void;
  className?: string;
  inlineStyle?: React.CSSProperties;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  const isEditing = useRef(false);

  // Sync DOM ↔ state only when not actively typing
  useLayoutEffect(() => {
    if (ref.current && !isEditing.current) {
      if (ref.current.textContent !== value) ref.current.textContent = value;
    }
  });

  if (!editMode) {
    return (
      <Tag className={className} style={inlineStyle}>
        {value}
      </Tag>
    );
  }

  return (
    // @ts-ignore – dynamic tag with ref
    <Tag
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      className={`${className ?? ""} ring-1 ring-inset ring-primary/25 focus:ring-primary/70 outline-none cursor-text transition-shadow`}
      style={inlineStyle}
      onFocus={() => {
        isEditing.current = true;
        onFocused?.(id);
      }}
      onBlur={(e: React.FocusEvent<HTMLElement>) => {
        isEditing.current = false;
        onBlurred?.();
        const t = e.currentTarget.textContent ?? "";
        if (t !== value) onChange(t);
      }}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === "Escape") (e.currentTarget as HTMLElement).blur();
      }}
    />
  );
}

// ─── EditableImage ────────────────────────────────────────────────────────────

function EditableImage({
  src,
  alt,
  onChange,
  editMode,
  className,
  imgClassName,
  children,
}: {
  src: string;
  alt: string;
  onChange: (file: File) => void | Promise<void>;
  editMode: boolean;
  className?: string;
  imgClassName?: string;
  children?: React.ReactNode;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  return (
    <div className={`relative group/img ${className ?? ""}`}>
      <img src={src} alt={alt} className={imgClassName} />
      {children}
      {editMode && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-transparent hover:bg-black/55 transition-all cursor-pointer z-10"
          onClick={() => {
            if (!uploading) fileRef.current?.click();
          }}
        >
          <div className="opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center gap-2 pointer-events-none">
            <Upload size={22} className="text-white drop-shadow-lg" />
            <span className="text-white text-[10px] tracking-[0.2em] uppercase drop-shadow">
              {uploading ? "Enviando..." : "Substituir imagem"}
            </span>
          </div>
        </div>
      )}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          setUploading(true);
          try {
            await onChange(file);
          } finally {
            setUploading(false);
          }
          e.target.value = "";
        }}
      />
    </div>
  );
}

// ─── Floating text-format toolbar ────────────────────────────────────────────

const PALETTE = [
  { label: "Marfim", val: "#e4ddd3" },
  { label: "Bege", val: "#c8b99a" },
  { label: "Branco", val: "#ffffff" },
  { label: "Cinza", val: "#7a7265" },
  { label: "Preto", val: "#0c0c0b" },
];
const SIZES = [
  "0.7rem",
  "0.85rem",
  "1rem",
  "1.15rem",
  "1.4rem",
  "1.75rem",
  "2.5rem",
  "3.5rem",
  "5rem",
  "7rem",
];

function FormatToolbar({
  focusedId,
  textStyles,
  onStyle,
}: {
  focusedId: string | null;
  textStyles: Record<string, TextStyle>;
  onStyle: (id: string, patch: Partial<TextStyle>) => void;
}) {
  if (!focusedId) return null;
  const s = textStyles[focusedId] ?? {};
  const upd = (patch: Partial<TextStyle>) => onStyle(focusedId, patch);
  const sIdx = SIZES.indexOf(s.fontSize ?? "1rem");

  return (
    <div
      role="toolbar"
      aria-label="Formatação de texto"
      className="fixed bottom-16 lg:bottom-8 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-0.5 bg-[#111110] border border-border px-2.5 py-2 shadow-2xl rounded-none flex-wrap justify-center max-w-[96vw]"
    >
      {/* Bold */}
      <ToolBtn
        active={s.fontWeight === "bold"}
        onMouseDown={(e) => {
          e.preventDefault();
          upd({ fontWeight: s.fontWeight === "bold" ? "normal" : "bold" });
        }}
        title="Negrito"
      >
        <Bold size={12} />
      </ToolBtn>

      {/* Italic */}
      <ToolBtn
        active={s.fontStyle === "italic"}
        onMouseDown={(e) => {
          e.preventDefault();
          upd({ fontStyle: s.fontStyle === "italic" ? "normal" : "italic" });
        }}
        title="Itálico"
      >
        <Italic size={12} />
      </ToolBtn>

      <Sep />

      {/* Align */}
      {(["left", "center", "right"] as const).map((a) => {
        const Icon =
          a === "left" ? AlignLeft : a === "center" ? AlignCenter : AlignRight;
        return (
          <ToolBtn
            key={a}
            active={(s.textAlign ?? "left") === a}
            onMouseDown={(e) => {
              e.preventDefault();
              upd({ textAlign: a });
            }}
            title={`Alinhar ${a}`}
          >
            <Icon size={12} />
          </ToolBtn>
        );
      })}

      <Sep />

      {/* Colors */}
      {PALETTE.map((c) => (
        <button
          key={c.val}
          title={c.label}
          className={`w-5 h-5 border-2 transition-transform hover:scale-110 ${s.color === c.val ? "border-primary scale-125" : "border-transparent"}`}
          style={{ background: c.val }}
          onMouseDown={(e) => {
            e.preventDefault();
            upd({ color: c.val });
          }}
        />
      ))}

      <Sep />

      {/* Size */}
      <ToolBtn
        disabled={sIdx <= 0}
        onMouseDown={(e) => {
          e.preventDefault();
          upd({ fontSize: SIZES[Math.max(0, sIdx - 1)] });
        }}
        title="Diminuir"
      >
        <span className="text-[10px] font-mono leading-none">A-</span>
      </ToolBtn>
      <ToolBtn
        disabled={sIdx >= SIZES.length - 1}
        onMouseDown={(e) => {
          e.preventDefault();
          upd({ fontSize: SIZES[Math.min(SIZES.length - 1, sIdx + 1)] });
        }}
        title="Aumentar"
      >
        <span className="text-[10px] font-mono leading-none">A+</span>
      </ToolBtn>

      <Sep />
      <span className="text-[9px] text-muted-foreground/50 hidden sm:block px-1">
        F8 para sair
      </span>
    </div>
  );
}

function ToolBtn({
  children,
  active,
  disabled,
  title,
  onMouseDown,
}: {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  title?: string;
  onMouseDown?: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      title={title}
      disabled={disabled}
      onMouseDown={onMouseDown}
      className={`w-8 h-8 flex items-center justify-center transition-colors hover:bg-secondary disabled:opacity-25 ${active ? "text-primary bg-primary/10" : "text-muted-foreground"}`}
    >
      {children}
    </button>
  );
}
function Sep() {
  return <div className="w-px h-5 bg-border mx-0.5" />;
}

// ─── Settings panel ───────────────────────────────────────────────────────────

function SettingsPanel({
  open,
  content,
  onClose,
  onChange,
  theme,
  onTheme,
  lang,
  onLang,
  tKeys,
}: {
  open: boolean;
  content: SiteContent;
  onClose: () => void;
  onChange: (k: keyof SiteContent, v: string) => void;
  theme: Theme;
  onTheme: (t: Theme) => void;
  lang: Lang;
  onLang: (l: Lang) => void;
  tKeys: (typeof T)["pt"];
}) {
  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 z-[250] bg-black/30" onClick={onClose} />
      <div className="fixed top-0 right-0 bottom-0 z-[300] w-80 bg-card border-l border-border flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-5 h-14 border-b border-border flex-shrink-0">
          <span className="text-xs tracking-[0.2em] uppercase text-foreground">
            {tKeys.config}
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground"
          >
            <X size={15} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Theme toggle */}
          <SettingsField label={tKeys.theme_label}>
            <div className="flex gap-2">
              {(["dark", "light"] as const).map((th) => (
                <button
                  key={th}
                  onClick={() => onTheme(th)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs tracking-widest uppercase border transition-all ${theme === th ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground hover:border-foreground/40"}`}
                >
                  {th === "dark" ? <Moon size={12} /> : <Sun size={12} />}
                  {th === "dark" ? tKeys.theme_dark : tKeys.theme_light}
                </button>
              ))}
            </div>
          </SettingsField>

          {/* Language toggle */}
          <SettingsField label={tKeys.lang_label}>
            <div className="flex gap-2">
              {(["pt", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => onLang(l)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs tracking-widest uppercase border transition-all ${lang === l ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground hover:border-foreground/40"}`}
                >
                  <Globe size={12} /> {l.toUpperCase()}
                </button>
              ))}
            </div>
          </SettingsField>

          <div className="border-t border-border" />

          <SettingsField
            label={tKeys.settings_wa}
            hint={tKeys.settings_wa_hint}
          >
            <input
              type="text"
              value={content.waNumber}
              onChange={(e) => onChange("waNumber", e.target.value)}
              placeholder="5585999999999"
              className="w-full bg-background border border-border text-foreground text-sm px-3 py-2.5 focus:border-primary outline-none"
            />
          </SettingsField>
          <SettingsField label={tKeys.settings_ig}>
            <input
              type="text"
              value={content.instagram}
              onChange={(e) => onChange("instagram", e.target.value)}
              placeholder="https://instagram.com/seuperfil"
              className="w-full bg-background border border-border text-foreground text-sm px-3 py-2.5 focus:border-primary outline-none"
            />
          </SettingsField>

          <div className="border-t border-border pt-5 space-y-2">
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              <strong className="text-foreground block mb-1">
                {tKeys.settings_hint_title}
              </strong>
              {tKeys.settings_hint}
            </p>
          </div>

          <div className="border-t border-border pt-5">
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
              {tKeys.settings_danger}
            </p>
            <button
              onClick={() => {
                if (!confirm(tKeys.settings_reset_confirm)) return;
                localStorage.removeItem(STORAGE_KEY);
                window.location.reload();
              }}
              className="w-full border border-border text-muted-foreground text-xs tracking-widest uppercase py-2.5 hover:border-destructive hover:text-destructive transition-colors"
            >
              {tKeys.settings_reset}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function SettingsField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
        {label}
      </label>
      {children}
      {hint && (
        <p className="text-[10px] text-muted-foreground mt-1.5">{hint}</p>
      )}
    </div>
  );
}

// ─── Editor top bar ───────────────────────────────────────────────────────────

function EditorBar({
  onSettings,
  onPublish,
  tKeys,
}: {
  onSettings: () => void;
  onPublish: () => void;
  tKeys: (typeof T)["pt"];
}) {
  return (
    <div className="fixed top-0 inset-x-0 z-[100] h-9 bg-[#0e0e0d] border-b border-primary/25 flex items-center justify-between px-4 gap-2">
      <div className="flex items-center gap-2 min-w-0">
        <Edit3 size={11} className="text-primary flex-shrink-0" />
        <span className="text-[10px] tracking-[0.2em] uppercase text-primary flex-shrink-0">
          {tKeys.edit_bar}
        </span>
        <span className="text-[9px] text-muted-foreground ml-1 hidden md:block truncate">
          {tKeys.edit_hint}
        </span>
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <button
          onClick={onSettings}
          className="flex items-center gap-1.5 text-[10px] tracking-[0.12em] uppercase text-muted-foreground hover:text-foreground px-3 h-7 hover:bg-secondary transition-colors"
        >
          <Settings size={10} /> {tKeys.config}
        </button>
        <button
          onClick={onPublish}
          className="flex items-center gap-1.5 text-[10px] tracking-[0.12em] uppercase bg-primary text-primary-foreground px-4 h-7 hover:opacity-90 transition-opacity"
        >
          <Save size={10} /> {tKeys.publish}
        </button>
      </div>
    </div>
  );
}

// ─── Cookie Banner (LGPD) ────────────────────────────────────────────────────

function CookieBanner({ tKeys }: { tKeys: (typeof T)["pt"] }) {
  const [visible, setVisible] = useState(
    () => !localStorage.getItem("cookie_consent"),
  );
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const accept = (type: "all" | "essential") => {
    localStorage.setItem("cookie_consent", type);
    setVisible(false);
    if (type === "all") {
      // Here you would initialize Analytics/Meta Pixel
    }
  };

  return (
    <>
      {/* Privacy Policy Modal */}
      {privacyOpen && (
        <div className="fixed inset-0 z-[600] flex items-end sm:items-center justify-center bg-black/60 px-4 pb-4 sm:pb-0">
          <div className="bg-card border border-border w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-primary" />
                <span className="text-sm tracking-[0.1em] uppercase text-foreground">
                  {tKeys.privacy_title}
                </span>
              </div>
              <button
                onClick={() => setPrivacyOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground"
              >
                <X size={16} />
              </button>
            </div>
            <div className="overflow-y-auto p-6 space-y-5 text-sm text-muted-foreground leading-loose">
              <p>
                <strong className="text-foreground">
                  1. Responsável pelos dados
                </strong>
                <br />
                Ísis Mariana, tatuadora profissional com sede em Fortaleza, CE,
                Brasil. Contato: via WhatsApp ou Instagram indicados neste site.
              </p>
              <p>
                <strong className="text-foreground">2. Dados coletados</strong>
                <br />
                Este site não coleta dados pessoais diretamente. Ao clicar nos
                botões de WhatsApp ou Instagram, você é redirecionado para
                plataformas externas regidas pelas políticas de privacidade
                próprias dessas plataformas.
              </p>
              <p>
                <strong className="text-foreground">
                  3. Cookies e rastreamento
                </strong>
                <br />
                Utilizamos cookies essenciais para o funcionamento do site
                (preferências de tema e idioma, armazenadas localmente). Com seu
                consentimento, podemos utilizar cookies analíticos (Google
                Analytics) e de publicidade (Meta Pixel) para mensurar o
                desempenho das campanhas.
              </p>
              <p>
                <strong className="text-foreground">
                  4. Base legal (LGPD)
                </strong>
                <br />O tratamento de dados baseia-se no legítimo interesse
                (Art. 7º, IX, Lei 13.709/2018) e no consentimento do titular
                (Art. 7º, I) para cookies opcionais.
              </p>
              <p>
                <strong className="text-foreground">5. Seus direitos</strong>
                <br />
                Você tem direito a confirmar, acessar, corrigir, anonimizar,
                bloquear ou eliminar dados desnecessários, portabilidade,
                informação sobre compartilhamento e revogação do consentimento,
                nos termos dos Art. 17 a 22 da LGPD.
              </p>
              <p>
                <strong className="text-foreground">6. Compartilhamento</strong>
                <br />
                Nenhum dado coletado neste site é compartilhado com terceiros
                sem consentimento, exceto plataformas de análise devidamente
                autorizadas.
              </p>
              <p>
                <strong className="text-foreground">7. Contato</strong>
                <br />
                Para exercer seus direitos ou obter mais informações, entre em
                contato via WhatsApp ou Instagram indicados no rodapé deste
                site.
              </p>
              <p className="text-xs text-muted-foreground/60">
                Última atualização: julho de 2025
              </p>
            </div>
            <div className="px-6 py-4 border-t border-border flex-shrink-0">
              <button
                onClick={() => setPrivacyOpen(false)}
                className="bg-primary text-primary-foreground text-xs tracking-widest uppercase px-6 py-2.5 hover:opacity-90 transition-opacity"
              >
                {tKeys.privacy_close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Banner */}
      {visible && (
        <div className="fixed bottom-0 inset-x-0 z-[500] border-t border-border bg-card/98 backdrop-blur-sm px-5 py-4 lg:py-5 shadow-2xl">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Cookie
              size={18}
              className="text-primary flex-shrink-0 hidden sm:block"
            />
            <p className="text-xs text-muted-foreground leading-relaxed flex-1">
              {tKeys.cookie_msg}{" "}
              <button
                onClick={() => setPrivacyOpen(true)}
                className="text-primary underline underline-offset-2 hover:opacity-80"
              >
                {tKeys.cookie_policy}
              </button>
              .
            </p>
            <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto">
              <button
                onClick={() => accept("essential")}
                className="flex-1 sm:flex-none border border-border text-muted-foreground text-[10px] tracking-[0.15em] uppercase px-4 py-2.5 hover:border-foreground/40 hover:text-foreground transition-all min-h-[40px]"
              >
                {tKeys.cookie_essential}
              </button>
              <button
                onClick={() => accept("all")}
                className="flex-1 sm:flex-none bg-primary text-primary-foreground text-[10px] tracking-[0.15em] uppercase px-5 py-2.5 hover:opacity-90 transition-opacity min-h-[40px]"
              >
                {tKeys.cookie_accept}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── WA Button ────────────────────────────────────────────────────────────────

function WaLink({
  href,
  label,
  className,
}: {
  href: string;
  label: React.ReactNode;
  className: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <MessageCircle size={14} />
      {label}
      <ArrowUpRight size={12} />
    </a>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const lastF8ToggleAt = useRef(0);
  const f8PressCount = useRef(0);
  const f8WindowStartedAt = useRef(0);

  const [content, setContent] = useState<SiteContent>(loadContent);
  const [editMode, setEditMode] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem("site_theme") as Theme) ?? "dark",
  );
  const [lang, setLang] = useState<Lang>(
    () => (localStorage.getItem("site_lang") as Lang) ?? "pt",
  );
  const t = T[lang];

  // ── Flash carousel — avança 3 cards a cada 3 s ───────────────────────────
  const flashRef = useRef<HTMLDivElement>(null);
  const flashPaused = useRef(false);

  useEffect(() => {
    const el = flashRef.current;
    if (!el) return;

    const advance = () => {
      if (flashPaused.current) return;
      // largura de um card (primeiro filho)
      const card = el.firstElementChild as HTMLElement | null;
      if (!card) return;
      const cardW = card.offsetWidth + 12; // 12 = gap-3
      const step = cardW * 3; // avança 3 cards

      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft + step >= maxScroll - 4) {
        // chegou ao fim — volta ao início suavemente
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    };

    const timer = setInterval(advance, 3000);

    const pause = () => {
      flashPaused.current = true;
    };
    const resume = () => {
      flashPaused.current = false;
    };

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume);

    return () => {
      clearInterval(timer);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
    };
  }, []);

  // F8 → 5x para entrar no modo edição, 1x para sair
  useEffect(() => {
    const F8_ENTER_COUNT = 5;
    const F8_ENTER_WINDOW_MS = 4000;

    const resetF8Guard = () => {
      f8PressCount.current = 0;
      f8WindowStartedAt.current = 0;
    };

    const fn = (e: KeyboardEvent) => {
      if (e.key !== "F8") return;
      e.preventDefault();
      e.stopPropagation();
      if (e.repeat) return;

      const now = Date.now();
      if (now - lastF8ToggleAt.current < 250) return;
      lastF8ToggleAt.current = now;

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.isContentEditable ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA")
      ) {
        return;
      }

      if (editMode) {
        setEditMode(false);
        setSettingsOpen(false);
        setFocusedId(null);
        resetF8Guard();
        return;
      }

      if (
        !f8WindowStartedAt.current ||
        now - f8WindowStartedAt.current > F8_ENTER_WINDOW_MS
      ) {
        f8WindowStartedAt.current = now;
        f8PressCount.current = 0;
      }

      f8PressCount.current += 1;
      const remaining = F8_ENTER_COUNT - f8PressCount.current;

      if (remaining > 0) {
        toast.info(
          `Pressione F8 mais ${remaining}x para entrar no modo edição`,
        );
        return;
      }

      setEditMode(true);
      setSettingsOpen(false);
      setFocusedId(null);
      resetF8Guard();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [editMode]);

  // Auto-save every time content changes
  useEffect(() => {
    saveContent(content);
  }, [content]);

  // Persist theme & lang
  useEffect(() => {
    localStorage.setItem("site_theme", theme);
  }, [theme]);
  useEffect(() => {
    localStorage.setItem("site_lang", lang);
  }, [lang]);

  // Scroll — two thresholds: nav background + past-hero for floating bar
  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      setPastHero(y > window.innerHeight * 0.7);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // ── Derived ───────────────────────────────────────────────────────────────

  const WA_LINK = `https://wa.me/${normalizeWaNumber(content.waNumber)}?text=${encodeURIComponent("Olá, vim pelo site e gostaria de solicitar um orçamento para uma tatuagem.")}`;

  // ── Content helpers ───────────────────────────────────────────────────────

  const setDeep = (path: (string | number)[], value: unknown) => {
    setContent((prev) => {
      const next = JSON.parse(JSON.stringify(prev)) as SiteContent;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let obj: any = next;
      for (let i = 0; i < path.length - 1; i++) obj = obj[path[i]];
      obj[path[path.length - 1]] = value;
      return next;
    });
  };

  const setTopKey = (k: keyof SiteContent, v: string) =>
    setContent((prev) => ({
      ...prev,
      [k]: k === "waNumber" ? normalizeWaNumber(v) : v,
    }));

  const setTextStyle = (id: string, patch: Partial<TextStyle>) =>
    setContent((prev) => ({
      ...prev,
      textStyles: {
        ...prev.textStyles,
        [id]: { ...(prev.textStyles[id] ?? {}), ...patch },
      },
    }));

  const gStyle = (id: string): React.CSSProperties => {
    const s = content.textStyles[id];
    if (!s) return {};
    return {
      fontWeight: s.fontWeight,
      fontStyle: s.fontStyle,
      textAlign: s.textAlign,
      color: s.color,
      fontSize: s.fontSize,
    };
  };

  // ── EditableText factory ──────────────────────────────────────────────────

  const ET = (
    id: string,
    value: string,
    onChange: (v: string) => void,
    className = "",
    as_: React.ElementType = "span",
    extraStyle: React.CSSProperties = {},
  ) => (
    <EditableText
      id={id}
      value={value}
      onChange={onChange}
      editMode={editMode}
      onFocused={setFocusedId}
      onBlurred={() => setFocusedId(null)}
      className={className}
      inlineStyle={{ ...extraStyle, ...gStyle(id) }}
      as={as_}
    />
  );

  // ── EditableImage factory ─────────────────────────────────────────────────

  const EI = (
    src: string,
    alt: string,
    onChange: (file: File) => void | Promise<void>,
    className = "",
    imgClassName = "",
    children?: React.ReactNode,
  ) => (
    <EditableImage
      src={src}
      alt={alt}
      onChange={onChange}
      editMode={editMode}
      className={className}
      imgClassName={imgClassName}
    >
      {children}
    </EditableImage>
  );

  const uploadAndSetImage = async (
    file: File,
    title: string,
    setter: (url: string) => void,
    category = "site",
  ) => {
    try {
      const imageUrl = await uploadImageToBackend(file, title, category);
      setter(imageUrl);
      toast.success("Imagem enviada com sucesso");
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível enviar a imagem");
    }
  };

  // ── Drag-sort instances ───────────────────────────────────────────────────

  const stylesDrag = useDragSort(
    content.styles,
    (items) => setDeep(["styles"], items),
    editMode,
  );
  const galleryDrag = useDragSort(
    content.scale.images,
    (items) => setDeep(["scale", "images"], items),
    editMode,
  );
  const testimonialDrag = useDragSort(
    content.testimonials,
    (items) => setDeep(["testimonials"], items),
    editMode,
  );

  // ── Snippet helpers ───────────────────────────────────────────────────────

  const waBtn = (
    labelId: string,
    labelVal: string,
    labelSave: (v: string) => void,
    cls = "",
  ) => (
    <WaLink
      href={WA_LINK}
      className={`inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground text-xs tracking-[0.18em] uppercase px-6 py-4 min-h-[52px] hover:opacity-90 active:scale-[0.98] transition-all ${cls}`}
      label={ET(labelId, labelVal, labelSave)}
    />
  );

  const waBtnOutline = (
    labelId: string,
    labelVal: string,
    labelSave: (v: string) => void,
    cls = "",
  ) => (
    <WaLink
      href={WA_LINK}
      className={`inline-flex items-center justify-center gap-3 border border-border text-foreground text-xs tracking-[0.18em] uppercase px-6 py-4 min-h-[52px] hover:border-primary hover:text-primary active:scale-[0.98] transition-all ${cls}`}
      label={ET(labelId, labelVal, labelSave)}
    />
  );

  const editorOffset = editMode ? "mt-9" : "";
  const navTop = editMode ? "top-9" : "top-0";

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div
      className="bg-background text-foreground min-h-screen overflow-x-hidden"
      style={theme === "light" ? LIGHT_VARS : undefined}
    >
      <Toaster theme="dark" position="top-center" />
      <CookieBanner tKeys={t} />

      {/* ── Editor overlay ───────────────────────────────────────────────── */}
      {editMode && (
        <>
          <EditorBar
            tKeys={t}
            onSettings={() => setSettingsOpen((v) => !v)}
            onPublish={() => {
              saveContent(content);
              toast.success(t.published_ok, { description: t.published_desc });
            }}
          />
          <div
            className="fixed bottom-20 right-5 z-[150] w-9 h-9 bg-primary flex items-center justify-center shadow-xl"
            title="Modo de edição ativo"
          >
            <Edit3 size={14} className="text-primary-foreground" />
          </div>
        </>
      )}

      <SettingsPanel
        open={settingsOpen}
        content={content}
        onClose={() => setSettingsOpen(false)}
        onChange={setTopKey}
        theme={theme}
        onTheme={setTheme}
        lang={lang}
        onLang={setLang}
        tKeys={t}
      />
      <FormatToolbar
        focusedId={focusedId}
        textStyles={content.textStyles}
        onStyle={setTextStyle}
      />

      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <nav
        className={`fixed inset-x-0 z-50 transition-all duration-300 ${navTop} ${scrolled || menuOpen ? "bg-background/97 backdrop-blur-md border-b border-border" : "bg-transparent"}`}
      >
        <div className="flex items-center justify-between h-14 px-5 lg:px-12 max-w-7xl mx-auto">
          <span
            className="text-sm tracking-[0.2em] uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {content.hero.title} {content.hero.titleItalic}
          </span>
          <div className="hidden lg:flex items-center gap-3">
            {/* Lang toggle */}
            <button
              onClick={() => setLang((l) => (l === "pt" ? "en" : "pt"))}
              className="flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
              title={t.lang_label}
            >
              <Globe size={11} />
              {lang === "pt" ? "EN" : "PT"}
            </button>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-primary border border-primary/30 px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <MessageCircle size={11} /> {t.nav_cta}
            </a>
          </div>
          {/* Lang toggle — sempre visível no mobile */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setLang((l) => (l === "pt" ? "en" : "pt"))}
              className="flex items-center gap-1 text-[10px] tracking-[0.2em] uppercase text-muted-foreground border border-border/50 px-2.5 py-1.5 hover:border-primary hover:text-primary transition-all"
              aria-label={t.lang_label}
            >
              <Globe size={10} />
              {lang === "pt" ? "EN" : "PT"}
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center justify-center w-10 h-10"
              aria-label="Menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-border bg-background/97 px-5 py-5 flex flex-col gap-1">
            {[
              [t.nav_about, "#sobre"],
              [t.nav_styles, "#estilos"],
              [t.flash_label, "#flash"],
              [t.nav_scale, "#escala"],
              [t.nav_process, "#processo"],
              [t.nav_testimonials, "#depoimentos"],
            ].map(([l, h]) => (
              <a
                key={h}
                href={h}
                onClick={() => setMenuOpen(false)}
                className="text-sm tracking-[0.12em] uppercase text-muted-foreground py-3 border-b border-border/40 hover:text-foreground transition-colors"
              >
                {l}
              </a>
            ))}
            <div className="pt-4">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-primary text-primary-foreground text-xs tracking-[0.18em] uppercase w-full h-12"
              >
                <MessageCircle size={14} /> {t.nav_cta}{" "}
                <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className={`min-h-[100svh] flex flex-col ${editorOffset}`}>
        {/* Mobile image */}
        {EI(
          content.hero.image,
          "Hero",
          (file) =>
            uploadAndSetImage(
              file,
              "Hero principal",
              (url) => setDeep(["hero", "image"], url),
              "hero",
            ),
          "relative h-[52vh] lg:hidden bg-[#181817] overflow-hidden flex-shrink-0",
          "w-full h-full object-cover object-top opacity-80",
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />,
        )}

        {/* Desktop: absolute split */}
        <div
          className="hidden lg:block absolute inset-0"
          style={{ top: editMode ? "2.25rem" : 0 }}
        >
          <div className="absolute inset-y-0 right-0 w-[52%] bg-[#181817] overflow-hidden">
            {EI(
              content.hero.image,
              "Hero",
              (file) =>
                uploadAndSetImage(
                  file,
                  "Hero principal",
                  (url) => setDeep(["hero", "image"], url),
                  "hero",
                ),
              "w-full h-full",
              "w-full h-full object-cover opacity-75",
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent pointer-events-none" />,
            )}
          </div>
        </div>

        {/* Hero text */}
        <div className="relative z-10 flex flex-col justify-end flex-1 px-5 pb-14 lg:justify-center lg:pb-0 lg:px-20 lg:max-w-[52%]">
          {ET(
            "hero.badge",
            content.hero.badge,
            (v) => setDeep(["hero", "badge"], v),
            "text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-5 block",
          )}

          <div
            className="mb-6"
            style={{
              fontSize: "clamp(3.4rem,14vw,7.5rem)",
              fontFamily: "var(--font-display)",
              lineHeight: 0.88,
            }}
          >
            {ET(
              "hero.title",
              content.hero.title,
              (v) => setDeep(["hero", "title"], v),
              "block leading-[0.88] tracking-tight text-foreground",
            )}
            {ET(
              "hero.titleItalic",
              content.hero.titleItalic,
              (v) => setDeep(["hero", "titleItalic"], v),
              "italic block leading-[0.88] tracking-tight text-foreground",
            )}
          </div>

          <div className="w-10 h-px bg-primary mb-6" />
          {ET(
            "hero.subtitle",
            content.hero.subtitle,
            (v) => setDeep(["hero", "subtitle"], v),
            "text-base text-foreground/80 mb-2 leading-snug block",
          )}
          {ET(
            "hero.specialty",
            content.hero.specialty,
            (v) => setDeep(["hero", "specialty"], v),
            "text-sm text-muted-foreground mb-10 leading-relaxed max-w-xs block",
          )}

          {waBtn("hero.ctaLabel", content.hero.ctaLabel, (v) =>
            setDeep(["hero", "ctaLabel"], v),
          )}
        </div>
      </section>

      {/* ── STATS ───────────────────────────────────────────────────────── */}
      <div className="border-t border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-5 lg:px-20 grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
          {content.stats.map((s, i) => (
            <div key={s.id} className="py-7 px-4 lg:px-8 text-center group">
              <p
                className="text-3xl lg:text-4xl text-primary mb-1 transition-transform group-hover:scale-105 duration-300"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {editMode ? (
                  <EditableText
                    id={`stat.${s.id}.val`}
                    value={s.value}
                    onChange={(v) => setDeep(["stats", i, "value"], v)}
                    editMode={editMode}
                    onFocused={setFocusedId}
                    onBlurred={() => setFocusedId(null)}
                    inlineStyle={gStyle(`stat.${s.id}.val`)}
                    className="inline"
                  />
                ) : (
                  s.value
                )}
              </p>
              <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground leading-tight">
                {editMode ? (
                  <EditableText
                    id={`stat.${s.id}.lbl`}
                    value={s.label}
                    onChange={(v) => setDeep(["stats", i, "label"], v)}
                    editMode={editMode}
                    onFocused={setFocusedId}
                    onBlurred={() => setFocusedId(null)}
                    inlineStyle={gStyle(`stat.${s.id}.lbl`)}
                    className="inline"
                  />
                ) : (
                  s.label
                )}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── SOBRE ───────────────────────────────────────────────────────── */}
      <section
        id="sobre"
        className="py-20 lg:py-40 px-5 lg:px-20 border-t border-border scroll-mt-14"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-5">
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              Sobre
            </p>
            <div className="w-5 h-px bg-primary mt-2" />
          </div>
          <div className="lg:grid lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              {ET(
                "about.headline",
                content.about.headline,
                (v) => setDeep(["about", "headline"], v),
                "text-2xl lg:text-4xl leading-snug text-foreground mb-6 block",
                "p",
                { fontFamily: "var(--font-display)" },
              )}
              {ET(
                "about.body",
                content.about.body,
                (v) => setDeep(["about", "body"], v),
                "text-sm text-muted-foreground leading-loose mb-10 block",
                "p",
              )}
              {waBtnOutline(
                "about.ctaLabel",
                content.about.ctaLabel,
                (v) => setDeep(["about", "ctaLabel"], v),
                "w-full",
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── ESTILOS ─────────────────────────────────────────────────────── */}
      <section
        id="estilos"
        className="py-20 lg:py-40 px-5 lg:px-20 border-t border-border scroll-mt-14"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-5">
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              Portfolio
            </p>
            <div className="w-5 h-px bg-primary mt-2" />
          </div>
          <h2
            className="text-4xl lg:text-6xl text-foreground mb-10 leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Estilos
          </h2>

          {editMode && (
            <div className="mb-4 flex items-center gap-3 flex-wrap">
              <button
                onClick={() =>
                  setDeep(
                    ["styles"],
                    [
                      ...content.styles,
                      {
                        id: `s${Date.now()}`,
                        name: "Novo Estilo",
                        desc: "Clique para editar a descrição.",
                        image: PLACEHOLDER_UPLOAD_IMAGE,
                      },
                    ],
                  )
                }
                className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-primary border border-primary/30 px-3 py-2 hover:bg-primary/10 transition-colors"
              >
                <Plus size={11} /> Adicionar estilo
              </button>
              <span className="text-[10px] text-muted-foreground">
                Arraste para reordenar
              </span>
            </div>
          )}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {content.styles.map((s, i) => (
              <div
                key={s.id}
                className="group bg-background relative"
                {...stylesDrag(s)}
              >
                {editMode && (
                  <div className="absolute top-2 left-2 z-20 cursor-grab opacity-50 hover:opacity-100 select-none">
                    <GripVertical
                      size={14}
                      className="text-white drop-shadow"
                    />
                  </div>
                )}
                {editMode && (
                  <button
                    onClick={() =>
                      setDeep(
                        ["styles"],
                        content.styles.filter((x) => x.id !== s.id),
                      )
                    }
                    className="absolute top-2 right-2 z-20 w-6 h-6 bg-black/70 border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive"
                  >
                    <Trash2 size={11} className="text-white" />
                  </button>
                )}
                {EI(
                  s.image,
                  `Estilo ${s.name}`,
                  (file) =>
                    uploadAndSetImage(
                      file,
                      `Estilo ${s.name}`,
                      (url) => setDeep(["styles", i, "image"], url),
                      "styles",
                    ),
                  "aspect-[3/4] bg-[#111] overflow-hidden",
                  "w-full h-full object-cover opacity-65 group-hover:opacity-85 group-hover:scale-[1.04] transition-all duration-700",
                )}
                <div className="p-4 lg:p-5">
                  {ET(
                    `sty.${s.id}.name`,
                    s.name,
                    (v) => setDeep(["styles", i, "name"], v),
                    "text-base lg:text-lg text-foreground mb-1 block",
                    "h3",
                    { fontFamily: "var(--font-display)" },
                  )}
                  {ET(
                    `sty.${s.id}.desc`,
                    s.desc,
                    (v) => setDeep(["styles", i, "desc"], v),
                    "text-[11px] text-muted-foreground leading-relaxed mb-3 block",
                    "p",
                  )}
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MessageCircle size={10} /> Orçamento
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FLASH & DESENHOS ────────────────────────────────────────────── */}
      <section
        id="flash"
        className="py-20 lg:py-32 border-t border-border scroll-mt-14"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="px-5 lg:px-20 mb-8 flex items-end justify-between">
            <div>
              <div className="mb-5">
                <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                  {t.flash_sec}
                </p>
                <div className="w-5 h-px bg-primary mt-2" />
              </div>
              <h2
                className="text-4xl lg:text-6xl text-foreground leading-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t.flash_label}
              </h2>
            </div>
            {editMode && (
              <button
                onClick={() =>
                  setDeep(
                    ["flashCards"],
                    [
                      ...content.flashCards,
                      {
                        id: `f${Date.now()}`,
                        image: PLACEHOLDER_UPLOAD_IMAGE,
                        description: t.flash_desc_ph,
                        price: t.flash_price_ph,
                      },
                    ],
                  )
                }
                className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-primary border border-primary/30 px-4 py-2.5 hover:bg-primary/10 transition-colors flex-shrink-0"
              >
                <Plus size={12} /> {t.flash_add}
              </button>
            )}
          </div>

          {/* Horizontal carousel — scroll-snap */}
          <div
            ref={flashRef}
            className="flex gap-3 overflow-x-auto pb-4 px-5 lg:px-20"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              cursor: "grab",
            }}
            onMouseDown={(e) => {
              const el = e.currentTarget;
              flashPaused.current = true;
              const startX = e.pageX - el.offsetLeft;
              const startScroll = el.scrollLeft;
              const onMove = (ev: MouseEvent) => {
                el.scrollLeft =
                  startScroll - (ev.pageX - el.offsetLeft - startX);
              };
              const onUp = () => {
                window.removeEventListener("mousemove", onMove);
                window.removeEventListener("mouseup", onUp);
                setTimeout(() => {
                  flashPaused.current = false;
                }, 800);
              };
              window.addEventListener("mousemove", onMove);
              window.addEventListener("mouseup", onUp);
            }}
          >
            {content.flashCards.map((card, i) => (
              <div
                key={card.id}
                className="flex-shrink-0 flex flex-col group relative"
                style={{
                  width: "clamp(160px, 38vw, 220px)",
                  scrollSnapAlign: "start",
                }}
              >
                {/* 9:16 image */}
                <div
                  className="relative overflow-hidden bg-[#111]"
                  style={{ aspectRatio: "9/16" }}
                >
                  {EI(
                    card.image,
                    card.description,
                    (file) =>
                      uploadAndSetImage(
                        file,
                        card.description || `Flash ${i + 1}`,
                        (url) => setDeep(["flashCards", i, "image"], url),
                        "flash",
                      ),
                    "w-full h-full",
                    "w-full h-full object-cover opacity-80 group-hover:opacity-95 group-hover:scale-[1.03] transition-all duration-500",
                  )}

                  {/* Interest CTA on hover — not in edit mode */}
                  {!editMode && (
                    <a
                      href={`${WA_LINK.split("?")[0]}?text=${encodeURIComponent(`Olá! Tenho interesse no desenho: "${card.description}". Preço: ${card.price}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-primary text-primary-foreground text-[10px] tracking-[0.15em] uppercase flex items-center justify-center gap-2 h-10 z-10"
                    >
                      <MessageCircle size={11} /> {t.flash_cta}
                    </a>
                  )}

                  {/* Edit mode remove */}
                  {editMode && content.flashCards.length > 1 && (
                    <button
                      onClick={() =>
                        setDeep(
                          ["flashCards"],
                          content.flashCards.filter((x) => x.id !== card.id),
                        )
                      }
                      className="absolute top-2 right-2 z-20 w-6 h-6 bg-black/70 border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive"
                    >
                      <Trash2 size={10} className="text-white" />
                    </button>
                  )}
                  {editMode && (
                    <div className="absolute top-2 left-2 z-20 bg-black/60 px-1.5 py-0.5">
                      <span className="text-[9px] text-white/70 font-mono">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  )}
                </div>

                {/* Description + Price */}
                <div
                  className={`pt-3 pb-1 flex flex-col gap-2 ${editMode ? "ring-1 ring-inset ring-transparent hover:ring-border/50 px-1" : ""}`}
                >
                  {/* Description */}
                  <EditableText
                    id={`fl.${card.id}.desc`}
                    value={card.description}
                    onChange={(v) =>
                      setDeep(["flashCards", i, "description"], v)
                    }
                    editMode={editMode}
                    onFocused={setFocusedId}
                    onBlurred={() => setFocusedId(null)}
                    inlineStyle={gStyle(`fl.${card.id}.desc`)}
                    className="text-xs text-foreground/80 leading-snug block"
                    as="p"
                  />

                  {/* Price badge */}
                  <div className="flex items-center gap-2">
                    <EditableText
                      id={`fl.${card.id}.price`}
                      value={card.price}
                      onChange={(v) => setDeep(["flashCards", i, "price"], v)}
                      editMode={editMode}
                      onFocused={setFocusedId}
                      onBlurred={() => setFocusedId(null)}
                      inlineStyle={gStyle(`fl.${card.id}.price`)}
                      className={`text-[11px] font-medium tracking-wide px-2 py-0.5 inline-block ${
                        card.price.toLowerCase().includes("consul")
                          ? "text-muted-foreground border border-border"
                          : "text-primary border border-primary/40 bg-primary/8"
                      }`}
                      as="span"
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Add card inline — edit mode only */}
            {editMode && (
              <button
                onClick={() =>
                  setDeep(
                    ["flashCards"],
                    [
                      ...content.flashCards,
                      {
                        id: `f${Date.now()}`,
                        image: PLACEHOLDER_UPLOAD_IMAGE,
                        description: t.flash_desc_ph,
                        price: t.flash_price_ph,
                      },
                    ],
                  )
                }
                className="flex-shrink-0 flex flex-col items-center justify-center border border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                style={{
                  width: "clamp(160px, 38vw, 220px)",
                  aspectRatio: "9/16",
                }}
              >
                <Plus size={24} className="mb-2" />
                <span className="text-[10px] tracking-[0.15em] uppercase">
                  Adicionar
                </span>
              </button>
            )}
          </div>

          {/* Scroll hint dots on mobile */}
          <div className="flex justify-center gap-1.5 mt-5 lg:hidden px-5">
            {content.flashCards
              .slice(0, Math.min(content.flashCards.length, 8))
              .map((_, i) => (
                <div key={i} className="w-1 h-1 bg-border" />
              ))}
          </div>
        </div>
      </section>

      {/* ── GRANDE ESCALA ───────────────────────────────────────────────── */}
      <section
        id="escala"
        className="py-20 lg:py-40 px-5 lg:px-20 border-t border-border scroll-mt-14"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-5">
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              Grande Escala
            </p>
            <div className="w-5 h-px bg-primary mt-2" />
          </div>
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 mb-12">
            <div className="lg:col-span-8">
              <div
                className="text-4xl lg:text-6xl text-foreground leading-tight mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {ET(
                  "scale.title",
                  content.scale.title,
                  (v) => setDeep(["scale", "title"], v),
                  "block",
                )}
                {ET(
                  "scale.titleItalic",
                  content.scale.titleItalic,
                  (v) => setDeep(["scale", "titleItalic"], v),
                  "italic block",
                )}
              </div>
              {ET(
                "scale.body",
                content.scale.body,
                (v) => setDeep(["scale", "body"], v),
                "text-sm text-muted-foreground leading-loose max-w-lg block",
                "p",
              )}
            </div>
          </div>

          {/* Desktop asymmetric gallery */}
          <div
            className="hidden lg:grid lg:grid-cols-3 lg:grid-rows-2 gap-px bg-border"
            style={{ height: 640 }}
          >
            {content.scale.images.slice(0, 4).map((img, i) => {
              const span =
                i === 0
                  ? "lg:col-span-1 lg:row-span-2"
                  : i === 1
                    ? "lg:col-span-2 lg:row-span-1"
                    : "lg:col-span-1 lg:row-span-1";
              return (
                <div
                  key={img.id}
                  className={`${span} relative bg-[#111] overflow-hidden group`}
                  {...galleryDrag(img)}
                >
                  {editMode && (
                    <div className="absolute top-2 left-2 z-20 cursor-grab opacity-40 hover:opacity-100 select-none">
                      <GripVertical
                        size={14}
                        className="text-white drop-shadow"
                      />
                    </div>
                  )}
                  {editMode && content.scale.images.length > 1 && (
                    <button
                      onClick={() =>
                        setDeep(
                          ["scale", "images"],
                          content.scale.images.filter((x) => x.id !== img.id),
                        )
                      }
                      className="absolute top-2 right-2 z-20 w-6 h-6 bg-black/70 border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive"
                    >
                      <Trash2 size={11} className="text-white" />
                    </button>
                  )}
                  {EI(
                    img.src,
                    img.alt,
                    (file) =>
                      uploadAndSetImage(
                        file,
                        img.alt || `Galeria ${i + 1}`,
                        (url) => setDeep(["scale", "images", i, "src"], url),
                        "gallery",
                      ),
                    "w-full h-full",
                    "w-full h-full object-cover opacity-70 hover:opacity-90 hover:scale-[1.04] transition-all duration-700",
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile gallery */}
          <div className="grid grid-cols-2 gap-px bg-border lg:hidden">
            {content.scale.images.map((img, i) => (
              <div
                key={img.id}
                className="relative aspect-[2/3] bg-[#111] overflow-hidden group"
                {...galleryDrag(img)}
              >
                {editMode && content.scale.images.length > 1 && (
                  <button
                    onClick={() =>
                      setDeep(
                        ["scale", "images"],
                        content.scale.images.filter((x) => x.id !== img.id),
                      )
                    }
                    className="absolute top-2 right-2 z-20 w-6 h-6 bg-black/70 border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive"
                  >
                    <Trash2 size={11} className="text-white" />
                  </button>
                )}
                {EI(
                  img.src,
                  img.alt,
                  (file) =>
                    uploadAndSetImage(
                      file,
                      img.alt || `Galeria ${i + 1}`,
                      (url) => setDeep(["scale", "images", i, "src"], url),
                      "gallery",
                    ),
                  "w-full h-full",
                  "w-full h-full object-cover opacity-70 transition-all duration-700",
                )}
              </div>
            ))}
          </div>

          {editMode && (
            <div className="mt-4">
              <button
                onClick={() =>
                  setDeep(
                    ["scale", "images"],
                    [
                      ...content.scale.images,
                      {
                        id: `g${Date.now()}`,
                        src: PLACEHOLDER_UPLOAD_IMAGE,
                        alt: "Nova imagem",
                      },
                    ],
                  )
                }
                className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-primary border border-primary/30 px-3 py-2 hover:bg-primary/10 transition-colors"
              >
                <Plus size={11} /> Adicionar imagem à galeria
              </button>
            </div>
          )}

          <div className="mt-10">
            {waBtn(
              "scale.ctaLabel",
              content.scale.ctaLabel,
              (v) => setDeep(["scale", "ctaLabel"], v),
              "w-full",
            )}
          </div>
        </div>
      </section>

      {/* ── PROCESSO ────────────────────────────────────────────────────── */}
      <section
        id="processo"
        className="py-20 lg:py-40 px-5 lg:px-20 border-t border-border bg-card scroll-mt-14"
      >
        <div className="max-w-3xl mx-auto">
          <div className="mb-5">
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              Processo
            </p>
            <div className="w-5 h-px bg-primary mt-2" />
          </div>
          <h2
            className="text-4xl lg:text-6xl text-foreground mb-12 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Como solicitar
            <br />
            seu orçamento
          </h2>

          {content.process.steps.map((step, i) => (
            <div key={step.id} className="flex gap-5 group relative">
              {editMode && (
                <div className="absolute -left-8 top-6 flex flex-col gap-1">
                  {i > 0 && (
                    <button
                      onClick={() => {
                        const a = [...content.process.steps];
                        [a[i - 1], a[i]] = [a[i], a[i - 1]];
                        setDeep(["process", "steps"], a);
                      }}
                      className="w-5 h-5 border border-border flex items-center justify-center hover:border-primary text-muted-foreground hover:text-primary"
                    >
                      <ChevronUp size={10} />
                    </button>
                  )}
                  {i < content.process.steps.length - 1 && (
                    <button
                      onClick={() => {
                        const a = [...content.process.steps];
                        [a[i], a[i + 1]] = [a[i + 1], a[i]];
                        setDeep(["process", "steps"], a);
                      }}
                      className="w-5 h-5 border border-border flex items-center justify-center hover:border-primary text-muted-foreground hover:text-primary"
                    >
                      <ChevronDown size={10} />
                    </button>
                  )}
                </div>
              )}
              <div className="flex flex-col items-center flex-shrink-0 w-9">
                <div
                  className="w-px bg-border h-5"
                  style={{ opacity: i === 0 ? 0 : 1 }}
                />
                <div className="w-9 h-9 flex-shrink-0 border border-border flex items-center justify-center font-mono text-[10px] tracking-wider text-muted-foreground group-hover:border-primary group-hover:text-primary transition-all duration-300">
                  {ET(`stp.${step.id}.num`, step.num, (v) =>
                    setDeep(["process", "steps", i, "num"], v),
                  )}
                </div>
                <div
                  className="w-px bg-border flex-1 min-h-6"
                  style={{
                    opacity: i === content.process.steps.length - 1 ? 0 : 1,
                  }}
                />
              </div>
              <div className="pb-8 pt-1 flex-1">
                {ET(
                  `stp.${step.id}.title`,
                  step.title,
                  (v) => setDeep(["process", "steps", i, "title"], v),
                  "text-xl lg:text-2xl text-foreground mb-1 block",
                  "h3",
                  { fontFamily: "var(--font-display)" },
                )}
                {ET(
                  `stp.${step.id}.desc`,
                  step.desc,
                  (v) => setDeep(["process", "steps", i, "desc"], v),
                  "text-sm text-muted-foreground leading-relaxed block",
                  "p",
                )}
                {editMode && (
                  <button
                    onClick={() =>
                      setDeep(
                        ["process", "steps"],
                        content.process.steps.filter((x) => x.id !== step.id),
                      )
                    }
                    className="mt-2 flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 size={9} /> Remover passo
                  </button>
                )}
              </div>
            </div>
          ))}

          {editMode && (
            <button
              onClick={() =>
                setDeep(
                  ["process", "steps"],
                  [
                    ...content.process.steps,
                    {
                      id: `p${Date.now()}`,
                      num: `0${content.process.steps.length + 1}`,
                      title: "Novo passo",
                      desc: "Clique para editar a descrição.",
                    },
                  ],
                )
              }
              className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-primary border border-primary/30 px-3 py-2 mb-8 hover:bg-primary/10 transition-colors"
            >
              <Plus size={11} /> Adicionar passo
            </button>
          )}

          {waBtn(
            "process.ctaLabel",
            content.process.ctaLabel,
            (v) => setDeep(["process", "ctaLabel"], v),
            "w-full",
          )}
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-36 px-5 lg:px-20 border-t border-border bg-card">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="mb-5">
              <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                {t.faq_label}
              </p>
              <div className="w-5 h-px bg-primary mt-2" />
            </div>
            <h2
              className="text-4xl lg:text-5xl text-foreground leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.faq_title}
            </h2>
            {editMode && (
              <button
                onClick={() =>
                  setDeep(
                    ["faq"],
                    [
                      ...content.faq,
                      {
                        id: `fq${Date.now()}`,
                        q: "Nova pergunta?",
                        a: "Resposta aqui.",
                      },
                    ],
                  )
                }
                className="mt-6 flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-primary border border-primary/30 px-3 py-2 hover:bg-primary/10 transition-colors"
              >
                <Plus size={11} /> Adicionar pergunta
              </button>
            )}
          </div>

          <div className="lg:col-span-8">
            <Accordion.Root type="single" collapsible className="space-y-0">
              {content.faq.map((item, i) => (
                <Accordion.Item
                  key={item.id}
                  value={item.id}
                  className="border-b border-border group"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="w-full flex items-center justify-between py-5 text-left gap-4 hover:text-primary transition-colors">
                      <span className="text-sm font-medium text-foreground group-data-[state=open]:text-primary transition-colors">
                        {editMode ? (
                          <EditableText
                            id={`fq.${item.id}.q`}
                            value={item.q}
                            onChange={(v) => setDeep(["faq", i, "q"], v)}
                            editMode={editMode}
                            onFocused={setFocusedId}
                            onBlurred={() => setFocusedId(null)}
                            className="block"
                          />
                        ) : (
                          item.q
                        )}
                      </span>
                      <ChevronRight
                        size={14}
                        className="text-muted-foreground flex-shrink-0 transition-transform group-data-[state=open]:rotate-90"
                      />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                    <div className="pb-5 flex items-start gap-4">
                      <p className="text-sm text-muted-foreground leading-loose flex-1">
                        {editMode ? (
                          <EditableText
                            id={`fq.${item.id}.a`}
                            value={item.a}
                            onChange={(v) => setDeep(["faq", i, "a"], v)}
                            editMode={editMode}
                            onFocused={setFocusedId}
                            onBlurred={() => setFocusedId(null)}
                            className="block"
                            as="span"
                          />
                        ) : (
                          item.a
                        )}
                      </p>
                      {editMode && (
                        <button
                          onClick={() =>
                            setDeep(
                              ["faq"],
                              content.faq.filter((x) => x.id !== item.id),
                            )
                          }
                          className="flex-shrink-0 w-6 h-6 border border-border flex items-center justify-center hover:border-destructive hover:text-destructive text-muted-foreground transition-colors"
                        >
                          <Trash2 size={10} />
                        </button>
                      )}
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>

            <div className="mt-8">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-border text-foreground text-xs tracking-[0.18em] uppercase px-6 py-4 min-h-[52px] hover:border-primary hover:text-primary active:scale-[0.98] transition-all"
              >
                <MessageCircle size={14} />{" "}
                {lang === "pt" ? "Tenho outra dúvida" : "Ask another question"}{" "}
                <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CUIDADOS PÓS-TATUAGEM ────────────────────────────────────────── */}
      <section className="py-20 lg:py-36 px-5 lg:px-20 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 mb-12">
            <div className="lg:col-span-4 mb-8 lg:mb-0">
              <div className="mb-5">
                <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                  {t.aftercare_label}
                </p>
                <div className="w-5 h-px bg-primary mt-2" />
              </div>
              <h2
                className="text-4xl lg:text-5xl text-foreground leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t.aftercare_title}
              </h2>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
              {content.aftercare.map((step, i) => (
                <div
                  key={step.id}
                  className="bg-background p-6 lg:p-8 group relative"
                >
                  {editMode && (
                    <button
                      onClick={() =>
                        setDeep(
                          ["aftercare"],
                          content.aftercare.filter((x) => x.id !== step.id),
                        )
                      }
                      className="absolute top-3 right-3 w-6 h-6 border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 hover:border-destructive hover:text-destructive text-muted-foreground transition-all"
                    >
                      <Trash2 size={10} />
                    </button>
                  )}
                  <div className="inline-block border border-primary/40 text-primary text-[10px] tracking-[0.2em] uppercase px-2 py-1 mb-4">
                    {editMode ? (
                      <EditableText
                        id={`ac.${step.id}.day`}
                        value={step.day}
                        onChange={(v) => setDeep(["aftercare", i, "day"], v)}
                        editMode={editMode}
                        onFocused={setFocusedId}
                        onBlurred={() => setFocusedId(null)}
                        className="inline"
                      />
                    ) : (
                      step.day
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-loose">
                    {editMode ? (
                      <EditableText
                        id={`ac.${step.id}.text`}
                        value={step.text}
                        onChange={(v) => setDeep(["aftercare", i, "text"], v)}
                        editMode={editMode}
                        onFocused={setFocusedId}
                        onBlurred={() => setFocusedId(null)}
                        className="block"
                        as="span"
                      />
                    ) : (
                      step.text
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {editMode && (
            <button
              onClick={() =>
                setDeep(
                  ["aftercare"],
                  [
                    ...content.aftercare,
                    {
                      id: `ac${Date.now()}`,
                      day: "Período",
                      text: "Instrução de cuidado.",
                    },
                  ],
                )
              }
              className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-primary border border-primary/30 px-3 py-2 hover:bg-primary/10 transition-colors"
            >
              <Plus size={11} /> Adicionar período
            </button>
          )}
        </div>
      </section>

      {/* ── DEPOIMENTOS ─────────────────────────────────────────────────── */}
      <section
        id="depoimentos"
        className="py-20 lg:py-40 px-5 lg:px-20 border-t border-border scroll-mt-14"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-5">
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              Clientes
            </p>
            <div className="w-5 h-px bg-primary mt-2" />
          </div>
          <h2
            className="text-4xl lg:text-6xl text-foreground mb-10 leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Experiências
          </h2>

          {editMode && (
            <div className="mb-4 flex items-center gap-3">
              <button
                onClick={() =>
                  setDeep(
                    ["testimonials"],
                    [
                      ...content.testimonials,
                      {
                        id: `t${Date.now()}`,
                        text: "Clique para editar o depoimento.",
                        author: "Nome do cliente",
                        city: "Cidade, UF",
                        stars: 5,
                      },
                    ],
                  )
                }
                className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-primary border border-primary/30 px-3 py-2 hover:bg-primary/10 transition-colors"
              >
                <Plus size={11} /> Adicionar depoimento
              </button>
              <span className="text-[10px] text-muted-foreground">
                Arraste para reordenar
              </span>
            </div>
          )}

          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-px bg-border">
            {content.testimonials.map((t, i) => (
              <div
                key={t.id}
                className="bg-background p-7 lg:p-10 flex flex-col relative group"
                {...testimonialDrag(t)}
              >
                {editMode && (
                  <div className="absolute top-3 left-3 cursor-grab opacity-40 hover:opacity-100 select-none">
                    <GripVertical size={13} className="text-muted-foreground" />
                  </div>
                )}
                {editMode && content.testimonials.length > 1 && (
                  <button
                    onClick={() =>
                      setDeep(
                        ["testimonials"],
                        content.testimonials.filter((x) => x.id !== t.id),
                      )
                    }
                    className="absolute top-3 right-3 w-6 h-6 border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:border-destructive hover:text-destructive text-muted-foreground"
                  >
                    <Trash2 size={10} />
                  </button>
                )}

                {/* Star rating — clickable in edit mode */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star
                      key={si}
                      size={11}
                      className={`${si < t.stars ? "text-primary fill-primary" : "text-muted-foreground/30"} ${editMode ? "cursor-pointer" : ""}`}
                      onClick={
                        editMode
                          ? () => setDeep(["testimonials", i, "stars"], si + 1)
                          : undefined
                      }
                    />
                  ))}
                </div>

                <span
                  className="text-4xl text-primary leading-none mb-4 select-none"
                  style={{ fontFamily: "var(--font-display)" }}
                  aria-hidden
                >
                  &ldquo;
                </span>

                {ET(
                  `tes.${t.id}.text`,
                  t.text,
                  (v) => setDeep(["testimonials", i, "text"], v),
                  "text-sm text-foreground/80 leading-loose flex-1 mb-8 italic block",
                  "p",
                )}

                <div className="border-t border-border pt-5">
                  {ET(
                    `tes.${t.id}.author`,
                    t.author,
                    (v) => setDeep(["testimonials", i, "author"], v),
                    "text-sm font-medium text-foreground block",
                  )}
                  {ET(
                    `tes.${t.id}.city`,
                    t.city,
                    (v) => setDeep(["testimonials", i, "city"], v),
                    "text-[11px] text-muted-foreground mt-0.5 block",
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ───────────────────────────────────────────────────── */}
      <section className="relative py-28 lg:py-48 px-5 lg:px-20 border-t border-border bg-card overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          aria-hidden
        >
          <img
            src={PLACEHOLDER_UPLOAD_IMAGE}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-card/60 to-card/60 pointer-events-none" />
        <div className="relative max-w-2xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-6">
            Contato
          </p>
          <div
            className="text-4xl lg:text-6xl text-foreground leading-tight mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {ET(
              "cta.title",
              content.cta.title,
              (v) => setDeep(["cta", "title"], v),
              "block",
            )}
            {ET(
              "cta.titleItalic",
              content.cta.titleItalic,
              (v) => setDeep(["cta", "titleItalic"], v),
              "italic block",
            )}
          </div>
          {ET(
            "cta.body",
            content.cta.body,
            (v) => setDeep(["cta", "body"], v),
            "text-sm text-muted-foreground mb-10 leading-loose block",
            "p",
          )}
          {waBtn(
            "cta.ctaLabel",
            content.cta.ctaLabel,
            (v) => setDeep(["cta", "ctaLabel"], v),
            "w-full py-5 text-sm",
          )}
        </div>
      </section>

      {/* ── INSTAGRAM CAROUSEL ──────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 px-5 lg:px-20 border-t border-border">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Instagram size={16} className="text-foreground" />
              <div>
                <p className="text-xs tracking-[0.25em] uppercase text-foreground font-medium">
                  Instagram
                </p>
                <a
                  href={content.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-muted-foreground hover:text-primary transition-colors tracking-wide"
                >
                  {content.instagram
                    .replace("https://instagram.com/", "@")
                    .replace("https://www.instagram.com/", "@")}
                </a>
              </div>
            </div>
            <a
              href={content.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              Ver perfil <ArrowUpRight size={11} />
            </a>
          </div>

          {/* Posts grid / carousel */}
          <div className="grid grid-cols-3 gap-px bg-border">
            {content.instagramPosts.map((post, i) => (
              <div
                key={post.id}
                className="relative group aspect-square bg-[#111] overflow-hidden"
              >
                {EI(
                  post.src,
                  post.alt,
                  (file) =>
                    uploadAndSetImage(
                      file,
                      post.alt || `Instagram ${i + 1}`,
                      (url) => setDeep(["instagramPosts", i, "src"], url),
                      "instagram",
                    ),
                  "w-full h-full",
                  "w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-500",
                )}
                {/* Hover overlay — links to Instagram (not in edit mode) */}
                {!editMode && (
                  <a
                    href={content.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/40 transition-all duration-300 z-10"
                  >
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Instagram
                        size={22}
                        className="text-white drop-shadow-lg"
                      />
                    </div>
                  </a>
                )}
                {/* Edit mode label */}
                {editMode && (
                  <div className="absolute bottom-2 left-2 right-2 z-20 pointer-events-none">
                    <span className="text-[9px] tracking-widest uppercase text-white/50">
                      Post {i + 1}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Horizontal scroll hint on mobile */}
          <div className="flex justify-center mt-6">
            <a
              href={content.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-muted-foreground border border-border px-5 py-3 hover:border-primary hover:text-primary transition-all duration-300 min-h-[44px]"
            >
              <Instagram size={13} /> Seguir no Instagram
            </a>
          </div>

          {editMode && (
            <p className="text-[10px] text-muted-foreground/60 text-center mt-4">
              Clique em cada imagem para substituir pelas suas postagens reais
              do Instagram.
            </p>
          )}
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-border bg-card">
        {/* Main footer grid */}
        <div className="max-w-7xl mx-auto px-5 lg:px-20 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <p
              className="text-2xl text-foreground mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {content.hero.title}{" "}
              <span className="italic">{content.hero.titleItalic}</span>
            </p>
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
              Fortaleza · CE
            </p>
            {ET(
              "footer.tagline",
              content.footer.tagline,
              (v) => setDeep(["footer", "tagline"], v),
              "text-xs text-muted-foreground/70 leading-relaxed block max-w-[220px]",
              "p",
            )}
          </div>

          {/* Col 2 — Contact */}
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-5">
              {t.footer_contact}
            </p>
            <div className="space-y-3">
              {/* WhatsApp — big and obvious */}
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-primary text-primary-foreground px-4 py-3 text-xs tracking-[0.15em] uppercase hover:opacity-90 active:scale-[0.98] transition-all min-h-[48px]"
              >
                <MessageCircle size={14} />
                <span>WhatsApp</span>
                <ArrowUpRight size={11} className="ml-auto opacity-70" />
              </a>
              {/* Instagram */}
              <a
                href={content.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 border border-border text-foreground px-4 py-3 text-xs tracking-[0.15em] uppercase hover:border-primary hover:text-primary transition-all min-h-[48px] group"
              >
                <Instagram size={14} />
                <span>Instagram</span>
                <ArrowUpRight
                  size={11}
                  className="ml-auto opacity-40 group-hover:opacity-80 transition-opacity"
                />
              </a>
            </div>
          </div>

          {/* Col 3 — Navigation */}
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-5">
              Links
            </p>
            <nav className="flex flex-col gap-2.5">
              {[
                [t.nav_about, "#sobre"],
                [t.nav_styles, "#estilos"],
                [t.flash_label, "#flash"],
                [t.nav_scale, "#escala"],
                [t.nav_process, "#processo"],
                [t.nav_testimonials, "#depoimentos"],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors py-0.5 flex items-center gap-2 group"
                >
                  <span className="w-3 h-px bg-border group-hover:w-5 group-hover:bg-primary transition-all duration-300" />
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Col 4 — Location + hours */}
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-5">
              {lang === "pt" ? "Localização" : "Location"}
            </p>
            <div className="space-y-1 mb-6">
              <p className="text-sm text-foreground">Fortaleza, CE</p>
              <p className="text-xs text-muted-foreground">Brasil</p>
            </div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-3">
              {lang === "pt" ? "Atendimento" : "Schedule"}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {lang === "pt"
                ? "Seg – Sáb · 10h às 20h\nGuest spots sob consulta"
                : "Mon – Sat · 10am to 8pm\nGuest spots on request"}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border px-5 lg:px-20 py-5 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <p className="text-[10px] text-muted-foreground/50 tracking-wider">
              © {new Date().getFullYear()} {content.hero.title}{" "}
              {content.hero.titleItalic} · {t.footer_rights}
            </p>
            <button
              onClick={() => {
                localStorage.removeItem("cookie_consent");
                window.location.reload();
              }}
              className="text-[10px] text-muted-foreground/40 tracking-wider hover:text-muted-foreground transition-colors flex items-center gap-1"
              title="Gerenciar cookies"
            >
              <Shield size={9} /> {lang === "pt" ? "Privacidade" : "Privacy"}
            </button>
          </div>
          {/* Lang + theme micro-toggles */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLang((l) => (l === "pt" ? "en" : "pt"))}
              className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-muted-foreground/60 hover:text-foreground transition-colors"
            >
              <Globe size={10} /> {lang === "pt" ? "EN" : "PT"}
            </button>
            <button
              onClick={() =>
                setTheme((th) => (th === "dark" ? "light" : "dark"))
              }
              className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-muted-foreground/60 hover:text-foreground transition-colors"
            >
              {theme === "dark" ? <Sun size={10} /> : <Moon size={10} />}
              {theme === "dark" ? t.theme_light : t.theme_dark}
            </button>
          </div>
        </div>
      </footer>

      {/* ── FLOATING WA — desktop ─────────────────────────────────────── */}
      <div className="fixed bottom-6 right-5 z-40 hidden lg:block">
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 bg-background border border-primary/30 text-primary px-5 py-3 text-[10px] tracking-[0.2em] uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-2xl"
        >
          <MessageCircle size={14} /> <span>WhatsApp</span>
          <ArrowUpRight
            size={11}
            className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
          />
        </a>
      </div>

      {/* ── FLOATING WA — mobile fixed bar (só após rolar o hero) ──── */}
      <div
        className={`fixed bottom-0 inset-x-0 z-40 lg:hidden transition-transform duration-300 ${pastHero ? "translate-y-0" : "translate-y-full"}`}
      >
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 bg-primary text-primary-foreground text-xs tracking-[0.18em] uppercase w-full h-14 hover:opacity-90 active:scale-[0.99] transition-opacity"
        >
          <MessageCircle size={15} /> {t.wa_float}
        </a>
      </div>
      {/* Espaçador só quando a barra está visível */}
      <div
        className={`lg:hidden transition-all duration-300 ${pastHero ? "h-14" : "h-0"}`}
      />
    </div>
  );
}
