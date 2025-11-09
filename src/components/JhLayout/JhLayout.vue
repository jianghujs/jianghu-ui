<template>
  <div>
    <!-- 侧边栏布局 -->
    <v-navigation-drawer
      v-if="layout === 'side' || layout === 'mix'"
      v-model="sidebarVisible"
      :permanent="!isMobile && !collapsed"
      :temporary="isMobile"
      :mini-variant="!isMobile && collapsed"
      :width="sidebarWidth"
      app
      clipped
      :color="sidebarTheme === 'dark' ? 'grey darken-4' : 'white'"
      :dark="sidebarTheme === 'dark'"
      class="jh-layout-sidebar"
    >
      <!-- Logo 区域 -->
      <div class="jh-layout-logo d-flex align-center px-4" :style="{ height: headerHeight + 'px' }">
        <slot name="logo">
          <v-icon v-if="collapsed && !isMobile" :color="sidebarTheme === 'dark' ? 'white' : 'primary'">
            {{ logo || 'mdi-view-dashboard' }}
          </v-icon>
          <template v-else>
            <v-icon v-if="logo" :color="sidebarTheme === 'dark' ? 'white' : 'primary'" class="mr-2">
              {{ logo }}
            </v-icon>
            <span class="text-h6 font-weight-bold" :class="sidebarTheme === 'dark' ? 'white--text' : 'primary--text'">
              {{ title }}
            </span>
          </template>
        </slot>
      </div>
      <v-divider></v-divider>

      <!-- 菜单区域 -->
      <v-list
        nav
        dense
        :class="{ 'jh-layout-menu-dark': sidebarTheme === 'dark' }"
      >
        <template v-for="(item, index) in menuData">
          <!-- 菜单组 -->
          <template v-if="item.children && item.children.length > 0">
            <v-list-group
              :key="index"
              :value="isMenuActive(item)"
              :prepend-icon="item.icon"
              no-action
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                </v-list-item-content>
              </template>

              <!-- 子菜单 -->
              <template v-for="(child, childIndex) in item.children">
                <!-- 三级菜单 -->
                <v-list-group
                  v-if="child.children && child.children.length > 0"
                  :key="childIndex"
                  :value="isMenuActive(child)"
                  sub-group
                  no-action
                >
                  <template v-slot:activator>
                    <v-list-item-content>
                      <v-list-item-title>{{ child.name }}</v-list-item-title>
                    </v-list-item-content>
                  </template>

                  <v-list-item
                    v-for="(grandChild, grandChildIndex) in child.children"
                    :key="grandChildIndex"
                    @click="handleMenuClick(grandChild)"
                    :class="{ 'v-list-item--active': isCurrentRoute(grandChild) }"
                  >
                    <v-list-item-icon v-if="grandChild.icon">
                      <v-icon>{{ grandChild.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ grandChild.name }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-group>

                <!-- 二级菜单项 -->
                <v-list-item
                  v-else
                  :key="childIndex"
                  @click="handleMenuClick(child)"
                  :class="{ 'v-list-item--active': isCurrentRoute(child) }"
                >
                  <v-list-item-icon v-if="child.icon">
                    <v-icon>{{ child.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ child.name }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list-group>
          </template>

          <!-- 一级菜单项 -->
          <v-list-item
            v-else
            :key="index"
            @click="handleMenuClick(item)"
            :class="{ 'v-list-item--active': isCurrentRoute(item) }"
          >
            <v-list-item-icon v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>

      <!-- 侧边栏底部 -->
      <template v-slot:append v-if="!isMobile">
        <div class="pa-2">
          <slot name="sidebarFooter"></slot>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- 顶部导航栏 -->
    <v-app-bar
      app
      clipped-left
      :height="headerHeight"
      :color="headerTheme === 'dark' ? 'grey darken-4' : 'white'"
      :dark="headerTheme === 'dark'"
      flat
      class="jh-layout-header px-4"
    >
      <!-- 折叠按钮 -->
      <v-app-bar-nav-icon
        v-if="layout === 'side' || layout === 'mix'"
        @click="toggleSidebar"
      ></v-app-bar-nav-icon>

      <!-- 顶部 Logo（仅在 top 布局时显示） -->
      <div v-if="layout === 'top'" class="d-flex align-center mr-4">
        <slot name="logo">
          <v-icon v-if="logo" :color="headerTheme === 'dark' ? 'white' : 'primary'" class="mr-2">
            {{ logo }}
          </v-icon>
          <span class="text-h6 font-weight-bold" :class="headerTheme === 'dark' ? 'white--text' : 'primary--text'">
            {{ title }}
          </span>
        </slot>
      </div>

      <!-- 顶部菜单（仅在 top 布局时显示） -->
      <v-tabs
        v-if="layout === 'top'"
        show-arrows
        slider-size="2"
        :color="headerTheme === 'dark' ? 'white' : 'primary'"
      >
        <template v-for="(item, index) in menuData">
          <!-- 无子菜单 -->
          <v-tab
            v-if="!item.children || item.children.length === 0"
            :key="index"
            @click="handleMenuClick(item)"
          >
            <v-icon v-if="item.icon" left small>{{ item.icon }}</v-icon>
            {{ item.name }}
          </v-tab>

          <!-- 有子菜单 -->
          <v-menu v-else :key="index" offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-tab v-bind="attrs" v-on="on">
                <v-icon v-if="item.icon" left small>{{ item.icon }}</v-icon>
                {{ item.name }}
                <v-icon small>mdi-chevron-down</v-icon>
              </v-tab>
            </template>
            <v-list nav dense>
              <v-list-item
                v-for="(child, childIndex) in item.children"
                :key="childIndex"
                @click="handleMenuClick(child)"
              >
                <v-list-item-icon v-if="child.icon">
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ child.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-tabs>

      <v-spacer></v-spacer>

      <!-- 头部右侧内容 -->
      <div class="d-flex align-center">
        <slot name="headerRight">
          <!-- 默认用户菜单 -->
          <v-menu offset-y v-if="showAvatar">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-avatar size="32" :color="headerTheme === 'dark' ? 'grey darken-2' : 'grey lighten-2'">
                  <v-icon :color="headerTheme === 'dark' ? 'white' : 'grey darken-2'">mdi-account</v-icon>
                </v-avatar>
              </v-btn>
            </template>
            <v-list nav dense>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ userInfo.username || 'Guest' }}</v-list-item-title>
                  <v-list-item-subtitle>{{ userInfo.email || '' }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item
                v-for="(item, index) in avatarMenuList"
                :key="index"
                @click="$emit('avatar-menu-click', item)"
              >
                <v-list-item-icon v-if="item.icon">
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider v-if="showLogout"></v-divider>
              <v-list-item v-if="showLogout" @click="$emit('logout')">
                <v-list-item-icon>
                  <v-icon>mdi-logout</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>退出登录</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </slot>
      </div>
    </v-app-bar>

    <!-- 主内容区域 -->
    <v-main class="jh-layout-main mt-5">
      <!-- 面包屑 -->
      <div
        v-if="showBreadcrumb"
        class="jh-layout-breadcrumb px-4 py-2"
        :style="{ backgroundColor: contentBackground }"
      >
        <v-breadcrumbs :items="breadcrumbItems" class="pa-0">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item
              :disabled="item.disabled"
              @click="!item.disabled && handleBreadcrumbClick(item)"
              class="text-body-2"
            >
              <v-icon v-if="item.icon" small class="mr-1">{{ item.icon }}</v-icon>
              {{ item.text }}
            </v-breadcrumbs-item>
          </template>
        </v-breadcrumbs>
      </div>

      <!-- 页面头部 -->
      <div
        v-if="showPageHeader"
        class="jh-layout-page-header px-4 py-3"
        :style="{ backgroundColor: contentBackground }"
      >
        <slot name="pageHeader">
          <div class="d-flex align-center justify-space-between">
            <div>
              <h2 class="text-h5 font-weight-bold mb-1">{{ pageTitle }}</h2>
              <p v-if="pageDescription" class="text-body-2 grey--text mb-0">{{ pageDescription }}</p>
            </div>
            <div>
              <slot name="pageHeaderExtra"></slot>
            </div>
          </div>
        </slot>
      </div>

      <!-- 内容区域 -->
      <div
        class="jh-layout-content"
        :class="{ 'pa-4': contentPadding }"
        :style="{ backgroundColor: contentBackground }"
      >
        <slot></slot>
      </div>

      <!-- 底部 -->
      <v-footer
        v-if="showFooter"
        app
        :color="footerTheme === 'dark' ? 'grey darken-4' : 'white'"
        :dark="footerTheme === 'dark'"
        class="jh-layout-footer"
      >
        <slot name="footer">
          <div class="text-center flex-grow-1">
            <span class="text-body-2 grey--text">
              {{ footerText || `Copyright © ${new Date().getFullYear()} ${title}` }}
            </span>
          </div>
        </slot>
      </v-footer>
    </v-main>

    <!-- 设置抽屉 -->
    <v-navigation-drawer
      v-if="showSettings"
      v-model="settingsDrawer"
      app
      right
      temporary
      width="300"
      class="jh-layout-settings"
    >
      <v-toolbar flat>
        <v-toolbar-title>布局设置</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="settingsDrawer = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>

      <v-list>
        <!-- 布局模式 -->
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>布局模式</v-list-item-title>
            <v-radio-group v-model="internalLayout" dense class="mt-2">
              <v-radio label="侧边菜单" value="side"></v-radio>
              <v-radio label="顶部菜单" value="top"></v-radio>
              <v-radio label="混合菜单" value="mix"></v-radio>
            </v-radio-group>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <!-- 主题设置 -->
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>导航主题</v-list-item-title>
            <v-radio-group v-model="internalHeaderTheme" dense class="mt-2">
              <v-radio label="亮色" value="light"></v-radio>
              <v-radio label="暗色" value="dark"></v-radio>
            </v-radio-group>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <!-- 侧边栏主题 -->
        <v-list-item v-if="layout === 'side' || layout === 'mix'">
          <v-list-item-content>
            <v-list-item-title>侧边栏主题</v-list-item-title>
            <v-radio-group v-model="internalSidebarTheme" dense class="mt-2">
              <v-radio label="亮色" value="light"></v-radio>
              <v-radio label="暗色" value="dark"></v-radio>
            </v-radio-group>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <!-- 其他设置 -->
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>其他设置</v-list-item-title>
            <v-switch
              v-model="internalShowBreadcrumb"
              label="显示面包屑"
              dense
              class="mt-2"
            ></v-switch>
            <v-switch
              v-model="internalShowFooter"
              label="显示页脚"
              dense
            ></v-switch>
            <v-switch
              v-model="internalContentPadding"
              label="内容区域内边距"
              dense
            ></v-switch>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- 设置按钮 -->
    <v-btn
      v-if="showSettings"
      fab
      fixed
      right
      bottom
      color="primary"
      @click="settingsDrawer = true"
      class="jh-layout-settings-btn"
    >
      <v-icon>mdi-cog</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'JhLayout',
  props: {
    // 应用标题
    title: {
      type: String,
      default: 'JianghuJS'
    },
    // Logo 图标
    logo: {
      type: String,
      default: ''
    },
    // 菜单数据
    menuData: {
      type: Array,
      default: () => []
    },
    // 当前路由路径
    currentPath: {
      type: String,
      default: ''
    },
    // 布局模式: side(侧边), top(顶部), mix(混合)
    layout: {
      type: String,
      default: 'side',
      validator: (value) => ['side', 'top', 'mix'].includes(value)
    },
    // 侧边栏宽度
    sidebarWidth: {
      type: Number,
      default: 256
    },
    // 头部高度
    headerHeight: {
      type: Number,
      default: 64
    },
    // 头部主题
    headerTheme: {
      type: String,
      default: 'light',
      validator: (value) => ['light', 'dark'].includes(value)
    },
    // 侧边栏主题
    sidebarTheme: {
      type: String,
      default: 'dark',
      validator: (value) => ['light', 'dark'].includes(value)
    },
    // 底部主题
    footerTheme: {
      type: String,
      default: 'light',
      validator: (value) => ['light', 'dark'].includes(value)
    },
    // 是否显示面包屑
    showBreadcrumb: {
      type: Boolean,
      default: true
    },
    // 面包屑数据
    breadcrumbs: {
      type: Array,
      default: () => []
    },
    // 是否显示页面头部
    showPageHeader: {
      type: Boolean,
      default: false
    },
    // 页面标题
    pageTitle: {
      type: String,
      default: ''
    },
    // 页面描述
    pageDescription: {
      type: String,
      default: ''
    },
    // 是否显示底部
    showFooter: {
      type: Boolean,
      default: false
    },
    // 底部文字
    footerText: {
      type: String,
      default: ''
    },
    // 内容区域背景色
    contentBackground: {
      type: String,
      default: '#f5f5f5'
    },
    // 内容区域是否有内边距
    contentPadding: {
      type: Boolean,
      default: true
    },
    // 是否显示用户头像
    showAvatar: {
      type: Boolean,
      default: true
    },
    // 用户信息
    userInfo: {
      type: Object,
      default: () => ({
        username: 'Guest',
        email: ''
      })
    },
    // 用户菜单列表
    avatarMenuList: {
      type: Array,
      default: () => []
    },
    // 是否显示退出登录
    showLogout: {
      type: Boolean,
      default: true
    },
    // 是否显示设置
    showSettings: {
      type: Boolean,
      default: false
    },
    // 初始折叠状态
    defaultCollapsed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      sidebarVisible: true,
      collapsed: this.defaultCollapsed,
      settingsDrawer: false,
      isMobile: false,
      // 内部状态（用于设置面板）
      internalLayout: this.layout,
      internalHeaderTheme: this.headerTheme,
      internalSidebarTheme: this.sidebarTheme,
      internalShowBreadcrumb: this.showBreadcrumb,
      internalShowFooter: this.showFooter,
      internalContentPadding: this.contentPadding
    };
  },
  computed: {
    // 面包屑项
    breadcrumbItems() {
      if (this.breadcrumbs.length > 0) {
        return this.breadcrumbs;
      }
      // 自动从当前路径生成面包屑
      return this.generateBreadcrumbs();
    }
  },
  watch: {
    // 监听设置变化并触发事件
    internalLayout(val) {
      this.$emit('update:layout', val);
    },
    internalHeaderTheme(val) {
      this.$emit('update:headerTheme', val);
    },
    internalSidebarTheme(val) {
      this.$emit('update:sidebarTheme', val);
    },
    internalShowBreadcrumb(val) {
      this.$emit('update:showBreadcrumb', val);
    },
    internalShowFooter(val) {
      this.$emit('update:showFooter', val);
    },
    internalContentPadding(val) {
      this.$emit('update:contentPadding', val);
    }
  },
  mounted() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkMobile);
  },
  methods: {
    // 检查是否为移动端
    checkMobile() {
      this.isMobile = window.innerWidth < 960;
      if (this.isMobile) {
        this.sidebarVisible = false;
      }
    },
    // 切换侧边栏
    toggleSidebar() {
      if (this.isMobile) {
        this.sidebarVisible = !this.sidebarVisible;
      } else {
        this.collapsed = !this.collapsed;
      }
      this.$emit('sidebar-toggle', { collapsed: this.collapsed, visible: this.sidebarVisible });
    },
    // 菜单点击
    handleMenuClick(item) {
      this.$emit('menu-click', item);
      if (this.isMobile) {
        this.sidebarVisible = false;
      }
    },
    // 面包屑点击
    handleBreadcrumbClick(item) {
      this.$emit('breadcrumb-click', item);
    },
    // 判断菜单是否激活
    isMenuActive(item) {
      if (!item.children) return false;
      return item.children.some(child => {
        if (child.children) {
          return child.children.some(grandChild => this.isCurrentRoute(grandChild));
        }
        return this.isCurrentRoute(child);
      });
    },
    // 判断是否为当前路由
    isCurrentRoute(item) {
      if (!item.path) return false;
      return this.currentPath === item.path || this.currentPath.startsWith(item.path + '/');
    },
    // 生成面包屑
    generateBreadcrumbs() {
      if (!this.currentPath) return [];
      
      const breadcrumbs = [{ text: '首页', path: '/', icon: 'mdi-home' }];
      const findPath = (items, path, parents = []) => {
        for (const item of items) {
          if (item.path === path) {
            return [...parents, item];
          }
          if (item.children) {
            const found = findPath(item.children, path, [...parents, item]);
            if (found) return found;
          }
        }
        return null;
      };

      const pathItems = findPath(this.menuData, this.currentPath);
      if (pathItems) {
        pathItems.forEach((item, index) => {
          breadcrumbs.push({
            text: item.name,
            path: item.path,
            icon: item.icon,
            disabled: index === pathItems.length - 1
          });
        });
      }

      return breadcrumbs;
    }
  }
};
</script>

<style scoped>
.jh-layout-sidebar {
  border-right: 1px solid rgba(0, 0, 0, 0.12);
}

.jh-layout-logo {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.jh-layout-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.jh-layout-breadcrumb {
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.jh-layout-page-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.jh-layout-content {
  min-height: calc(100vh - 64px);
}

.jh-layout-footer {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}

.jh-layout-settings-btn {
  bottom: 80px !important;
}

/* 暗色菜单样式 */
.jh-layout-menu-dark >>> .v-list-item--active {
  background-color: rgba(255, 255, 255, 0.1);
}

.jh-layout-menu-dark >>> .v-list-item--active .v-icon,
.jh-layout-menu-dark >>> .v-list-item--active .v-list-item__title {
  color: #fff !important;
}

.jh-layout-menu-dark >>> .v-list-group__header.v-list-item--active:before {
  opacity: 0.12;
}

/* 响应式调整 */
@media (max-width: 960px) {
  .jh-layout-content {
    min-height: calc(100vh - 56px);
  }
}
</style>
