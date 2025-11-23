---
trigger: model_decision
description: 江湖JS UniApp移动端开发规范
globs: "**/*.vue", "**/*.nvue", "**/*.js", "**/*.ts"
---

继承JianghuJS通用规范 [jianghu-global.mdc](mdc:.cursor/rules/jianghujs/jianghu-global.mdc)

# 江湖JS UniApp移动端开发规范

## 技术栈
- **前端框架**: UniApp + Vue2
- **UI组件**: uView-UI 2.x + TailwindCSS (辅助)
- **状态管理**: Vuex
- **后端接口**: 江湖JS接口（jianghuAxios）
- **支持平台**: H5、微信小程序、App

## 开发环境和工具
- **开发工具**: HBuilderX
- **调试工具**: 
  - H5: Chrome开发者工具
  - 微信小程序: 微信开发者工具
  - App: 真机调试
- **打包方式**: HBuilderX云打包

## 项目结构规范

```
项目根目录/
├── pages/                  # 页面文件
│   ├── index/              # 首页模块
│   │   └── index.vue
│   └── user/               # 用户模块
│       ├── login.vue
│       └── profile.vue
├── components/             # 组件文件
│   ├── common/            # 通用组件
│   └── business/          # 业务组件
├── static/                # 静态资源
├── store/                 # Vuex状态管理
├── utils/                 # 工具函数
├── uni_modules/           # uni插件
├── pages.json             # 页面配置
├── manifest.json          # 应用配置
└── App.vue               # 应用入口
```

## 开发规范

### 1. 页面开发规范

#### 页面文件结构
```vue
<template>
  <view class="page-container">
    <!-- 页面内容 -->
  </view>
</template>

<script>
export default {
  name: 'PageName',
  data() {
    return {
      // 数据定义
    };
  },
  onLoad(options) {
    // 页面加载
    this.initPage();
  },
  methods: {
    // 方法定义
  }
}
</script>

<style lang="scss" scoped>
/* 页面样式 */
</style>
```

#### 生命周期使用规范
```javascript
export default {
  // 页面生命周期
  onLoad(options) {
    // 页面首次加载，获取路由参数
    this.initPage(options);
  },
  onShow() {
    // 页面显示，每次进入页面都会触发
    this.refreshData();
  },
  onReady() {
    // 页面首次渲染完成
    this.initUI();
  },
  onHide() {
    // 页面隐藏
    this.pauseTimer();
  },
  onUnload() {
    // 页面卸载
    this.cleanup();
  }
}
```

### 2. 组件开发规范

#### 组件文件结构
```vue
<template>
  <view class="component-name">
    <slot></slot>
  </view>
</template>

<script>
export default {
  name: 'ComponentName',
  props: {
    // Props定义
  },
  emits: ['event-name'],
  data() {
    return {};
  },
  methods: {
    handleEvent() {
      this.$emit('event-name', data);
    }
  }
}
</script>
```

#### 组件命名规范
- **文件名**: 使用PascalCase，如 `UserCard.vue`
- **组件名**: 使用PascalCase，如 `UserCard`
- **标签使用**: 使用kebab-case，如 `<user-card></user-card>`

### 3. 样式开发规范

#### uView-UI组件优先
```vue
<template>
  <!-- 优先使用uView组件 -->
  <u-button type="primary" @click="handleClick">按钮</u-button>
  <u-form ref="form" :model="formData">
    <u-form-item label="用户名">
      <u-input v-model="formData.username" />
    </u-form-item>
  </u-form>
</template>
```

#### TailwindCSS辅助样式
```vue
<template>
  <!-- TailwindCSS用于辅助样式 -->
  <view class="flex justify-between items-center p-4 bg-white rounded-lg shadow">
    <text class="text-lg font-bold">标题</text>
    <u-icon name="arrow-right"></u-icon>
  </view>
</template>
```

