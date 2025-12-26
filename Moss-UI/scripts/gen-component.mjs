import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'
import { blue, green, red } from 'kolorist'
import enquirer from 'enquirer'
const { Input } = enquirer
const __dirname = path.dirname(fileURLToPath(import.meta.url))
async function generate() {
    const prompt = new Input({
        message: '请输入组件名称 (例如: input)',
        initial: 'component-name'
    })

    const name = await prompt.run()
    if (!name) return

    // 1. 定义各种路径
    const componentName = name.charAt(0).toUpperCase() + name.slice(1) // 首字母大写
    const componentDir = path.resolve(__dirname, `../packages/components/src/${name}`)
    const docsDir = path.resolve(__dirname, `../docs/components`)

    if (fs.existsSync(componentDir)) {
        console.log(red(`❌ 组件 ${name} 已存在！`))
        return
    }

    // 2. 创建文件夹
    fs.mkdirSync(componentDir, { recursive: true })
    fs.mkdirSync(path.resolve(componentDir, 'src'), { recursive: true })

    // 3. 生成 .vue 文件模板
    const vueTemplate = `<template>
  <div class="ve-${name}">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Ve${componentName}'
})
</script>

<style scoped>
.ve-${name} {
  /* 你的样式 */
}
</style>
`

    // 4. 生成 index.ts 模板
    const indexTemplate = `import ${componentName} from './src/${name}.vue'

export const Mo${componentName} = ${componentName}
export default Mo${componentName}
`

    // 5. 写入文件
    fs.writeFileSync(path.resolve(componentDir, `src/${name}.vue`), vueTemplate)
    fs.writeFileSync(path.resolve(componentDir, 'index.ts'), indexTemplate)

    // 6. 自动在 packages/components/src/index.ts 中追加导出
    const mainEntryPath = path.resolve(__dirname, '../packages/components/src/index.ts')
    const exportLine = `export * from './${name}'\n`
    fs.appendFileSync(mainEntryPath, exportLine)

    // 7. 生成对应的文档文件
    if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir, { recursive: true })
    const docTemplate = `# ${componentName} 组件

这里是 ${componentName} 的文档说明。

## 示例
<Ve${componentName}>内容</Ve${componentName}>
`
    fs.writeFileSync(path.resolve(docsDir, `${name}.md`), docTemplate)

    console.log(green(`
  ✅ 组件 ${name} 创建成功！
  📂 源码: packages/components/src/${name}
  📝 文档: docs/components/${name}.md
  🚀 已自动在总入口注册导出
  `))
}

generate()
