'use client';

import { useState } from 'react';

export default function DesktopSidebar() {
  const [currentLesson, setCurrentLesson] = useState(1);

  const lessons = [
    { id: 1, name: 'Basics 1' },
    { id: 2, name: 'Phrases' },
    { id: 3, name: 'Food' },
    { id: 4, name: 'Animals' },
  ];

  return (
    <div className="h-screen bg-gray-100 p-4 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Lessons</h2>
      <ul>
        {lessons.map((lesson) => (
          <li
            key={lesson.id}
            className={`mb-2 p-2 rounded cursor-pointer ${
              currentLesson === lesson.id
                ? 'bg-blue-500 text-white'
                : 'hover:bg-gray-200'
            }`}
            onClick={() => setCurrentLesson(lesson.id)}
          >
            {lesson.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
