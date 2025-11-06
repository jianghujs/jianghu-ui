import JhModal from './JhModal.vue';

export default {
  title: '基础组件/JhModal',
  component: JhModal,
  parameters: {
    docs: {
      description: {
        component: `
# JhModal 通用弹窗组件

基于 Vuetify 的通用弹窗组件，提供一致的弹窗框架，支持完全自定义内容。

## 特性

- 🎨 **自定义内容**: 通过默认插槽完全自定义弹窗内容
- 🎛️ **灵活配置**: 支持宽度、全屏、持久化等配置
- 🔧 **操作按钮**: 支持自定义操作按钮或使用默认按钮
- 📱 **响应式**: 适配移动端和桌面端
- 🎯 **事件丰富**: 提供 open、close、confirm、cancel 等事件
- ⌨️ **键盘支持**: 支持 ESC 键关闭

## 基础用法

\`\`\`vue
<jh-modal v-model="showModal" title="自定义弹窗">
  <div>这里是自定义内容</div>
</jh-modal>
\`\`\`

## Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 弹窗显示状态 (v-model) | Boolean | false |
| title | 弹窗标题 | String | '弹窗' |
| width | 弹窗宽度 | Number/String | 600 |
| fullscreen | 是否全屏显示 | Boolean | false |
| persistent | 是否持久化（点击外部不关闭） | Boolean | true |
| closable | 是否显示关闭按钮 | Boolean | true |
| showActions | 是否显示底部操作区域 | Boolean | true |
| showConfirmButton | 是否显示确认按钮 | Boolean | true |
| showCancelButton | 是否显示取消按钮 | Boolean | true |
| confirmText | 确认按钮文本 | String | '确认' |
| cancelText | 取消按钮文本 | String | '取消' |

## Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| open | 弹窗打开时触发 | - |
| close | 弹窗关闭时触发 | - |
| confirm | 点击确认按钮时触发 | - |
| cancel | 点击取消按钮时触发 | - |

## Slots

| 插槽名 | 说明 |
|--------|------|
| default | 弹窗内容 |
| actions | 自定义操作按钮 |

## 方法

| 方法名 | 说明 | 参数 |
|--------|------|------|
| open | 打开弹窗 | - |
| close | 关闭弹窗 | - |
        `
      }
    }
  },
  argTypes: {
    value: {
      control: { type: 'boolean' },
      description: '弹窗显示状态'
    },
    title: {
      control: { type: 'text' },
      description: '弹窗标题'
    },
    width: {
      control: { type: 'text' },
      description: '弹窗宽度'
    },
    fullscreen: {
      control: { type: 'boolean' },
      description: '是否全屏显示'
    },
    persistent: {
      control: { type: 'boolean' },
      description: '是否持久化'
    },
    closable: {
      control: { type: 'boolean' },
      description: '是否显示关闭按钮'
    },
    showActions: {
      control: { type: 'boolean' },
      description: '是否显示底部操作区域'
    },
    showConfirmButton: {
      control: { type: 'boolean' },
      description: '是否显示确认按钮'
    },
    showCancelButton: {
      control: { type: 'boolean' },
      description: '是否显示取消按钮'
    },
    confirmText: {
      control: { type: 'text' },
      description: '确认按钮文本'
    },
    cancelText: {
      control: { type: 'text' },
      description: '取消按钮文本'
    }
  }
};

// 基础用法
export const Basic = {
  render: (args) => ({
    components: { JhModal },
    data() {
      return {
        showModal: false,
        ...args
      };
    },
    template: `
      <div>
        <v-btn color="primary" @click="showModal = true">打开弹窗</v-btn>
        <jh-modal
          v-model="showModal"
          :title="title"
          :width="width"
          :fullscreen="fullscreen"
          :persistent="persistent"
          :closable="closable"
          :show-actions="showActions"
          :show-confirm-button="showConfirmButton"
          :show-cancel-button="showCancelButton"
          :confirm-text="confirmText"
          :cancel-text="cancelText"
          @confirm="handleConfirm"
          @cancel="handleCancel"
          @open="handleOpen"
          @close="handleClose"
        >
          <div>
            <h3>自定义内容</h3>
            <p>这里可以放置任何自定义内容，比如表单、列表、图表等。</p>
            <v-alert type="info" class="mt-4">
              这是一个信息提示框
            </v-alert>
            <v-text-field
              label="输入框示例"
              outlined
              class="mt-4"
            ></v-text-field>
          </div>
        </jh-modal>
      </div>
    `,
    methods: {
      handleConfirm() {
        console.log('确认操作');
        this.showModal = false;
      },
      handleCancel() {
        console.log('取消操作');
      },
      handleOpen() {
        console.log('弹窗已打开');
      },
      handleClose() {
        console.log('弹窗已关闭');
      }
    }
  }),
  args: {
    title: '基础弹窗',
    width: 600,
    fullscreen: false,
    persistent: true,
    closable: true,
    showActions: true,
    showConfirmButton: true,
    showCancelButton: true,
    confirmText: '确认',
    cancelText: '取消'
  }
};

