"use client";
import React from "react";
import clsx from "clsx";

type Props = React.PropsWithChildren<{
  className?: string;
  id?: string;
}>;

export default function SectionWrapper({ className, id, children }: Props) {
  return (
    <section
      id={id}
      className={clsx(
        "relative w-full bg-surface",
        // typical section spacing:
        "py-16 md:py-24",
        className
      )}
    >
      {children}
    </section>
  );
}
