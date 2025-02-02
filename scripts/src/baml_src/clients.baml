// Learn more about clients at https://docs.boundaryml.com/docs/snippets/clients/overview

// https://platform.openai.com/docs/models#gpt-4o
client<llm> OpenAIGPT4o {
  provider openai
  options {
    model "gpt-4o"
    api_key env.OPENAI_API_KEY
  }
}

// https://platform.openai.com/docs/models#gpt-4o-mini
client<llm> OpenAIGPT4oMini {
  provider openai
  retry_policy Exponential
  options {
    model "gpt-4o-mini"
    api_key env.OPENAI_API_KEY
  }
}

// https://openrouter.ai/microsoft/phi-3-mini-128k-instruct:free
client<llm> OpenRouterPhi3Mini128kInstructFree {
  provider openai-generic
  retry_policy Exponential
  options {
    model "microsoft/phi-3-mini-128k-instruct:free"
    base_url env.OPENROUTER_BASE_URL
    api_key env.OPENROUTER_API_KEY
  }
}

// https://openrouter.ai/google/gemini-2.0-flash-thinking-exp:free
client<llm> OpenRouterGemini2FlashThinkingExpFree {
  provider openai-generic
  retry_policy Exponential
  options {
    model "google/gemini-2.0-flash-thinking-exp:free"
    base_url env.OPENROUTER_BASE_URL
    api_key env.OPENROUTER_API_KEY
  }
}

// https://openrouter.ai/deepseek/deepseek-r1:free
client<llm> OpenRouterDeepseekR1Free {
  provider openai-generic
  retry_policy Exponential
  options {
    model "deepseek/deepseek-r1:free"
    base_url env.OPENROUTER_BASE_URL
    api_key env.OPENROUTER_API_KEY
  }
}

// https://openrouter.ai/google/gemini-flash-1.5
// $0.075/M input tokens
client<llm> OpenRouterGeminiFlash15Paid {
  provider openai-generic
  retry_policy Exponential
  options {
    model "google/gemini-flash-1.5"
    base_url env.OPENROUTER_BASE_URL
    api_key env.OPENROUTER_API_KEY
  }
}

// https://openrouter.ai/meta-llama/llama-3.2-1b-instruct
// $0.01/M input tokens
client<llm> OpenRouterMetaLlama321bInstruct {
  provider openai-generic
  retry_policy Exponential
  options {
    model "meta-llama/llama-3.2-1b-instruct"
    base_url env.OPENROUTER_BASE_URL
    api_key env.OPENROUTER_API_KEY
  }
}


// https://openrouter.ai/qwen/qwen-2-7b-instruct:free
client<llm> OpenRouterQwen27bInstructFree {
  provider openai-generic
  retry_policy Exponential
  options {
    model "qwen/qwen-2-7b-instruct:free"
    base_url env.OPENROUTER_BASE_URL
    api_key env.OPENROUTER_API_KEY
  }
}

// https://docs.boundaryml.com/docs/snippets/clients/round-robin
client<llm> OpenRouterSmallFree {
  provider round-robin
  options {
    // This will alternate between the two clients
    strategy [OpenRouterQwen27bInstructFree, OpenRouterPhi3Mini128kInstructFree]
  }
}

client<llm> OpenRouterBigFree {
  provider round-robin
  options {
    // This will alternate between the two clients
    strategy [OpenRouterGemini2FlashThinkingExpFree, OpenRouterDeepseekR1Free]
  }
}

// https://docs.boundaryml.com/docs/snippets/clients/fallback
client<llm> OpenAIFallback {
  provider fallback
  options {
    // This will try the clients in order until one succeeds
    strategy [OpenAIGPT4o, OpenAIGPT4oMini]
  }
}

// https://docs.boundaryml.com/docs/snippets/clients/retry
retry_policy Constant {
  max_retries 3
  // Strategy is optional
  strategy {
    type constant_delay
    delay_ms 200
  }
}

retry_policy Exponential {
  max_retries 2
  // Strategy is optional
  strategy {
    type exponential_backoff
    delay_ms 300
    mutliplier 1.5
    max_delay_ms 10000
  }
}