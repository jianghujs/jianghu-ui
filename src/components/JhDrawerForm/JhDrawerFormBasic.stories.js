import JhDrawerFormBasic from './JhDrawerFormBasic.vue';

// 示例字段配置
const sampleFields = [
  {
    key: 'username',
    label: '用户名',
    type: 'text',
    rules: 'require',
    placeholder: '请输入用户名',
    cols: 12,
  },
  {
    key: 'email',
    label: '邮箱',
    type: 'text',
    rules: 'require|email',
    placeholder: '请输入邮箱',
    cols: 12,
  },
  {
    key: 'phone',
    label: '手机号',
    type: 'text',
    rules: 'phone',
    placeholder: '请输入手机号',
    cols: 12,
  },
  {
    key: 'status',
    label: '状态',
    type: 'select',
    rules: 'require',
    options: [
      { text: '启用', value: 'active' },
      { text: '禁用', value: 'inactive' },
    ],
    cols: 12,
  },
  {
    key: 'remark',
    label: '备注',
    type: 'textarea',
    placeholder: '请输入备注',
    rows: 3,
    cols: 12,
  },
];

export default {
  title: '基础组件/JhDrawerFormBasic',
  component: JhDrawerFormBasic,
  tags: ['autodocs'],
  argTypes: {
    isShown: {
      control: 'boolean',
      description: '是否显示抽屉',
    },
    title: {
      control: 'text',
      description: '抽屉标题',
    },
    position: {
      control: 'select',
      options: ['left', 'right'],
      description: '抽屉位置',
    },
    width: {
      control: 'text',
      description: '抽屉宽度',
    },
    showConfirmButton: {
      control: 'boolean',
      description: '是否显示确认按钮',
    },
    confirmText: {
      control: 'text',
      description: '确认按钮文本',
    },
    cancelText: {
      control: 'text',
      description: '取消按钮文本',
    },
    validateBeforeConfirm: {
      control: 'boolean',
      description: '确认前是否验证表单',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
# JhDrawerFormBasic - 江湖抽屉表单组件（基础版）

抽屉表单组件，支持 JSON 配置和自定义内容。这是与 test 目录中组件样式和功能保持一致的基础版本。

## 功能特性

- JSON 配置表单字段
- 支持多种字段类型（text、textarea、number、select、autocomplete、date、time、switch、checkbox、radio）
- 表单验证
- 自定义插槽
- 左右两侧位置
- 响应式宽度

## 支持的字段类型

- \`text\`: 文本输入框
- \`textarea\`: 多行文本
- \`number\`: 数字输入框
- \`select\`: 下拉选择框
- \`autocomplete\`: 自动完成
- \`date\`: 日期选择器
- \`time\`: 时间选择器
- \`switch\`: 开关
- \`checkbox\`: 复选框
- \`radio\`: 单选按钮组
- \`slot\`: 自定义插槽

## 事件

- \`confirm\`: 点击确认按钮时触发，参数为表单数据
- \`cancel\`: 点击取消按钮时触发
- \`close\`: 抽屉关闭时触发
- \`update:isShown\`: 显示状态变化时触发
- \`input\`: 表单数据变化时触发
- \`update:value\`: 表单数据变化时触发

## 插槽

- \`content\`: 自定义抽屉内容（完全自定义）
- \`actions\`: 自定义操作按钮
- \`field-{key}\`: 自定义字段（当字段类型为 slot 时）

## 方法

- \`getForm()\`: 获取表单引用
- \`resetForm()\`: 重置表单
- \`resetValidation()\`: 重置验证状态
        `,
      },
    },
  },
};

// 默认故事
export const Default = {
  args: {
    isShown: false,
    title: '用户表单',
    position: 'right',
    width: '90%',
    showConfirmButton: true,
    confirmText: '确认',
    cancelText: '取消',
    validateBeforeConfirm: true,
    fields: sampleFields,
    value: {},
  },
  render: (args) => ({
    components: { JhDrawerFormBasic },
    data() {
      return {
        args,
        isShownSync: args.isShown,
        formDataSync: { ...args.value },
      };
    },
    template: `
      <div>
        <v-btn color="primary" @click="isShownSync = true">
          打开表单
        </v-btn>

        <jh-drawer-form-basic
          v-bind="args"
          :isShown.sync="isShownSync"
          v-model="formDataSync"
          @confirm="handleConfirm"
          @cancel="handleCancel"
          @close="handleClose"
        />

        <v-card class="mt-4" outlined>
          <v-card-text>
            <h4>表单数据：</h4>
            <pre>{{ formDataSync }}</pre>
          </v-card-text>
        </v-card>
      </div>
    `,
    methods: {
      handleConfirm(data) {
        console.log('Confirm:', data);
        alert('表单提交成功！');
        this.isShownSync = false;
      },
      handleCancel() {
        console.log('Cancel');
        this.isShownSync = false;
      },
      handleClose() {
        console.log('Close');
      },
    },
  }),
};

// 左侧抽屉
export const LeftPosition = {
  args: {
    ...Default.args,
    position: 'left',
  },
  render: Default.render,
};

// 自定义宽度
export const CustomWidth = {
  args: {
    ...Default.args,
    width: '600px',
  },
  render: Default.render,
};

// 自定义按钮文本
export const CustomButtonText = {
  args: {
    ...Default.args,
    confirmText: '保存',
    cancelText: '关闭',
  },
  render: Default.render,
};

