import type { UserConfig, ConfigEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'

import { loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteCompression from 'vite-plugin-compression'; // 大文件压缩.gz
import { visualizer } from "rollup-plugin-visualizer";

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

  console.log('env', env)

  return {
    base: env.VITE_BASE_PATH,
    plugins: [
      vue(),
      vueJsx(),
      viteMockServe({
        ignore: /^\_/,
        mockPath: 'mock',
        localEnabled: !isBuild,
        prodEnabled: env.VITE_USE_CHUNK_MOCK === 'true',
        injectCode: `
          import { setupProdMockServer } from '../mock/_createProductionServer'
  
          setupProdMockServer()
          `
      }),
      viteCompression({
        disable: false,
        deleteOriginFile: false, //删除源文件
        threshold: 102400, //压缩前最小文件大小---大于1024*100（kb）的文件进行压缩
        algorithm: 'gzip', //压缩算法
        ext: '.gz', //文件类型
      }),
      visualizer({
        open: true,  // 注意这里要设置为true，否则无效 
        gzipSize: true, // 分析图生成的文件名
        brotliSize: true, // 收集 brotli 大小并将其显示
        filename: "stats.html", // 分析图生成的文件名
      })
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
    build:{
      // minify: 'terser',
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('china_geo.json')) {
              return 'china_geo.json';
            }
            if (id.includes("node_modules")) {
              const nodeModulesArr = id.toString().split("node_modules/")
              return nodeModulesArr[nodeModulesArr.length-1].split("/")[0].toString()
            }
          }
          // manualChunks: {
          //   echarts: ['echarts']
          // }
        }
      }
    },
    server: {
      host: '0.0.0.0',
      port: 8080,
      proxy: { // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
        // 正则表达式写法
        '^/customer': {
          // target: 'http://172.20.10.9:8084', 
          // target: 'http://10.100.182.125:8084', // jj
          // target: 'http://192.168.0.145:8084', 
          // target: "http://10.177.105.25:8084/",
          // target: "http://10.177.105.24:8084",
          // target: "http://11.54.93.94:32573/",
          // target: "http://11.54.87.224:31617/",
          // target: "http://portal.c.cloudos.cnpc.com.cn/",
          // target: "http://share.c.cloudos.cnpc.com.cn/",
          target: "http://d.c.cloudos.cnpc.com.cn/",
          // target: "http://dev.c.cloudos.cnpc.com.cn",
          // target: 'http://t.c.cloudos.cnpc.com.cn/',
          changeOrigin: true, //开启代理
          // rewrite: (path) => path.replace(/^\/customer/, 'customer')
        }
      }
    }
  }
}
