import JhDrawerForm from './JhDrawerForm.vue';

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
  title: '数据录入/JhDrawerForm - 抽屉表单',
  component: JhDrawerForm,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'boolean',
      description: '控制抽屉显示/隐藏 (v-model)',
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

抽屉表单组件，支持 JSON 配置和自定义内容。基于 JhDrawerFormBasic 重写，移除了 JhProForm 依赖。

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
- \`input\`: v-model 绑定值变化时触发

## 插槽

- \`content\`: 自定义抽屉内容（完全自定义）
- \`actions\`: 自定义操作按钮
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
    components: { JhDrawerForm },
    data() {
      return {
        visible: false,
        fields: sampleFields,
      };
    },
    template: `
      <div>
        <v-btn color="primary" @click="visible = true">
          打开抽屉表单
        </v-btn>
        <jh-drawer-form
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

// 左侧抽屉
export const 左侧抽屉 = {
  render: () => ({
    components: { JhDrawerForm },
    data() {
      return {
        visible: false,
        fields: [
          {
            key: 'keyword',
            label: '关键词',
            type: 'text',
            placeholder: '请输入搜索关键词',
            cols: 12,
          },
          {
            key: 'category',
            label: '分类',
            type: 'select',
            options: [
              { text: '全部', value: '' },
              { text: '电子产品', value: 'electronics' },
              { text: '服装鞋包', value: 'clothing' },
            ],
            cols: 12,
          },
        ],
      };
    },
    template: `
      <div>
        <v-btn color="primary" @click="visible = true">
          打开左侧筛选
        </v-btn>
        <jh-drawer-form
          v-model="visible"
          title="筛选条件"
          position="left"
          width="400px"
          :fields="fields"
          confirm-text="应用"
          @confirm="handleConfirm"
        />
      </div>
    `,
    methods: {
      handleConfirm(data) {
        console.log('筛选条件:', data);
        alert('应用筛选成功！');
        this.visible = false;
      },
    },
  }),
};

// 自定义内容
export const 自定义内容 = {
  render: () => ({
    components: { JhDrawerForm },
    data() {
      return {
        visible: false,
        customData: {
          title: '',
          content: '',
        },
      };
    },
    template: `
      <div>
        <v-btn color="primary" @click="visible = true">
          打开自定义内容抽屉
        </v-btn>
        <jh-drawer-form
          v-model="visible"
          title="自定义表单"
          width="600px"
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
                v-model="customData.content"
                label="内容"
                outlined
                dense
                rows="5"
              />
            </div>
          </template>
          <template #actions>
            <v-btn
              color="success"
              small
              @click="handleSave"
            >
              保存
            </v-btn>
          </template>
        </jh-drawer-form>
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

// 复杂表单
export const 复杂表单 = {
  render: () => ({
    components: { JhDrawerForm },
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
        <jh-drawer-form
          v-model="visible"
          title="员工信息"
          width="800px"
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

// 编辑模式
export const 编辑模式 = {
  render: () => ({
    components: { JhDrawerForm },
    data() {
      return {
        visible: false,
        fields: sampleFields,
      };
    },
    template: `
      <div>
        <v-btn color="primary" @click="openDrawer">
          编辑用户
        </v-btn>
        <jh-drawer-form
          ref="drawerForm"
          v-model="visible"
          title="编辑用户"
          :fields="fields"
          @confirm="handleConfirm"
        />
      </div>
    `,
    methods: {
      openDrawer() {
        this.visible = true;
        // 等待抽屉打开后设置数据
        this.$nextTick(() => {
          this.$refs.drawerForm.setFieldsValue({
            username: 'zhangsan',
            email: 'zhangsan@example.com',
            phone: '13800138000',
            role: 'admin',
            remark: '这是一个测试用户',
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

// 自定义验证
export const 自定义验证 = {
  render: () => ({
    components: { JhDrawerForm },
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
        <jh-drawer-form
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

// 初始化表单数据
export const 初始化表单数据 = {
  render: () => ({
    components: { JhDrawerForm },
    data() {
      return {
        visible: false,
        fields: [
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
        ],
        initialData: {
          username: '默认用户名',
          email: 'default@example.com',
          phone: '13800138000',
          role: 'user',
        },
      };
    },
    template: `
      <div>
        <v-btn color="primary" @click="visible = true">
          打开表单（带初始数据）
        </v-btn>
        <jh-drawer-form
          v-model="visible"
          title="用户信息"
          :fields="fields"
          :initial-data="initialData"
          @confirm="handleConfirm"
        />
      </div>
    `,
    methods: {
      handleConfirm(data) {
        console.log('表单数据:', data);
        alert('提交成功！\n' + JSON.stringify(data, null, 2));
        this.visible = false;
      },
    },
  }),
};

// 异步填充数据
export const 异步填充数据 = {
  render: () => ({
    components: { JhDrawerForm },
    data() {
      return {
        visible: false,
        fields: [
          {
            key: 'userId',
            label: '用户ID',
            type: 'text',
            rules: 'require',
            placeholder: '请输入用户ID',
            cols: 12,
          },
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
        ],
      };
    },
    template: `
      <div>
        <v-btn color="primary" @click="openDrawer">
          打开表单（异步填充数据）
        </v-btn>
        <jh-drawer-form
          ref="drawerForm"
          v-model="visible"
          title="用户信息"
          :fields="fields"
          @confirm="handleConfirm"
        />
      </div>
    `,
    methods: {
      // 打开抽屉并异步填充数据
      openDrawer() {
        this.visible = true;
        
        // 模拟异步请求获取数据
        setTimeout(() => {
          // 等待抽屉完全打开后设置数据
          this.$nextTick(() => {
            this.$refs.drawerForm.setFieldsValue({
              userId: '1001',
              username: '异步获取的用户名',
              email: 'async@example.com',
              phone: '13900139000',
            });
          });
        }, 1000); // 模拟1秒的网络延迟
      },
      handleConfirm(data) {
        console.log('表单数据:', data);
        alert('提交成功！\n' + JSON.stringify(data, null, 2));
        this.visible = false;
      },
    },
  }),
};
