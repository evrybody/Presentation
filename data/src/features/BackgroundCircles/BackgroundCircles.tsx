import React from "react";
import styles from "./BackgroundCircles.module.css";

// import Image from "next/image";

// import backgroundImage from "@/assets/icons/backgroundImgs.png";

const BackgroundCircles = () => (
  <div className={styles.circles}>
    <div className={styles.circle} style={{ top: "5%", left: "2%" }} />
    <div className={styles.circle} style={{ top: "90%", left: "-2%" }} />
    {/* <Image src={backgroundImage} alt="" loading="lazy" style={{ top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }} /> */}
    <div className={styles.circle} style={{ top: "10%", left: "95%" }} />
    <div className={styles.circle} style={{ top: "75%", left: "88%" }} />
  </div>
);

export default BackgroundCircles;