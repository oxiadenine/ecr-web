import { notFound } from "next/navigation";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import styles from "@/app/knowledge/[subject]/page.module.css";
import { getKnowledgeOf } from "@/data/knowledge-fetcher";

export async function generateMetadata({ params }) {
  const url = Bun.env.URL;
  const siteName = Bun.env.SITE_NAME;

  const subject = (await params).subject;

  const data = (await getKnowledgeOf(subject))?.data ?? null;

  const title = `${siteName} | ${data.title}`;
  const tags = data.tags?.split(",") ?? [];

  return data ? {
    title,
    description: data.summary,
    keywords: tags,
    authors: [{ name: data.author }],
    openGraph: {
      title,
      description: data.summary,
      url: `${url}/knowledge/${data.subject}`,
      siteName,
      images: data.images.map(image => ({
        url: `${url}${image.src}`, alt: image.alt
      })),
      locale: "es_ES",
      type: "article",
      publishedTime: new Date(data.date).toISOString(),
      authors: [data.author],
      tags
    }
  } : null;
}

export default async function Page({ params }) {
  const subject = (await params).subject;

  const { component: Knowledge } = await getKnowledgeOf(subject) ?? notFound();

  return (
    <>
      <Header />
      <div>
        <main>
          <div className={styles["page"]}>
            <Knowledge />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
