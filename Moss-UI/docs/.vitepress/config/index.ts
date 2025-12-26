import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'

// 获取当前文件所在的目录路径
const pathComponents = fileURLToPath(new URL('../../../packages/components/index.ts', import.meta.url))

export default defineConfig({
    title: "Moss UI",
    description: "组件库文档",
    themeConfig: {
        // ... 你的导航配置
        nav: [
            { text: '指南', link: '/guide/installation' },
            { text: '组件', link: '/components/button' }
        ],
    },
    vite: {
        resolve: {
            alias: [
                {
                    find: '@moss-ui/components',
                        replacement: pathComponents
                }
            ]
        }
    }
})
