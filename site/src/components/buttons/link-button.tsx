'use client'; // Mark as a client component

import Link from 'next/link';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { ReactNode, useState } from 'react';
import { LoadingSpinner } from '../ui/loading-spinner';

type Props = {
  href: string;
  buttonClassName?: string;
  spinnerClassName?: string;
  spinnerSize?: number;
  children: ReactNode;
};

export const LinkButton: React.FC<Props> = ({
  href,
  buttonClassName,
  spinnerClassName,
  spinnerSize,
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    // We don't need to set to loading false again since this is a link,
    // and it'll just go to the next page
    setIsLoading(true);
  };

  return (
    <Link href={href}>
      <Button
        className={cn(buttonClassName)}
        onClick={handleClick}
        disabled={isLoading}
      >
        {children}
        <LoadingSpinner
          size={spinnerSize}
          className={cn('ml-2', spinnerClassName, isLoading ? '' : 'hidden')}
        />
      </Button>
    </Link>
  );
};
