# JhDraggable - 拖拽搭建容器

JhDraggable 是基于 `vuedraggable` 的拖拽容器，提供组件库到设计区域的拖拽、排序能力，适合作为低代码页面的基础框架。

## 功能特性

- 🧱 **双面板设计**：左侧组件库、右侧设计区，支持克隆式拖入
- 🧠 **受控数据**：组件库/设计区都以数组驱动，可直接持久化配置
- 🎨 **拖拽状态样式**：`dragClass`、`ghostClass`、`chosenClass` 可自定义
- 🧲 **空状态引导**：未放入组件时提供占位提示，提高可用性
- 🔌 **事件透传**：暴露 `start/end/input/change`，方便监听拖拽或保存

## 基础用法

```vue
<template>
  <jh-draggable
    :components="materialList"
    v-model="pageBlocks"
    component-library-title="组件库"
    @change="save"
  >
    <template #item="{ item }">
      <div class="custom-block">{{ item.title }}</div>
    </template>
  </jh-draggable>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| components | 组件库数据源 | Array | [] |
| value | v-model，设计区元素数组 | Array | [] |
| showComponentLibrary | 是否显示左侧组件库 | boolean | true |
| componentLibraryTitle | 左侧标题 | string | `组件` |
| groupName | vuedraggable 分组名 | string | `draggable-group` |
| animation | 拖拽动画时长(ms) | number | 300 |
| dragClass | 拖拽中附加的 class | string | `jh-drag-class` |
| ghostClass | 占位元素 class | string | `jh-ghost-class` |
| chosenClass | 选中元素 class | string | `jh-chosen-class` |
| emptyPlaceholder | 空状态提示文案 | string | `从左侧拖入或点选组件进行内容设计` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| input | 设计区内容变更 | (blocks: any[]) |
| change | 设计区排序/新增后的内容 | (blocks: any[]) |
| start | 拖拽开始 | - |
| end | 拖拽结束 | - |

### Slots

| 名称 | 说明 |
| --- | --- |
| item | 自定义设计区内每个元素的展示，参数 `{ item }` |

## 使用建议

- 组件默认会为设计区元素补齐唯一 id，建议根据业务字段（如 `component`）渲染
- 如需拖拽嵌套或跨页面共享，可通过 `groupName` 配置相同分组名
- 若 `vuedraggable` 未被全局注册，需要在父级组件手动注册/引入
