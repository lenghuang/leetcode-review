import React from 'react';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-7xl flex flex-col gap-20 p-5">
      <div className="max-w-7xl flex flex-col gap-12 items-start">
        {children}
      </div>
    </div>
  );
}
