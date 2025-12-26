export function ProfileImagesSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": "https://rifkyseawn.github.io/rifkysstore.github.io/",
          },
          about: {
            "@type": "Person",
            name: "Rifky Setiawan",
            description:
              "Data Scientist & AI Engineer focusing on ML pipelines, analytics, and modern web experiences.",
          },
          associatedMedia: [
            {
              "@type": "ImageObject",
              contentUrl: "https://rifkyseawn.github.io/rifkysstore.github.io/rushikesh_nimkar.jpg",
              name: "Rifky Setiawan - Data Scientist & AI Engineer Primary Profile",
              description:
                "Primary profile photo of Rifky Setiawan, Data Scientist & AI Engineer",
              encodingFormat: "image/jpeg",
              width: "800",
              height: "800",
            },
            {
              "@type": "ImageObject",
              contentUrl: "https://rifkyseawn.github.io/rifkysstore.github.io/profile.jpg",
              name: "Rifky Setiawan - Data Scientist & AI Engineer Alternate Profile",
              description:
                "Secondary profile photo of Rifky Setiawan, showcasing professional appearance",
              encodingFormat: "image/jpeg",
              width: "800",
              height: "800",
            },
          ],
        }),
      }}
    />
  );
}
