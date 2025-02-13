'use client';

import { useState } from 'react';

export default function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const lessons = [
    { id: 1, name: 'Basics 1' },
    { id: 2, name: 'Phrases' },
    { id: 3, name: 'Food' },
    { id: 4, name: 'Animals' },
  ];

  return (
    <div className="bg-gray-100 p-4">
      <button
        className="w-full bg-blue-500 text-white py-2 px-4 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Close Lessons' : 'Open Lessons'}
      </button>
      {isOpen && (
        <ul className="mt-4">
          {lessons.map((lesson) => (
            <li key={lesson.id} className="mb-2 p-2 bg-white rounded shadow">
              {lesson.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
