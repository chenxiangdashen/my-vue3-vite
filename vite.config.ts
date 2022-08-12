import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import Unocss from "unocss/vite";
/**
 * * unplugin-icons插件，自动引入iconify图标
 * usage: https://github.com/antfu/unplugin-icons
 * 图标库: https://icones.js.org/
 */
import Icons from "unplugin-icons/vite";
/**
 * * 组件库按需引入插件
 * usage: 直接使用组件,无需在任何地方导入组件
 */
import Components from "unplugin-vue-components/vite";
import * as path from "path";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

import { OUTPUT_DIR } from "./build/constant";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log(command, mode);
  const root = process.cwd();
  const env = loadEnv(mode, root);
  console.log("env", env);
  return {
    server: {
      proxy: {
        // 使用 proxy 实例
        "/api": {
          target: "http://106.14.171.53:8003/",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "/api"),
        },
      },
    },
    plugins: [
      vue(),
      Components({
        resolvers: [NaiveUiResolver()],
      }),
      Icons({ compiler: "vue3", autoInstall: true }),
      Unocss(),
    ],
    define: {
      "process.env": {},
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import '@/styles/variables.scss';`,
        },
      },
    },
    build: {
      target: "es2015",
      outDir: OUTPUT_DIR,
      reportCompressedSize: false, // 启用/禁用 gzip 压缩大小报告
      chunkSizeWarningLimit: 1024, // chunk 大小警告的限制（单位kb）
    },
  };
});
