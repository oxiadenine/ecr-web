"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@/app/components/knowledge-card.module.css";

export default function KnowledgeCard({ data }) {
  const [urlCopied, setUrlCopied] = useState(false);

  function onShareClick() {
    if ("clipboard" in navigator) {
      navigator.clipboard.writeText(`${location.href}knowledge/${data.subject}`)
        .then(() => setUrlCopied(true));
    } else setUrlCopied(true);
  };

  useEffect(() => {
    if (urlCopied) {
      setTimeout(() => {
        setUrlCopied(false);
      }, 1000);
    }
  }, [urlCopied]);

  return (
    <div className={styles["knowledge-card"]}>
      {urlCopied && <span>Copiado</span>}
      <button type="button" onClick={onShareClick}>
        <i className="fa-solid fa-share-nodes" />
      </button>
      <h3>{data.title}</h3>
      <Link href={`/knowledge/${data.subject}`}>
        <p>{data.summary}</p>
      </Link>
      <div>
        <span>✘ {data.author}</span>
        <span>{data.date}</span>
      </div>
    </div>
  );
}
