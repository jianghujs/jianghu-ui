# JhAddressSelect - 省市区选择组件

省市区三级联动选择组件，支持自定义显示层级、标签文本和数据源。

- ✅ **四级联动**: 支持省、市、区、镇四级联动选择
- ✅ **自定义层级**: 可配置显示 1-4 级（仅省份、省市、省市区、省市区镇）
- ✅ **自定义标签**: 支持自定义各级别的显示文本
- ✅ **自定义数据**: 支持传入自定义省市区数据源
- ✅ **样式透传**: 支持 Vuetify 的 outlined、dense、loading 等样式
- ✅ **双向绑定**: 支持 v-model 双向数据绑定
- ✅ **事件触发**: change 事件在值变化时触发
- ✅ **清除功能**: 支持清除已选值
- ✅ **返回完整信息**: 事件返回包�� code 和 name 的完整对象
- ✅ **多种模式**: 支持普通联动选择 (select) 和级联选择 (cascader) 两种模式

## 基本用法

```vue
<template>
  <jh-address-select
    v-model="address"
    :data="addressData"
    @change="handleAddressChange"
  ></jh-address-select>
</template>

<script>
export default {
  data() {
    return {
      address: { province: null, city: null, district: null, town: null },
      addressData: [
        { code: '110000', name: '北京市', children: [...] },
        { code: '440000', name: '广东省', children: [...] }
      ]
    };
  },
  methods: {
    handleAddressChange(value) {
      console.log('省份:', value.province?.name, value.province?.code);
      console.log('城市:', value.city?.name, value.city?.code);
      console.log('区县:', value.district?.name, value.district?.code);
      console.log('乡镇:', value.town?.name, value.town?.code);
    }
  }
};
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value / v-model | 绑定值，返回包含 code 和 name 的对象 | object | { province: null, city: null, district: null } |
| level | 显示层级：1-仅省份，2-省市，3-省市区，4-省市区镇 | number | 3 |
| type | 显示模式：'select' (默认) 或 'cascader' | string | 'select' |
| label | 级联模式下的输入框标签 | string | '请选择地区' |
| outlined | 是否使用 outlined 样式 | boolean | true |
| dense | 是否使用紧凑模式 | boolean | false |
| loading | 是否显示加载状态 | boolean | false |
| labels | 自定义标签文本 | object | { province: '省份', city: '城市', district: '区/县', town: '乡镇' } |
| data | 省市区数据源 | array | 内置示例数据 |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| input | 值变化时触发（v-model） | (value: object) |
| change | 值变化时触发 | (value: object) |

### 返回值格式

v-model 绑定值和事件回调参数的格式：

```javascript
{
  province: { code: '440000', name: '广东省' },
  city: { code: '440300', name: '深圳市' },
  district: { code: '440305', name: '南山区' },
  town: { code: '440305001', name: '南头街道' }  // level=4 时存在
}
```

每个字段都是一个对象，包含 `code`（编码）和 `name`（名称）两个属性。未选择时为 `null`。

### 数据格式

data 属性需要符合以下格式：

```javascript
[
  {
    code: '110000',  // 省份编码
    name: '北京市',   // 省份名称
    children: [      // 城市列表
      {
        code: '110100',  // 城市编码
        name: '市辖区',   // 城市名称
        children: [      // 区县列表
          {
            code: '110101',  // 区县编码
            name: '东城区'   // 区县名称
          }
        ]
      }
    ]
  }
]
```

## 使用示例

### 默认三级联动

```vue
<jh-address-select
  v-model="address"
  :data="addressData"
></jh-address-select>
```

### 级联选择模式

使用 `type="cascader"` 开启级联选择模式。

```vue
<jh-address-select
  v-model="address"
  type="cascader"
  label="收货地址"
  :data="addressData"
></jh-address-select>
```

### 仅选择到城市

```vue
<jh-address-select
  v-model="address"
  :level="2"
  :data="addressData"
></jh-address-select>
```

### 仅选择省份

```vue
<jh-address-select
  v-model="address"
  :level="1"
  :data="addressData"
></jh-address-select>
```

### 四级联动（省市区镇）

```vue
<jh-address-select
  v-model="address"
  :level="4"
  :data="addressData"
></jh-address-select>
```

### 四级联动（带初始值）

```vue
<jh-address-select
  v-model="address"
  :level="4"
  :data="addressData"
></jh-address-select>

<script>
export default {
  data() {
    return {
      address: {
        province: { code: '440000', name: '广东省' },
        city: { code: '440300', name: '深圳市' },
        district: { code: '440305', name: '南山区' },
        town: { code: '440305001', name: '南头街道' }
      }
    };
  }
};
</script>
```

### 紧凑模式

```vue
<jh-address-select
  v-model="address"
  dense
  :data="addressData"
></jh-address-select>
```

### 自定义标签文本

```vue
<jh-address-select
  v-model="address"
  :labels="{ province: '所在省份', city: '所在城市', district: '所在区县' }"
  :data="addressData"
></jh-address-select>
```

### 加载状态

```vue
<jh-address-select
  v-model="address"
  :loading="isLoading"
  :data="addressData"
></jh-address-select>
```

### 使用 filled 样式

```vue
<jh-address-select
  v-model="address"
  :outlined="false"
  :data="addressData"
></jh-address-select>
```

### 监听变化

```vue
<template>
  <jh-address-select
    v-model="address"
    :data="addressData"
    @change="handleAddressChange"
  ></jh-address-select>
</template>

<script>
export default {
  methods: {
    handleAddressChange(value) {
      console.log('地址变化:', value);
    }
  }
};
</script>
```

## 注意事项

1. **数据格式**: data 属性必须符合指定的嵌套格式，包含 code 和 name 字段
2. **层级控制**: level 属性控制显示的级数，设置为 1 时只显示省份，2 时显示省市，3 时显示省市区，4 时显示省市区镇
3. **联动逻辑**: 选择省份后会清空城市、区县和乡镇，选择城市后会清空区县和乡镇，选择区县后会清空乡镇
4. **禁用状态**: 未选择上级时，下级选择器会自动禁用
5. **响应式布局**: 组件会根据 level 自动调整栅格布局（level=1 时占 12 列，level=2 时占 6 列，level=3 时占 4 列，level=4 时占 3 列）
6. **返回值格式**: v-model 和事件返回的值包含 code 和 name 两个字段，方便获取编码和名称
7. **级联模式**: 在 cascader 模式下，点击省份/城市/区县会展示下一级列表，直到选择完指定 level 级数后自动收起菜单

## 相关链接

- [Vuetify Autocomplete](https://vuetifyjs.com/en/components/autocompletes/)
- [中国行政区划代码](http://www.mca.gov.cn/article/sj/xzqh/)