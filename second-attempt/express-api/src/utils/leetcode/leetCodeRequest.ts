import axios from "axios";

const endpoint = "https://leetcode.com/graphql";

// Define a queue to handle requests
let requestQueue: Array<{
  cookieString: string;
  query: string;
  variables: any;
  delayBetweenRequests: number;
  resolve: Function;
  reject: Function;
}> = [];

// Function to make the actual LeetCode request
const leetCodeRequestInternal = async (
  cookieString: string,
  query: string,
  variables?: any
) => {
  const options = {
    method: "POST",
    url: endpoint,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieString,
    },
    data: {
      query: query,
      variables: variables,
    },
  };

  try {
    const res = await axios(options);
    return res.data.data; // Axios automatically parses JSON
  } catch (error) {
    console.error("GraphQL request error:", error);
  }

  return null;
};

// If null data, back off, and reattempt up to three times
const retryWithSimpleBackoff = async (
  cookieString: string,
  query: string,
  variables?: any,
  delayBetweenRequests = 250
) => {
  let delay = delayBetweenRequests;
  for (let i = 0; i < 3; i++) {
    const data = await leetCodeRequestInternal(cookieString, query, variables);
    if (data) {
      return data;
    }
    // If failed, wait and try again at double the time
    delay = Math.max(delay * 2, 2000);
    await new Promise((resolve) => setTimeout(resolve, delay));
    console.log("LeetCodeRequest Failed, trying again with delay");
  }
};

// Process the queue with a delay
const processQueue = async () => {
  if (requestQueue.length === 0) return;

  // Get the next request in the queue
  const {
    cookieString,
    query,
    variables,
    delayBetweenRequests,
    resolve,
    reject,
  } = requestQueue.shift()!;

  try {
    const data = await retryWithSimpleBackoff(
      cookieString,
      query,
      variables,
      delayBetweenRequests
    );
    resolve(data);
  } catch (error) {
    reject(error);
  }

  // Wait for the defined delay before processing the next request
  setTimeout(processQueue, delayBetweenRequests);
};

// Queueing a request
const leetCodeRequest = (
  cookieString: string,
  query: string,
  variables?: any,
  delayBetweenRequests = 250
): Promise<any> => {
  return new Promise((resolve, reject) => {
    // Add the request to the queue
    requestQueue.push({
      cookieString,
      query,
      variables,
      delayBetweenRequests,
      resolve,
      reject,
    });

    // Start processing the queue if it's not already running
    if (requestQueue.length === 1) {
      processQueue();
    }
  });
};

export default leetCodeRequest;
