import Link from 'next/link';
import { Home, Search, Bell, User } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { GengarIcon } from '@/components/gengar-icon';

const navItems = [
  { name: 'Home', icon: Home, href: '/' },
  { name: 'Search', icon: Search, href: '/search' },
  { name: 'Notifications', icon: Bell, href: '/notifications' },
  { name: 'Profile', icon: User, href: '/profile' },
];

const HeroIcon = () => (
  <Button asChild variant="ghost" size="icon" className="rounded-none">
    <Link href="/">
      <GengarIcon />
      <span className="sr-only">Hero</span>
    </Link>
  </Button>
);

export function ResponsiveHeader() {
  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-5 text-sm">
      {/* TODO add a back button if its  */}

      {/* Hero Header - Only visible on mobile */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center bg-background
          lg:hidden"
      >
        <HeroIcon />
      </header>

      {/* Navigation - Bottom on mobile, top on desktop */}
      <nav
        className={cn(
          'fixed left-0 right-0 z-50 flex items-center bg-background',
          'bottom-0 lg:top-0 lg:bottom-auto'
        )}
      >
        <div className="flex w-full items-center py-2 px-4">
          {/* Hero Icon - Only visible on desktop */}
          <div className="hidden lg:block lg:pr-4">
            <HeroIcon />
          </div>

          {/* Navigation Items */}

          <ul className="flex w-full items-center justify-around lg:justify-end lg:gap-1">
            {navItems.map((item) => (
              <li key={item.name} className="flex items-center justify-center">
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="lg:flex lg:items-center lg:px-4"
                >
                  <Link className="lg:w-auto" href={item.href}>
                    <item.icon className="h-5 w-5 lg:hidden" />
                    <span className="sr-only lg:not-sr-only lg:inline-block">
                      {item.name}
                    </span>
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}
