export const parseJsonlString = (jsonlString: string) => {
  const jsonObjects = [];

  // Split the string by newlines and trim any unnecessary white spaces
  const lines = jsonlString.trim().split("\n");

  for (const line of lines) {
    if (line.trim()) {
      // Avoid empty lines
      try {
        const jsonObject = JSON.parse(line);
        jsonObjects.push(jsonObject);
      } catch (error) {
        console.error("Error parsing line:", line, error);
      }
    }
  }

  return jsonObjects;
};
