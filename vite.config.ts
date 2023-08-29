import type { UserConfig, ConfigEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'

import { loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const root = process.cwd()

// https://vitejs.dev/config/
export default  ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build'
  let env = {} as any

  if (!isBuild) {
    env = loadEnv((process.argv[3] === '--mode' ? process.argv[4] : process.argv[3]), root)
  } else {
    env = loadEnv(mode, root)
  }

  return {
    base: env.VITE_BASE_PATH,
    plugins: [
      vue(),
      vueJsx(),
    ],
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.less', '.css'],
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          additionalData: '@import "./src/styles/variables.module.less";',
          javascriptEnabled: true,
          math: "always", // 括号内才使用数学计算
          globalVars: {
            // 全局变量
            mainColor: "red",
          },
        },
      },
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_debugger: env.VITE_DROP_DEBUGGER === 'true',
          drop_console: env.VITE_DROP_CONSOLE === 'true'
        }
      },
    },
    server: {
      host: '0.0.0.0',
      port: 8080,
      proxy: { // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
        // 正则表达式写法
        '^/customer': {
          // target: 'http://172.20.10.9:8084', 
          // target: 'http://192.168.0.145:8084', 
          // target: "http://10.177.105.25:8084/",
          // target: "http://10.177.105.24:8084",
          // target: "http://11.54.93.94:32573/",
          // target: "http://11.54.87.224:31617/",
          // target: "http://portal.c.cloudos.cnpc.com.cn/",
          // target: "http://share.c.cloudos.cnpc.com.cn/",
          // target: "http://d.c.cloudos.cnpc.com.cn/",
          // target: "http://dev.c.cloudos.cnpc.com.cn",
          target: 'http://t.c.cloudos.cnpc.com.cn/',
          changeOrigin: true, //开启代理
          // rewrite: (path) => path.replace(/^\/customer/, 'customer')
        }
      }
    }
  }
}
