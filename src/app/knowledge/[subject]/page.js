import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import styles from "@/app/knowledge/[subject]/page.module.css";
import { getKnowledgeOf } from "@/data/knowledge-fetcher";

export async function generateMetadata({ params }) {
  const subject = (await params).subject;

  const knowledge = await getKnowledgeOf(subject);

  return {
    title: knowledge.data.title,
    description: knowledge.data.title,
    keywords: knowledge.data.tags?.split(",") ?? [],
    authors: [{ name: knowledge.data.author }],
    openGraph: {
      title: knowledge.data.title,
      description: knowledge.data.title,
      url: `${Bun.env.URL}/knowledge/${knowledge.data.subject}`,
      images: knowledge.data.images.map(image => ({
        url: `${Bun.env.URL}${image.src}`, alt: image.alt
      }))
    }
  };
}

export default async function Page({ params }) {
  const subject = (await params).subject;

  const { component: Knowledge } = await getKnowledgeOf(subject);

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
