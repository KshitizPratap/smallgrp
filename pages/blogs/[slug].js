import { marked } from "marked";
import Image from "next/image";
import Head from "next/head";
import classes from "@/styles/blogs/blogs.module.css";
import fs from "fs"; // Change require to import
import path from "path"; // Change require to import
import matter from "gray-matter";

const Blog = ({ frontMatter, content }) => {
  return (
    <>
      <Head>
        <title>{frontMatter.title}</title>
        <meta charSet="utf-8"></meta>
        <meta property="og:type" content="website" />
        <meta name="keywords" content={frontMatter.keywords}></meta>
        <meta name="description" content={frontMatter.description}></meta>
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

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts")); // Using imported fs and path

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
  const markdown = fs.readFileSync(path.join("posts", slug + ".md"), "utf-8"); // Using imported fs and path
  const { data: frontMatter, content } = matter(markdown);

  return {
    props: {
      frontMatter,
      slug,
      content,
    },
  };
}
