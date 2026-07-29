import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { BRAND_NAME, SECTION_ROUTES, SITE_URL } from "./seo-routes.mjs";

const root = resolve(import.meta.dirname, "..");
const imageUrl = `${SITE_URL}/capa/PAISAGEM.jpeg`;
const conversionId = "AW-18239209721";
const conversionLabel = `${conversionId}/TDqvCJvz_b4cEPmBkflD`;

function safeJson(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function pageHtml(route) {
  const canonical = `${SITE_URL}/${route.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: route.title,
        description: route.description,
        inLanguage: "pt-BR",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        breadcrumb: { "@id": `${canonical}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
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
            name: route.title.split("|")[0].trim(),
            item: canonical,
          },
        ],
      },
    ],
  };

  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${route.title}</title>
    <meta name="description" content="${route.description}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${canonical}" />
    <link rel="icon" href="/LOGO.png" type="image/png" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:site_name" content="${BRAND_NAME}" />
    <meta property="og:title" content="${route.title}" />
    <meta property="og:description" content="${route.description}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:image:width" content="1280" />
    <meta property="og:image:height" content="960" />
    <meta property="og:image:alt" content="Portfólio de Isis Mariana Tattoo" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${route.title}" />
    <meta name="twitter:description" content="${route.description}" />
    <meta name="twitter:image" content="${imageUrl}" />
    <meta name="twitter:image:alt" content="Portfólio de Isis Mariana Tattoo" />
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag("consent", "default", {
        ad_storage: "denied",
        analytics_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied"
      });
    </script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=${conversionId}"></script>
    <script>
      gtag("js", new Date());
      gtag("config", "${conversionId}");
      gtag("event", "conversion", {
        send_to: "${conversionLabel}",
        value: 1.0,
        currency: "BRL"
      });
      function gtag_report_conversion(url) {
        var callback = function () {
          if (typeof url != "undefined") window.location = url;
        };
        gtag("event", "conversion", {
          send_to: "${conversionLabel}",
          value: 1.0,
          currency: "BRL",
          event_callback: callback
        });
        return false;
      }
    </script>
    <script type="application/ld+json">${safeJson(schema)}</script>
    <style>html,body{height:100%;margin:0}#root{min-height:100%}</style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
}

for (const route of SECTION_ROUTES) {
  const directory = resolve(root, route.slug);
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, "index.html"), pageHtml(route), "utf8");
}

const staticRoutes = [
  { slug: "", priority: "1.0" },
  ...SECTION_ROUTES,
  { slug: "tatuadora-fortaleza", priority: "0.9" },
  { slug: "politica-de-privacidade", priority: "0.3" },
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes
  .map(
    (route) => `  <url>
    <loc>${SITE_URL}/${route.slug}</loc>
    <changefreq>${route.slug === "politica-de-privacidade" ? "yearly" : "monthly"}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
await writeFile(resolve(root, "public", "sitemap.xml"), sitemap, "utf8");