#### rpx单位使用
```scss
// 使用rpx进行尺寸适配
.container {
  width: 750rpx;          // 全屏宽度
  padding: 20rpx 30rpx;   // 内边距
  margin: 40rpx 0;        // 外边距
}

// 字体大小建议使用px
.title {
  font-size: 32rpx;       // 标题字体
}
.content {
  font-size: 28rpx;       // 内容字体
}
```

### 4. 接口请求规范

#### 使用jianghuAxios
```javascript
// utils/request.js - 封装请求方法
export default {
  async request(options) {
    try {
      uni.showLoading({
        title: '加载中...'
      });
      
      const result = await window.jianghuAxios({
        data: {
          appData: {
            pageId: options.pageId,
            actionId: options.actionId,
            actionData: options.actionData || {},
            ...options.params
          }
        }
      });
      
      uni.hideLoading();
      return result.data.appData.resultData;
    } catch (error) {
      uni.hideLoading();
      uni.showToast({
        title: error.message || '请求失败',
        icon: 'error'
      });
      throw error;
    }
  }
}
```

#### 页面中使用示例
```javascript
import request from '@/utils/request.js';

export default {
  methods: {
    async loadUserList() {
      try {
        const { rows, count } = await request.request({
          pageId: 'userManagement',
          actionId: 'selectItemList',
          actionData: {},
          // 分页参数
          limit: 20,
          offset: 0
        });
        
        this.userList = rows;
        this.totalCount = count;
      } catch (error) {
        console.error('加载用户列表失败:', error);
      }
    }
  }
}
```

### 5. 状态管理规范

#### Vuex Store结构
```javascript
// store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user
  }
})

export default store
```

#### 模块定义示例
```javascript
// store/modules/user.js
const state = {
  userInfo: null,
  token: '',
  isLogin: false
}

const mutations = {
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo
    state.isLogin = !!userInfo
  },
  SET_TOKEN(state, token) {
    state.token = token
  }
}

const actions = {
  login({ commit }, loginData) {
    return new Promise((resolve, reject) => {
      // 登录逻辑
      request.request({
        pageId: 'login',
        actionId: 'passwordLogin',
        actionData: loginData
      }).then(result => {
        commit('SET_USER_INFO', result.userInfo)
        commit('SET_TOKEN', result.token)
        resolve(result)
      }).catch(reject)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
```

### 6. 路由和页面跳转

#### 页面跳转规范
```javascript
// 方法内进行页面跳转
methods: {
  // 普通跳转
  goToDetail(id) {
    uni.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  },
  
  // 替换当前页面
  goToLogin() {
    uni.redirectTo({
      url: '/pages/login/login'
    })
  },
  
  // 返回上一页
  goBack() {
    uni.navigateBack({
      delta: 1
    })
  },
  
  // 切换Tab页面
  goToHome() {
    uni.switchTab({
      url: '/pages/home/home'
    })
  }
}
```

#### 页面参数接收
```javascript
export default {
  onLoad(options) {
    // 接收页面参数
    this.id = options.id || '';
    this.type = options.type || 'default';
    
    // 初始化页面数据
    if (this.id) {
      this.loadDetail();
    }
  }
}
```

### 7. 平台兼容处理

#### 条件编译
```vue
<template>
  <view>
    <!-- #ifdef H5 -->
    <web-view src="https://example.com"></web-view>
    <!-- #endif -->
    
    <!-- #ifdef MP-WEIXIN -->
    <button @click="getPhoneNumber" open-type="getPhoneNumber">获取手机号</button>
    <!-- #endif -->
    
    <!-- #ifdef APP-PLUS -->
    <button @click="openNativeFunction">调用原生功能</button>
    <!-- #endif -->
  </view>
</template>

<script>
export default {
  methods: {
    handleAction() {
      // #ifdef H5
      // H5特有逻辑
      window.open('https://example.com');
      // #endif
      
      // #ifdef MP-WEIXIN
      // 小程序特有逻辑
      wx.navigateToMiniProgram({
        appId: 'targetAppId'
      });
      // #endif
      
      // #ifdef APP-PLUS
      // App特有逻辑
      plus.runtime.openURL('https://example.com');
      // #endif
    }
  }
}
</script>
```

