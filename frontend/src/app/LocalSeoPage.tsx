import { ArrowUpRight, Instagram, MessageCircle } from "lucide-react";
import { StructuredData } from "./components/StructuredData";

const SITE_URL = "https://www.isismariana.com.br";
const PAGE_URL = `${SITE_URL}/tatuadora-fortaleza`;
const WHATSAPP_URL =
  "https://wa.me/5585996327634?text=Ol%C3%A1%21%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20de%20tatuagem.";
const INSTAGRAM_URL = "https://www.instagram.com/isismarianatattoo";

const styles = [
  "Blackwork",
  "Ornamental",
  "Tribal",
  "Geométrico",
  "Preto e cinza",
  "Neo tradicional",
  "Suminagashi",
  "Anime",
];

const portfolio = [
  {
    src: "/estilos/Blackwork.jpeg",
    alt: "Exemplo de tatuagem blackwork do portfólio de Isis Mariana",
    label: "Blackwork",
    width: 3024,
    height: 4032,
  },
  {
    src: "/estilos/Ornamental.jpeg",
    alt: "Exemplo de tatuagem ornamental do portfólio de Isis Mariana",
    label: "Ornamental",
    width: 1280,
    height: 1600,
  },
  {
    src: "/estilos/Geométrico.jpeg",
    alt: "Exemplo de tatuagem geométrica do portfólio de Isis Mariana",
    label: "Geométrico",
    width: 1024,
    height: 1280,
  },
];

