# JhStepsForm - 分步表单

基于 Ant Design ProComponents StepsForm 设计的分步表单组件，用于将复杂表单拆分为多个步骤，提升用户体验。

## 特性

- 📝 **多步骤表单** - 将复杂表单拆分为多个步骤，降低用户填写负担
- 🎯 **步骤导航** - 支持步骤点击跳转、上一步/下一步操作
- ✅ **表单验证** - 每个步骤支持独立验证，确保数据准确性
- 🎨 **灵活布局** - 支持水平/垂直布局，适应不同场景
- 🔧 **高度可定制** - 支持自定义步骤内容、按钮、样式等
- 📦 **表单实例管理** - 提供 formMapRef 访问所有步骤表单实例
- 🎭 **插槽支持** - 支持自定义步骤内容和提交按钮渲染

## 基础用法

```vue
<template>
  <jh-steps-form
    :steps="steps"
    @finish="handleFinish"
  >
    <template #step-confirm="{ formData }">
      <div>确认信息...</div>
    </template>
  </jh-steps-form>
</template>

<script>
export default {
  data() {
    return {
      steps: [
        {
          title: '基本信息',
          subTitle: '填写基本信息',
          fields: [
            {
              name: 'username',
              label: '用户名',
              type: 'text',
              required: true,
            },
            {
              name: 'email',
              label: '邮箱',
              type: 'email',
              required: true,
            },
          ],
        },
        {
          title: '详细信息',
          fields: [
            {
              name: 'address',
              label: '地址',
              type: 'text',
            },
          ],
        },
        {
          title: '确认信息',
          slot: 'step-confirm',
        },
      ],
    };
  },
  methods: {
    handleFinish(data) {
      console.log('提交数据:', data);
    },
  },
};
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| steps | 步骤配置数组 | `Array<StepConfig>` | `[]` |
| initialStep | 初始步骤索引 (从0开始) | `number` | `0` |
| value / v-model | 当前激活步骤 (支持 v-model) | `number` | `null` |
| current | 当前步骤 (支持 .sync) | `number` | `null` |
| editable | 是否可编辑已完成的步骤 | `boolean` | `false` |
| vertical | 是否垂直布局 | `boolean` | `false` |
| altLabels | 是否替代标签模式 | `boolean` | `false` |
| outlined | 输入框样式 | `boolean` | `true` |
| dense | 紧凑模式 | `boolean` | `false` |
| submitting | 提交中状态 | `boolean` | `false` |
| previousButtonText | 上一步按钮文本 | `string` | `'上一步'` |
| nextButtonText | 下一步按钮文本 | `string` | `'下一步'` |
| finishButtonText | 完成按钮文本 | `string` | `'完成'` |
| validateStep | 步骤验证函数 | `Function` | `null` |
| transformBeforeFinish | 数据转换函数(最终提交前) | `Function` | `null` |
| onCurrentChange | 步骤变化回调 | `Function` | `null` |
| onFormChange | 表单字段变化回调 | `Function` | `null` |
| stepsProps | 传递给 v-stepper 的额外属性 | `object` | `{}` |
| formProps | 传递给所有步骤表单的公共属性 | `object` | `{}` |
| stepFormRender | 自定义步骤表单渲染 | `Function` | `null` |
| submitter | 提交按钮配置 | `object \| boolean` | `null` |
| containerStyle | 容器样式 | `object \| string` | `null` |

### StepConfig

步骤配置对象：

```typescript
interface StepConfig {
  title: string;           // 步骤标题
  subTitle?: string;       // 步骤副标题
  slot?: string;           // 自定义插槽名称
  fields?: Array<Field>;   // 表单字段配置 (使用 JhForm)
}
```

### Submitter 配置

```typescript
interface Submitter {
  render?: false | Function;      // false 隐藏按钮，Function 自定义渲染
  showPrevious?: boolean;         // 是否显示上一步按钮
  previousText?: string;          // 上一步按钮文本
  previousButtonProps?: object;   // 上一步按钮属性
  nextText?: string;              // 下一步按钮文本
  nextButtonProps?: object;       // 下一步按钮属性
  submitText?: string;            // 提交按钮文本
  submitButtonProps?: object;     // 提交按钮属性
}
```

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| finish | 完成所有步骤时触发 | `(formData: object)` |
| change | 表单数据变化时触发 | `(formData: object)` |
| step-change | 步骤变化时触发 | `({ current: number, step: StepConfig })` |
| input | v-model 更新事件 | `(stepIndex: number)` |
| update:current | .sync 更新事件 | `(stepIndex: number)` |

### Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| [step.slot] | 自定义步骤内容 | `{ step, index, formData }` |
| submitter | 自定义提交按钮 | `{ step, index, onPrevious, onNext, onFinish, submitting, validating }` |
| default | 默认步骤内容 | `{ step, index, formData }` |

### Methods

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| goToStep | 跳转到指定步骤 | `(stepIndex: number)` | - |
| reset | 重置表单 | - | - |
| getFormData | 获取所有表单数据 | - | `object` |
| setFormData | 设置表单数据 | `(data: object)` | - |
| getFormMapRef | 获取表单实例映射 | - | `object` |
| getStepFormRef | 获取指定步骤的表单实例 | `(stepIndex: number)` | `FormInstance \| null` |
| validateAll | 验证所有步骤 | - | `Promise<boolean>` |

## 使用示例

### 基础分步表单

```vue
<jh-steps-form
  :steps="steps"
  @finish="handleFinish"
