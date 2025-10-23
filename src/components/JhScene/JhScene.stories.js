import JhScene from './JhScene.vue';

// 示例场景数据
const sampleScenes = [
  {
    id: 'all',
    name: '全部',
    default: true,
    system: true,
    form: {},
  },
  {
    id: 'active',
    name: '活跃用户',
    system: true,
    form: {
      status: 'active',
    },
  },
  {
    id: 'inactive',
    name: '不活跃',
    system: true,
    form: {
      status: 'inactive',
    },
  },
];

export default {
  title: 'Components/JhScene',
  component: JhScene,
  tags: ['autodocs'],
  argTypes: {
    showActionBtn: {
      control: 'boolean',
      description: '是否显示操作按钮（新建场景、场景管理）',
    },
    useLocalStorage: {
      control: 'boolean',
      description: '是否使用 localStorage 持久化场景数据',
    },
    storageKey: {
      control: 'text',
      description: 'localStorage 存储的键名',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
# JhScene - 江湖场景组件

场景管理组件，用于快速切换不同的数据筛选场景。

## 功能特性

- 场景快速切换
- 自定义场景创建
- 场景管理（删除）
- 支持 localStorage 持久化
- 支持表单插槽自定义筛选条件

## 使用场景

适用于需要频繁切换筛选条件的列表页面，如：
- 用户列表（全部、活跃、待审核等）
- 订单列表（全部、待付款、待发货等）
- 工单列表（全部、处理中、已完成等）

## 事件

- \`scene-change\`: 场景切换时触发，参数为场景对象
- \`scene-created\`: 创建场景时触发，参数为新场景对象
- \`scene-deleted\`: 删除场景时触发，参数为被删除的场景对象
- \`error\`: 操作出错时触发，参数为错误消息

## 插槽

- \`form\`: 自定义筛选条件表单，作用域插槽，可访问 \`form\` 对象
        `,
      },
    },
  },
};

// 默认故事
export const Default = {
  args: {
    scenes: sampleScenes,
    showActionBtn: true,
    useLocalStorage: false,
    storageKey: 'jh-scene-list',
    initFormData: {},
  },
  render: (args) => ({
    components: { JhScene },
    data() {
      return {
        args,
        currentScene: null,
      };
    },
    template: `
      <div>
        <jh-scene
          v-bind="args"
          @scene-change="handleSceneChange"
          @scene-created="handleSceneCreated"
          @scene-deleted="handleSceneDeleted"
          @error="handleError"
        />
        <v-card class="mt-4" outlined>
          <v-card-text>
            <h4>当前场景信息：</h4>
            <pre>{{ currentScene }}</pre>
          </v-card-text>
        </v-card>
      </div>
    `,
    methods: {
      handleSceneChange(scene) {
        console.log('Scene changed:', scene);
        this.currentScene = scene;
      },
      handleSceneCreated(scene) {
        console.log('Scene created:', scene);
        alert('场景创建成功: ' + scene.name);
      },
      handleSceneDeleted(scene) {
        console.log('Scene deleted:', scene);
        alert('场景已删除: ' + scene.name);
      },
      handleError(message) {
        console.error('Error:', message);
        alert('错误: ' + message);
      },
    },
  }),
};

