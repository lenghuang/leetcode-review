function fisherYatesShuffle<T>(array: readonly T[]): T[] {
  const shuffled = [...array]; // Create a shallow copy to avoid in-place modification
  let currentIndex = shuffled.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swap elements
    [shuffled[currentIndex], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[currentIndex],
    ];
  }

  return shuffled;
}

export { fisherYatesShuffle };

// Example usage:
// const originalArray = [1, 2, 3, 4, 5];
// const shuffledArray = fisherYatesShuffle(originalArray);

// console.log('Original array:', originalArray); // Unchanged
// console.log('Shuffled array:', shuffledArray); // A new, shuffled array
