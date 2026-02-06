<template>
  <div>
    <!-- 手机端左边抽屉菜单 -->
    <v-navigation-drawer
      v-if="!hideDrawers"
      v-model="mobileMenuDrawer"
      app
      clipped
      :temporary="temporary"
      class="jh-page-nav-bar hidden-md-and-up"
    >
      <!-- 页面标题 -->
      <v-toolbar-title class="px-3 jh-toolbar-title">
        <span class="text-base font-medium">{{ appTitle }}</span>
      </v-toolbar-title>
      <v-divider class="jh-divider"></v-divider>

      <!-- 菜单 -->
      <v-list flat class="py-0">
        <v-list-item-group :value="currentMenuIndex">
          <template v-for="(item, index) in menuList">
            <!-- 有子菜单 -->
            <template v-if="item.children && item.children.length > 0">
              <v-list-group :key="index" :value="item.active" class="px-4">
                <template v-slot:activator>
                  <v-list-item class="pl-0" :ripple="false">
                    <v-list-item-content>
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
                <template v-slot:appendIcon>
                  <jh-icon icon="mdi:chevron-down" size="18"></jh-icon>
                </template>
                <template v-for="(child, childIndex) in item.children">
                  <!-- 三级菜单 -->
                  <template v-if="child.children && child.children.length > 0">
                    <v-list-group :key="childIndex" :value="child.active" class="px-0">
                      <template v-slot:activator>
                        <v-list-item class="pl-0" :ripple="false">
                          <v-list-item-content>
                            <v-list-item-title class="pl-6 pl-sm-4">{{ child.title }}</v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </template>
                      <template v-slot:appendIcon>
                        <jh-icon icon="mdi:chevron-down" size="16"></jh-icon>
                      </template>
                      <v-list-item
                        v-for="(grandchild, grandchildIndex) in child.children"
                        :key="grandchildIndex"
                        @click="handleMenuClick(grandchild, index)"
                        :class="{ 'second-active': currentSecondMenuId === grandchild.id && currentMenuIndex === index }"
                      >
                        <v-list-item-content>
                          <v-list-item-title class="pl-10 pl-sm-8">{{ grandchild.title }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-group>
                  </template>
                  <!-- 二级菜单（无三级） -->
                  <v-list-item
                    v-else
                    :key="childIndex"
                    @click="handleMenuClick(child, index)"
                    :class="{ 'second-active': currentSecondMenuId === child.id && currentMenuIndex === index }"
                  >
                    <v-list-item-content>
                      <v-list-item-title class="pl-6 pl-sm-4">{{ child.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list-group>
            </template>
            <!-- 无子菜单 -->
            <v-list-item
              v-else
              :key="index"
              @click="handleMenuClick(item, index)"
              class="px-4"
              :class="{ 'second-active': currentMenuIndex === index }"
            >
              <v-list-item-content class="pl-0">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon class="my-3">
                <jh-icon icon="mdi:chevron-right" size="18"></jh-icon>
              </v-list-item-icon>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>

      <!-- 抽屉关闭按钮 -->
      <v-btn
        elevation="0"
        color="success"
        fab
        absolute
        top
        left
        small
        tile
        class="jh-menu-drawer-close-float-btn"
        @click="mobileMenuDrawer = false"
      >
        <jh-icon icon="mdi:close"></jh-icon>
      </v-btn>
    </v-navigation-drawer>

    <!-- 手机端右边抽屉菜单（用户菜单） -->
    <v-navigation-drawer
      v-if="!hideDrawers && showAvatar"
      v-model="mobileUserMenuDrawer"
      app
      clipped
      :temporary="temporary"
      class="jh-page-nav-bar hidden-md-and-up"
      right
    >
      <div class="d-flex flex-column" style="height: calc(100vh - 20px)">
        <div>
          <!-- 用户信息 -->
          <v-toolbar-title class="px-4" style="min-height: 110px">
            <div class="d-flex flex-column pt-3" style="gap: 12px">
              <div class="success--text text-xs text-center" style="cursor: pointer" @click="mobileUserMenuDrawer = false">
                <jh-icon icon="mdi:window-close" width="22" height="22" class="success--text"></jh-icon>
                <div class="success--text" style="margin-top: -2px">关闭</div>
              </div>
              <div class="d-flex align-start mb-2" style="gap: 4px">
                <jh-icon icon="mdi:account-circle" :width="36" :height="36"></jh-icon>
                <div class="flex-1">
                  <div class="text-xs">
                    {{ userInfo.username }}
                    <span class="text-caption grey--text">{{ userInfo.userId }}</span>
                  </div>
                  <div class="d-flex flex-wrap" style="gap: 4px">
                    <span
                      v-for="(role, i) in userInfo.roles"
                      :key="i"
                      class="text-caption px-1 grey--text"
                      style="border: 1px solid #ccc; border-radius: 4px"
                    >
                      {{ role }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </v-toolbar-title>
          <v-divider class="jh-divider"></v-divider>
        </div>

        <!-- 用户菜单项 -->
        <v-list nav dense class="flex-1">
          <v-list-item v-for="(menu, index) in avatarMenuList" :key="index" @click="handleMenuClick(menu)">
            <v-list-item-icon class="mr-1 mt-1">
              <jh-icon icon="mdi:account-cog-outline" size="16" color="grey darken-3"></jh-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title color="grey darken-3">{{ menu.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <!-- 登出按钮 -->
        <div class="px-4">
          <v-btn block elevation="0" small color="error" @click="handleLogout">
            <jh-icon icon="mdi:logout" size="16"></jh-icon>
            <span class="ml-2">登出</span>
          </v-btn>
        </div>
      </div>
    </v-navigation-drawer>

    <!-- 页面头部 -->
    <v-app-bar app clipped-left height="52" class="jh-page-header px-8" flat>
      <!-- 手机端左侧菜单开启按钮 -->
      <div
        v-if="!hideDrawers && isMobile"
        class="hidden-md-and-up d-flex flex-column justify-center align-start"
        style="width: 60px; cursor: pointer"
        @click="mobileMenuDrawer = !mobileMenuDrawer"
      >
        <span class="success--text text-caption">
          <jh-icon icon="mdi:menu" width="24" height="24" class="success--text"></jh-icon>
          <div style="margin-top: -2px" class="text-xs">目录</div>
        </span>
      </div>

      <!-- 页面标题 -->
      <v-toolbar-title class="pl-0">
        <span class="hidden-sm-and-down text-h6 font-weight-bold">
          <slot name="title">{{ appTitle }}</slot>
        </span>
        <span class="hidden-md-and-up font-weight-medium text-center">
          <div class="text-base">{{ appTitle }}</div>
          <div class="text-xs grey--text text--darken-2" style="margin-top: -2px">
            <slot name="subtitle"></slot>
          </div>
        </span>
      </v-toolbar-title>

      <!-- PC端菜单 -->
      <v-spacer class="hidden-sm-and-down"></v-spacer>
      <v-tabs v-if="!hideDrawers" class="hidden-sm-and-down" show-arrows slider-size="0" color="success">
        <template v-for="(item, index) in menuList">
          <!-- 一级菜单 -->
          <template v-if="!item.children || item.children.length === 0">
            <v-tab
              :key="index"
              class="px-2 mx-1 jh-header-tab"
              :class="{ 'jh-header-tab-active': currentMenuIndex === index }"
              @click="handleMenuClick(item, index)"
            >
              {{ item.title }}
            </v-tab>
          </template>

          <!-- 二级菜单 -->
          <template v-else>
            <v-menu :key="index" offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-tab
                  v-bind="attrs"
                  v-on="on"
                  class="px-2 mx-1 jh-header-tab"
                  :class="{ 'jh-header-tab-active': currentMenuIndex === index }"
                >
                  {{ item.title }}
                  <jh-icon icon="mdi:chevron-down" width="12" height="12"></jh-icon>
                </v-tab>
              </template>
              <v-list nav dense>
                <template v-for="(child, childIndex) in item.children">
                  <!-- 三级菜单 -->
                  <template v-if="child.children && child.children.length > 0">
                    <v-menu :key="childIndex" offset-x right>
                      <template v-slot:activator="{ on, attrs }">
                        <v-list-item v-bind="attrs" v-on="on">
                          <v-list-item-content>
                            <v-list-item-title style="color: #41434f">{{ child.title }}</v-list-item-title>
                          </v-list-item-content>
                          <v-list-item-action>
                            <jh-icon icon="mdi:chevron-right"></jh-icon>
                          </v-list-item-action>
                        </v-list-item>
                      </template>
                      <v-list nav dense>
                        <v-list-item
                          v-for="(grandchild, grandchildIndex) in child.children"
                          :key="grandchildIndex"
                          @click="handleMenuClick(grandchild, index)"
                          :class="{ 'second-active': currentSecondMenuId === grandchild.id && currentMenuIndex === index }"
                        >
                          <v-list-item-content>
                            <v-list-item-title style="color: #41434f">{{ grandchild.title }}</v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </template>
                  <!-- 二级菜单（无三级） -->
                  <v-list-item
                    v-else
                    :key="childIndex"
                    @click="handleMenuClick(child, index)"
                    :class="{ 'second-active': currentSecondMenuId === child.id && currentMenuIndex === index }"
                  >
                    <v-list-item-content>
                      <v-list-item-title style="color: #41434f">{{ child.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list>
            </v-menu>
          </template>
        </template>
      </v-tabs>

      <!-- 右侧菜单和用户信息 -->
      <div class="d-flex align-center" style="white-space: nowrap">
        <!-- 右侧菜单 -->
        <div v-if="rightMenuList.length > 0" class="d-flex align-center mr-2">
          <div
            v-for="(menu, index) in rightMenuList"
            :key="index"
            class="d-flex align-center ml-4 jh-right-menu"
            style="cursor: pointer"
            @click="handleMenuClick(menu)"
          >
            <jh-icon v-if="menu.icon" :icon="menu.icon" size="20"></jh-icon>
            <div :class="{ 'ml-1': menu.icon }">{{ menu.title }}</div>
          </div>
        </div>
        <v-divider v-if="rightMenuList.length > 0" vertical class="mx-3 jh-divider"></v-divider>

        <!-- 用户头像菜单 -->
        <template v-if="showAvatar">
          <!-- 移动端用户信息 -->
          <div
            class="jh-avatar-menu-btn d-flex flex-column justify-center align-end hidden-sm-and-up"
            @click="mobileUserMenuDrawer = !mobileUserMenuDrawer"
            v-if="isMobile"
          >
            <div class="text-center">
              <jh-icon icon="mdi:account-circle" :width="24" :height="24" color="success"></jh-icon>
              <div style="margin-top: -2px">
                <p class="text-xs success--text mb-0" style="max-width: 60px; overflow: hidden; text-overflow: ellipsis">
                  {{ userInfo.username }}
                </p>
              </div>
            </div>
          </div>

          <!-- PC端用户信息 -->
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <div v-if="!isMobile" v-bind="attrs" v-on="on" class="jh-avatar-menu-btn d-flex align-center px-1 hidden-xs-only">
                <jh-icon icon="mdi:account-circle" :width="32" :height="32" color="grey lighten-2"></jh-icon>
                <div class="ml-1">
                  <p class="caption black--text mb-0">{{ userInfo.username }}</p>
                </div>
              </div>
            </template>
            <v-list nav dense>
              <!-- 用户信息 -->
              <v-list-item>
                <v-list-item-content>
                  <p class="caption black--text mb-0">{{ userInfo.username }}</p>
                  <p class="caption grey--text mb-0" style="font-size: 10px">{{ userInfo.userId }}</p>
                </v-list-item-content>
              </v-list-item>

              <!-- 用户角色 -->
              <div v-if="userInfo.roles && userInfo.roles.length > 0" style="max-width: 220px; padding: 0 16px">
                <v-chip
                  v-for="(role, i) in userInfo.roles"
                  :key="i"
                  label
                  x-small
                  outlined
                  class="mr-1 mb-1"
                  style="font-size: 10px"
                >
                  {{ role }}
                </v-chip>
              </div>
              <v-divider v-if="userInfo.roles && userInfo.roles.length > 0" class="my-1 jh-divider"></v-divider>

              <!-- 用户菜单项 -->
              <v-list-item v-for="(menu, index) in avatarMenuList" :key="index" @click="handleMenuClick(menu)">
                <v-list-item-icon class="mr-1 mt-1">
                  <jh-icon icon="mdi:account-cog-outline" size="16" color="grey darken-3"></jh-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title color="grey darken-3">{{ menu.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <!-- 登出 -->
              <v-list-item @click="handleLogout">
                <v-list-item-icon class="mr-1 mt-1">
                  <jh-icon icon="mdi:logout" size="16" color="grey darken-3"></jh-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title color="grey darken-3">登出</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import JhIcon from '../JhIcon/JhIcon.vue'

export default {
  name: 'JhMenu',
  components: {
    JhIcon
  },
  props: {
    // 应用标题
    appTitle: {
      type: String,
      default: 'JianghuJS',
    },
    // 菜单列表
    menuList: {
      type: Array,
      default: () => [],
    },
    // 右侧菜单列表
    rightMenuList: {
      type: Array,
      default: () => [],
    },
    // 用户头像菜单列表
    avatarMenuList: {
      type: Array,
      default: () => [],
    },
    // 用户信息
    userInfo: {
      type: Object,
      default: () => ({
        username: 'Guest',
        userId: '',
        roles: [],
      }),
    },
    // 是否显示用户头像
    showAvatar: {
      type: Boolean,
      default: true,
    },
    // 当前激活的菜单索引
    activeMenuIndex: {
      type: Number,
      default: -1,
    },
    // 当前激活的二级菜单ID
    activeSecondMenuId: {
      type: String,
      default: null,
    },
    // 移动端抽屉是否临时显示（点击外部关闭）
    temporary: {
      type: Boolean,
      default: true,
    },
    // 隐藏抽屉（用于Storybook预览）
    hideDrawers: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      mobileMenuDrawer: false,
      mobileUserMenuDrawer: false,
      currentMenuIndex: this.activeMenuIndex,
      currentSecondMenuId: this.activeSecondMenuId,
      isMobile: window.innerWidth < 600
    };
  },
  watch: {
    activeMenuIndex(val) {
      this.currentMenuIndex = val;
    },
    activeSecondMenuId(val) {
      this.currentSecondMenuId = val;
    },
  },
  methods: {
    handleMenuClick(menu, index) {
      if (index !== undefined) {
        this.currentMenuIndex = index;
      }
      if (menu.id) {
        this.currentSecondMenuId = menu.id;
      }
      this.mobileMenuDrawer = false;
      this.mobileUserMenuDrawer = false;
      this.$emit('menu-click', menu, index);
    },
    handleLogout() {
      this.mobileUserMenuDrawer = false;
      this.$emit('logout');
    },
  },
};
</script>

<style scoped>
/* 侧边栏菜单 */
.jh-page-nav-bar >>> .v-list-item,
.jh-page-nav-bar >>> .v-list-group__header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.03);
}

.jh-page-nav-bar >>> .v-list-group__header .v-list-item {
  border-bottom: none;
}

@media (max-width: 600px) {
  .jh-page-nav-bar >>> .v-list-group .v-list-group__header {
    padding: 0 !important;
  }

  .jh-page-nav-bar >>> .v-list-item {
    border-top: none;
  }
}

.second-active >>> .v-list-item__title {
  color: #4caf50 !important;
}

.second-active {
  background-color: rgba(76, 175, 80, 0.1) !important;
}

.jh-toolbar-title {
  height: 51px;
  line-height: 51px;
}
.v-toolbar__title {
  min-width: 200px;
}

.jh-menu-drawer-close-float-btn {
  top: 120px !important;
  right: -40px;
  position: fixed;
  left: auto !important;
}

.jh-header-tab.v-tab--active {
  color: var(--v-grey-darken4) !important;
}

.jh-header-tab.jh-header-tab-active {
  color: #4caf50 !important;
}

.jh-avatar-menu-btn {
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 5px;
}

.jh-avatar-menu-btn:hover {
  opacity: 0.8;
}

.jh-right-menu >>> svg {
  width: 28px;
  height: 28px;
  vertical-align: middle;
}

.jh-divider {
  border-color: rgba(0, 0, 0, 0.08);
}
</style>
