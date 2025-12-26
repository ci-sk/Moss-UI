import type { App } from 'vue'
import * as components from './src/index'

// 导出单个组件（支持按需引入）
export * from './src/index'

// 导出 Vue 插件（支持全局引入 app.use(MossUI)）
export default {
    install(app: App) {
        Object.entries(components).forEach(([name, component]) => {
            app.component(name, component)
        })
    }
}
