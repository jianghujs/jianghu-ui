import JhFormList from './JhFormList.vue';

export default {
  title: '数据录入/JhFormList - 数据结构化',
  component: JhFormList,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['card', 'table', 'inline'],
      description: '渲染模式',
    },
    min: {
      control: 'number',
      description: '最小项数',
    },
    max: {
      control: 'number',
      description: '最大项数',
    },
    sortable: {
      control: 'boolean',
      description: '是否可拖拽排序',
    },
    copyable: {
      control: 'boolean',
      description: '是否可复制',
    },
    showIndex: {
      control: 'boolean',
      description: '是否显示序号',
    },
    dense: {
      control: 'boolean',
      description: '紧凑模式',
    },
    outlined: {
      control: 'boolean',
      description: '边框样式',
    },
    disabled: {
      control: 'boolean',
      description: '禁用状态',
    },
    readonly: {
      control: 'boolean',
      description: '只读状态',
    },
  },
};

// 基础示例 - Card 模式
export const BasicCard = {
  render: (args, { argTypes }) => ({
    components: { JhFormList },
    props: Object.keys(argTypes),
    data() {
      return {
        contacts: [
          { name: '张三', phone: '13800138000', email: 'zhangsan@example.com', role: 'manager' },
          { name: '李四', phone: '13900139000', email: 'lisi@example.com', role: 'developer' },
        ],
        fields: [
          {
            key: 'name',
            label: '姓名',
            type: 'text',
            required: true,
            cols: 6,
            placeholder: '请输入姓名'
          },
          {
            key: 'phone',
            label: '电话',
            type: 'text',
            rules: [(v) => !v || /^1[3-9]\d{9}$/.test(v) || '请输入正确的手机号'],
            cols: 6,
            placeholder: '请输入电话'
          },
          {
            key: 'email',
            label: '邮箱',
            type: 'text',
            rules: [(v) => !v || /.+@.+\..+/.test(v) || '请输入正确的邮箱'],
            cols: 6,
            placeholder: '请输入邮箱'
          },
          {
            key: 'role',
            label: '角色',
            type: 'select',
            options: [
              { text: '管理员', value: 'manager' },
              { text: '开发者', value: 'developer' },
              { text: '测试', value: 'tester' },
            ],
            cols: 6,
          },
        ],
      };
    },
    template: `
      <v-app>
        <v-container>
          <jh-form-list
            v-model="contacts"
            :fields="fields"
            v-bind="$props"
            title="联系人列表"
            description="请填写联系人信息，至少需要一位联系人"
            :min="1"
            :max="5"
            @add="(item, index) => console.log('添加:', item, index)"
            @remove="(item, index) => console.log('删除:', item, index)"
            @copy="(source, newItem) => console.log('复制:', source, newItem)"
          />
          <v-divider class="my-6"></v-divider>
          <div>
            <h4 class="mb-2">当前数据:</h4>
            <pre class="grey lighten-4 pa-3">{{ contacts }}</pre>
          </div>
        </v-container>
      </v-app>
    `,
  }),
  args: {
    mode: 'card',
    sortable: false,
    copyable: true,
    showIndex: true,
    dense: true,
    outlined: true,
    disabled: false,
    readonly: false,
  },
};

// Table 模式
export const TableMode = {
  render: () => ({
    components: { JhFormList },
    data() {
      return {
        items: [
          { product: 'MacBook Pro', quantity: 2, price: 12999, note: '16寸 M3' },
          { product: 'iPhone 15', quantity: 1, price: 5999, note: '128GB' },
          { product: 'AirPods Pro', quantity: 3, price: 1999, note: '第二代' },
        ],
        fields: [
          {
            key: 'product',
            label: '商品名称',
            type: 'text',
            required: true,
            placeholder: '请输入商品名称'
          },
          {
            key: 'quantity',
            label: '数量',
            type: 'number',
            required: true,
            placeholder: '请输入数量'
          },
          {
            key: 'price',
            label: '单价',
            type: 'number',
            required: true,
            placeholder: '请输入单价'
          },
          {
            key: 'note',
            label: '备注',
            type: 'text',
            placeholder: '请输入备注'
          },
        ],
      };
    },
    computed: {
      totalAmount() {
        return this.items.reduce((sum, item) => {
          return sum + (item.quantity || 0) * (item.price || 0);
        }, 0);
      },
    },
    template: `
      <v-app>
        <v-container>
          <jh-form-list
            v-model="items"
            :fields="fields"
            mode="table"
            title="订单商品"
            :min="1"
            :sortable="true"
            :show-index="true"
          />
          <v-card class="mt-4 pa-4">
            <div class="text-right">
              <span class="text-h6">总金额: </span>
              <span class="text-h5 error--text">¥{{ totalAmount.toFixed(2) }}</span>
            </div>
          </v-card>
        </v-container>
      </v-app>
    `,
  }),
};

