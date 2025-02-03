//global.d.ts
import "react";

declare module "react" {
  interface CSSProperties {
    "--value"?: string | number;
    "--size"?: string | number;
    "--thickness"?: string | number;
  }
}