// 不验证表单
export const NoValidation = {
  args: {
    ...Default.args,
    validateBeforeConfirm: false,
  },
  render: Default.render,
};

// 带初始数据
export const WithInitialData = {
  args: {
    ...Default.args,
    value: {
      username: '张三',
      email: 'zhangsan@example.com',
      phone: '13800138000',
      status: 'active',
      remark: '这是一个测试用户',
    },
  },
  render: Default.render,
};

// 自定义内容插槽
export const CustomContent = {
  args: {
    ...Default.args,
    title: '自定义表单',
  },
  render: (args) => ({
    components: { JhDrawerFormBasic },
    data() {
      return {
        args,
        isShownSync: args.isShown,
        customData: {
          title: '',
          description: '',
          priority: 'medium',
        },
      };
    },
    template: `
      <div>
        <v-btn color="primary" @click="isShownSync = true">
          打开自定义表单
        </v-btn>

        <jh-drawer-form-basic
          v-bind="args"
          :isShown.sync="isShownSync"
          @confirm="handleConfirm"
          @cancel="handleCancel"
        >
          <template v-slot:content>
            <v-row class="mt-4">
              <v-col cols="12">
                <v-text-field
                  v-model="customData.title"
                  label="标题"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="customData.description"
                  label="描述"
                  outlined
                  dense
                  rows="3"
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="customData.priority"
                  :items="priorityOptions"
                  label="优先级"
                  outlined
                  dense
                ></v-select>
              </v-col>
            </v-row>
          </template>
        </jh-drawer-form-basic>

        <v-card class="mt-4" outlined>
          <v-card-text>
            <h4>表单数据：</h4>
            <pre>{{ customData }}</pre>
          </v-card-text>
        </v-card>
      </div>
    `,
    computed: {
      priorityOptions() {
        return [
          { text: '高', value: 'high' },
          { text: '中', value: 'medium' },
          { text: '低', value: 'low' },
        ];
      },
    },
    methods: {
      handleConfirm() {
        console.log('Confirm:', this.customData);
        alert('表单提交成功！');
        this.isShownSync = false;
      },
      handleCancel() {
        this.isShownSync = false;
      },
    },
  }),
};

// 自定义操作按钮
export const CustomActions = {
  args: {
    ...Default.args,
  },
  render: (args) => ({
    components: { JhDrawerFormBasic },
    data() {
      return {
        args,
        isShownSync: args.isShown,
        formDataSync: { ...args.value },
      };
    },
    template: `
      <div>
        <v-btn color="primary" @click="isShownSync = true">
          打开表单
        </v-btn>

        <jh-drawer-form-basic
          v-bind="args"
          :isShown.sync="isShownSync"
          v-model="formDataSync"
          :showConfirmButton="false"
          @cancel="handleCancel"
        >
          <template v-slot:actions>
            <v-btn
              color="error"
              small
              @click="handleDelete"
            >
              删除
            </v-btn>
            <v-btn
              color="warning"
              class="ml-2"
              small
              @click="handleDraft"
            >
              保存草稿
            </v-btn>
            <v-btn
              color="success"
              class="ml-2"
              small
              @click="handlePublish"
            >
              发布
            </v-btn>
          </template>
        </jh-drawer-form-basic>

        <v-card class="mt-4" outlined>
          <v-card-text>
            <h4>表单数据：</h4>
            <pre>{{ formDataSync }}</pre>
          </v-card-text>
        </v-card>
      </div>
    `,
    methods: {
      handleDelete() {
        alert('删除操作');
        this.isShownSync = false;
      },
      handleDraft() {
        alert('保存草稿');
        console.log('Draft:', this.formDataSync);
      },
      handlePublish() {
        alert('发布成功');
        console.log('Publish:', this.formDataSync);
        this.isShownSync = false;
      },
      handleCancel() {
        this.isShownSync = false;
      },
    },
  }),
};

// 复杂表单示例
export const ComplexForm = {
  args: {
    ...Default.args,
    title: '复杂表单示例',
    fields: [
      {
        key: 'username',
        label: '用户名',
        type: 'text',
        rules: 'require',
        cols: { xs: 12, md: 6 },
      },
      {
        key: 'email',
        label: '邮箱',
        type: 'text',
        rules: 'require|email',
        cols: { xs: 12, md: 6 },
      },
      {
        key: 'birthdate',
        label: '出生日期',
        type: 'date',
        cols: { xs: 12, md: 6 },
      },
      {
        key: 'workTime',
        label: '工作时间',
        type: 'time',
        cols: { xs: 12, md: 6 },
      },
      {
        key: 'gender',
        label: '性别',
        type: 'radio',
        options: [
          { text: '男', value: 'male' },
          { text: '女', value: 'female' },
        ],
        cols: 12,
      },
      {
        key: 'interests',
        label: '兴趣爱好',
        type: 'select',
        multiple: true,
        chips: true,
        options: [
          { text: '编程', value: 'coding' },
          { text: '阅读', value: 'reading' },
          { text: '运动', value: 'sports' },
          { text: '音乐', value: 'music' },
        ],
        cols: 12,
      },
      {
        key: 'subscribe',
        label: '订阅通知',
        type: 'switch',
        switchLabel: '接收邮件通知',
        cols: 12,
      },
      {
        key: 'agree',
        label: '同意条款',
        type: 'checkbox',
        checkboxLabel: '我已阅读并同意用户协议',
        rules: 'require',
        cols: 12,
      },
    ],
  },
  render: Default.render,
};