// Inline 模式
export const InlineMode = {
  render: () => ({
    components: { JhFormList },
    data() {
      return {
        tags: [
          { name: 'Vue.js' },
          { name: 'React' },
          { name: 'Angular' },
          { name: 'Svelte' },
        ],
        fields: [
          {
            key: 'name',
            label: '标签名称',
            type: 'text',
            required: true,
          },
        ],
      };
    },
    template: `
      <v-app>
        <v-container>
          <div class="mb-2">
            <strong>技术栈标签:</strong>
          </div>
          <jh-form-list
            v-model="tags"
            :fields="fields"
            mode="inline"
            inline-display-key="name"
            :sortable="true"
            add-button-text="添加标签"
          />
        </v-container>
      </v-app>
    `,
  }),
};

// 自定义渲染
export const CustomRender = {
  render: () => ({
    components: { JhFormList },
    data() {
      return {
        members: [
          {
            name: '张三',
            avatar: 'https://i.pravatar.cc/150?img=1',
            role: 'admin',
            status: 'active'
          },
          {
            name: '李四',
            avatar: 'https://i.pravatar.cc/150?img=2',
            role: 'member',
            status: 'active'
          },
        ],
        fields: [
          {
            key: 'name',
            label: '姓名',
            type: 'text',
            required: true,
            cols: 6,
          },
          {
            key: 'role',
            label: '角色',
            type: 'select',
            options: [
              { text: '管理员', value: 'admin' },
              { text: '普通成员', value: 'member' },
            ],
            cols: 6,
          },
          {
            key: 'avatar',
            label: '头像URL',
            type: 'text',
            cols: 12,
          },
        ],
      };
    },
    template: `
      <v-app>
        <v-container>
          <jh-form-list
            v-model="members"
            :fields="fields"
            title="团队成员"
            mode="card"
          >
            <!-- 自定义列表项头部 -->
            <template #item="{ item, index, fields, updateItem }">
              <div class="d-flex align-center mb-4">
                <v-avatar size="48" class="mr-3">
                  <v-img :src="item.avatar || 'https://i.pravatar.cc/150?img=' + index"></v-img>
                </v-avatar>
                <div>
                  <div class="font-weight-medium">{{ item.name || '未命名' }}</div>
                  <div class="text-caption grey--text">
                    {{ item.role === 'admin' ? '管理员' : '普通成员' }}
                  </div>
                </div>
              </div>

              <!-- 使用默认表单字段 -->
              <jh-form
                :fields="fields"
                :initial-data="item"
                layout="horizontal"
                @field-change="({ key, value }) => updateItem(key, value)"
              />
            </template>
          </jh-form-list>
        </v-container>
      </v-app>
    `,
  }),
};

// 嵌套列表
export const NestedList = {
  render: () => ({
    components: { JhFormList },
    data() {
      return {
        projects: [
          {
            name: '项目A',
            description: '电商平台',
            members: [
              { name: '张三', role: 'frontend' },
              { name: '李四', role: 'backend' },
            ],
          },
        ],
        projectFields: [
          {
            key: 'name',
            label: '项目名称',
            type: 'text',
            required: true,
            cols: 6,
          },
          {
            key: 'description',
            label: '项目描述',
            type: 'text',
            cols: 6,
          },
        ],
        memberFields: [
          {
            key: 'name',
            label: '成员姓名',
            type: 'text',
            required: true,
          },
          {
            key: 'role',
            label: '角色',
            type: 'select',
            options: [
              { text: '前端', value: 'frontend' },
              { text: '后端', value: 'backend' },
              { text: '测试', value: 'tester' },
            ],
          },
        ],
      };
    },
    template: `
      <v-app>
        <v-container>
          <jh-form-list
            v-model="projects"
            :fields="projectFields"
            title="项目列表"
            mode="card"
          >
            <template #field-members="{ item, updateItem }">
              <div class="mt-4">
                <div class="text-subtitle-2 mb-2">项目成员:</div>
                <jh-form-list
                  :value="item.members || []"
                  @input="updateItem('members', $event)"
                  :fields="memberFields"
                  mode="table"
                  :show-index="false"
                  :dense="true"
                  add-button-text="添加成员"
                />
              </div>
            </template>
          </jh-form-list>
        </v-container>
      </v-app>
    `,
  }),
};

