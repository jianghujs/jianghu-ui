import JhConfirmDialog from './JhConfirmDialog.vue';

export default {
  title: '反馈/JhConfirmDialog - 确认对话框',
  component: JhConfirmDialog,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'boolean',
      description: '是否显示对话框',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    title: {
      control: 'text',
      description: '标题',
      table: {
        defaultValue: { summary: '提示' },
      },
    },
    content: {
      control: 'text',
      description: '内容(支持HTML)',
      table: {
        defaultValue: { summary: '' },
      },
    },
    maxWidth: {
      control: 'number',
      description: '最大宽度',
      table: {
        defaultValue: { summary: '420' },
      },
    },
    showCancelButton: {
      control: 'boolean',
      description: '是否显示取消按钮',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    confirmButtonText: {
      control: 'text',
      description: '确认按钮文本',
      table: {
        defaultValue: { summary: '确定' },
      },
    },
    cancelButtonText: {
      control: 'text',
      description: '取消按钮文本',
      table: {
        defaultValue: { summary: '取消' },
      },
    },
    persistent: {
      control: 'boolean',
      description: '是否持久化(点击外部不关闭)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
};

// 基础示例
export const 基础示例 = {
  render: () => ({
    components: { JhConfirmDialog },
    data() {
      return {
        show: false,
        result: '',
      };
    },
    template: `
      <div>
        <v-btn @click="show = true">显示对话框</v-btn>
        <p class="mt-2">操作结果: {{ result }}</p>
        <jh-confirm-dialog
          v-model="show"
          title="确认操作"
          content="确定要执行此操作吗?"
          @confirm="result = '已确认'"
          @cancel="result = '已取消'"
        />
      </div>
    `,
  }),
};

// 仅确定按钮
export const 仅确定按钮 = {
  render: () => ({
    components: { JhConfirmDialog },
    data() {
      return {
        show: false,
      };
    },
    template: `
      <div>
        <v-btn @click="show = true">显示提示</v-btn>
        <jh-confirm-dialog
          v-model="show"
          title="提示"
          content="这是一条重要提示信息"
          :show-cancel-button="false"
        />
      </div>
    `,
  }),
};

// 自定义按钮
export const 自定义按钮 = {
  render: () => ({
    components: { JhConfirmDialog },
    data() {
      return {
        show1: false,
        show2: false,
        show3: false,
      };
    },
    template: `
      <div>
        <v-btn class="mr-2" color="error" @click="show1 = true">删除确认</v-btn>
        <v-btn class="mr-2" color="warning" @click="show2 = true">警告确认</v-btn>
        <v-btn color="success" @click="show3 = true">保存确认</v-btn>

        <jh-confirm-dialog
          v-model="show1"
          title="删除确认"
          content="删除后将无法恢复,确定要删除吗?"
          confirm-button-text="删除"
          confirm-button-color="error"
        />

        <jh-confirm-dialog
          v-model="show2"
          title="警告"
          content="此操作可能会产生风险,是否继续?"
          confirm-button-text="继续"
          confirm-button-color="warning"
          cancel-button-text="放弃"
        />

        <jh-confirm-dialog
          v-model="show3"
          title="保存确认"
          content="是否保存当前修改?"
          confirm-button-text="保存"
          confirm-button-color="success"
          cancel-button-text="不保存"
        />
      </div>
    `,
  }),
};

// HTML内容
export const HTML内容 = {
  render: () => ({
    components: { JhConfirmDialog },
    data() {
      return {
        show: false,
      };
    },
    template: `
      <div>
        <v-btn @click="show = true">显示 HTML 内容</v-btn>
        <jh-confirm-dialog
          v-model="show"
          title="提示"
          content="<p>这是 <strong>HTML</strong> 内容</p><ul><li>支持列表</li><li>支持<em>格式化</em></li></ul>"
        />
      </div>
    `,
  }),
};

// 自定义内容
export const 自定义内容 = {
  render: () => ({
    components: { JhConfirmDialog },
    data() {
      return {
        show: false,
        username: '',
        password: '',
      };
    },
    template: `
      <div>
        <v-btn @click="show = true">登录</v-btn>
        <jh-confirm-dialog
          v-model="show"
          title="用户登录"
          confirm-button-text="登录"
          @confirm="handleLogin"
        >
          <v-text-field
            v-model="username"
            label="用户名"
            outlined
            dense
            class="mb-2"
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="密码"
            type="password"
            outlined
            dense
          ></v-text-field>
        </jh-confirm-dialog>
      </div>
    `,
    methods: {
      handleLogin() {
        console.log('登录:', this.username, this.password);
      },
    },
  }),
};

// 自定义标题
export const 自定义标题 = {
  render: () => ({
    components: { JhConfirmDialog },
    data() {
      return {
        show: false,
      };
    },
    template: `
      <div>
        <v-btn @click="show = true">显示自定义标题</v-btn>
        <jh-confirm-dialog
          v-model="show"
          content="这是一个自定义标题的对话框"
        >
          <template v-slot:title>
            <v-icon color="warning" class="mr-2">mdi-alert</v-icon>
            <span>警告提示</span>
          </template>
        </jh-confirm-dialog>
      </div>
    `,
  }),
};

// 异步确认
export const 异步确认 = {
  render: () => ({
    components: { JhConfirmDialog },
    data() {
      return {
        show: false,
        loading: false,
        status: '',
      };
    },
    methods: {
      async handleConfirm() {
        this.loading = true;
        this.status = '处理中...';

        // 模拟异步操作
        await new Promise((resolve) => setTimeout(resolve, 2000));

        this.loading = false;
        this.show = false;
        this.status = '操作成功!';
      },
    },
    template: `
      <div>
        <v-btn @click="show = true">异步确认</v-btn>
        <p class="mt-2">状态: {{ status }}</p>
        <jh-confirm-dialog
          v-model="show"
          title="异步操作"
          content="点击确定后会执行异步操作"
          :loading="loading"
          @confirm="handleConfirm"
          @cancel="status = '已取消'"
        />
      </div>
    `,
  }),
};

// 确认前钩子
export const 确认前钩子 = {
  render: () => ({
    components: { JhConfirmDialog },
    data() {
      return {
        show: false,
        input: '',
        message: '',
      };
    },
    methods: {
      async beforeConfirm() {
        if (this.input.trim() === '') {
          this.message = '请输入内容';
          return false; // 阻止关闭
        }
        if (this.input !== '123456') {
          this.message = '密码错误';
          return false; // 阻止关闭
        }
        this.message = '验证通过';
        return true; // 允许关闭
      },
    },
    template: `
      <div>
        <v-btn @click="show = true; input = ''; message = ''">显示验证对话框</v-btn>
        <p class="mt-2">{{ message }}</p>
        <jh-confirm-dialog
          v-model="show"
          title="验证"
          :before-confirm="beforeConfirm"
        >
          <v-text-field
            v-model="input"
            label="请输入密码(123456)"
            outlined
            dense
            hint="提示: 正确密码是 123456"
            persistent-hint
          ></v-text-field>
          <p class="red--text text-caption mt-2">{{ message }}</p>
        </jh-confirm-dialog>
      </div>
    `,
  }),
};

// 持久化对话框
export const 持久化对话框 = {
  render: () => ({
    components: { JhConfirmDialog },
    data() {
      return {
        show: false,
      };
    },
    template: `
      <div>
        <v-btn @click="show = true">显示持久化对话框</v-btn>
        <p class="mt-2 text-caption">点击外部不会关闭,必须点击按钮</p>
        <jh-confirm-dialog
          v-model="show"
          title="重要提示"
          content="这是一个持久化对话框,点击外部不会关闭"
          persistent
        />
      </div>
    `,
  }),
};

// 不同宽度
export const 不同宽度 = {
  render: () => ({
    components: { JhConfirmDialog },
    data() {
      return {
        show1: false,
        show2: false,
        show3: false,
      };
    },
    template: `
      <div>
        <v-btn class="mr-2" @click="show1 = true">小(290px)</v-btn>
        <v-btn class="mr-2" @click="show2 = true">中(420px)</v-btn>
        <v-btn @click="show3 = true">大(600px)</v-btn>

        <jh-confirm-dialog
          v-model="show1"
          title="小对话框"
          content="这是一个较小的对话框"
          :max-width="290"
        />

        <jh-confirm-dialog
          v-model="show2"
          title="中对话框"
          content="这是一个中等大小的对话框"
          :max-width="420"
        />

        <jh-confirm-dialog
          v-model="show3"
          title="大对话框"
          content="这是一个较大的对话框,可以容纳更多内容。可以用于显示详细的信息或者包含更复杂的表单。"
          :max-width="600"
        />
      </div>
    `,
  }),
};

// 删除确认
export const 删除确认 = {
  render: () => ({
    components: { JhConfirmDialog },
    data() {
      return {
        show: false,
        items: [
          { id: 1, name: '项目 A' },
          { id: 2, name: '项目 B' },
          { id: 3, name: '项目 C' },
        ],
        deleteItem: null,
      };
    },
    methods: {
      confirmDelete(item) {
        this.deleteItem = item;
        this.show = true;
      },
      handleDelete() {
        if (this.deleteItem) {
          const index = this.items.findIndex((i) => i.id === this.deleteItem.id);
          if (index > -1) {
            this.items.splice(index, 1);
          }
        }
        this.show = false;
        this.deleteItem = null;
      },
    },
    template: `
      <div>
        <v-list>
          <v-list-item v-for="item in items" :key="item.id">
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon color="error" @click="confirmDelete(item)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <jh-confirm-dialog
          v-model="show"
          title="删除确认"
          :content="deleteItem ? '确定要删除 &quot;' + deleteItem.name + '&quot; 吗?' : ''"
          confirm-button-text="删除"
          confirm-button-color="error"
          @confirm="handleDelete"
        />
      </div>
    `,
  }),
};

// 表单提交确认
export const 表单提交确认 = {
  render: () => ({
    components: { JhConfirmDialog },
    data() {
      return {
        show: false,
        loading: false,
        form: {
          name: '',
          email: '',
          message: '',
        },
        status: '',
      };
    },
    methods: {
      showConfirm() {
        if (!this.form.name || !this.form.email || !this.form.message) {
          alert('请填写完整表单');
          return;
        }
        this.show = true;
      },
      async handleSubmit() {
        this.loading = true;
        this.status = '提交中...';

        // 模拟提交
        await new Promise((resolve) => setTimeout(resolve, 1500));

        this.loading = false;
        this.show = false;
        this.status = '提交成功!';

        // 重置表单
        this.form = { name: '', email: '', message: '' };
      },
    },
    template: `
      <div>
        <v-form>
          <v-text-field
            v-model="form.name"
            label="姓名"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            v-model="form.email"
            label="邮箱"
            outlined
            dense
          ></v-text-field>
          <v-textarea
            v-model="form.message"
            label="留言"
            outlined
            dense
            rows="3"
          ></v-textarea>
          <v-btn color="primary" @click="showConfirm">提交</v-btn>
        </v-form>

        <p class="mt-2">{{ status }}</p>

        <jh-confirm-dialog
          v-model="show"
          title="确认提交"
          content="请确认您的信息无误后提交"
          confirm-button-text="提交"
          confirm-button-color="primary"
          :loading="loading"
          @confirm="handleSubmit"
          @cancel="status = '已取消提交'"
        />
      </div>
    `,
  }),
};
