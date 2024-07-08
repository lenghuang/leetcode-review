"use client";

import Link, { LinkProps } from "next/link";
import { HTMLAttributes, PropsWithChildren, ReactNode, useState } from "react";

export interface LinkWithLoadingProps extends PropsWithChildren<LinkProps> {
  loadingChildren: ReactNode;
}

export const LinkWithLoading = (props: LinkWithLoadingProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Link onClick={() => setIsLoading(true)} {...props}>
      {isLoading ? props.loadingChildren : props.children}
    </Link>
  );
};

// not sure why putting HTMLAttributes<HTMLAnchorElement> works here
export const LinkWithLoadingText = (
  props: PropsWithChildren<LinkProps> & HTMLAttributes<HTMLAnchorElement>,
) => {
  return (
    <LinkWithLoading
      className="text-info underline"
      loadingChildren={"Loading..."}
      {...props}
    ></LinkWithLoading>
  );
};
