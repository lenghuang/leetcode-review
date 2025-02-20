// Tutorial

import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Leetcode Review',
    short_name: 'LeetReview',
    description: 'Review Leetcode questions on the go',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#7550A6',
    icons: [
      {
        src: '/gengar-happy-large-512.jpeg',
      },
    ],
  };
}
