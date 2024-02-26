
declare module '*.module.scss' {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.ico'

declare module "*.svg" {
import type { VFC, SVGProps } from "react";
  const SVG: VFC<SVGProps<SVGSVGElement>>;
  export default SVG;
}

declare const BACKEND_URL: string;