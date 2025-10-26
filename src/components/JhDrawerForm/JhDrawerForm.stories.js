import JhDrawerForm from './JhDrawerForm.vue';

export default {
  title: '数据录入/JhDrawerForm',
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
    width: {
      control: 'number',
      description: '抽屉宽度',
    },
    placement: {
      control: 'select',
      options: ['left', 'right'],
      description: '抽屉位置',
    },
    showCloseButton: {
      control: 'boolean',
      description: '是否显示浮动关闭按钮',
    },
    showFooterButtons: {
      control: 'boolean',
      description: '是否显示底部按钮',
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

// 基础用法 - 右侧抽屉
export const Default = {
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { JhDrawerForm },
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
          打开右侧抽屉表单
        </v-btn>

        <jh-drawer-form
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

// 头部操作按钮
export const HeaderActions = {
  render: () => ({
    components: { JhDrawerForm },
    data() {
      return {
        visible: false,
        formFields: [
          {
            name: 'title',
            label: '文章标题',
            type: 'text',
            placeholder: '请输入标题',
            required: true,
            cols: 12,
          },
          {
            name: 'content',
            label: '文章内容',
            type: 'textarea',
            rows: 10,
            placeholder: '请输入内容',
            required: true,
            cols: 12,
          },
        ],
        headerActions: [
          {
            label: '保存草稿',
            color: 'grey',
            icon: 'mdi-content-save-outline',
            handler: null, // 会在 created 中设置
          },
          {
            label: '发布',
            color: 'success',
            icon: 'mdi-send',
            handler: null, // 会在 created 中设置
          },
        ],
      };
    },
    created() {
      this.headerActions[0].handler = this.handleSaveDraft;
      this.headerActions[1].handler = this.handlePublish;
    },
    template: `
      <div>
        <v-btn color="primary" @click="visible = true">
          打开带头部操作按钮的抽屉
        </v-btn>

        <jh-drawer-form
          v-model="visible"
          title="编辑文章"
          :fields="formFields"
          :width="700"
          :header-actions="headerActions"
          :show-footer-buttons="false"
        />
      </div>
    `,
    methods: {
      async handleSaveDraft() {
        const formData = this.$refs?.drawerFormRef?.getFormData() || {};
        console.log('保存草稿:', formData);
        alert('草稿保存成功！');
      },
      async handlePublish() {
        const valid = await this.$refs?.drawerFormRef?.validate();
        if (!valid) {
          alert('请填写完整信息');
          return;
        }
        const formData = this.$refs?.drawerFormRef?.getFormData() || {};
        console.log('发布文章:', formData);
        alert('文章发布成功！');
        this.visible = false;
      },
    },
  }),
};

// 自定义插槽内容
export const CustomContent = {
  render: () => ({
    components: { JhDrawerForm },
    data() {
      return {
        visible: false,
        formData: {
          username: '',
          email: '',
          bio: '',
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
          title="个人资料"
          :width="600"
        >
          <!-- 使用默认插槽自定义内容 -->
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="formData.username"
                  label="用户名"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="formData.email"
                  label="邮箱"
                  type="email"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="formData.bio"
                  label="个人简介"
                  rows="4"
                  outlined
                  dense
                ></v-textarea>
              </v-col>
              <v-col cols="12" class="d-flex justify-end">
                <v-btn text @click="visible = false">取消</v-btn>
                <v-btn color="primary" class="ml-2" @click="handleSave">保存</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </jh-drawer-form>
      </div>
    `,
    methods: {
      handleSave() {
        console.log('保存数据:', this.formData);
        alert('保存成功！');
        this.visible = false;
      },
    },
  }),
};

// 关闭前确认
export const BeforeClose = {
  render: () => ({
    components: { JhDrawerForm },
    data() {
      return {
        visible: false,
        formFields: [
          {
            name: 'title',
            label: '文章标题',
            type: 'text',
            placeholder: '请输入标题',
            required: true,
            cols: 12,
          },
          {
            name: 'content',
            label: '文章内容',
            type: 'textarea',
            rows: 8,
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
          打开抽屉（关闭前确认）
        </v-btn>

        <jh-drawer-form
          v-model="visible"
          title="编辑文章"
          :fields="formFields"
          :width="700"
          :on-before-close="handleBeforeClose"
          @submit="handleSubmit"
        />
      </div>
    `,
    methods: {
      async handleBeforeClose() {
        // 确认是否关闭
        const confirmed = confirm('确定要关闭吗？未保存的内容将丢失。');
        return confirmed;
      },
      handleSubmit(values) {
        console.log('提交:', values);
        alert('提交成功！');
        this.visible = false;
      },
    },
  }),
};

// 左侧抽屉
export const LeftPlacement = {
  render: () => ({
    components: { JhDrawerForm },
    data() {
      return {
        visible: false,
        formFields: [
          {
            name: 'keyword',
            label: '关键词',
            type: 'text',
            placeholder: '请输入搜索关键词',
            cols: 12,
          },
          {
            name: 'category',
            label: '分类',
            type: 'select',
            placeholder: '请选择分类',
            options: [
              { text: '全部', value: '' },
              { text: '电子产品', value: 'electronics' },
              { text: '服装鞋包', value: 'clothing' },
              { text: '食品饮料', value: 'food' },
            ],
            cols: 12,
          },
          {
            name: 'priceRange',
            label: '价格范围',
            type: 'select',
            placeholder: '请选择价格范围',
            options: [
              { text: '全部', value: '' },
              { text: '0-100元', value: '0-100' },
              { text: '100-500元', value: '100-500' },
              { text: '500元以上', value: '500+' },
            ],
            cols: 12,
          },
        ],
      };
    },
    template: `
      <div>
        <v-btn color="primary" @click="visible = true">
          打开左侧筛选抽屉
        </v-btn>

        <jh-drawer-form
          v-model="visible"
          title="商品筛选"
          :fields="formFields"
          :width="400"
          placement="left"
          submit-text="应用筛选"
          @submit="handleSubmit"
        />
      </div>
    `,
    methods: {
      handleSubmit(values) {
        console.log('筛选条件:', values);
        alert('应用筛选成功！');
        this.visible = false;
      },
    },
  }),
};

// 新增/编辑模式
export const AddOrEdit = {
  render: () => ({
    components: { JhDrawerForm },
    data() {
      return {
        visible: false,
        editMode: false,
        formData: null,
        formFields: [
          {
            name: 'productName',
            label: '商品名称',
            type: 'text',
            placeholder: '请输入商品名称',
            required: true,
            cols: 12,
          },
          {
            name: 'category',
            label: '商品分类',
            type: 'select',
            placeholder: '请选择分类',
            options: [
              { text: '电子产品', value: 'electronics' },
              { text: '服装鞋包', value: 'clothing' },
              { text: '食品饮料', value: 'food' },
            ],
            required: true,
            cols: 12,
          },
          {
            name: 'price',
            label: '价格',
            type: 'number',
            placeholder: '请输入价格',
            min: 0,
            step: 0.01,
            required: true,
            cols: 12,
          },
          {
            name: 'stock',
            label: '库存',
            type: 'number',
            placeholder: '请输入库存',
            min: 0,
            required: true,
            cols: 12,
          },
          {
            name: 'description',
            label: '商品描述',
            type: 'textarea',
            rows: 4,
            placeholder: '请输入商品描述',
            cols: 12,
          },
        ],
      };
    },
    computed: {
      drawerTitle() {
        return this.editMode ? '编辑商品' : '新增商品';
      },
    },
    template: `
      <div>
        <v-btn color="primary" @click="openAddDrawer" class="mr-2">
          新增商品
        </v-btn>
        <v-btn color="secondary" @click="openEditDrawer">
          编辑商品
        </v-btn>

        <jh-drawer-form
          v-model="visible"
          :title="drawerTitle"
          :fields="formFields"
          :initial-values="formData"
          :width="600"
          @submit="handleSubmit"
        />
      </div>
    `,
    methods: {
      openAddDrawer() {
        this.editMode = false;
        this.formData = null;
        this.visible = true;
      },
      openEditDrawer() {
        this.editMode = true;
        this.formData = {
          productName: 'iPhone 15 Pro',
          category: 'electronics',
          price: 7999,
          stock: 100,
          description: '最新款苹果手机，性能强劲',
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
    components: { JhDrawerForm },
    data() {
      return {
        visible: false,
        formFields: [
          {
            name: 'title',
            label: '文章标题',
            type: 'text',
            placeholder: '请输入文章标题',
            required: true,
            cols: 12,
          },
          {
            name: 'category',
            label: '文章分类',
            type: 'select',
            placeholder: '请选择分类',
            options: [
              { text: '技术', value: 'tech' },
              { text: '生活', value: 'life' },
              { text: '随笔', value: 'essay' },
            ],
            required: true,
            cols: 12,
          },
          {
            name: 'tags',
            label: '标签',
            type: 'select',
            multiple: true,
            placeholder: '请选择标签',
            options: [
              { text: 'Vue.js', value: 'vue' },
              { text: 'JavaScript', value: 'js' },
              { text: 'CSS', value: 'css' },
              { text: 'Node.js', value: 'node' },
            ],
            cols: 12,
          },
          {
            name: 'content',
            label: '文章内容',
            type: 'textarea',
            rows: 10,
            placeholder: '请输入文章内容',
            required: true,
            cols: 12,
          },
        ],
      };
    },
    template: `
      <div>
        <v-btn color="primary" @click="visible = true">
          打开文章编辑器（异步提交）
        </v-btn>

        <jh-drawer-form
          v-model="visible"
          title="编辑文章"
          :fields="formFields"
          :width="700"
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
            if (values.title === 'error') {
              reject(new Error('标题不合法'));
            } else {
              resolve({
                success: true,
                message: '发布成功',
                data: { id: Date.now(), ...values },
              });
            }
          }, 2000);
        });
      },
      handleSuccess(response, formData) {
        console.log('发布成功:', response, formData);
        alert('文章发布成功！');
      },
      handleError(error, formData) {
        console.error('发布失败:', error, formData);
        alert('发布失败: ' + error.message);
      },
    },
  }),
};

// 复杂表单 - 员工信息
export const ComplexForm = {
  render: () => ({
    components: { JhDrawerForm },
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
          },
          {
            name: 'birthdate',
            label: '出生日期',
            type: 'date',
            placeholder: '请选择出生日期',
            cols: 12,
          },
          {
            name: 'phone',
            label: '手机号',
            type: 'tel',
            placeholder: '请输入手机号',
            required: true,
            rules: [
              { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
            ],
            cols: 12,
          },
          {
            name: 'email',
            label: '邮箱',
            type: 'email',
            placeholder: '请输入邮箱',
            required: true,
            cols: 12,
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
              { text: '销售部', value: 'sales' },
            ],
            required: true,
            cols: 12,
          },
          {
            name: 'position',
            label: '职位',
            type: 'text',
            placeholder: '请输入职位',
            required: true,
            cols: 12,
          },
          {
            name: 'entryDate',
            label: '入职日期',
            type: 'date',
            placeholder: '请选择入职日期',
            required: true,
            cols: 12,
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
              { text: 'Java', value: 'java' },
            ],
            cols: 12,
          },

          { type: 'group', title: '其他信息' },
          {
            name: 'address',
            label: '家庭住址',
            type: 'text',
            placeholder: '请输入家庭住址',
            cols: 12,
          },
          {
            name: 'emergencyContact',
            label: '紧急联系人',
            type: 'text',
            placeholder: '请输入紧急联系人',
            cols: 12,
          },
          {
            name: 'emergencyPhone',
            label: '紧急联系电话',
            type: 'tel',
            placeholder: '请输入紧急联系电话',
            rules: [
              { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
            ],
            cols: 12,
          },
          {
            name: 'remark',
            label: '备注',
            type: 'textarea',
            rows: 3,
            placeholder: '请输入备注信息',
            cols: 12,
          },
        ],
      };
    },
    template: `
      <div>
        <v-btn color="primary" @click="visible = true">
          打开员工信息表单
        </v-btn>

        <jh-drawer-form
          v-model="visible"
          title="员工信息"
          :fields="formFields"
          :width="800"
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

// 宽抽屉
export const WideDrawer = {
  render: () => ({
    components: { JhDrawerForm },
    data() {
      return {
        visible: false,
        formFields: [
          {
            name: 'projectName',
            label: '项目名称',
            type: 'text',
            placeholder: '请输入项目名称',
            required: true,
            cols: 12,
            md: 6,
          },
          {
            name: 'projectCode',
            label: '项目编号',
            type: 'text',
            placeholder: '请输入项目编号',
            required: true,
            cols: 12,
            md: 6,
          },
          {
            name: 'startDate',
            label: '开始日期',
            type: 'date',
            placeholder: '请选择开始日期',
            required: true,
            cols: 12,
            md: 6,
          },
          {
            name: 'endDate',
            label: '结束日期',
            type: 'date',
            placeholder: '请选择结束日期',
            required: true,
            cols: 12,
            md: 6,
          },
          {
            name: 'budget',
            label: '预算',
            type: 'number',
            placeholder: '请输入预算',
            min: 0,
            step: 0.01,
            cols: 12,
            md: 6,
          },
          {
            name: 'priority',
            label: '优先级',
            type: 'select',
            placeholder: '请选择优先级',
            options: [
              { text: '高', value: 'high' },
              { text: '中', value: 'medium' },
              { text: '低', value: 'low' },
            ],
            required: true,
            cols: 12,
            md: 6,
          },
          {
            name: 'description',
            label: '项目描述',
            type: 'textarea',
            rows: 4,
            placeholder: '请输入项目描述',
            cols: 12,
          },
        ],
      };
    },
    template: `
      <div>
        <v-btn color="primary" @click="visible = true">
          打开宽抽屉（900px）
        </v-btn>

        <jh-drawer-form
          v-model="visible"
          title="新建项目"
          :fields="formFields"
          :width="900"
          layout="grid"
          @submit="handleSubmit"
        />
      </div>
    `,
    methods: {
      handleSubmit(values) {
        console.log('提交数据:', values);
        alert('项目创建成功！');
        this.visible = false;
      },
    },
  }),
};
