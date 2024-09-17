import Image from 'next/image'
import React from 'react'
import Logo from "@/public/logo.jpeg"
import classes from './navbar.module.css'
import { Signika } from "next/font/google";

const signika = Signika({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});



const Navbar = () => {
  return (
    <div className={classes.mainContainer}>
        <div className={classes.header}>
        <Image src={Logo} alt='Small Group' className={classes.logo}/>
        <h1 className={signika.className}>Small Group</h1>
        </div>
    </div>
  )
}

export default Navbar