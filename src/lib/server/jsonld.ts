import type { MDXMetadata } from "./mdx";

//
// [SECTION] Defines
//

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://axxowastaken.me";

//
// [SECTION] Functions
//

export function getRootJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "aXXo's website",
        description: "Computer science, cybersecurity, and software engineering projects by aXXo.",
        publisher: {
          "@id": `${siteUrl}/#person`,
        },
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "aXXo",
        alternateName: "Charles",
        url: siteUrl,
        image: `${siteUrl}/images/seo/og-image.webp`,
        sameAs: [
          "https://www.youtube.com/@axxo1337",
          "https://github.com/axxo1337",
          "https://www.reddit.com/r/aXXo/",
          "https://www.instagram.com/axxo1337",
        ],
        jobTitle: "Computer Science Educator & Software Engineer",
      },
    ],
  };
}

export function getBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${siteUrl}${item.url}`,
    })),
  };
}

export function getProjectJsonLd(metadata: MDXMetadata) {
  const imageUrl = metadata.thumbnailPath
    ? `${siteUrl}${metadata.thumbnailPath}`
    : `${siteUrl}/images/seo/og-image.webp`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${siteUrl}/project/${metadata.slug}#article`,
        headline: metadata.title,
        description: metadata.description,
        image: imageUrl,
        datePublished: metadata.createdAt,
        dateModified: metadata.updatedAt,
        author: {
          "@type": "Person",
          name: "aXXo",
          url: siteUrl,
        },
        publisher: {
          "@type": "Person",
          name: "aXXo",
          url: siteUrl,
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${siteUrl}/project/${metadata.slug}`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/project/${metadata.slug}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects",
            item: `${siteUrl}/projects`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: metadata.title,
            item: `${siteUrl}/project/${metadata.slug}`,
          },
        ],
      },
    ],
  };
}

export function getVideoJsonLd(metadata: MDXMetadata) {
  const imageUrl = metadata.thumbnailPath
    ? `${siteUrl}${metadata.thumbnailPath}`
    : `${siteUrl}/images/seo/og-image.webp`;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/video/${metadata.slug}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Videos",
          item: `${siteUrl}/videos`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: metadata.title,
          item: `${siteUrl}/video/${metadata.slug}`,
        },
      ],
    },
  ];

  if (metadata.youtubeId) {
    graph.push({
      "@type": "VideoObject",
      "@id": `${siteUrl}/video/${metadata.slug}#video`,
      name: metadata.title,
      description: metadata.description,
      thumbnailUrl: [imageUrl],
      uploadDate: metadata.createdAt,
      embedUrl: `https://www.youtube.com/embed/${metadata.youtubeId}`,
      contentUrl: `https://www.youtube.com/watch?v=${metadata.youtubeId}`,
      author: {
        "@type": "Person",
        name: "aXXo",
        url: siteUrl,
      },
    });
  } else {
    graph.push({
      "@type": "Article",
      "@id": `${siteUrl}/video/${metadata.slug}#article`,
      headline: metadata.title,
      description: metadata.description,
      image: imageUrl,
      datePublished: metadata.createdAt,
      dateModified: metadata.updatedAt,
      author: {
        "@type": "Person",
        name: "aXXo",
        url: siteUrl,
      },
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
