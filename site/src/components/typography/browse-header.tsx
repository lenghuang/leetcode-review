import React from 'react';

interface BrowseHeaderProps {
  children: React.ReactNode;
}

export const BrowseHeader: React.FC<BrowseHeaderProps> = ({ children }) => (
  <h2 className="font-bold text-2xl mb-4">{children}</h2>
);
