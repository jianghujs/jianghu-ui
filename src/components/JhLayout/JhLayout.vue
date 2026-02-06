<template>
  <v-app>
    <!-- 使用 JhMenu 组件作为顶部导航 -->
    <jh-menu
      :app-title="title"
      :menu-list="formattedMenuData"
      :right-menu-list="rightMenuList"
      :avatar-menu-list="formattedAvatarMenuList"
      :user-info="userInfo"
      :show-avatar="showAvatar"
      :active-menu-index="currentMenuIndex"
      :active-second-menu-id="currentSecondMenuId"
      @menu-click="handleMenuClick"
      @logout="handleLogout"
    >
      <template v-slot:title>
        <slot name="logo">
          <div class="d-flex align-center">
            <jh-icon v-if="logo" :icon="`mdi:${logo}`" color="primary" width="24" height="24" class="mr-2"></jh-icon>
            <span class="text-h6 font-weight-bold primary--text">{{ title }}</span>
          </div>
        </slot>
      </template>
    </jh-menu>


    <!-- 主内容区域 -->
    <v-main class="jh-layout-main">

      <!-- 内容区域 -->
      <div class="jh-layout-content" :style="{ backgroundColor: contentBackground }">
        <slot></slot>
      </div>

    </v-main>

    <!-- 设置抽屉 -->
    <v-navigation-drawer
      v-if="showSettings"
      v-model="settingsDrawer"
      app
      right
      temporary
      width="320"
      class="jh-layout-settings"
    >
      <v-toolbar flat color="primary" dark>
        <v-toolbar-title>布局设置</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="settingsDrawer = false">
          <jh-icon icon="mdi:close" width="24" height="24"></jh-icon>
        </v-btn>
      </v-toolbar>

      <v-list>
        <!-- 内容背景色 -->
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold mb-2">内容背景色</v-list-item-title>
            <v-text-field
              v-model="internalContentBackground"
              dense
              outlined
              hide-details
              placeholder="#f5f5f5"
            >
              <template v-slot:prepend-inner>
                <div
                  :style="{ backgroundColor: internalContentBackground, width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #ddd' }"
                ></div>
              </template>
            </v-text-field>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <!-- 功能开关 -->
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold mb-2">功能开关</v-list-item-title>
            <v-switch
              v-model="internalShowAvatar"
              label="显示用户头像"
              dense
              hide-details
              class="mt-2"
            ></v-switch>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <!-- 快速预设 -->
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold mb-3">快速预设</v-list-item-title>
            <v-btn
              block
              outlined
              small
              class="mb-2"
              @click="applyPreset('default')"
            >
              <jh-icon icon="mdi:palette" width="16" height="16" left></jh-icon>
              默认主题
            </v-btn>
            <v-btn
              block
              outlined
              small
              class="mb-2"
              @click="applyPreset('dark')"
            >
              <jh-icon icon="mdi:weather-night" width="16" height="16" left></jh-icon>
              暗色主题
            </v-btn>
            <v-btn
              block
              outlined
              small
              @click="applyPreset('compact')"
            >
              <jh-icon icon="mdi:arrow-collapse-vertical" width="16" height="16" left></jh-icon>
              紧凑模式
            </v-btn>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <!-- 重置按钮 -->
        <v-list-item>
          <v-list-item-content>
            <v-btn
              block
              color="error"
              outlined
              @click="resetSettings"
            >
              <jh-icon icon="mdi:restore" width="16" height="16" left></jh-icon>
              重置为默认
            </v-btn>
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
      elevation="4"
    >
      <jh-icon icon="mdi:cog" width="24" height="24"></jh-icon>
    </v-btn>
  </v-app>
</template>

<script>
import JhMenu from '../JhMenu/JhMenu.vue';
import JhIcon from '../JhIcon/JhIcon.vue';

