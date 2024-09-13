import { marked } from "marked";
import Image from "next/image";
import Head from "next/head";
import classes from "@/styles/blogs/blogs.module.css";

const Blog = ({ frontMatter, content, slug }) => {
  return (
    <>
      <Head>
        <title>{frontMatter.title}</title>
        <meta charSet="utf-8"></meta>
        <meta property="og:type" content="website" />
        <meta
          name="keywords"
          content={frontMatter.keywords}
        ></meta>
        <meta
          name="description"
          content={frontMatter.description}
        ></meta>
      </Head>
      <div className={classes.mainContainer}>
        <div className={classes.contentWrapper}>
          <h1 className={classes.contentWrapperHeading}>{frontMatter.title}</h1>
          <Image
            src={frontMatter.img}
            alt="AI Thumbnail Maker Youtube"
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
};

export default Blog;

const fs = require("fs");
import path from "path";
import matter from "gray-matter";

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));

  const paths = files.map((file) => {
    return {
      params: {
        slug: file.replace(".md", ""),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdown = fs.readFileSync(path.join("posts", slug + ".md"), "utf-8");
  const { data: frontMatter, content } = matter(markdown);

  return {
    props: {
      frontMatter,
      slug,
      content,
    },
  };
}