/>
```

### 可编辑步骤

允许用户点击已完成的步骤返回修改：

```vue
<jh-steps-form
  :steps="steps"
  editable
  @finish="handleFinish"
/>
```

### 垂直布局

适用于侧边栏或窄屏场景：

```vue
<jh-steps-form
  :steps="steps"
  vertical
  @finish="handleFinish"
/>
```

### 自定义步骤内容

使用插槽自定义某个步骤的内容：

```vue
<jh-steps-form :steps="steps" @finish="handleFinish">
  <template #step-custom="{ formData }">
    <v-card>
      <v-card-title>自定义内容</v-card-title>
      <v-card-text>
        <!-- 自定义内容 -->
      </v-card-text>
    </v-card>
  </template>
</jh-steps-form>
```

### 自定义验证

```vue
<jh-steps-form
  :steps="steps"
  :validate-step="validateStep"
  @finish="handleFinish"
/>

<script>
export default {
  methods: {
    async validateStep({ step, stepIndex, formData }) {
      // 自定义验证逻辑
      if (stepIndex === 0) {
        const username = formData.step0?.username;
        if (username === 'admin') {
          this.$message.error('用户名已存在');
          return false;
        }
      }
      return true;
    },
  },
};
</script>
```

### 数据转换

在提交前转换数据格式：

```vue
<jh-steps-form
  :steps="steps"
  :transform-before-finish="transformData"
  @finish="handleFinish"
/>

<script>
export default {
  methods: {
    transformData(formData) {
      // 合并所有步骤数据
      return {
        ...formData.step0,
        ...formData.step1,
        ...formData.step2,
      };
    },
  },
};
</script>
```

### 自定义按钮

```vue
<jh-steps-form
  :steps="steps"
  :submitter="{
    previousText: 'Back',
    nextText: 'Continue',
    submitText: 'Submit',
    previousButtonProps: { color: 'secondary' },
    nextButtonProps: { color: 'primary', large: true },
  }"
  @finish="handleFinish"
/>
```

### 隐藏按钮

```vue
<jh-steps-form
  :steps="steps"
  :submitter="{ render: false }"
  @finish="handleFinish"
