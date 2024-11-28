## Components Folder

This folder is used for all sorts of UI components. These should be `.tsx` components that do minimal amounts of computing and business logic. Most of these components should take the data from somewhere else, and only be concerned with the UI. The business logic can be handled in the `leetcode-review/app/*/page.tsx` files.

- Folders in `components/app` are ones that are tightly coupled with the corresponding app directory in `leetcode-review/app` (the Next.js app router). I use this in case there is business logic that I need to tightly couple with UI, but can't afford to separate it due to extreme code bloat.
- Components in `components/shared` are shared UI components like buttons, loaders, and more that I create so that I can use elsewhere on the site to create a sense of consistency
- Components in `components/tutorial` are leftover from the Next.js starter app tutorial.

Generally, when importing these, we want to target these top level directories.

```js
// Preferred Style
import { BackLink, SyncForm } from "@/components/shared";
// (Bad) Don't do this
import { BackLink } from "@/components/shared/BackLink";
import { SyncForm } from "@/components/shared/SyncForm";
```