// 高级验证
export const AdvancedValidation = {
  render: () => ({
    components: { JhFormList },
    data() {
      return {
        emails: [
          { email: 'admin@example.com', isPrimary: true },
        ],
        fields: [
          {
            key: 'email',
            label: '邮箱地址',
            type: 'text',
            required: true,
            rules: [(v) => /.+@.+\..+/.test(v) || '请输入正确的邮箱格式'],
            cols: 8,
          },
          {
            key: 'isPrimary',
            label: '主邮箱',
            type: 'switch',
            cols: 4,
          },
        ],
        listRules: [
          (items) => items.length >= 1 || '至少需要一个邮箱',
          (items) => items.length <= 5 || '最多只能添加5个邮箱',
          (items) => {
            const emails = items.map(i => i.email).filter(Boolean);
            const unique = new Set(emails);
            return emails.length === unique.size || '邮箱地址不能重复';
          },
          (items) => {
            const primaryCount = items.filter(i => i.isPrimary).length;
            return primaryCount <= 1 || '只能有一个主邮箱';
          },
        ],
      };
    },
    methods: {
      async handleValidate() {
        const isValid = await this.$refs.formList.validate();
        if (isValid) {
          alert('验证通过！');
        } else {
          alert('验证失败，请检查输入');
        }
      },
    },
    template: `
      <v-app>
        <v-container>
          <jh-form-list
            ref="formList"
            v-model="emails"
            :fields="fields"
            :rules="listRules"
            title="邮箱列表"
            description="请添加您的邮箱地址，至少一个，最多五个"
            :min="1"
            :max="5"
          />
          <v-btn color="primary" class="mt-4" @click="handleValidate">
            验证表单
          </v-btn>
        </v-container>
      </v-app>
    `,
  }),
};

// 只读模式
export const ReadonlyMode = {
  render: () => ({
    components: { JhFormList },
    data() {
      return {
        educations: [
          {
            school: '清华大学',
            major: '计算机科学与技术',
            degree: 'bachelor',
            startDate: '2015-09',
            endDate: '2019-06',
          },
          {
            school: '北京大学',
            major: '软件工程',
            degree: 'master',
            startDate: '2019-09',
            endDate: '2022-06',
          },
        ],
        fields: [
          { key: 'school', label: '学校', type: 'text', cols: 6 },
          { key: 'major', label: '专业', type: 'text', cols: 6 },
          {
            key: 'degree',
            label: '学历',
            type: 'select',
            options: [
              { text: '本科', value: 'bachelor' },
              { text: '硕士', value: 'master' },
              { text: '博士', value: 'doctor' },
            ],
            cols: 4,
          },
          { key: 'startDate', label: '开始时间', type: 'text', cols: 4 },
          { key: 'endDate', label: '结束时间', type: 'text', cols: 4 },
        ],
      };
    },
    template: `
      <v-app>
        <v-container>
          <jh-form-list
            v-model="educations"
            :fields="fields"
            title="教育经历"
            mode="card"
            :readonly="true"
          />
        </v-container>
      </v-app>
    `,
  }),
};

// 禁用状态
export const DisabledState = {
  render: () => ({
    components: { JhFormList },
    data() {
      return {
        items: [
          { name: '项目A', status: 'completed' },
          { name: '项目B', status: 'pending' },
        ],
        fields: [
          { key: 'name', label: '项目名称', type: 'text', cols: 8 },
          {
            key: 'status',
            label: '状态',
            type: 'select',
            options: [
              { text: '待处理', value: 'pending' },
              { text: '进行中', value: 'processing' },
              { text: '已完成', value: 'completed' },
            ],
            cols: 4,
          },
        ],
      };
    },
    template: `
      <v-app>
        <v-container>
          <jh-form-list
            v-model="items"
            :fields="fields"
            title="项目列表（禁用状态）"
            :disabled="true"
          />
        </v-container>
      </v-app>
    `,
  }),
};

// 动态默认值
export const DynamicDefaultValue = {
  render: () => ({
    components: { JhFormList },
    data() {
      return {
        tasks: [],
        fields: [
          {
            key: 'title',
            label: '任务标题',
            type: 'text',
            required: true,
            cols: 8,
          },
          {
            key: 'priority',
            label: '优先级',
            type: 'select',
            options: [
              { text: '低', value: 'low' },
              { text: '中', value: 'medium' },
              { text: '高', value: 'high' },
            ],
            cols: 4,
          },
          {
            key: 'dueDate',
            label: '截止日期',
            type: 'date',
            cols: 6,
          },
          {
            key: 'assignee',
            label: '负责人',
            type: 'text',
            cols: 6,
          },
        ],
      };
    },
    methods: {
      getDefaultValue(index) {
        const today = new Date();
        const dueDate = new Date(today);
        dueDate.setDate(today.getDate() + 7);

        return {
          title: `任务 ${index + 1}`,
          priority: 'medium',
          dueDate: dueDate.toISOString().split('T')[0],
          assignee: '',
        };
      },
    },
    template: `
      <v-app>
        <v-container>
          <jh-form-list
            v-model="tasks"
            :fields="fields"
            :default-value="getDefaultValue"
            title="任务列表"
            description="新增任务会自动填充默认值"
          />
          <div class="mt-4">
            <pre class="grey lighten-4 pa-3">{{ tasks }}</pre>
          </div>
        </v-container>
      </v-app>
    `,
  }),
};