/>
```

### 使用 v-model 控制当前步骤

```vue
<template>
  <div>
    <v-btn @click="currentStep = 0">跳转到第一步</v-btn>
    <jh-steps-form
      v-model="currentStep"
      :steps="steps"
      @finish="handleFinish"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentStep: 0,
    };
  },
};
</script>
```

### 访问表单实例

```vue
<template>
  <div>
    <jh-steps-form
      ref="stepsForm"
      :steps="steps"
      @finish="handleFinish"
    />
    <v-btn @click="validateAllSteps">验证所有步骤</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    async validateAllSteps() {
      const isValid = await this.$refs.stepsForm.validateAll();
      console.log('所有步骤验证结果:', isValid);
      
      // 获取表单实例映射
      const formMapRef = this.$refs.stepsForm.getFormMapRef();
      console.log('表单实例:', formMapRef);
      
      // 获取指定步骤的表单实例
      const step0Form = this.$refs.stepsForm.getStepFormRef(0);
      if (step0Form) {
        step0Form.validate();
      }
    },
  },
};
</script>
```

### 监听步骤变化

```vue
<jh-steps-form
  :steps="steps"
  :on-current-change="handleStepChange"
  @finish="handleFinish"
/>

<script>
export default {
  methods: {
    handleStepChange(stepIndex) {
      console.log('当前步骤:', stepIndex);
      // 可以在这里做一些操作，比如埋点统计
    },
  },
};
</script>
```

### 监听表单字段变化

```vue
<jh-steps-form
  :steps="steps"
  :on-form-change="handleFormChange"
  @finish="handleFinish"
/>

<script>
export default {
  methods: {
    handleFormChange({ stepIndex, values, allValues }) {
      console.log('步骤索引:', stepIndex);
      console.log('当前步骤值:', values);
      console.log('所有值:', allValues);
    },
  },
};
</script>
```

### 传递公共表单属性

```vue
<jh-steps-form
  :steps="steps"
  :form-props="{
    outlined: true,
    dense: true,
    hideDetails: 'auto',
  }"
  @finish="handleFinish"
/>
```

### 自定义容器样式

```vue
<jh-steps-form
  :steps="steps"
  :container-style="{
    maxWidth: '800px',
    margin: '0 auto',
    padding: '24px',
  }"
  @finish="handleFinish"
