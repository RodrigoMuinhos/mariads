import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  Instagram,
  MapPin,
  MessageCircle,
} from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/5585996327634?text=Ol%C3%A1%2C%20vim%20pela%20p%C3%A1gina%20Quem%20sou%20eu%20e%20gostaria%20de%20conhecer%20seu%20trabalho.";
const INSTAGRAM_URL = "https://www.instagram.com/isismarianatattoo";

const chapters = [
  {
    id: "conquistas",
    number: "01",
    label: "Conquistas",
    title: "Uma carreira desenhada à mão.",
    text: "Há mais de 10 anos, construo minha trajetória projeto por projeto. Já são mais de 10.000 criações, sempre buscando uma composição que pertença ao corpo e à história de cada pessoa.",
    image: "/projetosgrandes/15383bee-c75c-4445-9e1e-4cf616472f83.jpeg",
    imageAlt: "Projeto autoral de tatuagem realizado por Isis Mariana",
  },
  {
    id: "eventos",
    number: "02",
    label: "Eventos",
    title: "Troca, presença e movimento.",
    text: "Os encontros com outros artistas e com o público alimentam meu repertório. Este é o espaço para registrar participações, aprendizados e os momentos que marcaram minha evolução profissional.",
    image: "/estilos/Blackwork.jpeg",
    imageAlt: "Trabalho em blackwork do portfólio de Isis Mariana",
  },
  {
    id: "viagens",
    number: "03",
    label: "Viagens",
    title: "Do Ceará para novos caminhos.",
    text: "Minha arte já alcançou 12 estados. Cada viagem muda o olhar, aproxima novas histórias e leva meu trabalho autoral para além do lugar onde ele começou.",
    image: "/projetosgrandes/3cb44583-3a0b-45c4-a536-2e39e1e31889.jpeg",
    imageAlt: "Projeto de grande escala do portfólio de Isis Mariana",
  },
  {
    id: "entrevistas",
    number: "04",
    label: "Entrevistas",
    title: "A história por trás do traço.",
    text: "Conversas sobre criação, carreira e tatuagem autoral revelam o que não cabe em uma fotografia. Aqui, reúno os registros que contam meu processo com mais profundidade.",
    image: "/estilos/Ornamental.jpeg",
    imageAlt: "Tatuagem ornamental criada por Isis Mariana",
  },
];

