"use client";

import React from "react";
import Image from "next/image";
import defaultSlotImage from "@/assets/imgs/defaultSlotImage.svg";
import styles from "./ItemGrid.module.css";

const ItemSkeleton = () => {
  return (
    <div className={styles.itemGridCard}>
      <div className={`${styles.gameCard} ${styles.skeleton}`}>
        <div className={styles.imageWrapper}>
          <Image
            src={defaultSlotImage}
            alt="Gamble"
            loading="lazy"
            fill
            className={styles.skeletonImg}
          />
        </div>
        <div className={styles.gameDescriptionWrapper}>
          <div className={`${styles.gameDemo} ${styles.skeletonText}`} />
          <div className={`${styles.gameDescription} ${styles.skeletonText}`} />
        </div>
      </div>
    </div>
  );
};

export default ItemSkeleton;
