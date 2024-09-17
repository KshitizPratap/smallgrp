import Head from "next/head";
import React from "react";
import { getSortedPostsData } from "../utility/posts";

import classes from "@/styles/blogs/blogContainer.module.css";
import BlogCards from "@/components/blogCards/blogCards";
import BlogCardsSmall from "@/components/blogCards/blogCardsSmall";

import { Signika } from "next/font/google";

const signika = Signika({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});



export default async function BlogContainer() {
  const blogs = await getSortedPostsData();  

  const smallBlogs = blogs.slice(0, Math.floor((blogs.length + 1) / 2));
  const bigBlogs = blogs.slice(Math.floor((blogs.length + 1) / 2));

  return (
    <>
      <Head>
        <title>Blogs - ThumbnailAI | AI Thumbnail Maker</title>
        <meta charSet="utf-8"></meta>
        <meta property="og:type" content="website" />
        <meta
          name="keywords"
          content="Thumbnail maker, youtube thumbnail maker, youtube blog, ai thumbnail generator, background removal"
        ></meta>
        <meta
          name="description"
          content="Stay Ahead in the YouTube Game! Explore weekly insights on Thumbnails, Video Strategies, and More. Elevate Your Content with ThumbnailAI's Blog."
        ></meta>
      </Head>

      <div className={classes.mainContainer}>
        <h1 className={[signika.className, classes.blogHeader].join(" ")}>
          Everything you need to know about YouTube Thumbnails: Your Ultimate Guide
        </h1>
        <div className={classes.blogContainer}>
          <div className={classes.bigBlog}>
            {bigBlogs.map((blog, i) => {
              return <BlogCards blog={blog} key={i} />;
            })}
          </div>
          <div className={classes.smallBlog}>
            {smallBlogs.map((blog, i) => {
              return <BlogCardsSmall blog={blog} key={i} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