export default function AboutMePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/90 backdrop-blur-xl">
        <nav
          aria-label="Navegação da página Quem sou eu"
          className="mx-auto flex h-16 max-w-[1500px] items-center px-5 lg:px-10"
        >
          <a
            href="/"
            className="shrink-0 text-sm uppercase tracking-[0.22em] transition-colors hover:text-primary"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Isis Mariana
          </a>
          <div className="ml-auto hidden items-center gap-7 lg:flex">
            {chapters.map((chapter) => (
              <a
                key={chapter.id}
                href={`#${chapter.id}`}
                className="group flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="text-primary/60">{chapter.number}</span>
                {chapter.label}
              </a>
            ))}
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto hidden items-center gap-2 border border-primary/40 px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground lg:ml-8 lg:inline-flex"
          >
            <MessageCircle size={12} /> Falar comigo
          </a>
          <a
            href="/"
            className="ml-auto inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-muted-foreground lg:hidden"
          >
            <ArrowLeft size={13} /> Voltar
          </a>
        </nav>
      </header>

      <main>
        <section className="relative min-h-[820px] pt-16 lg:min-h-screen">
          <div className="mx-auto grid min-h-[756px] max-w-[1500px] grid-cols-12 lg:min-h-[calc(100vh-4rem)]">
            <div className="relative z-20 col-span-12 flex flex-col justify-center px-5 py-20 lg:col-span-7 lg:px-10">
              <p className="mb-7 text-[10px] uppercase tracking-[0.36em] text-primary">
                Tatuadora · Fortaleza, CE
              </p>
              <h1
                className="relative text-[22vw] leading-[0.72] tracking-[-0.055em] sm:text-[9rem] lg:text-[10.5rem] xl:text-[12.5rem]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Quem
                <br />
                <span className="ml-[11vw] italic lg:ml-28">sou eu</span>
              </h1>
              <div className="mt-14 flex max-w-xl items-start gap-5 lg:ml-28">
                <span className="mt-2 h-px w-12 shrink-0 bg-primary" />
                <p className="text-sm leading-loose text-muted-foreground lg:text-base">
                  Sou Isis Mariana. Transformo ideias e histórias em projetos
                  autorais que unem técnica, composição e identidade visual.
                </p>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 top-16 lg:inset-y-16 lg:left-[48%] lg:right-0">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-background/15 to-background/10 lg:bg-gradient-to-r lg:from-background lg:via-transparent lg:to-transparent" />
              <img
                src="/capa/PAISAGEM.jpeg"
                alt="Isis Mariana durante uma sessão de tatuagem"
                className="h-full w-full object-cover object-[66%_center]"
              />
              <span className="absolute bottom-8 right-6 z-20 hidden text-[9px] uppercase tracking-[0.3em] text-white/60 [writing-mode:vertical-rl] lg:block">
                Arte em movimento · mais de uma década
              </span>
            </div>

            <a
              href="#manifesto"
              aria-label="Continuar para minha história"
              className="absolute bottom-7 left-5 z-30 flex h-14 w-14 items-center justify-center rounded-full border border-white/30 text-white transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground lg:left-10"
            >
              <ArrowDown size={17} />
            </a>
          </div>
        </section>

        <section
          id="manifesto"
          className="relative border-y border-border px-5 py-24 lg:px-10 lg:py-40"
        >
          <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <p className="sticky top-28 text-[10px] uppercase tracking-[0.32em] text-primary">
                Minha história, <br />sem atalhos
              </p>
            </div>
            <div className="lg:col-span-8 lg:col-start-5">
              <p
                className="text-4xl leading-[1.15] sm:text-5xl lg:text-7xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Não desenho para preencher espaço. Crio para que cada peça
                encontre seu lugar, acompanhe o corpo e{" "}
                <span className="italic text-primary">continue contando</span>{" "}
                uma história.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-card">
          <div className="mx-auto grid max-w-[1500px] grid-cols-3">
            {[
              ["10+", "anos de carreira"],
              ["10.000+", "projetos realizados"],
              ["12", "estados alcançados"],
            ].map(([value, label], index) => (
              <div
                key={label}
                className="relative overflow-hidden border-r border-border px-3 py-10 text-center last:border-r-0 sm:px-6 lg:py-16"
              >
                <span className="absolute -right-2 -top-5 text-8xl text-primary/[0.035] lg:text-[10rem]">
                  0{index + 1}
                </span>
                <strong
                  className="relative block text-3xl font-normal text-primary sm:text-5xl lg:text-7xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {value}
                </strong>
                <span className="relative mt-3 block text-[8px] uppercase tracking-[0.14em] text-muted-foreground sm:text-[10px] sm:tracking-[0.24em]">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section>
          {chapters.map((chapter, index) => (
            <article
              id={chapter.id}
              key={chapter.id}
              className="group scroll-mt-16 border-b border-border"
            >
              <div className="mx-auto grid min-h-[720px] max-w-[1500px] lg:grid-cols-12">
                <div
                  className={`relative min-h-[480px] overflow-hidden lg:col-span-7 ${
                    index % 2 ? "lg:order-2" : ""
                  }`}
                >
                  <img
                    src={chapter.image}
                    alt={chapter.imageAlt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full scale-[1.03] object-cover grayscale-[35%] transition duration-1000 ease-out group-hover:scale-100 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <span
                    className="absolute -bottom-8 left-3 text-[9rem] leading-none text-white/10 sm:text-[13rem] lg:text-[17rem]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {chapter.number}
                  </span>
                </div>

                <div
                  className={`relative flex flex-col justify-center px-6 py-20 lg:col-span-5 lg:px-14 xl:px-20 ${
                    index % 2 ? "lg:order-1" : ""
                  }`}
                >
                  <div className="absolute left-0 top-0 h-0.5 w-0 bg-primary transition-all duration-700 group-hover:w-full" />
                  <div className="mb-14 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-primary">
                      {chapter.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      / {chapter.number}
                    </span>
                  </div>
                  <h2
                    className="text-5xl leading-[0.95] lg:text-6xl xl:text-7xl"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {chapter.title}
                  </h2>
                  <p className="mt-9 max-w-lg text-sm leading-loose text-muted-foreground">
                    {chapter.text}
                  </p>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-10 inline-flex w-fit items-center gap-3 border-b border-primary/50 pb-2 text-[10px] uppercase tracking-[0.2em] transition-colors hover:text-primary"
                  >
                    Ver registros no Instagram <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="relative overflow-hidden px-5 py-24 lg:px-10 lg:py-40">
          <span
            aria-hidden="true"
            className="absolute -left-10 top-5 whitespace-nowrap text-[22vw] leading-none text-primary/[0.035]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            FORTALEZA
          </span>
          <div className="relative mx-auto grid max-w-[1500px] items-end gap-16 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="mb-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-primary">
                <MapPin size={13} /> Fortaleza, Ceará
              </p>
              <h2
                className="text-6xl leading-[0.88] sm:text-7xl lg:text-8xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Sua história pode ser o{" "}
                <span className="italic">próximo capítulo.</span>
              </h2>
            </div>
            <div className="flex flex-col gap-3 lg:col-span-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-between bg-primary px-7 py-5 text-xs uppercase tracking-[0.18em] text-primary-foreground"
              >
                Falar pelo WhatsApp
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between border border-border px-7 py-5 text-xs uppercase tracking-[0.18em] transition-colors hover:border-primary"
              >
                Instagram <Instagram size={15} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-5 py-8 lg:px-10">
        <div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Isis Mariana Tattoo</span>
          <a href="/" className="transition-colors hover:text-primary">
            Voltar para a página inicial
          </a>
        </div>
      </footer>
    </div>
  );
}
