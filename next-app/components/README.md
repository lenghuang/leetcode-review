## Components Folder

This folder is used for all sorts of UI components. These should be `.tsx` components that do minimal amounts of computing and business logic. Most of these components should take the data from somewhere else, and only be concerned with the UI. The business logic can be handled in the `leetcode-review/app/*/page.tsx` files.

Generally, when importing these, we want to target these top level directories.

```js
// Preferred Style
import { BackLink, SyncForm } from "@/components/shared";
// (Bad) Don't do this
import { BackLink } from "@/components/shared/BackLink";
import { SyncForm } from "@/components/shared/SyncForm";
```
