import { ArrowLeft, Instagram, MessageCircle, Shield } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/5585996327634?text=Ol%C3%A1%21%20Gostaria%20de%20falar%20sobre%20a%20Pol%C3%ADtica%20de%20Privacidade.";
const INSTAGRAM_URL = "https://www.instagram.com/isismarianatattoo";

const sections = [
  {
    title: "1. Responsável pelos dados",
    text: "Isis Mariana Tattoo, profissional com atendimento em Fortaleza, Ceará, Brasil. O contato pode ser feito pelos canais de WhatsApp ou Instagram indicados neste site.",
  },
  {
    title: "2. Dados coletados",
    text: "O site não solicita diretamente dados pessoais por formulários. Ao usar os botões de WhatsApp ou Instagram, você é direcionado para plataformas externas, que possuem suas próprias políticas de privacidade.",
  },
  {
    title: "3. Cookies e armazenamento local",
    text: "O site pode armazenar localmente preferências essenciais, como consentimento de cookies, tema e idioma. Recursos analíticos ou de publicidade somente podem ser utilizados conforme as escolhas de consentimento apresentadas ao visitante.",
  },
  {
    title: "4. Finalidades",
    text: "As informações técnicas e preferências são utilizadas para manter o funcionamento do site, melhorar a experiência de navegação e, quando autorizado, compreender o desempenho das páginas e campanhas.",
  },
  {
    title: "5. Base legal",
    text: "Quando aplicável, o tratamento considera as bases previstas na Lei Geral de Proteção de Dados, incluindo consentimento e legítimo interesse, observados os direitos e as expectativas do titular.",
  },
  {
    title: "6. Compartilhamento e serviços externos",
    text: "O acesso ao WhatsApp e ao Instagram envolve serviços de terceiros. O site não vende dados pessoais. Eventuais ferramentas externas de análise ou publicidade seguem suas próprias políticas e configurações de consentimento.",
  },
  {
    title: "7. Seus direitos",
    text: "Você pode solicitar informações, correção ou exclusão de dados eventualmente tratados, além de revogar consentimentos quando aplicável. Para isso, entre em contato pelos canais oficiais apresentados nesta página.",
  },
  {
    title: "8. Atualizações desta política",
    text: "Esta política pode ser atualizada para refletir mudanças no site ou nos serviços utilizados. A versão publicada nesta URL será sempre a versão vigente.",
  },
];

export default function PrivacyPolicyPage() {
  const resetCookiePreferences = () => {
    localStorage.removeItem("cookie_consent");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <nav
          aria-label="Navegação da política de privacidade"
          className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5"
        >
          <a
            href="/"
            className="text-sm uppercase tracking-[0.2em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Isis Mariana
          </a>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-primary"
          >
            <ArrowLeft size={14} /> Voltar ao site
          </a>
        </nav>
      </header>

      <main>
        <section className="border-b border-border px-5 py-20 lg:py-28">
          <div className="mx-auto max-w-5xl">
            <div className="mb-6 flex h-11 w-11 items-center justify-center border border-primary/40 text-primary">
              <Shield size={19} />
            </div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-primary">
              Privacidade e proteção de dados
            </p>
            <h1
              className="max-w-3xl text-5xl leading-none lg:text-7xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Política de Privacidade
            </h1>
            <p className="mt-7 max-w-2xl text-sm leading-loose text-muted-foreground">
              Esta página explica como as informações e preferências de
              navegação são tratadas no site da Isis Mariana Tattoo.
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              Última atualização: julho de 2026
            </p>
          </div>
        </section>

        <section className="px-5 py-16 lg:py-24">
          <div className="mx-auto max-w-5xl divide-y divide-border border-y border-border">
            {sections.map((section) => (
              <article
                key={section.title}
                className="grid gap-4 py-8 md:grid-cols-12 md:gap-10"
              >
                <h2 className="text-xl md:col-span-4">{section.title}</h2>
                <p className="text-sm leading-loose text-muted-foreground md:col-span-8">
                  {section.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-border bg-card px-5 py-16">
          <div className="mx-auto max-w-5xl">
            <h2
              className="text-3xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Contato e preferências
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Para dúvidas sobre esta política, utilize um dos canais oficiais.
              Você também pode redefinir a escolha de cookies feita neste
              navegador.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-primary px-6 py-4 text-xs uppercase tracking-[0.16em] text-primary-foreground"
              >
                <MessageCircle size={15} /> Falar pelo WhatsApp
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 border border-border px-6 py-4 text-xs uppercase tracking-[0.16em]"
              >
                <Instagram size={15} /> Instagram
              </a>
              <button
                type="button"
                onClick={resetCookiePreferences}
                className="inline-flex items-center justify-center gap-3 border border-border px-6 py-4 text-xs uppercase tracking-[0.16em]"
              >
                <Shield size={14} /> Redefinir cookies
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-5 py-7">
        <div className="mx-auto max-w-5xl text-xs text-muted-foreground">
          © {new Date().getFullYear()} Isis Mariana Tattoo
        </div>
      </footer>
    </div>
  );
}
