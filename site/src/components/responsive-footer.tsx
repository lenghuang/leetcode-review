import React from 'react';

export const ResponsiveFooter = () => (
  <footer className="w-full hidden lg:flex justify-center border-t text-xs py-6">
    <div className="flex gap-1">
      AI slop by
      <a
        href="https://github.com/lenghuang/leetcode-review"
        target="_blank"
        className="font-bold hover:underline"
        rel="noreferrer"
      >
        lendevelops
      </a>
      <img className="w-[16px] h-[16px]" src="/pika-wave.gif" />
    </div>
  </footer>
);
