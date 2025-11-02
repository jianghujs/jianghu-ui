import JhEditableTable from './JhEditableTable.vue';

export default {
  title: '数据展示/JhEditableTable - 可编辑表格',
  component: JhEditableTable,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'object',
      description: '表格数据（v-model）',
      table: {
        type: { summary: 'Array' },
        category: 'Props',
      },
    },
    columns: {
      control: 'object',
      description: '列配置数组',
      table: {
        type: { summary: 'Array<Column>' },
        category: 'Props',
      },
    },
    editable: {
      control: 'boolean',
      description: '是否可编辑',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Props',
      },
    },
    deletable: {
      control: 'boolean',
      description: '是否可删除',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Props',
      },
    },
    recordCreator: {
      control: 'boolean',
      description: '是否显示新增按钮',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Props',
      },
    },
    dense: {
      control: 'boolean',
      description: '紧凑模式',
      table: {
        type: { summary: 'boolean' },
        category: 'Props',
      },
    },
    onSave: {
      action: 'save',
      description: '保存行时触发',
      table: {
        category: 'Events',
      },
    },
    onDelete: {
      action: 'delete',
      description: '删除行时触发',
      table: {
        category: 'Events',
      },
    },
    onChange: {
      action: 'change',
      description: '数据变化时触发',
      table: {
        category: 'Events',
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `

可编辑表格组件，支持行内编辑、新增、删除等操作，参考 Ant Design Pro 的 EditableProTable 设计。

## 核心特性

- ✅ **行编辑模式**：点击编辑按钮整行进入编辑状态
- ✅ **新增/删除行**：支持动态添加和删除数据行
- ✅ **内联验证**：编辑时实时验证字段规则
- ✅ **操作列**：编辑、保存、取消、删除按钮
- ✅ **多种字段类型**：text、number、select、date、switch、enum
- ✅ **数据绑定**：v-model 双向绑定
- ✅ **自定义渲染**：支持通过 slot 自定义单元格和操作列

## 使用场景

- 配置管理界面
- 表单数据批量录入
- 动态列表编辑
- 权限配置表格
- 商品/订单管理

## Column 配置说明

\`\`\`javascript
{
  key: 'name',          // 字段名（必填）
  label: '姓名',        // 列标题（必填）
  type: 'text',         // 字段类型：text | number | select | date | switch | enum
  editable: true,       // 是否可编辑（默认 true）
  rules: [],            // 验证规则数组
  options: [],          // select 类型的选项
  enum: {},             // enum 类型的映射 { value: { text, color } }
  placeholder: '',      // 占位符
  width: 150,           // 列宽度
  sortable: false,      // 是否可排序
}
\`\`\`
        `,
      },
    },
  },
};

// Story 1: 基础示例
export const 基础示例 = {
  render: (args) => ({
    components: { JhEditableTable },
    data() {
      return {
        tableData: [
          { id: 1, name: '张三', age: 28, email: 'zhangsan@example.com', city: '北京' },
          { id: 2, name: '李四', age: 32, email: 'lisi@example.com', city: '上海' },
          { id: 3, name: '王五', age: 25, email: 'wangwu@example.com', city: '广州' },
        ],
        columns: [
          {
            key: 'name',
            label: '姓名',
            type: 'text',
            rules: [(v) => !!v || '姓名不能为空'],
          },
          {
            key: 'age',
            label: '年龄',
            type: 'number',
            rules: [(v) => (v > 0 && v < 150) || '请输入有效年龄'],
          },
          {
            key: 'email',
            label: '邮箱',
            type: 'text',
            rules: [
              (v) => !!v || '邮箱不能为空',
              (v) => /.+@.+\..+/.test(v) || '请输入有效邮箱',
            ],
          },
          {
            key: 'city',
            label: '城市',
            type: 'select',
            options: ['北京', '上海', '广州', '深圳', '杭州'],
          },
        ],
      };
    },
    template: `
      <div class="pa-4">
        <h3 class="mb-4">基础可编辑表格</h3>
        <JhEditableTable
          v-model="tableData"
          :columns="columns"
        />
        <div class="mt-4">
          <h4>当前数据：</h4>
          <pre>{{ tableData }}</pre>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '展示基本的可编辑表格功能，支持文本、数字、邮箱、下拉选择等字段类型。',
      },
    },
  },
};

// Story 2: 多种字段类型
export const 多种字段类型 = {
  render: () => ({
    components: { JhEditableTable },
    data() {
      return {
        tableData: [
          {
            id: 1,
            name: '产品A',
            price: 99.99,
            category: 'electronics',
            status: 'active',
            inStock: true,
            releaseDate: '2024-01-15',
          },
          {
            id: 2,
            name: '产品B',
            price: 199.99,
            category: 'clothing',
            status: 'inactive',
            inStock: false,
            releaseDate: '2024-02-20',
          },
        ],
        columns: [
          {
            key: 'name',
            label: '产品名称',
            type: 'text',
            rules: [(v) => !!v || '必填'],
          },
          {
            key: 'price',
            label: '价格',
            type: 'number',
            rules: [(v) => v > 0 || '价格必须大于0'],
          },
          {
            key: 'category',
            label: '分类',
            type: 'select',
            options: [
              { text: '电子产品', value: 'electronics' },
              { text: '服装', value: 'clothing' },
              { text: '食品', value: 'food' },
              { text: '图书', value: 'books' },
            ],
          },
          {
            key: 'status',
            label: '状态',
            type: 'enum',
            editable: true,
            enum: {
              active: { text: '启用', color: 'success' },
              inactive: { text: '禁用', color: 'default' },
              pending: { text: '待审核', color: 'warning' },
            },
          },
          {
            key: 'inStock',
            label: '库存',
            type: 'switch',
          },
          {
            key: 'releaseDate',
            label: '上架日期',
            type: 'date',
          },
        ],
      };
    },
    template: `
      <div class="pa-4">
        <h3 class="mb-4">多种字段类型示例</h3>
        <JhEditableTable
          v-model="tableData"
          :columns="columns"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '展示支持的多种字段类型：文本、数字、下拉选择、枚举、开关、日期等。',
      },
    },
  },
};

