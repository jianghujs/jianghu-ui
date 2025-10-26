import JhModalForm from './JhModalForm.vue';

export default {
  title: '数据录入/JhModalForm',
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
    submitText: {
      control: 'text',
      description: '提交按钮文本',
    },
    cancelText: {
      control: 'text',
      description: '取消按钮文本',
    },
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal', 'inline', 'grid'],
      description: '表单布局',
    },
    outlined: {
      control: 'boolean',
      description: '是否显示输入框边框',
    },
    dense: {
      control: 'boolean',
      description: '紧凑模式',
    },
  },
};

// 基础用法
export const Default = {
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { JhModalForm },
    data() {
      return {
        visible: false,
        formFields: [
          {
            name: 'username',
            label: '用户名',
            type: 'text',
            placeholder: '请输入用户名',
            required: true,
            cols: 12,
          },
          {
            name: 'email',
            label: '邮箱',
            type: 'email',
            placeholder: '请输入邮箱地址',
            required: true,
            cols: 12,
          },
          {
            name: 'role',
            label: '角色',
            type: 'select',
            placeholder: '请选择角色',
            options: [
              { text: '管理员', value: 'admin' },
              { text: '普通用户', value: 'user' },
              { text: '访客', value: 'guest' },
            ],
            required: true,
            cols: 12,
          },
        ],
      };
    },
    template: `
      <div>
        <v-btn color="primary" @click="visible = true">
          打开表单
        </v-btn>

        <jh-modal-form
          v-model="visible"
          title="新增用户"
          :fields="formFields"
          :width="600"
          @submit="handleSubmit"
          @cancel="handleCancel"
        />
      </div>
    `,
    methods: {
      handleSubmit(values) {
        console.log('提交数据:', values);
        alert('提交成功！数据: ' + JSON.stringify(values, null, 2));
        this.visible = false;
      },
      handleCancel() {
        console.log('取消');
      },
    },
  }),
};

// 新增/编辑模式
export const AddOrEdit = {
  render: () => ({
    components: { JhModalForm },
    data() {
      return {
        visible: false,
        editMode: false,
        formData: null,
        formFields: [
          {
            name: 'username',
            label: '用户名',
            type: 'text',
            placeholder: '请输入用户名',
            required: true,
            cols: 12,
          },
          {
            name: 'email',
            label: '邮箱',
            type: 'email',
            placeholder: '请输入邮箱地址',
            required: true,
            cols: 12,
          },
          {
            name: 'phone',
            label: '手机号',
            type: 'tel',
            placeholder: '请输入手机号',
            cols: 12,
          },
          {
            name: 'role',
            label: '角色',
            type: 'select',
            placeholder: '请选择角色',
            options: [
              { text: '管理员', value: 'admin' },
              { text: '普通用户', value: 'user' },
            ],
            required: true,
            cols: 12,
          },
        ],
      };
    },
    computed: {
      modalTitle() {
        return this.editMode ? '编辑用户' : '新增用户';
      },
    },
    template: `
      <div>
        <v-btn color="primary" @click="openAddModal" class="mr-2">
          新增用户
        </v-btn>
        <v-btn color="secondary" @click="openEditModal">
          编辑用户
        </v-btn>

        <jh-modal-form
          v-model="visible"
          :title="modalTitle"
          :fields="formFields"
          :initial-values="formData"
          :width="600"
          @submit="handleSubmit"
        />
      </div>
    `,
    methods: {
      openAddModal() {
        this.editMode = false;
        this.formData = null;
        this.visible = true;
      },
      openEditModal() {
        this.editMode = true;
        this.formData = {
          username: 'zhangsan',
          email: 'zhangsan@example.com',
          phone: '13800138000',
          role: 'admin',
        };
        this.visible = true;
      },
      handleSubmit(values) {
        console.log(this.editMode ? '编辑' : '新增', values);
        alert(`${this.editMode ? '编辑' : '新增'}成功！`);
        this.visible = false;
      },
    },
  }),
};

