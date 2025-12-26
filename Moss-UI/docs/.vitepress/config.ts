import { defineConfig } from 'vitepress'

export default defineConfig({
    title: "Moss UI",
    description: "一个基于 Vue 3 的轻量级组件库",
    themeConfig: {
        nav: [
            { text: '指南', link: '/guide/installation' },
            { text: '组件', link: '/components/button' }
        ],
        sidebar: {
            '/components/': [
                {
                    text: '基础组件',
                    items: [
                        { text: 'Button 按钮', link: '/components/button' }
                    ]
                }
            ]
        }
    }
})
