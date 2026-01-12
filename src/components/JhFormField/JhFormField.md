# JhFormField 表单字段组件

## 介绍

JhFormField 是一个通用的表单字段组件，通过传入不同的 `type` 属性，可以渲染出不同类型的表单组件，如文本输入框、下拉选择框、日期选择器等。它支持 Vuetify 表单组件的所有参数，使用方式简单灵活。

## 基本用法

### 文本输入框

```vue
<jh-form-field type="text" v-model="value" label="文本输入" placeholder="请输入文本"></jh-form-field>
```

### 下拉选择框

```vue
<jh-form-field 
  type="select" 
  v-model="value" 
  label="下拉选择" 
  :items="[{text: '选项1', value: '1'}, {text: '选项2', value: '2'}]"
></jh-form-field>
```

### 日期选择器

```vue
<jh-form-field type="date" v-model="value" label="日期选择"></jh-form-field>
```

## 属性

### 通用属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| type | String | text | 表单字段类型 |
| value | Any | null | 表单字段值，支持 v-model |
| dense | Boolean | undefined | 是否使用紧凑样式 |
| filled | Boolean | undefined | 是否使用填充样式 |
| outlined | Boolean | undefined | 是否使用轮廓样式 |
| disabled | Boolean | false | 是否禁用 |
| readonly | Boolean | false | 是否只读 |
| placeholder | String | '' | 占位符文本 |
| rules | Array | [] | 验证规则 |
| hideDetails | Boolean/String | false | 是否隐藏详情 |
| color | String | primary | 颜色 |

### 类型特定属性

#### text/number/textarea

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| singleLine | Boolean | undefined | 是否单行 |
| prefix | String | '' | 前缀 |
| suffix | String | '' | 后缀 |
| rows | Number | 3 | 文本域行数 |

#### select/autocomplete

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| items | Array | [] | 选项列表 |
| itemText | String | text | 选项文本字段 |
| itemValue | String | value | 选项值字段 |
| multiple | Boolean | false | 是否支持多选 |
| chips | Boolean | false | 是否显示为标签 |

#### switch/checkbox

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| label | String | '' | 标签文本 |

#### radio

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| items | Array | [] | 选项列表 |
| itemText | String | text | 选项文本字段 |
| itemValue | String | value | 选项值字段 |
| row | Boolean | true | 是否行内显示 |

#### slider/range-slider

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| min | Number | 0 | 最小值 |
| max | Number | 100 | 最大值 |
| step | Number | 1 | 步长 |
| thumbLabel | Boolean | false | 是否显示滑块标签 |
| ticks | Boolean | false | 是否显示刻度 |
| tickSize | Number | 5 | 刻度大小 |

#### date/time/color

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| locale | String | zh-cn | 日期选择器语言 |
| hideModeSwitch | Boolean | true | 颜色选择器是否隐藏模式切换 |
| closeOnSelect | Boolean | true | 颜色选择器是否选择后关闭 |

## 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| input | 输入值变化时触发 | 新的输入值 |
| change | 输入值变化时触发 | 新的输入值 |
| blur | 失去焦点时触发 | 事件对象 |

## 支持的类型

| 类型 | 对应 Vuetify 组件 |
|------|------------------|
| text | v-text-field |
| number | v-text-field (type="number") |
| textarea | v-textarea |
| select | v-select |
| autocomplete | v-autocomplete |
| date | v-date-picker (带菜单) |
| time | v-time-picker (带菜单) |
| color | v-color-picker (带菜单) |
| switch | v-switch |
| checkbox | v-checkbox |
| radio | v-radio-group |
| slider | v-slider |
| range-slider | v-range-slider |

## 示例

### 各种类型的表单字段

```vue
<template>
  <div>
    <!-- 文本输入 -->
    <jh-form-field type="text" v-model="textValue" label="文本输入"></jh-form-field>
    
    <!-- 数字输入 -->
    <jh-form-field type="number" v-model="numberValue" label="数字输入"></jh-form-field>
    
    <!-- 文本域 -->
    <jh-form-field type="textarea" v-model="textareaValue" label="文本域"></jh-form-field>
    
    <!-- 下拉选择 -->
    <jh-form-field 
      type="select" 
      v-model="selectValue" 
      label="下拉选择" 
      :items="items"
    ></jh-form-field>
    
    <!-- 开关 -->
    <jh-form-field type="switch" v-model="switchValue" label="开关"></jh-form-field>
    
    <!-- 复选框 -->
    <jh-form-field type="checkbox" v-model="checkboxValue" label="复选框"></jh-form-field>
    
    <!-- 单选按钮组 -->
    <jh-form-field 
      type="radio" 
      v-model="radioValue" 
      label="单选按钮组" 
      :items="items"
    ></jh-form-field>
    
    <!-- 滑块 -->
    <jh-form-field type="slider" v-model="sliderValue" label="滑块"></jh-form-field>
    
    <!-- 日期选择器 -->
    <jh-form-field type="date" v-model="dateValue" label="日期选择"></jh-form-field>
    
    <!-- 时间选择器 -->
    <jh-form-field type="time" v-model="timeValue" label="时间选择"></jh-form-field>
    
    <!-- 颜色选择器 -->
    <jh-form-field type="color" v-model="colorValue" label="颜色选择"></jh-form-field>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textValue: '',
      numberValue: 0,
      textareaValue: '',
      selectValue: '',
      switchValue: false,
      checkboxValue: false,
      radioValue: '',
      sliderValue: 50,
      dateValue: '',
      timeValue: '',
      colorValue: '#000000',
      items: [
        { text: '选项1', value: '1' },
        { text: '选项2', value: '2' },
        { text: '选项3', value: '3' }
      ]
    };
  }
};
</script>
```

## 注意事项

1. JhFormField 组件支持 Vuetify 表单组件的所有属性，可以直接传递给对应的组件。
2. 对于日期、时间、颜色选择器，组件内部已经处理了菜单逻辑，无需额外配置。
3. 对于单选按钮组，组件会自动根据 `items` 属性生成对应的 `v-radio` 选项。
4. 组件支持 `v-model` 双向绑定，可以直接与父组件的数据进行绑定。