// 全屏弹窗
export const Fullscreen = {
  render: (args) => ({
    components: { JhModal },
    data() {
      return {
        showModal: false,
        ...args
      };
    },
    template: `
      <div>
        <v-btn color="primary" @click="showModal = true">打开全屏弹窗</v-btn>
        <jh-modal
          v-model="showModal"
          :title="title"
          :fullscreen="fullscreen"
          @confirm="showModal = false"
        >
          <div>
            <h2>全屏弹窗内容</h2>
            <p>这是一个全屏显示的弹窗，适合展示大量内容或复杂的界面。</p>
            
            <v-row class="mt-6">
              <v-col cols="12" md="6">
                <v-card>
                  <v-card-title>卡片1</v-card-title>
                  <v-card-text>
                    这里是一些内容...
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card>
                  <v-card-title>卡片2</v-card-title>
                  <v-card-text>
                    这里是一些内容...
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            
            <v-data-table
              :headers="[
                { text: '姓名', value: 'name' },
                { text: '年龄', value: 'age' },
                { text: '城市', value: 'city' }
              ]"
              :items="[
                { name: '张三', age: 25, city: '北京' },
                { name: '李四', age: 30, city: '上海' },
                { name: '王五', age: 28, city: '广州' }
              ]"
              class="mt-6"
            ></v-data-table>
          </div>
        </jh-modal>
      </div>
    `
  }),
  args: {
    title: '全屏弹窗',
    fullscreen: true
  }
};

// 自定义操作按钮
export const CustomActions = {
  render: (args) => ({
    components: { JhModal },
    data() {
      return {
        showModal: false,
        ...args
      };
    },
    template: `
      <div>
        <v-btn color="primary" @click="showModal = true">自定义操作按钮</v-btn>
        <jh-modal
          v-model="showModal"
          :title="title"
          @confirm="showModal = false"
        >
          <template #actions>
            <v-btn
              text
              color="grey"
              @click="handleReset"
            >
              重置
            </v-btn>
            <v-spacer />
            <v-btn
              text
              @click="showModal = false"
            >
              取消
            </v-btn>
            <v-btn
              color="warning"
              class="ml-2"
              @click="handleSave"
            >
              保存草稿
            </v-btn>
            <v-btn
              color="success"
              class="ml-2"
              @click="handleSubmit"
            >
              发布
            </v-btn>
          </template>
          
          <div>
            <h3>自定义操作按钮</h3>
            <p>这个弹窗使用了自定义的操作按钮。</p>
            <v-form>
              <v-text-field
                label="标题"
                outlined
                class="mb-4"
              ></v-text-field>
              <v-textarea
                label="内容"
                outlined
                rows="4"
                class="mb-4"
              ></v-textarea>
              <v-select
                label="分类"
                :items="['技术', '生活', '工作', '学习']"
                outlined
              ></v-select>
            </v-form>
          </div>
        </jh-modal>
      </div>
    `,
    methods: {
      handleReset() {
        console.log('重置表单');
      },
      handleSave() {
        console.log('保存草稿');
      },
      handleSubmit() {
        console.log('发布内容');
        this.showModal = false;
      }
    }
  }),
  args: {
    title: '发布文章'
  }
};

// 无操作区域
export const NoActions = {
  render: (args) => ({
    components: { JhModal },
    data() {
      return {
        showModal: false,
        ...args
      };
    },
    template: `
      <div>
        <v-btn color="primary" @click="showModal = true">无操作区域弹窗</v-btn>
        <jh-modal
          v-model="showModal"
          :title="title"
          :show-actions="showActions"
        >
          <div>
            <h3>纯展示内容</h3>
            <p>这个弹窗没有底部操作区域，适合纯展示内容。</p>
            
            <v-alert type="success" class="mt-4">
              操作成功！数据已保存。
            </v-alert>
            
            <v-card class="mt-4">
              <v-card-title>详细信息</v-card-title>
              <v-card-text>
                <v-simple-table>
                  <tbody>
                    <tr>
                      <td><strong>用户名</strong></td>
                      <td>admin</td>
                    </tr>
                    <tr>
                      <td><strong>创建时间</strong></td>
                      <td>2023-12-01 10:30:00</td>
                    </tr>
                    <tr>
                      <td><strong>状态</strong></td>
                      <td><v-chip color="success" small>已激活</v-chip></td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-card-text>
            </v-card>
            
            <div class="text-center mt-6">
              <v-btn color="primary" @click="showModal = false">
                我知道了
              </v-btn>
            </div>
          </div>
        </jh-modal>
      </div>
    `
  }),
  args: {
    title: '信息展示',
    showActions: false
  }
};

