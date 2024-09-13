import React from "react";
import classes from "./blogCardsSmall.module.css";
import Image from "next/image";
import { Montserrat, Signika } from "next/font/google";

const signika = Signika({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "500"],
});

const BlogCardsSmall = ({ blog }) => {
  return (
    <div className={classes.mainContainer}>
      <a href={`/blogs/${blog.id}`} key={blog.id}>
        <Image
          src={blog.img}
          alt="AI Thumbnail Maker Youtube"
          width={1500}
          height={2500}
          priority
          className={classes.imgWraper}
        />
        <h3 className={signika.className}>{blog.title}</h3>
        <p className={montserrat.className}>{blog.description}</p>
      </a>
    </div>
  );
};

export default BlogCardsSmall;