export default {
  name: 'JhLayout',
  components: {
    JhMenu,
    JhIcon
  },
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
    // 右侧菜单列表
    rightMenuList: {
      type: Array,
      default: () => []
    },
    // 当前路由路径
    currentPath: {
      type: String,
      default: ''
    },
    // 内容区域背景色
    contentBackground: {
      type: String,
      default: '#f5f5f5'
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
        userId: '',
        roles: []
      })
    },
    // 用户菜单列表
    avatarMenuList: {
      type: Array,
      default: () => []
    },
    // 是否显示设置
    showSettings: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      settingsDrawer: false,
      currentMenuIndex: -1,
      currentSecondMenuId: null,
      // 内部状态（用于设置面板）
      internalContentBackground: this.contentBackground,
      internalShowAvatar: this.showAvatar
    };
  },
  computed: {
    // 格式化菜单数据（将 name 转换为 title，path 转换为 id）
    formattedMenuData() {
      return this.formatMenuItems(this.menuData);
    },
    // 格式化用户菜单数据
    formattedAvatarMenuList() {
      return this.avatarMenuList.map(item => ({
        ...item,
        title: item.name || item.title,
        id: item.path || item.id
      }));
    }
  },
  watch: {
    // 监听设置变化并触发事件
    internalContentBackground(val) {
      this.$emit('update:contentBackground', val);
    },
    internalShowAvatar(val) {
      this.$emit('update:showAvatar', val);
    },
    // 监听当前路径变化，更新激活菜单
    currentPath: {
      handler(newPath) {
        this.updateActiveMenu(newPath);
      },
      immediate: true
    }
  },
  methods: {
    // 格式化菜单项
    formatMenuItems(items) {
      return items.map(item => ({
        ...item,
        title: item.name || item.title,
        id: item.path || item.id,
        children: item.children ? this.formatMenuItems(item.children) : undefined
      }));
    },
    // 更新激活菜单
    updateActiveMenu(path) {
      if (!path) return;
      
      // 查找匹配的菜单项
      const findMenu = (items, targetPath, parentIndex = -1) => {
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const currentIndex = parentIndex === -1 ? i : parentIndex;
          
          if (item.path === targetPath) {
            this.currentMenuIndex = currentIndex;
            this.currentSecondMenuId = item.id || item.path;
            return true;
          }
          
          if (item.children) {
            if (findMenu(item.children, targetPath, currentIndex)) {
              return true;
            }
          }
        }
        return false;
      };
      
      findMenu(this.menuData, path);
    },
    // 菜单点击
    handleMenuClick(menu, index) {
      if (index !== undefined) {
        this.currentMenuIndex = index;
      }
      if (menu.id) {
        this.currentSecondMenuId = menu.id;
      }
      this.$emit('menu-click', menu);
    },
    // 退出登录
    handleLogout() {
      this.$emit('logout');
    },
    // 应用预设主题
    applyPreset(preset) {
      switch (preset) {
        case 'default':
          this.internalContentBackground = '#f5f5f5';
          this.internalShowAvatar = true;
          break;
        case 'dark':
          this.internalContentBackground = '#1e1e1e';
          this.internalShowAvatar = true;
          break;
        case 'compact':
          this.internalContentBackground = '#ffffff';
          this.internalShowAvatar = true;
          break;
      }
    },
    // 重置设置
    resetSettings() {
      this.internalContentBackground = '#f5f5f5';
      this.internalShowAvatar = true;
    }
  }
};
</script>

<style scoped>
.jh-layout-main {
  min-height: 100vh;
}

.jh-layout-content {
  min-height: calc(100vh - 52px);
  transition: background-color 0.3s;
}

.jh-layout-settings-btn {
  bottom: 24px !important;
  z-index: 999;
}

.jh-layout-settings-btn:hover {
  transform: rotate(90deg);
  transition: transform 0.3s;
}

/* 设置抽屉样式优化 */
.jh-layout-settings >>> .v-list-item {
  padding: 12px 16px;
}

.jh-layout-settings >>> .v-list-item__content {
  padding: 0;
}

/* 响应式调整 */
@media (max-width: 600px) {
  .jh-layout-content {
    min-height: calc(100vh - 52px);
  }
  
  .jh-layout-settings-btn {
    bottom: 16px !important;
    right: 16px !important;
  }
}
</style>
