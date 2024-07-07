"use client";

import Link from "next/link";
import { useState } from "react";

export function ExitQuestionIcon({ slug }: { slug: string }) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Link
      className="btn btn-square btn-small"
      href={`/question?slug=${slug}`}
      onClick={() => {
        setIsLoading(true);
      }}
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}
    </Link>
  );
}
