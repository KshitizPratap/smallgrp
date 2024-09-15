import { marked } from "marked";
import Image from "next/image";
import Head from "next/head";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import classes from "@/styles/blogs/blogs.module.css";

type BlogProps = {
  params: {
    slug: string;
  };
};

export default async function Blog({ params: { slug } }: BlogProps) {
  // Fetch the markdown file content on the server
  const markdown = fs.readFileSync(path.join("posts", slug + ".md"), "utf-8");
  const { data: frontMatter, content } = matter(markdown);

  return (
    <>
      <Head>
        <title>{frontMatter.title}</title>
        <meta charSet="utf-8" />
        <meta property="og:type" content="website" />
        <meta name="keywords" content={frontMatter.keywords} />
        <meta name="description" content={frontMatter.description} />
      </Head>
      <div className={classes.mainContainer}>
        <div className={classes.contentWrapper}>
          <h1 className={classes.contentWrapperHeading}>{frontMatter.title}</h1>
          <Image
            src={frontMatter.img}
            alt={frontMatter.title}
            width={1500}
            height={2500}
            priority
            className={classes.imgWraper}
          />
          <div
            className={classes.content}
            dangerouslySetInnerHTML={{ __html: marked(content) }}
          />
        </div>
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join("posts"));

  // Generate paths for each markdown file
  const paths = files.map((fileName) => ({
    slug: fileName.replace(".md", ""),
  }));

  return paths;
}
