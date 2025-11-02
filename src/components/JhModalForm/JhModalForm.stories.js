import JhModalForm from './JhModalForm.vue';

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
    key: 'role',
    label: '角色',
    type: 'select',
    rules: 'require',
    options: [
      { text: '管理员', value: 'admin' },
      { text: '普通用户', value: 'user' },
      { text: '访客', value: 'guest' },
    ],
    cols: 12,
  },
];

export default {
  title: '数据录入/JhModalForm - 弹窗表单',
  component: JhModalForm,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'boolean',
      description: '控制弹窗显示/隐藏 (v-model)',
    },
    title: {
      control: 'text',
      description: '弹窗标题',
    },
    width: {
      control: 'number',
      description: '弹窗宽度',
    },
    fullscreen: {
      control: 'boolean',
      description: '是否全屏显示',
    },
    persistent: {
      control: 'boolean',
      description: '是否持久化（点击外部不关闭）',
    },
    closable: {
      control: 'boolean',
      description: '是否显示关闭按钮',
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

弹窗表单组件，支持 JSON 配置和自定义内容。基于 JhDrawerFormBasic 的设计模式重写，移除了 JhProForm 依赖。

## 功能特性

- JSON 配置表单字段
- 支持多种字段类型（text、textarea、number、select、autocomplete、date、time、switch、checkbox、radio）
- 表单验证
- 自定义插槽
- 全屏模式
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
- \`close\`: 弹窗关闭时触发
- \`input\`: v-model 绑定值变化时触发

## 插槽

- \`content\`: 自定义弹窗内容（完全自定义）
- \`field-{key}\`: 自定义字段（当字段类型为 slot 时）

## 方法

- \`getForm()\`: 获取表单引用
- \`getFormData()\`: 获取表单数据
- \`setFieldsValue(values)\`: 设置表单数据
- \`resetForm()\`: 重置表单
- \`resetValidation()\`: 重置验证状态
- \`validate()\`: 验证表单
        `,
      },
    },
  },
};

// 基础示例
export const 基础示例 = {
  render: () => ({
    components: { JhModalForm },
    data() {
      return {
        visible: false,
        fields: sampleFields,
      };
    },
    template: `
      <div>
        <v-btn color="primary" @click="visible = true">
          打开弹窗表单
        </v-btn>
        <jh-modal-form
          v-model="visible"
          title="用户信息"
          :fields="fields"
          @confirm="handleConfirm"
          @cancel="handleCancel"
        />
      </div>
    `,
    methods: {
      handleConfirm(data) {
        console.log('表单数据:', data);
        alert('提交成功！\n' + JSON.stringify(data, null, 2));
        this.visible = false;
      },
      handleCancel() {
        console.log('取消操作');
      },
    },
  }),
};

// 编辑模式
export const 编辑模式 = {
  render: () => ({
    components: { JhModalForm },
    data() {
      return {
        visible: false,
        fields: sampleFields,
      };
    },
    template: `
      <div>
        <v-btn color="primary" @click="openModal">
          编辑用户
        </v-btn>
        <jh-modal-form
          ref="modalForm"
          v-model="visible"
          title="编辑用户"
          :fields="fields"
          @confirm="handleConfirm"
        />
      </div>
    `,
    methods: {
      openModal() {
        this.visible = true;
        // 等待弹窗打开后设置数据
        this.$nextTick(() => {
          this.$refs.modalForm.setFieldsValue({
            username: 'zhangsan',
            email: 'zhangsan@example.com',
            phone: '13800138000',
            role: 'admin',
          });
        });
      },
      handleConfirm(data) {
        console.log('更新数据:', data);
        alert('更新成功！');
        this.visible = false;
      },
    },
  }),
};

// 复杂表单
export const 复杂表单 = {
  render: () => ({
    components: { JhModalForm },
    data() {
      return {
        visible: false,
        fields: [
          {
            key: 'name',
            label: '姓名',
            type: 'text',
            rules: 'require',
            placeholder: '请输入姓名',
            cols: 12,
            md: 6,
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
            md: 6,
          },
          {
            key: 'birthdate',
            label: '出生日期',
            type: 'date',
            cols: 12,
            md: 6,
          },
          {
            key: 'department',
            label: '部门',
            type: 'select',
            options: [
              { text: '技术部', value: 'tech' },
              { text: '产品部', value: 'product' },
              { text: '市场部', value: 'marketing' },
            ],
            rules: 'require',
            cols: 12,
            md: 6,
          },
          {
            key: 'skills',
            label: '技能',
            type: 'select',
            multiple: true,
            chips: true,
            options: [
              { text: 'Vue.js', value: 'vue' },
              { text: 'React', value: 'react' },
              { text: 'Node.js', value: 'node' },
            ],
            cols: 12,
          },
          {
            key: 'active',
            label: '启用状态',
            type: 'switch',
            switchLabel: '启用',
            cols: 12,
          },
          {
            key: 'bio',
            label: '个人简介',
            type: 'textarea',
            rows: 4,
            placeholder: '请输入个人简介',
            cols: 12,
          },
        ],
      };
    },
    template: `
      <div>
        <v-btn color="primary" @click="visible = true">
          打开复杂表单
        </v-btn>
        <jh-modal-form
          v-model="visible"
          title="员工信息"
          width="800"
          :fields="fields"
          @confirm="handleConfirm"
        />
      </div>
    `,
    methods: {
      handleConfirm(data) {
        console.log('表单数据:', data);
        alert('提交成功！');
        this.visible = false;
      },
    },
  }),
};

