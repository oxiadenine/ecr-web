import fs from "node:fs/promises";
import path from "node:path";
import { fromMarkdown } from "mdast-util-from-markdown";
import { mdxFromMarkdown } from "mdast-util-mdx";
import { frontmatterFromMarkdown } from "mdast-util-frontmatter";
import { frontmatter } from "micromark-extension-frontmatter";
import { toHast } from "mdast-util-to-hast";
import { select, selectAll } from "hast-util-select";

const directoryPath = `${process.cwd()}/data/knowledge`;

export async function getKnowledge() {
  return await Promise.all((await walkKnowledgeFiles(directoryPath))
    .filter(filePath => filePath.ext == ".mdx")
    .map(async filePath => {
      const knowledge = await import(`@/knowledge/${filePath.base}`);
      knowledge.frontmatter.subject = filePath.name;
      
      const knowledgeContent = toHast(fromMarkdown(
        await Bun.file(path.join(filePath.dir, filePath.base)).bytes(), 
        {
          extensions: [frontmatter()],
          mdastExtensions: [mdxFromMarkdown(), frontmatterFromMarkdown()]
        }
      ));

      knowledge.frontmatter.title = select("h1", knowledgeContent).children[0].value;
      knowledge.frontmatter.summary = select("p", knowledgeContent).children[0].value;
      knowledge.frontmatter.images = selectAll("img", knowledgeContent).map(element => ({ 
        src: element.properties.src, alt: element.properties.alt 
      }));

      return { component: knowledge.default, data: knowledge.frontmatter };
    }));
}

export async function getKnowledgeBy(subjectTerm) {
  return (await getKnowledge()).filter(({ data }) => {
    const title = data.title.toLowerCase().replace(" ", "")
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const titleTerm = subjectTerm.toLowerCase().replace(" ", "")
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      return title.includes(titleTerm);
    });
}

export async function getKnowledgeOf(subject) {
  return (await getKnowledge()).find(({ data }) => data.subject == subject);
}

async function walkKnowledgeFiles(dirPath) {
  const filePaths = await Promise.all((await fs.readdir(dirPath))
    .map(async filename => {
      const filePath = path.join(dirPath, filename);
      const fileStat = await Bun.file(filePath).stat();

      if (fileStat.isDirectory()) return walkKnowledgeFiles(filePath);
      else if (fileStat.isFile()) return path.parse(filePath);
    }));
    
    return filePaths.reduce((all, dirFilePath) => all.concat(dirFilePath), []);
}
