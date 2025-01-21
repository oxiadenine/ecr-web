import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import KnowledgeCard from "@/app/components/knowledge-card";
import styles from "@/app/page.module.css";
import { getKnowledge } from "@/data/knowledge-fetcher";

export default async function Page() {
  const knowledge = await getKnowledge();

  return (
    <>
      <Header />
      <div>
        <main>
          <div className={styles["page"]}>
            {knowledge.map(({ data }) => (
              <article key={data.subject}>
                <KnowledgeCard data={data} />
              </article>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
