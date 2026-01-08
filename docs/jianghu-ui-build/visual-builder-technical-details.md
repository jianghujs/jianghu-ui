# Jianghu-UI 可视化构建器技术实现细节

本文档提供可视化页面构建器的详细技术实现示例和最佳实践。

## 一、拖拽系统实现

### 1.1 拖拽指令

```javascript
// directives/drag.js
export const vDrag = {
  mounted(el, binding) {
    const { type, data } = binding.value
    el.draggable = true
    
    el.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('application/json', JSON.stringify({ type, data }))
      el.classList.add('dragging')
    })
    
    el.addEventListener('dragend', () => {
      el.classList.remove('dragging')
    })
  }
}

// directives/drop.js
export const vDrop = {
  mounted(el, binding) {
    const { nodeId, onDrop } = binding.value
    
    el.addEventListener('dragover', (e) => {
      e.preventDefault()
      el.classList.add('drop-target')
    })
    
    el.addEventListener('drop', (e) => {
      e.preventDefault()
      const data = JSON.parse(e.dataTransfer.getData('application/json'))
      onDrop?.({ parentId: nodeId, ...data })
    })
  }
}
```

## 二、组件渲染器

```vue
<!-- ComponentRenderer.vue -->
<template>
  <component
    :is="componentTag"
    v-bind="componentProps"
    @click.stop="handleClick"
  >
    <component-renderer
      v-for="child in node.children"
      :key="child.id"
      :node="child"
    />
  </component>
</template>

<script>
export default {
  name: 'ComponentRenderer',
  props: {
    node: Object
  },
  computed: {
    componentTag() {
      return this.node.type
    },
    componentProps() {
      return this.node.props || {}
    }
  }
}
</script>
```

## 三、代码生成器

```javascript
export class VueSFCGenerator {
  generate(schema) {
    return `<template>
${this.generateTemplate(schema.tree)}
</template>

<script>
export default {
  name: '${schema.meta.title}',
  data() {
    return ${JSON.stringify(schema.scripts.data)}
  }
}
</script>`
  }
  
  generateTemplate(node, level = 1) {
    const indent = '  '.repeat(level)
    const tag = this.toKebabCase(node.type)
    const attrs = this.generateAttrs(node.props)
    
    if (!node.children?.length) {
      return `${indent}<${tag}${attrs} />`
    }
    
    const children = node.children
      .map(child => this.generateTemplate(child, level + 1))
      .join('\n')
    
    return `${indent}<${tag}${attrs}>
${children}
${indent}</${tag}>`
  }
  
  generateAttrs(props) {
    return Object.entries(props || {})
      .map(([key, val]) => {
        if (typeof val === 'boolean') return val ? ` ${key}` : ''
        if (typeof val === 'string') return ` ${key}="${val}"`
        return ` :${key}="${key}"`
      })
      .join('')
  }
  
  toKebabCase(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
  }
}
```

## 四、组件注册中心

```javascript
export class ComponentRegistry {
  constructor() {
    this.components = new Map()
  }
  
  register(adapter) {
    this.components.set(adapter.schema.type, adapter)
  }
  
  get(type) {
    return this.components.get(type)
  }
  
  getByCategory(category) {
    return Array.from(this.components.values())
      .filter(a => a.schema.category === category)
  }
}
```

## 五、性能优化

### 5.1 防抖节流

```javascript
export function debounce(fn, delay = 300) {
  let timer = null
  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}

export function throttle(fn, delay = 300) {
  let last = 0
  return function(...args) {
    const now = Date.now()
    if (now - last > delay) {
      last = now
      fn.apply(this, args)
    }
  }
}
```

### 5.2 虚拟滚动

对于大量组件列表，使用虚拟滚动技术只渲染可见区域。

## 六、插件系统

```javascript
export const HistoryPlugin = {
  name: 'history',
  install(builder) {
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault()
        builder.store.undo()
      }
    })
  }
}
```

## 七、测试策略

- **单元测试**：测试代码生成器、Schema 验证等
- **集成测试**：测试拖拽、组件渲染等交互
- **E2E 测试**：测试完整的页面构建流程

## 八、部署建议

1. **独立应用**：作为独立 Web 应用部署
2. **嵌入式 SDK**：集成到现有系统
3. **在线服务**：提供 SaaS 服务

详细实现请参考主方案文档。