// Story 3: 自定义新增按钮
export const 自定义新增按钮 = {
  render: () => ({
    components: { JhEditableTable },
    data() {
      return {
        tableData: [
          { id: 1, username: 'admin', role: 'admin', active: true },
          { id: 2, username: 'user1', role: 'user', active: true },
        ],
        columns: [
          {
            key: 'username',
            label: '用户名',
            type: 'text',
            rules: [(v) => !!v || '必填'],
          },
          {
            key: 'role',
            label: '角色',
            type: 'select',
            options: [
              { text: '管理员', value: 'admin' },
              { text: '普通用户', value: 'user' },
              { text: '访客', value: 'guest' },
            ],
          },
          {
            key: 'active',
            label: '激活状态',
            type: 'switch',
          },
        ],
        recordCreatorProps: {
          creatorButtonText: '新增用户',
          record: {
            username: '',
            role: 'user',
            active: true,
          },
        },
      };
    },
    template: `
      <div class="pa-4">
        <h3 class="mb-4">自定义新增按钮</h3>
        <JhEditableTable
          v-model="tableData"
          :columns="columns"
          :record-creator-props="recordCreatorProps"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '通过 recordCreatorProps 自定义新增按钮文字和新行的默认数据。',
      },
    },
  },
};

// Story 4: 只读模式
export const 只读模式 = {
  render: () => ({
    components: { JhEditableTable },
    data() {
      return {
        tableData: [
          { id: 1, name: '项目A', status: 'completed', progress: 100 },
          { id: 2, name: '项目B', status: 'in_progress', progress: 60 },
          { id: 3, name: '项目C', status: 'pending', progress: 0 },
        ],
        columns: [
          { key: 'name', label: '项目名称', type: 'text' },
          {
            key: 'status',
            label: '状态',
            type: 'enum',
            enum: {
              completed: { text: '已完成', color: 'success' },
              in_progress: { text: '进行中', color: 'primary' },
              pending: { text: '待开始', color: 'grey' },
            },
          },
          { key: 'progress', label: '进度', type: 'number' },
        ],
      };
    },
    template: `
      <div class="pa-4">
        <h3 class="mb-4">只读模式</h3>
        <JhEditableTable
          v-model="tableData"
          :columns="columns"
          :editable="false"
          :deletable="false"
          :record-creator="false"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '设置 editable、deletable、recordCreator 为 false，表格变为只读展示模式。',
      },
    },
  },
};

