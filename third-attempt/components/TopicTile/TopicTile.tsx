"use client";

import Link from "next/link";

type Props = {
  title?: string;
  description?: string;
  ctaContent?: string;
  redirectTo: string;
};

export function TopicTile({
  title,
  description,
  ctaContent,
  redirectTo,
}: Props) {
  return (
    <div className="m-8 flex max-w-96 flex-col gap-8 rounded-xl bg-neutral p-8 text-neutral-content">
      {title ? <div className="flex-1">{title}</div> : null}
      {description ? <div className="">{description}</div> : null}
      <div className="flex justify-end">
        <Link href={redirectTo} className="btn btn-circle btn-accent rounded">
          {ctaContent ?? "Go"}
        </Link>
      </div>
    </div>
  );
}