// 不同尺寸
export const DifferentSizes = {
  render: (args) => ({
    components: { JhModal },
    data() {
      return {
        showModal1: false,
        showModal2: false,
        showModal3: false,
        showModal4: false,
        ...args
      };
    },
    template: `
      <div>
        <v-btn color="primary" class="mr-2" @click="showModal1 = true">
          小弹窗 (400px)
        </v-btn>
        <v-btn color="primary" class="mr-2" @click="showModal2 = true">
          中弹窗 (600px)
        </v-btn>
        <v-btn color="primary" class="mr-2" @click="showModal3 = true">
          大弹窗 (800px)
        </v-btn>
        <v-btn color="primary" @click="showModal4 = true">
          超大弹窗 (1200px)
        </v-btn>
        
        <jh-modal
          v-model="showModal1"
          title="小弹窗"
          :width="400"
          @confirm="showModal1 = false"
        >
          <div>
            <p>这是一个小尺寸的弹窗 (400px)</p>
            <v-text-field label="输入框" outlined></v-text-field>
          </div>
        </jh-modal>
        
        <jh-modal
          v-model="showModal2"
          title="中弹窗"
          :width="600"
          @confirm="showModal2 = false"
        >
          <div>
            <p>这是一个中等尺寸的弹窗 (600px)</p>
            <v-row>
              <v-col cols="6">
                <v-text-field label="姓名" outlined></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="邮箱" outlined></v-text-field>
              </v-col>
            </v-row>
          </div>
        </jh-modal>
        
        <jh-modal
          v-model="showModal3"
          title="大弹窗"
          :width="800"
          @confirm="showModal3 = false"
        >
          <div>
            <p>这是一个大尺寸的弹窗 (800px)</p>
            <v-row>
              <v-col cols="4" v-for="i in 3" :key="i">
                <v-card>
                  <v-card-title>卡片 {{ i }}</v-card-title>
                  <v-card-text>内容 {{ i }}</v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </jh-modal>
        
        <jh-modal
          v-model="showModal4"
          title="超大弹窗"
          :width="1200"
          @confirm="showModal4 = false"
        >
          <div>
            <p>这是一个超大尺寸的弹窗 (1200px)</p>
            <v-data-table
              :headers="[
                { text: 'ID', value: 'id' },
                { text: '姓名', value: 'name' },
                { text: '邮箱', value: 'email' },
                { text: '部门', value: 'department' },
                { text: '职位', value: 'position' },
                { text: '状态', value: 'status' }
              ]"
              :items="[
                { id: 1, name: '张三', email: 'zhangsan@example.com', department: '技术部', position: '工程师', status: '在职' },
                { id: 2, name: '李四', email: 'lisi@example.com', department: '产品部', position: '产品经理', status: '在职' },
                { id: 3, name: '王五', email: 'wangwu@example.com', department: '设计部', position: '设计师', status: '离职' }
              ]"
            ></v-data-table>
          </div>
        </jh-modal>
      </div>
    `
  }),
  args: {}
};

// 非持久化弹窗
export const NonPersistent = {
  render: (args) => ({
    components: { JhModal },
    data() {
      return {
        showModal: false,
        ...args
      };
    },
    template: `
      <div>
        <v-btn color="primary" @click="showModal = true">非持久化弹窗</v-btn>
        <p class="mt-2 text-caption">点击弹窗外部区域可以关闭弹窗</p>
        <jh-modal
          v-model="showModal"
          :title="title"
          :persistent="persistent"
          @confirm="showModal = false"
        >
          <div>
            <h3>非持久化弹窗</h3>
            <p>这个弹窗允许点击外部区域关闭，也可以按 ESC 键关闭。</p>
            <v-alert type="warning" class="mt-4">
              注意：点击弹窗外部区域会关闭弹窗
            </v-alert>
          </div>
        </jh-modal>
      </div>
    `
  }),
  args: {
    title: '非持久化弹窗',
    persistent: false
  }
};
