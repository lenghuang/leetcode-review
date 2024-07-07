"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";

export function ExitQuestionIcon({ slug }: { slug: string }) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Link
      className="btn"
      href={`/question?slug=${slug}`}
      onClick={() => {
        setIsLoading(true);
      }}
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        <XMarkIcon />
      )}
    </Link>
  );
}