### 8. 错误处理和调试

#### 全局错误处理
```javascript
// main.js
Vue.config.errorHandler = (err, vm, info) => {
  console.error('Vue Error:', err);
  console.error('Component:', vm);
  console.error('Error Info:', info);
  
  // 上报错误信息
  uni.showToast({
    title: '发生错误，请稍后重试',
    icon: 'error'
  });
}
```

#### 调试技巧
```javascript
// 开发环境下的调试方法
methods: {
  debugInfo() {
    // #ifdef H5
    console.log('H5环境调试信息');
    // #endif
    
    // #ifdef MP-WEIXIN
    console.log('小程序环境调试信息');
    // #endif
    
    // 使用uni.showModal显示调试信息
    uni.showModal({
      title: '调试信息',
      content: JSON.stringify(this.data, null, 2),
      showCancel: false
    });
  }
}
```

### 9. 性能优化规范

#### 长列表优化
```vue
<template>
  <!-- 使用scroll-view实现长列表 -->
  <scroll-view 
    scroll-y="true" 
    class="scroll-container"
    @scrolltolower="loadMore"
    :refresher-enabled="true"
    :refresher-triggered="isRefreshing"
    @refresherrefresh="onRefresh"
  >
    <view v-for="item in list" :key="item.id" class="list-item">
      {{ item.name }}
    </view>
    
    <view v-if="loading" class="loading">
      <u-loading-icon></u-loading-icon>
      <text>加载中...</text>
    </view>
  </scroll-view>
</template>
```

#### 图片懒加载
```vue
<template>
  <view>
    <image 
      v-for="item in imageList" 
      :key="item.id"
      :src="item.url" 
      lazy-load="true"
      mode="aspectFill"
      @load="onImageLoad"
      @error="onImageError"
    ></image>
  </view>
</template>
```

### 10. 打包和发布规范

#### manifest.json配置要点
```json
{
  "name": "应用名称",
  "appid": "__UNI__XXXXXX",
  "versionName": "1.0.0",
  "versionCode": 100,
  "transformPx": false,
  "networkTimeout": {
    "request": 60000,
    "downloadFile": 60000
  },
  "debug": false
}
```

#### 平台特定配置
- **H5**: 配置路由模式、基础路径
- **微信小程序**: 配置AppID、权限申请
- **App**: 配置图标、启动图、权限

## 移动端问题排查指南

### 常见问题类型

#### UI显示问题
- 样式错乱、组件不显示、适配问题
- uView-UI组件使用不当
- TailwindCSS样式冲突
- rpx单位转换问题
- 安全区域适配问题

#### 交互逻辑问题
- 点击无效、表单验证失败、页面跳转异常
- 小程序生命周期问题
- 事件处理差异
- 页面栈管理问题

#### 平台兼容性问题
- H5与小程序表现不一致
- iOS/Android差异
- 不同小程序平台差异
- API兼容性问题

#### 性能问题
- 页面加载慢、内存泄漏、卡顿
- 长列表渲染性能
- 图片加载优化
- 网络请求优化

### 调试工具使用

#### H5调试
- 使用Chrome开发者工具
- 网络面板查看API请求
- Console面板查看日志输出
- Elements面板调试样式问题

#### 小程序调试
- 使用微信开发者工具
- AppData面板查看数据状态
- Network面板监控请求
- Console面板查看日志

#### App调试
- 真机调试连接
- 原生日志查看
- 性能分析工具使用
- 内存泄漏检测

## 最佳实践

1. **组件化开发**: 合理拆分组件，提高代码复用性
2. **状态管理**: 统一使用Vuex管理全局状态
3. **接口统一**: 使用jianghuAxios进行接口调用
4. **错误处理**: 完善的错误处理和用户提示
5. **性能优化**: 长列表、图片加载等性能优化
6. **平台兼容**: 使用条件编译处理平台差异
7. **调试友好**: 开发环境下提供充分的调试信息
8. **代码规范**: 遵循Vue.js和UniApp开发规范