const faqs = [
  {
    question: "Como solicitar um orçamento de tatuagem?",
    answer:
      "Entre em contato pelo WhatsApp e envie as referências e informações do projeto. O orçamento é preparado de forma personalizada.",
  },
  {
    question: "Como funciona a criação de um projeto personalizado?",
    answer:
      "A proposta é desenvolvida a partir das referências, do estilo desejado e das características informadas para o projeto.",
  },
  {
    question: "Onde acontece o atendimento?",
    answer:
      "O atendimento acontece em Fortaleza. Os detalhes do local são informados diretamente durante o contato e o agendamento.",
  },
  {
    question: "Quais informações devo enviar para pedir orçamento?",
    answer:
      "Envie referências, tamanho aproximado, local do corpo e uma descrição da ideia. Essas informações ajudam na avaliação do projeto.",
  },
  {
    question: "Como escolher o tamanho e o local da tatuagem?",
    answer:
      "Tamanho e posicionamento são avaliados considerando a composição do desenho e a área do corpo. A definição pode ser alinhada durante o orçamento.",
  },
  {
    question: "Como funciona o agendamento?",
    answer:
      "Após a avaliação do projeto e do orçamento, a disponibilidade para a sessão é combinada diretamente pelo WhatsApp.",
  },
  {
    question: "Quais cuidados devo ter antes da sessão?",
    answer:
      "As orientações adequadas ao projeto são enviadas antes da sessão. Em caso de dúvida, confirme os cuidados diretamente pelo WhatsApp.",
  },
];

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: "Tatuadora em Fortaleza | Orçamentos e Portfólio",
      description:
        "Procura tatuadora em Fortaleza? Conheça o portfólio da Isis Mariana Tattoo, veja projetos autorais e solicite um orçamento personalizado.",
      inLanguage: "pt-BR",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#tattoo-parlor` },
      breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Início",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Tatuadora em Fortaleza",
          item: PAGE_URL,
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function LocalSeoPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <StructuredData id="local-page-structured-data" data={pageSchema} />

      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <nav
          aria-label="Navegação principal"
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-20"
        >
          <a
            href="/"
            className="text-sm uppercase tracking-[0.2em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Isis Mariana
          </a>
          <div className="flex items-center gap-3">
            <a
              href="/#estilos"
              className="hidden text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-primary sm:inline"
            >
              Portfólio
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-event="whatsapp_budget_click"
              className="inline-flex items-center gap-2 border border-primary/40 px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <MessageCircle size={12} /> Solicitar orçamento
            </a>
          </div>
        </nav>
      </header>

      <main>
        <section className="border-b border-border px-5 py-20 lg:px-20 lg:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Atendimento em Fortaleza, Ceará
              </p>
              <h1
                className="text-5xl leading-[0.95] text-foreground lg:text-7xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Tatuadora em Fortaleza — Isis Mariana Tattoo
              </h1>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground">
                Projetos autorais e personalizados desenvolvidos a partir da
                sua ideia, com atendimento individual e orçamento solicitado
                diretamente pelo WhatsApp.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-analytics-event="whatsapp_budget_click"
                  className="inline-flex min-h-13 items-center justify-center gap-3 bg-primary px-6 py-4 text-xs uppercase tracking-[0.18em] text-primary-foreground"
                >
                  <MessageCircle size={15} /> Falar pelo WhatsApp
                </a>
                <a
                  href="#portfolio"
                  className="inline-flex min-h-13 items-center justify-center gap-3 border border-border px-6 py-4 text-xs uppercase tracking-[0.18em]"
                >
                  Conhecer o portfólio
                </a>
              </div>
            </div>
            <figure>
              <img
                src="/capa/PAISAGEM.jpeg"
                alt="Trabalho do portfólio de Isis Mariana Tattoo"
                width="1280"
                height="960"
                fetchPriority="high"
                className="aspect-[4/3] w-full object-cover opacity-90"
              />
              <figcaption className="mt-3 text-xs text-muted-foreground">
                Portfólio profissional de tatuagem autoral.
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="px-5 py-20 lg:px-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-primary">
                Apresentação profissional
              </p>
              <h2
                className="text-4xl leading-tight lg:text-5xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Tatuagem autoral com atendimento personalizado
              </h2>
            </div>
            <div className="space-y-5 text-sm leading-loose text-muted-foreground lg:col-span-7">
              <p>
                Isis Mariana atua em Fortaleza desenvolvendo composições
                pensadas para cada pessoa. O processo considera referências,
                região do corpo, tamanho e linguagem visual antes da definição
                do orçamento.
              </p>
              <p>
                Entre os estilos apresentados no portfólio estão{" "}
                {styles.join(", ")}. Cada proposta é avaliada individualmente
                para manter coerência entre desenho, aplicação e resultado
                visual.
              </p>
            </div>
          </div>
        </section>

        <section
          id="portfolio"
          className="border-y border-border bg-card px-5 py-20 lg:px-20 lg:py-28"
        >
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-primary">
              Trabalhos selecionados
            </p>
            <h2
              className="mb-10 text-4xl lg:text-6xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Portfólio de tatuagens
            </h2>
            <div className="grid gap-5 sm:grid-cols-3">
              {portfolio.map((item) => (
                <figure key={item.src}>
                  <img
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover"
                  />
                  <figcaption className="mt-3 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {item.label}
                  </figcaption>
                </figure>
              ))}
            </div>
            <a
              href="/#estilos"
              className="mt-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-primary"
            >
              Ver portfólio completo <ArrowUpRight size={14} />
            </a>
          </div>
        </section>

        <section className="px-5 py-20 lg:px-20 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-primary">
              Do primeiro contato à sessão
            </p>
            <h2
              className="mb-10 text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Como solicitar seu orçamento
            </h2>
            <div className="grid gap-px bg-border md:grid-cols-3">
              {[
                [
                  "01",
                  "Envie sua ideia",
                  "Compartilhe referências, local do corpo e tamanho aproximado pelo WhatsApp.",
                ],
                [
                  "02",
                  "Avaliação personalizada",
                  "As informações são analisadas para orientar a proposta e preparar o orçamento.",
                ],
                [
                  "03",
                  "Alinhe o agendamento",
                  "Depois da aprovação, a disponibilidade e os detalhes da sessão são combinados diretamente.",
                ],
              ].map(([number, title, text]) => (
                <article key={number} className="bg-background p-7">
                  <span className="text-xs text-primary">{number}</span>
                  <h3 className="mt-5 text-xl">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-card px-5 py-20 lg:px-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
            <article>
              <h2
                className="text-3xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Atendimento individual
              </h2>
              <p className="mt-5 text-sm leading-loose text-muted-foreground">
                Cada projeto é conversado individualmente para entender a
                proposta, as referências e a aplicação desejada. O WhatsApp é
                o canal direto para tirar dúvidas e reunir as informações do
                orçamento.
              </p>
            </article>
            <article>
              <h2
                className="text-3xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Preparação, cuidados e atendimento
              </h2>
              <p className="mt-5 text-sm leading-loose text-muted-foreground">
                Orientações de preparação e cuidados são alinhadas antes e
                depois da sessão. Consulte diretamente as recomendações
                adequadas ao seu projeto e informe qualquer dúvida relevante
                durante o atendimento.
              </p>
              <a
                href="/#cuidados"
                className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-primary"
              >
                Consultar cuidados pós-tatuagem <ArrowUpRight size={13} />
              </a>
            </article>
          </div>
        </section>

        <section className="px-5 py-20 lg:px-20 lg:py-28">
          <div className="mx-auto max-w-4xl">
            <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-primary">
              Perguntas frequentes
            </p>
            <h2
              className="mb-9 text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Dúvidas sobre orçamento e atendimento
            </h2>
            <div className="divide-y divide-border border-y border-border">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary className="cursor-pointer list-none pr-8 text-base">
                    {faq.question}
                  </summary>
                  <p className="max-w-3xl pt-4 text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-card px-5 py-20 text-center lg:px-20 lg:py-28">
          <div className="mx-auto max-w-3xl">
            <h2
              className="text-4xl leading-tight lg:text-6xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Vamos conversar sobre seu projeto?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Envie sua ideia e as informações iniciais para solicitar um
              orçamento personalizado em Fortaleza.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-analytics-event="whatsapp_budget_click"
                className="inline-flex items-center justify-center gap-3 bg-primary px-6 py-4 text-xs uppercase tracking-[0.18em] text-primary-foreground"
              >
                <MessageCircle size={15} /> Solicitar orçamento
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-analytics-event="instagram_profile_click"
                className="inline-flex items-center justify-center gap-3 border border-border px-6 py-4 text-xs uppercase tracking-[0.18em]"
              >
                <Instagram size={15} /> Ver Instagram
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-5 py-8 lg:px-20">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
          <p>© Isis Mariana Tattoo · Fortaleza, CE</p>
          <a href="/">Voltar à página inicial</a>
        </div>
      </footer>
    </div>
  );
}
