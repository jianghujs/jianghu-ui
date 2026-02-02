# JhTreeSelect - 树形选择器

JhTreeSelect 提供多选/单选树对话框，集成搜索、全选、移动端适配和已选列表，适用于组织、权限、分类等层级数据的选择。

## 功能特性

- 🌳 **多模式**：支持 `multiple`/`single` 两种模式，可选择节点或仅选择叶子
- 🔍 **即时搜索**：关键字过滤树节点，并支持“全选当前搜索结果”
- 📱 **响应式**：小屏自动切换全屏弹窗，已选区域在移动端折叠展示
- 🧺 **批量操作**：内置全选、清除、批量删除已选项
- 🔁 **受控对话框**：`visible` + `v-model` 统一控制，确认再回传

## 基础用法

```vue
<template>
  <jh-tree-select
    v-model="selectedNodes"
    :visible.sync="dialogVisible"
    :data="treeData"
    mode="multiple"
    :allow-select-node="true"
    title="选择部门"
    @confirm="handleConfirm"
  />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | `v-model`，选中节点数组 | Array | [] |
| visible | 弹窗是否显示 | boolean | false |
| mode | 选择模式 `multiple/single` | string | `multiple` |
| title | 对话框标题 | string | `选择节点` |
| placeholder | 搜索框占位符 | string | `搜索节点` |
| maxWidth | 弹窗最大宽度 | string | `1000px` |
| data | 树形数据源 | Array | [] |
| nodeKey | 节点唯一 key 字段名 | string | `id` |
| nodeLabel | 节点显示字段名 | string | `label` |
| nodeChildren | 子节点字段名 | string | `children` |
| allowSelectNode | 是否允许点击节点本身选择 | boolean | false |
| showSearch | 是否展示搜索框 | boolean | true |
| showSelectAll | 是否展示全选按钮（仅 multiple） | boolean | true |
| loading | 数据加载状态 | boolean | false |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| input | `v-model` 更新，返回选中节点数组 | (nodes: Array) |
| update:visible | 同步弹窗开关 | (visible: boolean) |
| confirm | 点击“确定”后触发 | (nodes: Array) |
| cancel | 点击“取消”或关闭图标后触发 | - |

### Slots

组件暂未开放插槽。

## 数据结构示例

```js
const treeData = [
  {
    id: 'dept-1',
    label: '总部',
    children: [
      { id: 'dept-1-1', label: '技术部' },
      { id: 'dept-1-2', label: '运营部' }
    ]
  }
];
```

## 使用建议

- 如果只允许选择叶子节点，可将 `allowSelectNode` 设为 false，并在 `toggleNode` 中自定义策略
- 需要默认展开其他层级时，可修改组件数据或 fork 组件以暴露更多控制属性
- 回传的数据为节点对象，包含原始字段，可直接提交给后端或提取 ID
