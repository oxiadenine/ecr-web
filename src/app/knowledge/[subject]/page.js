import { notFound } from "next/navigation";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import styles from "@/app/knowledge/[subject]/page.module.css";
import { getKnowledgeOf } from "@/data/knowledge-fetcher";

export async function generateMetadata({ params }) {
  const subject = (await params).subject;

  const data = (await getKnowledgeOf(subject))?.data ?? null;

  return data ? {
    title: data.title,
    description: data.title,
    keywords: data.tags?.split(",") ?? [],
    authors: [{ name: data.author }],
    openGraph: {
      title: data.title,
      description: data.title,
      url: `${Bun.env.URL}/knowledge/${data.subject}`,
      images: data.images.map(image => ({
        url: `${Bun.env.URL}${image.src}`, alt: image.alt
      }))
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
