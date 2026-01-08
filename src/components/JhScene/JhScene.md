# JhScene - 场景切换组件

JhScene 用于保存并切换用户的查询/配置场景，支持本地存储、场景管理弹窗，适用于列表筛选方案、仪表盘布局等。

## 功能特性

- 🧭 **快速切换**：通过按钮组切换系统场景或自定义场景
- 🧺 **场景管理**：内置新增、删除弹窗，可管理自定义场景列表
- 💾 **持久化**：可选择写入 localStorage，刷新后仍保存
- 🧱 **外部联动**：切换后会将场景对象回传，父组件可更新查询条件
- 🧩 **可插槽扩展**：提供 `form` 插槽以渲染自定义筛选表单

## 基础用法

```vue
<template>
  <jh-scene
    :scenes="defaultScenes"
    :init-form-data="query"
    storage-key="customer-scene"
    :use-local-storage="true"
    @scene-change="applyScene"
    @scene-created="saveScene"
  >
    <template #form="{ form }">
      <customer-filter v-model="form" />
    </template>
  </jh-scene>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| initFormData | 新建场景时复制的初始表单数据 | object | `{}` |
| storageKey | 使用 localStorage 时的键名 | string | `jh-scene-list` |
| scenes | 系统内置场景列表 | Array | [] |
| currentSceneId | 默认选中的场景 id | string | null |
| showActionBtn | 是否显示“新建/管理”动作按钮 | boolean | true |
| useLocalStorage | 是否启用 localStorage 持久化 | boolean | false |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| scene-change | 切换场景后触发 | (scene: object) |
| scene-created | 新建场景成功时触发 | (scene: object) |
| scene-deleted | 删除场景时触发 | (scene: object) |
| error | 创建失败（如重名）时触发 | (message: string) |

### Slots

| 名称 | 说明 |
| --- | --- |
| form | 新建场景弹窗中的“筛选条件”区域，参数 `{ form }` |

## 使用建议

- 每个场景对象建议包含 `{ id, name, form, system, default }` 等字段，方便控制默认场景
- 当 `useLocalStorage` 为 true 时，组件自动将所有场景写入浏览器存储
- 切换场景时会将完整对象抛出，可直接将其 form 数据写回查询条件