// 带表单插槽的场景
export const WithFormSlot = {
  args: {
    ...Default.args,
    initFormData: {
      status: '',
      keyword: '',
    },
  },
  render: (args) => ({
    components: { JhScene },
    data() {
      return {
        args,
        currentScene: null,
      };
    },
    template: `
      <div>
        <jh-scene
          v-bind="args"
          @scene-change="handleSceneChange"
          @scene-created="handleSceneCreated"
          @scene-deleted="handleSceneDeleted"
          @error="handleError"
        >
          <template v-slot:form="{ form }">
            <v-select
              v-model="form.status"
              :items="statusOptions"
              label="用户状态"
              dense
              outlined
              hide-details
              class="mb-2"
            ></v-select>
            <v-text-field
              v-model="form.keyword"
              label="关键词"
              dense
              outlined
              hide-details
              placeholder="输入搜索关键词"
            ></v-text-field>
          </template>
        </jh-scene>
        <v-card class="mt-4" outlined>
          <v-card-text>
            <h4>当前场景信息：</h4>
            <pre>{{ currentScene }}</pre>
          </v-card-text>
        </v-card>
      </div>
    `,
    computed: {
      statusOptions() {
        return [
          { text: '全部', value: '' },
          { text: '活跃', value: 'active' },
          { text: '不活跃', value: 'inactive' },
          { text: '待审核', value: 'pending' },
        ];
      },
    },
    methods: {
      handleSceneChange(scene) {
        console.log('Scene changed:', scene);
        this.currentScene = scene;
      },
      handleSceneCreated(scene) {
        console.log('Scene created:', scene);
        alert('场景创建成功: ' + scene.name);
      },
      handleSceneDeleted(scene) {
        console.log('Scene deleted:', scene);
        alert('场景已删除: ' + scene.name);
      },
      handleError(message) {
        console.error('Error:', message);
        alert('错误: ' + message);
      },
    },
  }),
};

// 无操作按钮
export const WithoutActionBtn = {
  args: {
    ...Default.args,
    showActionBtn: false,
  },
  render: Default.render,
};

// 使用 localStorage
export const WithLocalStorage = {
  args: {
    ...Default.args,
    useLocalStorage: true,
    storageKey: 'demo-scene-list',
  },
  render: (args) => ({
    components: { JhScene },
    data() {
      return {
        args,
        currentScene: null,
      };
    },
    template: `
      <div>
        <v-alert type="info" dense text class="mb-4">
          <strong>提示：</strong>此示例使用 localStorage 持久化场景数据，刷新页面后场景数据不会丢失。
        </v-alert>
        <jh-scene
          v-bind="args"
          @scene-change="handleSceneChange"
          @scene-created="handleSceneCreated"
          @scene-deleted="handleSceneDeleted"
          @error="handleError"
        />
        <v-card class="mt-4" outlined>
          <v-card-text>
            <h4>当前场景信息：</h4>
            <pre>{{ currentScene }}</pre>
          </v-card-text>
        </v-card>
      </div>
    `,
    methods: {
      handleSceneChange(scene) {
        console.log('Scene changed:', scene);
        this.currentScene = scene;
      },
      handleSceneCreated(scene) {
        console.log('Scene created:', scene);
        alert('场景创建成功: ' + scene.name);
      },
      handleSceneDeleted(scene) {
        console.log('Scene deleted:', scene);
        alert('场景已删除: ' + scene.name);
      },
      handleError(message) {
        console.error('Error:', message);
        alert('错误: ' + message);
      },
    },
  }),
};

// 多场景示例
export const ManyScenes = {
  args: {
    scenes: [
      { id: 'all', name: '全部', default: true, system: true, form: {} },
      { id: 'new', name: '最新', system: true, form: { sort: 'date_desc' } },
      { id: 'hot', name: '热门', system: true, form: { sort: 'views_desc' } },
      { id: 'pending', name: '待审核', system: true, form: { status: 'pending' } },
      { id: 'approved', name: '已通过', system: true, form: { status: 'approved' } },
      { id: 'rejected', name: '已拒绝', system: true, form: { status: 'rejected' } },
      { id: 'draft', name: '草稿', system: true, form: { status: 'draft' } },
    ],
    showActionBtn: true,
    useLocalStorage: false,
  },
  render: Default.render,
};

// 单个场景
export const SingleScene = {
  args: {
    scenes: [{ id: 'all', name: '全部数据', default: true, system: true, form: {} }],
    showActionBtn: true,
    useLocalStorage: false,
  },
  render: Default.render,
};
