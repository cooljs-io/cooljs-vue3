import { defineConfig } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import alias from "@rollup/plugin-alias";
import vue from "rollup-plugin-vue";

/**
 * Rollup Configuration
 */
export default defineConfig([
  {
    input: "src/index.ts",
    output: [
      {
        dir: "dist",
        format: "es",
        entryFileNames: (chunk) => `[name].mjs`,
      },
      {
        dir: "dist",
        format: "cjs",
        exports: "named",
        entryFileNames: (chunk) => `[name].cjs`,
      },
      {
        dir: "dist",
        format: "iife",
        name: "CoolJsVue3",
        entryFileNames: (chunk) => `[name].umd.js`,
      },
    ],

    plugins: [
      alias({
        entries: [
          {
            find: "@",
            replacement: new URL("./src", import.meta.url).pathname,
          },
        ],
      }),
      nodeResolve(),
      commonjs(),
      typescript({
        check: false,
      }),
      vue(),
    ],

    // 排除不需要混入代码中的第三方依赖
    external: [/^vue(\/.+|$)/],
  },
]);
