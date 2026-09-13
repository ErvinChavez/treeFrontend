import Head from "next/head";

const SITE_URL = "https://chaveztree.com";
const DEFAULT_OG_IMAGE = "/chavezLogo.png";

/**
 * @param {string} title - Full page title (include "| Chavez Tree Service")
 * @param {string} description - Meta description, ~150-160 characters ideal
 * @param {string} path - The page's path starting with "/", e.g. "/services"
 * @param {string} [ogImage] - Override the default OG image (must be an absolute URL or a /path)
 * @param {boolean} [noindex] - Set true for pages that should never be indexed (private/token-based pages)
 */
export default function SEO({ title, description, path, ogImage, noindex = false }) {
  const canonicalUrl = `${SITE_URL}${path === "/" ? "" : path}`;
  const resolvedOgImage = ogImage
    ? (ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`)
    : `${SITE_URL}${DEFAULT_OG_IMAGE}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <link rel="canonical" href={canonicalUrl} />
      )}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Chavez Tree Service" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedOgImage} />
    </Head>
  );
}

export { SITE_URL };