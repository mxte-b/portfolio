/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module "*.glsl" {
  const value: string;
  export default value;
}