/>
```

## 完整示例：员工入职流程

```vue
<template>
  <v-container>
    <jh-steps-form
      ref="employeeForm"
      v-model="currentStep"
      :steps="steps"
      editable
      :submitting="submitting"
      :validate-step="validateStep"
      :transform-before-finish="transformData"
      :on-current-change="handleStepChange"
      @finish="handleFinish"
    >
      <template #step-confirm="{ formData }">
        <v-card outlined>
          <v-card-title>请确认以下信息</v-card-title>
          <v-card-text>
            <v-simple-table>
              <tbody>
                <tr v-for="(value, key) in flattenData(formData)" :key="key">
                  <td class="font-weight-bold">{{ key }}</td>
                  <td>{{ value }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </template>
    </jh-steps-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      currentStep: 0,
      submitting: false,
      steps: [
        {
          title: '基本信息',
          subTitle: '填写员工基本信息',
          fields: [
            {
              name: 'name',
              label: '姓名',
              type: 'text',
              required: true,
              cols: 12,
              md: 6,
            },
            {
              name: 'email',
              label: '邮箱',
              type: 'email',
              required: true,
              cols: 12,
              md: 6,
            },
            {
              name: 'phone',
              label: '手机号',
              type: 'tel',
              required: true,
              cols: 12,
              md: 6,
            },
          ],
        },
        {
          title: '岗位信息',
          subTitle: '设置员工岗位',
          fields: [
            {
              name: 'department',
              label: '部门',
              type: 'select',
              options: [
                { text: '技术部', value: 'tech' },
                { text: '产品部', value: 'product' },
                { text: '市场部', value: 'marketing' },
              ],
              required: true,
              cols: 12,
              md: 6,
            },
            {
              name: 'position',
              label: '职位',
              type: 'text',
              required: true,
              cols: 12,
              md: 6,
            },
          ],
        },
        {
          title: '确认信息',
          subTitle: '请确认填写的信息',
          slot: 'step-confirm',
        },
      ],
    };
  },
  methods: {
    async validateStep({ step, stepIndex, formData }) {
      // 自定义验证逻辑
      if (stepIndex === 0) {
        const email = formData.step0?.email;
        if (email && !email.includes('@company.com')) {
          this.$message.warning('请使用公司邮箱');
          return false;
        }
      }
      return true;
    },
    
    transformData(formData) {
      // 合并所有步骤数据
      return {
        ...formData.step0,
        ...formData.step1,
      };
    },
    
    handleStepChange(stepIndex) {
      console.log('切换到步骤:', stepIndex);
      // 埋点统计
    },
    
    async handleFinish(data) {
      this.submitting = true;
      try {
        // 提交数据到服务器
        await this.$api.createEmployee(data);
        this.$message.success('员工入职信息提交成功');
        this.$refs.employeeForm.reset();
      } catch (error) {
        this.$message.error('提交失败: ' + error.message);
      } finally {
        this.submitting = false;
      }
    },
    
    flattenData(formData) {
      const result = {};
      Object.values(formData).forEach(stepData => {
        Object.assign(result, stepData);
      });
      return result;
    },
  },
};
</script>
```

## 最佳实践

### 1. 步骤数量

- 建议 3-5 个步骤，不宜过多
- 每个步骤的字段数量控制在 5-10 个

### 2. 步骤命名

- 使用清晰简洁的步骤标题
- 提供副标题说明步骤目的

### 3. 表单验证

- 每个步骤都应该有必要的验证
- 使用 `validateStep` 进行自定义验证
- 在下一步前验证当前步骤

### 4. 数据管理

- 使用 `formData` 存储所有步骤数据
- 使用 `transformBeforeFinish` 转换数据格式
- 在最后一步展示确认信息

### 5. 用户体验

- 开启 `editable` 允许用户返回修改
- 提供清晰的步骤指示
- 在提交时显示 loading 状态

## 注意事项

1. **步骤索引从 0 开始**
2. **表单数据按 `step${index}` 格式存储**
3. **使用 `slot` 时需要在步骤配置中指定 `slot` 属性**
4. **`validateStep` 返回 `false` 会阻止进入下一步**
5. **`submitter.render = false` 会完全隐藏按钮区域**

## 与 Ant Design ProComponents 的对应关系

| ProComponents | JhStepsForm | 说明 |
|---------------|-------------|------|
| StepsForm | JhStepsForm | 主组件 |
| StepForm | steps[].fields | 步骤配置 |
| current | value / current | 当前步骤 |
| onCurrentChange | onCurrentChange | 步骤变化回调 |
| formMapRef | getFormMapRef() | 表单实例映射 |
| stepsProps | stepsProps | Steps 属性 |
| formProps | formProps | 表单公共属性 |
| submitter | submitter | 提交按钮配置 |
| onFinish | @finish | 完成事件 |

## 更新日志

### v1.1.0 (2024-11-09)

**新增功能**
- ✨ 新增 `formMapRef` 表单实例管理
- ✨ 新增 `onCurrentChange` 步骤变化回调
- ✨ 新增 `onFormChange` 表单字段变化回调
- ✨ 新增 `stepsProps` 传递给 v-stepper 的属性
- ✨ 新增 `formProps` 传递给所有表单的公共属性
- ✨ 新增 `submitter` 提交按钮配置
- ✨ 新增 `containerStyle` 容器样式配置
- ✨ 新增 `current` prop 支持 .sync 修饰符
- ✨ 新增 `getFormMapRef()` 方法
- ✨ 新增 `getStepFormRef(index)` 方法
- ✨ 新增 `validateAll()` 方法

**优化改进**
- 🎨 优化步骤切换逻辑，支持 v-model 和 .sync
- 🎨 优化表单实例管理，自动维护 formMapRef
- 🎨 优化按钮配置，支持更灵活的自定义
- 📝 完善文档和示例

### v1.0.0

- 🎉 初始版本发布
