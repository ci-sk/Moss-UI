import DefaultTheme from 'vitepress/theme'
import { MoButton } from '@moss-ui/components' // 引入你的组件
export default {
    ...DefaultTheme,
    enhanceApp({ app }:any) {
        // 全局注册你的组件
        app.component('MoButton', MoButton)
    }
}
