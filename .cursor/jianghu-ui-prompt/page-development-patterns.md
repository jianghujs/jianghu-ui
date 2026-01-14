# JianghuJS UI 页面开发模式

> **说明**: 本文档提供使用 jianghu-ui 开发常见页面的标准模式和最佳实践

## 📋 目录

1. [标准 CRUD 页面](#标准-crud-页面)
2. [表单页面](#表单页面)
3. [详情页面](#详情页面)
4. [列表页面](#列表页面)
5. [仪表盘页面](#仪表盘页面)

---

## 标准 CRUD 页面

### 场景描述
包含列表展示、新增、编辑、删除功能的标准管理页面

### 核心组件
- `JhLayout`: 页面布局
- `JhTable`: 数据表格
- `JhModalForm`: 新增/编辑弹窗
- `JhConfirmDialog`: 删除确认

### 完整代码模板

```vue
<template>
  <v-app>
    <jh-layout
      title="用户管理系统"
      :menu-data="menuData"
      :current-path="currentPath"
      @menu-click="handleMenuClick"
    >
      <!-- 数据表格 -->
      <jh-table
        ref="table"
        header-title="用户列表"
        tooltip="管理系统用户信息"
        :headers="headers"
        :request="fetchUsers"
        :show-select="true"
        :show-filter="true"
        :filter-fields="filterFields"
        :action-column="actionColumn"
        @filter-search="handleFilterSearch"
      >
        <!-- 工具栏按钮 -->
        <template #toolbar-actions>
          <v-btn color="success" @click="handleCreate">
            <v-icon left>mdi-plus</v-icon>
            新增用户
          </v-btn>
        </template>

        <!-- 批量操作 -->
        <template #alert-actions="{ selectedRows }">
          <v-btn small text color="error" @click="handleBatchDelete(selectedRows)">
            <v-icon small left>mdi-delete</v-icon>
            批量删除
          </v-btn>
        </template>

        <!-- 自定义状态列 -->
        <template #item.status="{ item }">
          <v-chip
            :color="item.status === '启用' ? 'success' : 'error'"
            small
          >
            {{ item.status }}
          </v-chip>
        </template>
      </jh-table>

      <!-- 新增/编辑弹窗 -->
      <jh-modal-form
        v-model="showModal"
        :title="modalTitle"
        :fields="formFields"
        :initial-data="currentRow"
        width="600"
        @confirm="handleSave"
      />

      <!-- 删除确认对话框 -->
      <jh-confirm-dialog
        v-model="showDeleteDialog"
        title="确认删除"
        :content="`确定要删除用户 ${deleteRow.username} 吗？`"
        @confirm="handleDeleteConfirm"
      />
    </jh-layout>
  </v-app>
</template>

<script>
export default {
  name: 'UserManagement',
  
  data() {
    return {
      // 菜单数据
      menuData: [
        {
          name: '工作台',
          path: '/dashboard',
          icon: 'mdi-view-dashboard'
        },
        {
          name: '用户管理',
          path: '/users',
          icon: 'mdi-account-group'
        }
      ],
      currentPath: '/users',
      
      // 表格配置
      headers: [
        { text: 'ID', value: 'id', width: 80 },
        { text: '用户名', value: 'username', copyable: true },
        { text: '邮箱', value: 'email', copyable: true },
        { text: '手机号', value: 'phone' },
        { text: '状态', value: 'status' },
        { text: '创建时间', value: 'createdAt' }
      ],
      
      // 筛选字段
      filterFields: [
        { key: 'username', label: '用户名', type: 'text' },
        { 
          key: 'status', 
          label: '状态', 
          type: 'select',
          options: [
            { text: '启用', value: '启用' },
            { text: '禁用', value: '禁用' }
          ]
        },
        { key: 'dateRange', label: '创建时间', type: 'daterange' }
      ],
      
      // 操作列配置
      actionColumn: {
        title: '操作',
        width: 180,
        fixed: 'right',
        buttons: [
          {
            text: '编辑',
            type: 'link',
            icon: 'mdi-pencil',
            color: 'primary',
            onClick: this.handleEdit
          },
          {
            text: '删除',
            type: 'link',
            icon: 'mdi-delete',
            color: 'error',
            onClick: this.handleDelete
          }
        ]
      },
      
      // 表单字段
      formFields: [
        {
          key: 'username',
          label: '用户名',
          type: 'text',
          placeholder: '请输入用户名',
          required: true
        },
        {
          key: 'email',
          label: '邮箱',
          type: 'text',
          placeholder: '请输入邮箱',
          rules: 'email'
        },
        {
          key: 'phone',
          label: '手机号',
          type: 'text',
          placeholder: '请输入手机号',
          rules: 'phone'
        },
        {
          key: 'status',
          label: '状态',
          type: 'radio',
          options: [
            { text: '启用', value: '启用' },
            { text: '禁用', value: '禁用' }
          ],
          defaultValue: '启用'
        }
      ],
      
      // 弹窗状态
      showModal: false,
      modalTitle: '新增用户',
      currentRow: {},
      
      // 删除对话框
      showDeleteDialog: false,
      deleteRow: {}
    };
  },
  
  methods: {
    // 获取用户列表
    async fetchUsers(params) {
      try {
        // params: { page, pageSize, search, sorter, filters }
        const response = await this.$api.getUsers(params);
        return {
          data: response.list,
          total: response.total,
          success: true
        };
      } catch (error) {
        console.error('获取用户列表失败:', error);
        this.$toast.error('获取用户列表失败');
        return {
          data: [],
          total: 0,
          success: false
        };
      }
    },
    
    // 新增用户
    handleCreate() {
      this.modalTitle = '新增用户';
      this.currentRow = {};
      this.showModal = true;
    },
    
    // 编辑用户
    handleEdit(row) {
      this.modalTitle = '编辑用户';
      this.currentRow = { ...row };
      this.showModal = true;
    },
    
    // 保存用户
    async handleSave(formData) {
      try {
        if (formData.id) {
          // 编辑
          await this.$api.updateUser(formData.id, formData);
          this.$toast.success('编辑成功');
        } else {
          // 新增
          await this.$api.createUser(formData);
          this.$toast.success('新增成功');
        }
        this.showModal = false;
        this.$refs.table.reload();
      } catch (error) {
        console.error('保存失败:', error);
        this.$toast.error('保存失败');
      }
    },
    
    // 删除用户
    handleDelete(row) {
      this.deleteRow = row;
      this.showDeleteDialog = true;
    },
    
    // 确认删除
    async handleDeleteConfirm() {
      try {
        await this.$api.deleteUser(this.deleteRow.id);
        this.$toast.success('删除成功');
        this.showDeleteDialog = false;
        this.$refs.table.reload();
      } catch (error) {
        console.error('删除失败:', error);
        this.$toast.error('删除失败');
      }
    },
    
    // 批量删除
    async handleBatchDelete(selectedRows) {
      if (selectedRows.length === 0) {
        this.$toast.warning('请选择要删除的数据');
        return;
      }
      
      const confirmed = await this.$confirm(`确定要删除选中的 ${selectedRows.length} 条数据吗？`);
      if (!confirmed) return;
      
      try {
        const ids = selectedRows.map(row => row.id);
        await this.$api.batchDeleteUsers(ids);
        this.$toast.success('批量删除成功');
        this.$refs.table.reload();
      } catch (error) {
        console.error('批量删除失败:', error);
        this.$toast.error('批量删除失败');
      }
    },
    
    // 筛选查询
    handleFilterSearch(queryData) {
      console.log('筛选条件:', queryData);
      this.$refs.table.reload();
    },
    
    // 菜单点击
    handleMenuClick(item) {
      if (item.path) {
        this.currentPath = item.path;
        // 路由跳转
        // this.$router.push(item.path);
      }
    }
  }
};
</script>
```

---

## 表单页面

### 场景描述
复杂表单录入页面，包含多种字段类型、字段联动、分组等

### 核心组件
- `JhLayout`: 页面布局
- `JhCard`: 卡片容器
- `JhForm`: 表单组件
- `JhFormList`: 动态表单列表

### 完整代码模板

```vue
<template>
  <v-app>
    <jh-layout
      title="订单管理"
      :menu-data="menuData"
      :current-path="currentPath"
    >
      <v-container>
        <jh-card title="新增订单" subtitle="填写订单信息">
          <!-- 基本信息表单 -->
          <jh-form
            ref="form"
            :fields="formFields"
            :initial-data="formData"
            layout="vertical"
            :default-cols-md="6"
            @field-change="handleFieldChange"
          >
            <!-- 订单明细 -->
            <template #field-items>
              <jh-form-list
                v-model="formData.items"
                :fields="itemFields"
                :min="1"
                :max="10"
                render-mode="card"
                add-button-text="添加商品"
              />
            </template>

            <!-- 操作按钮 -->
            <template #actions="{ validate, resetForm }">
              <v-row class="mt-4">
                <v-col cols="12" class="text-right">
                  <v-btn class="mr-2" @click="resetForm">
                    重置
                  </v-btn>
                  <v-btn color="primary" @click="handleSubmit(validate)">
                    提交订单
                  </v-btn>
                </v-col>
              </v-row>
            </template>
          </jh-form>
        </jh-card>
      </v-container>
    </jh-layout>
  </v-app>
</template>

<script>
export default {
  name: 'OrderForm',
  
  data() {
    return {
      menuData: [
        { name: '订单管理', path: '/orders', icon: 'mdi-cart' }
      ],
      currentPath: '/orders/create',
      
      formData: {
        customerType: 'personal',
        items: []
      },
      
      // 基本信息字段
      formFields: [
        // 客户信息分组
        { type: 'group', title: '客户信息' },
        {
          key: 'customerType',
          label: '客户类型',
          type: 'radio',
          options: [
            { text: '个人客户', value: 'personal' },
            { text: '企业客户', value: 'company' }
          ],
          defaultValue: 'personal',
          cols: { md: 12 }
        },
        {
          key: 'customerName',
          label: '客户姓名',
          type: 'text',
          required: true,
          visible: (formData) => formData.customerType === 'personal'
        },
        {
          key: 'companyName',
          label: '公司名称',
          type: 'text',
          required: true,
          visible: (formData) => formData.customerType === 'company'
        },
        {
          key: 'phone',
          label: '联系电话',
          type: 'text',
          rules: 'phone',
          required: true
        },
        {
          key: 'email',
          label: '邮箱',
          type: 'text',
          rules: 'email'
        },
        
        // 订单信息分组
        { type: 'group', title: '订单信息', divider: true },
        {
          key: 'orderDate',
          label: '订单日期',
          type: 'date',
          required: true
        },
        {
          key: 'deliveryDate',
          label: '交付日期',
          type: 'date',
          required: true
        },
        {
          key: 'paymentMethod',
          label: '支付方式',
          type: 'select',
          options: [
            { text: '现金', value: 'cash' },
            { text: '银行转账', value: 'transfer' },
            { text: '支付宝', value: 'alipay' },
            { text: '微信', value: 'wechat' }
          ],
          required: true
        },
        
        // 订单明细 (使用自定义插槽)
        { type: 'group', title: '订单明细', divider: true },
        {
          key: 'items',
          label: '',
          type: 'slot',
          cols: { md: 12 }
        },
        
        // 备注信息
        { type: 'group', title: '备注信息', divider: true },
        {
          key: 'remarks',
          label: '备注',
          type: 'textarea',
          rows: 4,
          cols: { md: 12 }
        }
      ],
      
      // 订单明细字段
      itemFields: [
        {
          key: 'productName',
          label: '商品名称',
          type: 'autocomplete',
          required: true,
          options: [], // 从接口获取
          cols: { md: 6 }
        },
        {
          key: 'quantity',
          label: '数量',
          type: 'number',
          required: true,
          defaultValue: 1,
          cols: { md: 3 }
        },
        {
          key: 'price',
          label: '单价',
          type: 'number',
          required: true,
          cols: { md: 3 }
        },
        {
          key: 'amount',
          label: '金额',
          type: 'number',
          readonly: true,
          cols: { md: 12 }
        }
      ]
    };
  },
  
  methods: {
    // 字段变化处理
    handleFieldChange({ key, value, formData }) {
      // 计算订单明细金额
      if (key === 'items') {
        formData.items.forEach(item => {
          item.amount = (item.quantity || 0) * (item.price || 0);
        });
      }
    },
    
    // 提交订单
    async handleSubmit(validate) {
      const isValid = await validate();
      if (!isValid) {
        this.$toast.warning('请检查表单');
        return;
      }
      
      try {
        const formData = this.$refs.form.getFormData();
        await this.$api.createOrder(formData);
        this.$toast.success('订单创建成功');
        // 跳转到订单列表
        // this.$router.push('/orders');
      } catch (error) {
        console.error('创建订单失败:', error);
        this.$toast.error('创建订单失败');
      }
    }
  }
};
</script>
```

---

## 详情页面

### 场景描述
展示数据详情，使用描述列表组件

### 核心组件
- `JhLayout`: 页面布局
- `JhCard`: 卡片容器
- `JhDescriptions`: 描述列表

### 完整代码模板

```vue
<template>
  <v-app>
    <jh-layout
      title="用户详情"
      :menu-data="menuData"
      :current-path="currentPath"
    >
      <v-container>
        <!-- 基本信息 -->
        <jh-descriptions
          title="基本信息"
          :columns="basicColumns"
          :request="fetchUserDetail"
          :params="{ id: userId }"
          :editable="true"
          @save="handleSave"
        >
          <template #extra>
            <v-btn color="primary" @click="handleEdit">
              <v-icon left>mdi-pencil</v-icon>
              编辑
            </v-btn>
          </template>
        </jh-descriptions>

        <!-- 账户信息 -->
        <jh-descriptions
          title="账户信息"
          :columns="accountColumns"
          :data-source="accountData"
          class="mt-4"
        />

        <!-- 操作记录 -->
        <jh-card title="操作记录" class="mt-4">
          <jh-table
            :headers="logHeaders"
            :request="fetchLogs"
            :pagination="{ pageSize: 10 }"
          />
        </jh-card>
      </v-container>
    </jh-layout>
  </v-app>
</template>

<script>
export default {
  name: 'UserDetail',
  
  data() {
    return {
      userId: this.$route.params.id,
      menuData: [
        { name: '用户列表', path: '/users', icon: 'mdi-account-group' }
      ],
      currentPath: '/users/detail',
      
      // 基本信息列配置
      basicColumns: [
        {
          title: '用户名',
          dataIndex: 'username',
          copyable: true
        },
        {
          title: '邮箱',
          dataIndex: 'email',
          copyable: true,
          editable: true
        },
        {
          title: '手机号',
          dataIndex: 'phone',
          copyable: true,
          editable: true
        },
        {
          title: '状态',
          dataIndex: 'status',
          valueType: 'option',
          valueEnum: {
            active: '启用',
            inactive: '禁用'
          },
          editable: true
        },
        {
          title: '注册时间',
          dataIndex: 'createdAt',
          valueType: 'dateTime'
        },
        {
          title: '最后登录',
          dataIndex: 'lastLoginAt',
          valueType: 'dateTime'
        }
      ],
      
      // 账户信息列配置
      accountColumns: [
        {
          title: '账户余额',
          dataIndex: 'balance',
          valueType: 'money'
        },
        {
          title: '积分',
          dataIndex: 'points',
          valueType: 'digit'
        },
        {
          title: '会员等级',
          dataIndex: 'memberLevel'
        }
      ],
      
      accountData: {
        balance: 12345.67,
        points: 1234,
        memberLevel: 'VIP'
      },
      
      // 操作记录表头
      logHeaders: [
        { text: '操作时间', value: 'createdAt' },
        { text: '操作类型', value: 'action' },
        { text: '操作内容', value: 'content' },
        { text: '操作人', value: 'operator' }
      ]
    };
  },
  
  methods: {
    // 获取用户详情
    async fetchUserDetail(params) {
      try {
        const response = await this.$api.getUserDetail(params.id);
        return response.data;
      } catch (error) {
        console.error('获取用户详情失败:', error);
        this.$toast.error('获取用户详情失败');
        throw error;
      }
    },
    
    // 获取操作记录
    async fetchLogs(params) {
      try {
        const response = await this.$api.getUserLogs({
          userId: this.userId,
          ...params
        });
        return {
          data: response.list,
          total: response.total,
          success: true
        };
      } catch (error) {
        console.error('获取操作记录失败:', error);
        return {
          data: [],
          total: 0,
          success: false
        };
      }
    },
    
    // 保存编辑
    async handleSave(data) {
      try {
        await this.$api.updateUser(this.userId, data);
        this.$toast.success('保存成功');
      } catch (error) {
        console.error('保存失败:', error);
        this.$toast.error('保存失败');
        throw error;
      }
    },
    
    // 编辑
    handleEdit() {
      // 跳转到编辑页面
      // this.$router.push(`/users/edit/${this.userId}`);
    }
  }
};
</script>
```

---

## 列表页面

### 场景描述
简单的数据列表展示，使用 JhList 组件

### 核心组件
- `JhLayout`: 页面布局
- `JhList`: 列表组件

### 代码模板

```vue
<template>
  <v-app>
    <jh-layout title="文章列表" :menu-data="menuData">
      <v-container>
        <jh-list
          :request="fetchArticles"
          :render-item="renderItem"
          :grid="{ xs: 1, sm: 2, md: 3, lg: 4 }"
          @item-click="handleItemClick"
        >
          <template #header>
            <v-text-field
              v-model="searchKeyword"
              placeholder="搜索文章..."
              prepend-inner-icon="mdi-magnify"
              clearable
              @input="handleSearch"
            />
          </template>
        </jh-list>
      </v-container>
    </jh-layout>
  </v-app>
</template>

<script>
export default {
  name: 'ArticleList',
  
  data() {
    return {
      menuData: [
        { name: '文章管理', path: '/articles', icon: 'mdi-file-document' }
      ],
      searchKeyword: ''
    };
  },
  
  methods: {
    async fetchArticles(params) {
      try {
        const response = await this.$api.getArticles({
          ...params,
          keyword: this.searchKeyword
        });
        return {
          data: response.list,
          total: response.total,
          success: true
        };
      } catch (error) {
        console.error('获取文章列表失败:', error);
        return {
          data: [],
          total: 0,
          success: false
        };
      }
    },
    
    renderItem(item) {
      return {
        title: item.title,
        description: item.summary,
        avatar: item.cover,
        extra: item.createdAt
      };
    },
    
    handleItemClick(item) {
      // 跳转到文章详情
      // this.$router.push(`/articles/${item.id}`);
    },
    
    handleSearch() {
      // 重新加载列表
      this.$refs.list.reload();
    }
  }
};
</script>
```

---

## 仪表盘页面

### 场景描述
数据统计展示页面

### 核心组件
- `JhLayout`: 页面布局
- `JhStatisticCard`: 统计卡片
- `JhCard`: 卡片容器
- `JhTable`: 数据表格

### 代码模板

```vue
<template>
  <v-app>
    <jh-layout title="数据看板" :menu-data="menuData">
      <v-container>
        <!-- 统计卡片 -->
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <jh-statistic-card
              title="总用户数"
              :value="statistics.totalUsers"
              prefix="👥"
              trend="up"
              :trend-value="12.5"
            />
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <jh-statistic-card
              title="今日订单"
              :value="statistics.todayOrders"
              prefix="📦"
              trend="up"
              :trend-value="8.3"
            />
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <jh-statistic-card
              title="总收入"
              :value="statistics.totalRevenue"
              prefix="¥"
              trend="down"
              :trend-value="-2.1"
            />
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <jh-statistic-card
              title="转化率"
              :value="statistics.conversionRate"
              suffix="%"
              trend="up"
              :trend-value="5.2"
            />
          </v-col>
        </v-row>

        <!-- 最近订单 -->
        <jh-card title="最近订单" class="mt-4">
          <jh-table
            :headers="orderHeaders"
            :request="fetchRecentOrders"
            :pagination="{ pageSize: 10 }"
          />
        </jh-card>
      </v-container>
    </jh-layout>
  </v-app>
</template>

<script>
export default {
  name: 'Dashboard',
  
  data() {
    return {
      menuData: [
        { name: '数据看板', path: '/dashboard', icon: 'mdi-view-dashboard' }
      ],
      
      statistics: {
        totalUsers: 0,
        todayOrders: 0,
        totalRevenue: 0,
        conversionRate: 0
      },
      
      orderHeaders: [
        { text: '订单号', value: 'orderNo' },
        { text: '客户', value: 'customer' },
        { text: '金额', value: 'amount' },
        { text: '状态', value: 'status' },
        { text: '时间', value: 'createdAt' }
      ]
    };
  },
  
  created() {
    this.loadStatistics();
  },
  
  methods: {
    async loadStatistics() {
      try {
        const response = await this.$api.getStatistics();
        this.statistics = response.data;
      } catch (error) {
        console.error('获取统计数据失败:', error);
      }
    },
    
    async fetchRecentOrders(params) {
      try {
        const response = await this.$api.getRecentOrders(params);
        return {
          data: response.list,
          total: response.total,
          success: true
        };
      } catch (error) {
        console.error('获取订单列表失败:', error);
        return {
          data: [],
          total: 0,
          success: false
        };
      }
    }
  }
};
</script>
```

---

## 💡 开发建议

1. **组件选择**: 根据页面类型选择合适的组件组合
2. **数据流**: 使用 `request` 函数处理异步数据加载
3. **错误处理**: 所有 API 调用都应包含 try-catch
4. **用户反馈**: 使用 Toast 提供操作反馈
5. **代码复用**: 将通用配置抽离为常量或 mixin
6. **响应式**: 使用 Vuetify 栅格系统适配不同屏幕