// Story 5: 紧凑模式
export const 紧凑模式 = {
  render: () => ({
    components: { JhEditableTable },
    data() {
      return {
        tableData: [
          { id: 1, code: 'P001', name: '产品1', qty: 100, price: 50 },
          { id: 2, code: 'P002', name: '产品2', qty: 200, price: 80 },
          { id: 3, code: 'P003', name: '产品3', qty: 150, price: 120 },
          { id: 4, code: 'P004', name: '产品4', qty: 80, price: 200 },
        ],
        columns: [
          { key: 'code', label: '编码', type: 'text' },
          { key: 'name', label: '名称', type: 'text' },
          { key: 'qty', label: '数量', type: 'number' },
          { key: 'price', label: '单价', type: 'number' },
        ],
      };
    },
    template: `
      <div class="pa-4">
        <h3 class="mb-4">紧凑模式</h3>
        <JhEditableTable
          v-model="tableData"
          :columns="columns"
          dense
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '使用 dense 属性启用紧凑模式，适合展示更多数据。',
      },
    },
  },
};

// Story 6: 自定义单元格渲染
export const 自定义单元格渲染 = {
  render: () => ({
    components: { JhEditableTable },
    data() {
      return {
        tableData: [
          { id: 1, name: '张三', score: 85, grade: 'B' },
          { id: 2, name: '李四', score: 92, grade: 'A' },
          { id: 3, name: '王五', score: 78, grade: 'C' },
        ],
        columns: [
          { key: 'name', label: '姓名', type: 'text' },
          { key: 'score', label: '分数', type: 'number' },
          { key: 'grade', label: '等级', type: 'text', editable: false },
        ],
      };
    },
    methods: {
      getScoreColor(score) {
        if (score >= 90) return 'success';
        if (score >= 80) return 'primary';
        if (score >= 70) return 'warning';
        return 'error';
      },
    },
    template: `
      <div class="pa-4">
        <h3 class="mb-4">自定义单元格渲染</h3>
        <JhEditableTable
          v-model="tableData"
          :columns="columns"
        >
          <!-- 自定义分数单元格 -->
          <template #cell.score="{ value }">
            <v-chip :color="getScoreColor(value)" small dark>
              {{ value }} 分
            </v-chip>
          </template>

          <!-- 自定义操作列 -->
          <template #actions="{ item }">
            <v-btn icon small color="info" @click="() => alert('查看详情: ' + item.name)">
              <v-icon small>mdi-eye</v-icon>
            </v-btn>
          </template>
        </JhEditableTable>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '使用 slot 自定义单元格渲染和操作列，实现更丰富的展示效果。',
      },
    },
  },
};

// Story 7: 完整功能演示
export const 完整功能演示 = {
  render: () => ({
    components: { JhEditableTable },
    data() {
      return {
        tableData: [
          {
            id: 1,
            name: '任务A',
            assignee: '张三',
            priority: 'high',
            status: 'in_progress',
            dueDate: '2024-12-31',
            completed: false,
          },
          {
            id: 2,
            name: '任务B',
            assignee: '李四',
            priority: 'medium',
            status: 'pending',
            dueDate: '2024-11-30',
            completed: false,
          },
        ],
        columns: [
          {
            key: 'name',
            label: '任务名称',
            type: 'text',
            rules: [(v) => !!v || '任务名称不能为空'],
          },
          {
            key: 'assignee',
            label: '负责人',
            type: 'select',
            options: ['张三', '李四', '王五', '赵六'],
          },
          {
            key: 'priority',
            label: '优先级',
            type: 'select',
            options: [
              { text: '高', value: 'high' },
              { text: '中', value: 'medium' },
              { text: '低', value: 'low' },
            ],
          },
          {
            key: 'status',
            label: '状态',
            type: 'enum',
            enum: {
              pending: { text: '待开始', color: 'grey' },
              in_progress: { text: '进行中', color: 'primary' },
              completed: { text: '已完成', color: 'success' },
            },
          },
          {
            key: 'dueDate',
            label: '截止日期',
            type: 'date',
          },
          {
            key: 'completed',
            label: '完成',
            type: 'switch',
          },
        ],
      };
    },
    template: `
      <div class="pa-4">
        <h3 class="mb-4">完整功能演示 - 任务管理</h3>

        <v-alert type="info" dense outlined class="mb-4">
          <div><strong>功能说明：</strong></div>
          <ul class="mt-2 mb-0">
            <li>点击编辑按钮可编辑整行数据</li>
            <li>编辑时会显示保存和取消按钮</li>
            <li>支持字段验证，验证失败无法保存</li>
            <li>点击添加按钮可新增任务</li>
            <li>新增的行会自动进入编辑状态</li>
            <li>所有操作都会触发相应事件</li>
          </ul>
        </v-alert>

        <JhEditableTable
          v-model="tableData"
          :columns="columns"
          :record-creator-props="{
            creatorButtonText: '新增任务',
            record: {
              name: '',
              assignee: '张三',
              priority: 'medium',
              status: 'pending',
              dueDate: new Date().toISOString().substr(0, 10),
              completed: false,
            }
          }"
        />

        <div class="mt-4 pa-3 grey lighten-4 rounded">
          <h4>当前表格数据（{{ tableData.length }} 条）：</h4>
          <pre class="mt-2">{{ JSON.stringify(tableData, null, 2) }}</pre>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '完整功能演示，包含所有字段类型、验证、新增、编辑、删除等操作，适用于任务管理等场景。',
      },
    },
  },
};
