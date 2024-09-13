"use client"

import { useRouter } from 'next/navigation'; 
import styles from "./page.module.css";
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter(); 

  useEffect(() => {
    router.push('/blogs'); 
  }, [router]);

  return (
    <div className={styles.page}>
      {/* Other page content */}
    </div>
  );
}
