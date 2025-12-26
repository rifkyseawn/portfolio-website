export function PersonSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Rifky Setiawan",
          url: "https://rifkyseawn.github.io/rifkysstore.github.io/",
          sameAs: [
            "https://github.com/rifkyseawn",
            "https://www.linkedin.com/in/setiawanrifky/",
            "https://www.instagram.com/riffkyys/"
          ],
          jobTitle: "Data Scientist & AI Engineer",
          knowsAbout: ["Machine Learning", "Analytics", "Data Engineering", "Next.js", "Python"],
          image: "/profile.jpg",
          description: "Data Scientist & AI Engineer focusing on ML pipelines, analytics, and modern web experiences."
        })
      }}
    />
  );
} 
