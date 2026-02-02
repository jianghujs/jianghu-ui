import JhDrawer from './JhDrawer.vue';

export default {
  title: '基础组件/JhDrawer - 抽屉',
  component: JhDrawer,
  parameters: {
    docs: {
      description: {
        component: `
# JhDrawer 通用抽屉组件

基于 Vuetify 的通用抽屉组件，提供一致的抽屉框架，支持完全自定义内容。

## 特性

- 🎨 **自定义内容**: 通过默认插槽完全自定义抽屉内容
- 📐 **多方向弹出**: 支持左/右及移动端常见的底部弹出
- 🎛️ **灵活配置**: 支持左右位置、宽度、按钮显示等配置
- 🔧 **操作按钮**: 支持自定义操作按钮或使用默认按钮
- 📱 **响应式**: 适配移动端和桌面端
- 🎯 **事件丰富**: 提供 open、close、confirm、cancel 等事件

## 基础用法

\`\`\`vue
<jh-drawer v-model="showDrawer" title="自定义抽屉">
  <div>这里是自定义内容</div>
</jh-drawer>
\`\`\`

## Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 抽屉显示状态 (v-model) | Boolean | false |
| title | 抽屉标题 | String | '抽屉' |
| position | 抽屉位置 (left/right/bottom) | String | 'right' |
| width | 抽屉宽度 | String/Number | '90%' |
| height | 底部抽屉高度 | String/Number | '60vh' |
| showConfirmButton | 是否显示确认按钮 | Boolean | true |
| showCancelButton | 是否显示取消按钮 | Boolean | true |
| showCloseButton | 是否显示浮动关闭按钮 | Boolean | true |
| confirmText | 确认按钮文本 | String | '确认' |
| cancelText | 取消按钮文本 | String | '取消' |

## Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| open | 抽屉打开时触发 | - |
| close | 抽屉关闭时触发 | - |
| confirm | 点击确认按钮时触发 | - |
| cancel | 点击取消按钮时触发 | - |

## Slots

| 插槽名 | 说明 |
|--------|------|
| default | 抽屉内容 |
| actions | 自定义操作按钮 |

## 方法

| 方法名 | 说明 | 参数 |
|--------|------|------|
| open | 打开抽屉 | - |
| close | 关闭抽屉 | - |
        `
      }
    }
  },
  argTypes: {
    value: {
      control: { type: 'boolean' },
      description: '抽屉显示状态'
    },
    title: {
      control: { type: 'text' },
      description: '抽屉标题'
    },
    position: {
      control: { type: 'select' },
      options: ['left', 'right', 'bottom'],
      description: '抽屉位置'
    },
    width: {
      control: { type: 'text' },
      description: '抽屉宽度'
    },
    height: {
      control: { type: 'text' },
      description: '底部抽屉高度'
    },
    showConfirmButton: {
      control: { type: 'boolean' },
      description: '是否显示确认按钮'
    },
    showCancelButton: {
      control: { type: 'boolean' },
      description: '是否显示取消按钮'
    },
    showCloseButton: {
      control: { type: 'boolean' },
      description: '是否显示浮动关闭按钮'
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
export const 基础用法 = {
  render: (args) => ({
    components: { JhDrawer },
    data() {
      return {
        showDrawer: false,
        ...args
      };
    },
    template: `
      <div>
        <v-btn color="primary" @click="showDrawer = true">打开抽屉</v-btn>
        <jh-drawer
          v-model="showDrawer"
          :title="title"
          :position="position"
          :width="width"
          :height="height"
          :show-confirm-button="showConfirmButton"
          :show-cancel-button="showCancelButton"
          :show-close-button="showCloseButton"
          :confirm-text="confirmText"
          :cancel-text="cancelText"
          @confirm="handleConfirm"
          @cancel="handleCancel"
          @open="handleOpen"
          @close="handleClose"
        >
          <div class="pa-4">
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
        </jh-drawer>
      </div>
    `,
    methods: {
      handleConfirm() {
        console.log('确认操作');
        this.showDrawer = false;
      },
      handleCancel() {
        console.log('取消操作');
      },
      handleOpen() {
        console.log('抽屉已打开');
      },
      handleClose() {
        console.log('抽屉已关闭');
      }
    }
  }),
  args: {
    title: '基础抽屉',
    position: 'right',
    width: '90%',
    height: '60vh',
    showConfirmButton: true,
    showCancelButton: true,
    showCloseButton: true,
    confirmText: '确认',
    cancelText: '取消'
  }
};

// 左侧抽屉
export const 左侧抽屉 = {
  render: (args) => ({
    components: { JhDrawer },
    data() {
      return {
        showDrawer: false,
        ...args
      };
    },
    template: `
      <div>
        <v-btn color="primary" @click="showDrawer = true">打开左侧抽屉</v-btn>
        <jh-drawer
          v-model="showDrawer"
          :title="title"
          :position="position"
          :width="width"
          @confirm="showDrawer = false"
        >
          <div class="pa-4">
            <h3>左侧抽屉内容</h3>
            <p>这是从左侧滑出的抽屉。</p>
            <v-list>
              <v-list-item v-for="i in 5" :key="i">
                <v-list-item-content>
                  <v-list-item-title>列表项 {{ i }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
        </jh-drawer>
      </div>
    `
  }),
  args: {
    title: '左侧抽屉',
    position: 'left',
    width: '400px'
  }
};

// 底部抽屉
export const 底部抽屉 = {
  render: (args) => ({
    components: { JhDrawer },
    data() {
      return {
        showDrawer: false,
        ...args
      };
    },
    template: `
      <div>
        <v-btn color="primary" @click="showDrawer = true">底部抽屉</v-btn>
        <jh-drawer
          v-model="showDrawer"
          :title="title"
          :position="position"
          :height="height"
          :width="width"
          :show-confirm-button="showConfirmButton"
          :show-cancel-button="showCancelButton"
        >
          <div class="pa-4">
            <h3>底部弹出内容</h3>
            <p>适合移动端选择器、说明信息等。</p>
            <v-divider class="my-4"></v-divider>
            <v-list dense>
              <v-list-item v-for="item in 3" :key="item">
                <v-list-item-content>
                  <v-list-item-title>选项 {{ item }}</v-list-item-title>
                  <v-list-item-subtitle>附加描述信息</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <div class="text-center mt-4">
              <v-btn color="success" @click="showDrawer = false">完成</v-btn>
            </div>
          </div>
        </jh-drawer>
      </div>
    `
  }),
  args: {
    title: '底部抽屉',
    position: 'bottom',
    height: '50vh',
    width: '100%',
    showConfirmButton: false,
    showCancelButton: false
  }
};

// 自定义操作按钮
export const 自定义操作按钮 = {
  render: (args) => ({
    components: { JhDrawer },
    data() {
      return {
        showDrawer: false,
        ...args
      };
    },
    template: `
      <div>
        <v-btn color="primary" @click="showDrawer = true">自定义操作按钮</v-btn>
        <jh-drawer
          v-model="showDrawer"
          :title="title"
          @confirm="showDrawer = false"
        >
          <template #actions>
            <v-btn
              class="elevation-0 grey lighten-4 mr-2"
              small
              @click="handleReset"
            >
              重置
            </v-btn>
            <v-btn
              color="warning"
              class="mr-2"
              small
              @click="handleSave"
            >
              保存
            </v-btn>
            <v-btn
              color="success"
              small
              @click="handleSubmit"
            >
              提交
            </v-btn>
          </template>
          
          <div class="pa-4">
            <h3>自定义操作按钮</h3>
            <p>这个抽屉使用了自定义的操作按钮。</p>
            <v-form>
              <v-text-field
                label="姓名"
                outlined
                class="mb-4"
              ></v-text-field>
              <v-text-field
                label="邮箱"
                type="email"
                outlined
                class="mb-4"
              ></v-text-field>
              <v-textarea
                label="备注"
                v-for="i in 10"
                outlined
                rows="3"
              ></v-textarea>
            </v-form>
          </div>
        </jh-drawer>
      </div>
    `,
    methods: {
      handleReset() {
        console.log('重置表单');
      },
      handleSave() {
        console.log('保存数据');
      },
      handleSubmit() {
        console.log('提交表单');
        this.showDrawer = false;
      }
    }
  }),
  args: {
    title: '自定义操作'
  }
};

// 无按钮抽屉
export const 无按钮抽屉 = {
  render: (args) => ({
    components: { JhDrawer },
    data() {
      return {
        showDrawer: false,
        ...args
      };
    },
    template: `
      <div>
        <v-btn color="primary" @click="showDrawer = true">无按钮抽屉</v-btn>
        <jh-drawer
          v-model="showDrawer"
          :title="title"
          :show-confirm-button="showConfirmButton"
          :show-cancel-button="showCancelButton"
          :show-close-button="showCloseButton"
        >
          <div class="pa-4">
            <h3>纯展示内容</h3>
            <p>这个抽屉没有操作按钮，只用于展示内容。</p>
            <v-card class="mt-4">
              <v-card-title>信息卡片</v-card-title>
              <v-card-text>
                这里是一些详细信息的展示。
              </v-card-text>
            </v-card>
            <div class="text-center mt-6">
              <v-btn color="primary" @click="showDrawer = false">
                我知道了
              </v-btn>
            </div>
          </div>
        </jh-drawer>
      </div>
    `
  }),
  args: {
    title: '信息展示',
    showConfirmButton: false,
    showCancelButton: false,
    showCloseButton: true
  }
};

// 宽度配置
export const 宽度配置 = {
  render: (args) => ({
    components: { JhDrawer },
    data() {
      return {
        showDrawer1: false,
        showDrawer2: false,
        showDrawer3: false,
        ...args
      };
    },
    template: `
      <div>
        <v-btn color="primary" class="mr-2" @click="showDrawer1 = true">
          小抽屉 (400px)
        </v-btn>
        <v-btn color="primary" class="mr-2" @click="showDrawer2 = true">
          中抽屉 (60%)
        </v-btn>
        <v-btn color="primary" @click="showDrawer3 = true">
          大抽屉 (90%)
        </v-btn>
        
        <jh-drawer
          v-model="showDrawer1"
          title="小抽屉"
          width="400px"
          @confirm="showDrawer1 = false"
        >
          <div class="pa-4">
            <p>这是一个固定宽度的小抽屉 (400px)</p>
          </div>
        </jh-drawer>
        
        <jh-drawer
          v-model="showDrawer2"
          title="中抽屉"
          width="60%"
          @confirm="showDrawer2 = false"
        >
          <div class="pa-4">
            <p>这是一个中等宽度的抽屉 (60%)</p>
          </div>
        </jh-drawer>
        
        <jh-drawer
          v-model="showDrawer3"
          title="大抽屉"
          width="90%"
          @confirm="showDrawer3 = false"
        >
          <div class="pa-4">
            <p>这是一个大宽度的抽屉 (90%)</p>
          </div>
        </jh-drawer>
      </div>
    `
  }),
  args: {}
};
