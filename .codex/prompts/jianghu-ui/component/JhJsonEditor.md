# JhJsonEditor - AI 快速集成指南

> JSON 编辑器组件

## 🎯 核心用法

```vue
<jh-json-editor
  v-model="jsonData"
  :height="400"
/>

<script>
export default {
  data() {
    return {
      jsonData: {
        name: 'example',
        value: 123
      }
    };
  }
};
</script>
```

## 📋 关键 Props

| Prop | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| `value` / `v-model` | Object/Array | JSON 数据 | `{}` |
| `height` | Number | 高度 | `300` |
| `readonly` | Boolean | 只读 | `false` |

## ⚡ 快速模板

```vue
<template>
  <jh-card title="配置编辑">
    <jh-json-editor
      v-model="config"
      :height="500"
      @change="handleChange"
    />
    <v-btn color="primary" @click="handleSave">保存</v-btn>
  </jh-card>
</template>

<script>
export default {
  data() {
    return {
      config: {}
    };
  },
  methods: {
    handleChange(value) {
      console.log('JSON 变化:', value);
    },
    async handleSave() {
      await this.$api.saveConfig(this.config);
      this.$message.success('保存成功');
    }
  }
};
</script>
```
