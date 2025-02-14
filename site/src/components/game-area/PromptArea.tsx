'use client';

import { useState, useEffect } from 'react';

export default function PromptArea() {
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    // In a real app, you'd fetch this from an API based on the current question
    setPrompt(
      'Translate the following sentence to Spanish. Pay attention to the verb conjugation and noun gender.'
    );
  }, []);

  return (
    <div className="w-full lg:w-1/2 bg-white">
      <h2 className="text-xl font-bold mb-4">Instructions</h2>
      <p className="text-gray-700">{prompt}</p>
      <div className="mt-6">
        <h3 className="font-bold mb-2">Tips:</h3>
        <ul className="list-disc list-inside text-sm text-gray-600">
          <li>
            Remember to use "el" for masculine nouns and "la" for feminine
            nouns.
          </li>
          <li>The verb ending changes based on the subject of the sentence.</li>
          <li>Pay attention to any irregular verbs in the sentence.</li>
        </ul>
      </div>
    </div>
  );
}
