import { useEffect, useState } from "react";

export default function App() {
  const [content, setContent] = useState("");

  useEffect(() => {
    let mounted = true;

    fetch("/legacy-home.html")
      .then((response) => response.text())
      .then((html) => {
        if (mounted) {
          setContent(html);
        }
      })
      .catch(() => {
        if (mounted) {
          setContent("<main style='padding:2rem;color:white;'>Failed to load page content.</main>");
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!content) {
      return undefined;
    }

    const script = document.createElement("script");
    script.src = `/legacy-script.js?v=${Date.now()}`;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [content]);

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
