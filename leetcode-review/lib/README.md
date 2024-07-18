## Library Folder

This folder is used for all sorts of backend business logic. These functions should be consumed by pages in `leetcode-review/app/*/page.tsx` to execute server side backend logic. But we move it here so that we avoid code bloat and those pages can just interact with the semantic of what these functions do (like get certain data), and not worry about implementation.

- `auth` relates to the starter app code for how Supabase handles authentication
- `chatgpt` relates to all code which sends prompts to OpenAI API
- `leetcode` relates to all logic dealing with the LeetCode public GraphQL endpoint

Generally, when importing these, we want to target these top level directories.

```js
// Preferred Style
import { checkAuthAsync } from "@/lib/auth";
// (Bad) Don't do this
import { checkAuthAsync } from "@/lib/auth/checkAuthAsync";
```
