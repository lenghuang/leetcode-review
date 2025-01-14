export const getExampleJsonlData = (): string => {
  let res = '';
  for (let i = 0; i < 3; i++) {
    res += JSON.stringify({
      custom_id: `request-${i}`,
      method: 'POST',
      url: '/v1/chat/completions',
      body: {
        model: 'gpt-3.5-turbo-0125',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: 'Hello world!' },
        ],
        max_tokens: 1000,
      },
    });
    res += '\n';
  }
  return res;
};