// 全屏模式
export const 全屏模式 = {
  render: () => ({
    components: { JhModalForm },
    data() {
      return {
        visible: false,
        fields: [
          {
            key: 'title',
            label: '标题',
            type: 'text',
            rules: 'require',
            placeholder: '请输入标题',
            cols: 12,
          },
          {
            key: 'content',
            label: '内容',
            type: 'textarea',
            rules: 'require',
            rows: 20,
            placeholder: '请输入内容',
            cols: 12,
          },
        ],
      };
    },
    template: `
      <div>
        <v-btn color="primary" @click="visible = true">
          打开全屏表单
        </v-btn>
        <jh-modal-form
          v-model="visible"
          title="编辑文章"
          :fields="fields"
          :fullscreen="true"
          @confirm="handleConfirm"
        />
      </div>
    `,
    methods: {
      handleConfirm(data) {
        console.log('表单数据:', data);
        alert('提交成功！');
        this.visible = false;
      },
    },
  }),
};

// 自定义内容
export const 自定义内容 = {
  render: () => ({
    components: { JhModalForm },
    data() {
      return {
        visible: false,
        customData: {
          title: '',
          description: '',
        },
      };
    },
    template: `
      <div>
        <v-btn color="primary" @click="visible = true">
          打开自定义内容弹窗
        </v-btn>
        <jh-modal-form
          v-model="visible"
          title="自定义表单"
          width="600"
        >
          <template #content>
            <div class="pa-4">
              <v-text-field
                v-model="customData.title"
                label="标题"
                outlined
                dense
              />
              <v-textarea
                v-model="customData.description"
                label="描述"
                outlined
                dense
                rows="5"
              />
              <div class="d-flex justify-end pt-4">
                <v-btn text @click="visible = false">取消</v-btn>
                <v-btn color="success" class="ml-2" @click="handleSave">保存</v-btn>
              </div>
            </div>
          </template>
        </jh-modal-form>
      </div>
    `,
    methods: {
      handleSave() {
        console.log('保存数据:', this.customData);
        alert('保存成功！');
        this.visible = false;
      },
    },
  }),
};

// 自定义验证
export const 自定义验证 = {
  render: () => ({
    components: { JhModalForm },
    data() {
      return {
        visible: false,
        fields: [
          {
            key: 'username',
            label: '用户名',
            type: 'text',
            rules: [
              v => !!v || '用户名不能为空',
              v => (v && v.length >= 3) || '用户名至少3个字符',
            ],
            placeholder: '请输入用户名（至少3个字符）',
            cols: 12,
          },
          {
            key: 'password',
            label: '密码',
            type: 'text',
            rules: [
              v => !!v || '密码不能为空',
              v => (v && v.length >= 6) || '密码至少6个字符',
            ],
            placeholder: '请输入密码（至少6个字符）',
            cols: 12,
          },
          {
            key: 'age',
            label: '年龄',
            type: 'number',
            rules: [
              v => !!v || '年龄不能为空',
              v => (v >= 18 && v <= 60) || '年龄必须在18-60之间',
            ],
            placeholder: '请输入年龄',
            cols: 12,
          },
        ],
      };
    },
    template: `
      <div>
        <v-btn color="primary" @click="visible = true">
          打开表单（自定义验证）
        </v-btn>
        <jh-modal-form
          v-model="visible"
          title="用户注册"
          :fields="fields"
          @confirm="handleConfirm"
        />
      </div>
    `,
    methods: {
      handleConfirm(data) {
        console.log('表单数据:', data);
        alert('注册成功！');
        this.visible = false;
      },
    },
  }),
};

// 小尺寸
export const 小尺寸 = {
  render: () => ({
    components: { JhModalForm },
    data() {
      return {
        visible: false,
        fields: [
          {
            key: 'code',
            label: '验证码',
            type: 'text',
            rules: 'require',
            placeholder: '请输入验证码',
            cols: 12,
          },
        ],
      };
    },
    template: `
      <div>
        <v-btn color="primary" @click="visible = true">
          打开小尺寸弹窗
        </v-btn>
        <jh-modal-form
          v-model="visible"
          title="验证码确认"
          width="400"
          :fields="fields"
          @confirm="handleConfirm"
        />
      </div>
    `,
    methods: {
      handleConfirm(data) {
        console.log('验证码:', data);
        alert('验证成功！');
        this.visible = false;
      },
    },
  }),
};

// 可点击外部关闭
export const 可点击外部关闭 = {
  render: () => ({
    components: { JhModalForm },
    data() {
      return {
        visible: false,
        fields: [
          {
            key: 'agreement',
            label: '同意协议',
            type: 'checkbox',
            checkboxLabel: '我已阅读并同意用户协议',
            rules: [v => !!v || '必须同意协议才能继续'],
            cols: 12,
          },
        ],
      };
    },
    template: `
      <div>
        <v-btn color="primary" @click="visible = true">
          打开协议弹窗（点击外部可关闭）
        </v-btn>
        <jh-modal-form
          v-model="visible"
          title="用户协议"
          width="500"
          :persistent="false"
          :fields="fields"
          @confirm="handleConfirm"
        />
      </div>
    `,
    methods: {
      handleConfirm(data) {
        console.log('已同意:', data);
        alert('已同意协议！');
        this.visible = false;
      },
    },
  }),
};
