import clsx from "clsx";
import React from "react";
import styles from "./Container.module.css";

export default function Container({
  children,
  size = "default",
  className = "",
}: {
  children: React.ReactNode;
  size?: "default" | "small";
  className?: string;
}) {
  return (
    <div className={clsx(styles.container, styles[size], className)}>
      {children}
    </div>
  );
}