// 异步提交
export const AsyncSubmit = {
  render: () => ({
    components: { JhModalForm },
    data() {
      return {
        visible: false,
        formFields: [
          {
            name: 'username',
            label: '用户名',
            type: 'text',
            placeholder: '请输入用户名',
            required: true,
            cols: 12,
          },
          {
            name: 'password',
            label: '密码',
            type: 'password',
            placeholder: '请输入密码',
            required: true,
            cols: 12,
          },
        ],
      };
    },
    template: `
      <div>
        <v-btn color="primary" @click="visible = true">
          打开表单（异步提交）
        </v-btn>

        <jh-modal-form
          v-model="visible"
          title="用户登录"
          :fields="formFields"
          :width="500"
          :request="handleRequest"
          @success="handleSuccess"
          @error="handleError"
        />
      </div>
    `,
    methods: {
      async handleRequest(values) {
        console.log('提交数据:', values);

        // 模拟 API 请求
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (values.username === 'error') {
              reject(new Error('用户名错误'));
            } else {
              resolve({
                success: true,
                message: '提交成功',
                data: values,
              });
            }
          }, 2000);
        });
      },
      handleSuccess(response, formData) {
        console.log('提交成功:', response, formData);
        alert('提交成功！');
      },
      handleError(error, formData) {
        console.error('提交失败:', error, formData);
        alert('提交失败: ' + error.message);
      },
    },
  }),
};

// 复杂表单
export const ComplexForm = {
  render: () => ({
    components: { JhModalForm },
    data() {
      return {
        visible: false,
        formFields: [
          { type: 'group', title: '基本信息' },
          {
            name: 'name',
            label: '姓名',
            type: 'text',
            placeholder: '请输入姓名',
            required: true,
            cols: 12,
            md: 6,
          },
          {
            name: 'gender',
            label: '性别',
            type: 'radio',
            row: true,
            options: [
              { text: '男', value: 'male' },
              { text: '女', value: 'female' },
            ],
            default: 'male',
            cols: 12,
            md: 6,
          },
          {
            name: 'birthdate',
            label: '出生日期',
            type: 'date',
            placeholder: '请选择出生日期',
            cols: 12,
            md: 6,
          },
          {
            name: 'phone',
            label: '手机号',
            type: 'tel',
            placeholder: '请输入手机号',
            rules: [
              { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
            ],
            cols: 12,
            md: 6,
          },

          { type: 'group', title: '工作信息' },
          {
            name: 'department',
            label: '部门',
            type: 'select',
            placeholder: '请选择部门',
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
            placeholder: '请输入职位',
            required: true,
            cols: 12,
            md: 6,
          },
          {
            name: 'entryDate',
            label: '入职日期',
            type: 'date',
            placeholder: '请选择入职日期',
            required: true,
            cols: 12,
            md: 6,
          },
          {
            name: 'skills',
            label: '技能',
            type: 'select',
            multiple: true,
            placeholder: '请选择技能',
            options: [
              { text: 'Vue.js', value: 'vue' },
              { text: 'React', value: 'react' },
              { text: 'Node.js', value: 'node' },
              { text: 'Python', value: 'python' },
            ],
            cols: 12,
            md: 6,
          },

          { type: 'group', title: '其他信息' },
          {
            name: 'description',
            label: '个人简介',
            type: 'textarea',
            rows: 3,
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
          :fields="formFields"
          :width="800"
          layout="grid"
          @submit="handleSubmit"
        />
      </div>
    `,
    methods: {
      handleSubmit(values) {
        console.log('提交数据:', values);
        alert('提交成功！');
        this.visible = false;
      },
    },
  }),
};

// 全屏模式
export const Fullscreen = {
  render: () => ({
    components: { JhModalForm },
    data() {
      return {
        visible: false,
        formFields: [
          {
            name: 'title',
            label: '标题',
            type: 'text',
            placeholder: '请输入标题',
            required: true,
            cols: 12,
          },
          {
            name: 'content',
            label: '内容',
            type: 'textarea',
            rows: 20,
            placeholder: '请输入内容',
            required: true,
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
          :fields="formFields"
          :fullscreen="true"
          @submit="handleSubmit"
        />
      </div>
    `,
    methods: {
      handleSubmit(values) {
        console.log('提交数据:', values);
        alert('提交成功！');
        this.visible = false;
      },
    },
  }),
};
