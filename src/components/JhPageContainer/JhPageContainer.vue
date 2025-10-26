<template>
  <div class="jh-page-container" :class="{ 'jh-page-container--fixed-header': fixedHeader }">
    <!-- 页面头部 -->
    <div
      v-if="showHeader"
      class="jh-page-container__header"
      :class="{ 'jh-page-container__header--fixed': fixedHeader }"
      :style="headerStyle"
    >
      <!-- 面包屑 -->
      <v-breadcrumbs
        v-if="breadcrumb !== false && computedBreadcrumb.length > 0"
        :items="computedBreadcrumb"
        class="jh-page-container__breadcrumb pa-0"
      >
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item
            :to="item.to"
            :disabled="item.disabled"
            :exact="item.exact"
          >
            <v-icon v-if="item.icon" small left>{{ item.icon }}</v-icon>
            {{ item.text }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>

      <!-- 标题区域 -->
      <div class="jh-page-container__title-area">
        <div class="jh-page-container__title-content">
          <!-- 返回按钮 -->
          <v-btn
            v-if="showBack"
            icon
            small
            class="jh-page-container__back-btn mr-2"
            @click="handleBack"
          >
            <v-icon>{{ backIcon }}</v-icon>
          </v-btn>

          <!-- 标题前缀插槽 -->
          <slot name="title-prefix"></slot>

          <!-- 标题 -->
          <div class="jh-page-container__title-wrapper">
            <h1 class="jh-page-container__title">
              <slot name="title">{{ title }}</slot>
            </h1>
            <div v-if="subTitle || description" class="jh-page-container__subtitle">
              {{ subTitle }}
              <span v-if="description" class="jh-page-container__description">
                {{ description }}
              </span>
            </div>
          </div>

          <!-- 标题后缀插槽 -->
          <slot name="title-suffix"></slot>
        </div>

        <!-- 额外操作区 -->
        <div v-if="$slots.extra" class="jh-page-container__extra">
          <slot name="extra"></slot>
        </div>
      </div>

      <!-- 标签页 -->
      <div v-if="tabs && tabs.length > 0" class="jh-page-container__tabs">
        <v-tabs
          :value="currentTabIndex"
          @change="handleTabChange"
          background-color="transparent"
          color="primary"
        >
          <v-tab
            v-for="tab in tabs"
            :key="tab.key"
            :disabled="tab.disabled"
          >
            <v-icon v-if="tab.icon" small left>{{ tab.icon }}</v-icon>
            {{ tab.label }}
            <v-badge
              v-if="tab.badge !== undefined"
              :content="tab.badge"
              color="error"
              inline
              class="ml-2"
            ></v-badge>
          </v-tab>
        </v-tabs>

        <!-- 标签页右侧额外内容 -->
        <div v-if="$slots['tab-bar-extra']" class="jh-page-container__tab-extra">
          <slot name="tab-bar-extra"></slot>
        </div>
      </div>

      <!-- 进度条 -->
      <v-progress-linear
        v-if="showProgressBar && loading"
        indeterminate
        color="primary"
        class="jh-page-container__progress"
      ></v-progress-linear>
    </div>

    <!-- 内容区域 -->
    <div
      class="jh-page-container__content"
      :class="[
        contentClass,
        { 'jh-page-container__content--card': contentCard },
        { 'jh-page-container__content--fixed-header': fixedHeader },
        { 'jh-page-container__content--fixed-footer': showFooter && fixedFooter }
      ]"
      :style="computedContentStyle"
    >
      <!-- 加载状态 -->
      <div v-if="loading" class="jh-page-container__loading">
        <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
      </div>

      <!-- 空状态 -->
      <div v-else-if="empty" class="jh-page-container__empty">
        <v-icon size="64" color="grey lighten-1">mdi-inbox</v-icon>
        <p class="mt-4 grey--text">{{ emptyText }}</p>
      </div>

      <!-- 主要内容 -->
      <div v-else>
        <slot></slot>
      </div>

      <!-- 水印 -->
      <div
        v-if="watermark && watermark.text"
        class="jh-page-container__watermark"
        :style="watermarkStyle"
      ></div>
    </div>

    <!-- 页脚 -->
    <div
      v-if="showFooter && $slots.footer"
      class="jh-page-container__footer"
      :class="{ 'jh-page-container__footer--fixed': fixedFooter }"
      :style="footerStyle"
    >
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JhPageContainer',
  props: {
    // ========== 页面头部 ==========
    title: {
      type: String,
      default: '',
    },
    subTitle: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    breadcrumb: {
      type: [Array, Boolean],
      default: () => [],
    },
    showBack: {
      type: Boolean,
      default: false,
    },
    backIcon: {
      type: String,
      default: 'mdi-arrow-left',
    },
    tabs: {
      type: Array,
      default: null,
    },
    tabActiveKey: {
      type: String,
      default: '',
    },

    // ========== 布局控制 ==========
    fixedHeader: {
      type: Boolean,
      default: false,
    },
    headerStyle: {
      type: Object,
      default: () => ({}),
    },
    contentStyle: {
      type: Object,
      default: () => ({}),
    },
    contentPadding: {
      type: [String, Number],
      default: 24,
    },
    contentCard: {
      type: Boolean,
      default: true,
    },

    // ========== 状态控制 ==========
    loading: {
      type: Boolean,
      default: false,
    },
    showProgressBar: {
      type: Boolean,
      default: false,
    },

    // ========== 页脚控制 ==========
    showFooter: {
      type: Boolean,
      default: false,
    },
    fixedFooter: {
      type: Boolean,
      default: false,
    },
    footerStyle: {
      type: Object,
      default: () => ({}),
    },

    // ========== 其他 ==========
    watermark: {
      type: [Object, Boolean],
      default: false,
    },
    contentClass: {
      type: String,
      default: '',
    },
    empty: {
      type: Boolean,
      default: false,
    },
    emptyText: {
      type: String,
      default: '暂无数据',
    },
  },
  data() {
    return {
      currentTabKey: this.tabActiveKey,
    };
  },
  computed: {
    showHeader() {
      return this.title || this.$slots.title || this.breadcrumb !== false || this.tabs;
    },
    computedBreadcrumb() {
      if (this.breadcrumb === false) return [];
      if (Array.isArray(this.breadcrumb) && this.breadcrumb.length > 0) {
        return this.breadcrumb;
      }
      // 可以在这里实现从路由自动生成面包屑的逻辑
      return this.generateBreadcrumbFromRoute();
    },
    currentTabIndex() {
      if (!this.tabs || this.tabs.length === 0) return 0;
      const index = this.tabs.findIndex((tab) => tab.key === this.currentTabKey);
      return index >= 0 ? index : 0;
    },
    computedContentStyle() {
      const padding = typeof this.contentPadding === 'number'
        ? `${this.contentPadding}px`
        : this.contentPadding;

      return {
        padding,
        ...this.contentStyle,
      };
    },
    watermarkStyle() {
      if (!this.watermark || !this.watermark.text) return {};

      const {
        text,
        fontSize = 16,
        color = 'rgba(0,0,0,.15)',
        opacity = 0.5,
        rotate = -22,
      } = this.watermark;

      return {
        background: `
          repeating-linear-gradient(
            ${rotate}deg,
            transparent,
            transparent 200px,
            ${color} 200px,
            ${color} 201px
          )
        `,
        opacity,
        pointerEvents: 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        fontSize: `${fontSize}px`,
      };
    },
  },
  watch: {
    tabActiveKey(newVal) {
      this.currentTabKey = newVal;
    },
  },
  methods: {
    handleBack() {
      this.$emit('back');
    },
    handleTabChange(index) {
      if (!this.tabs || this.tabs.length === 0) return;

      const prevKey = this.currentTabKey;
      const newTab = this.tabs[index];
      if (!newTab) return;

      this.currentTabKey = newTab.key;
      this.$emit('update:tabActiveKey', newTab.key);
      this.$emit('tab-change', { activeKey: newTab.key, prevKey });
    },
    generateBreadcrumbFromRoute() {
      // 从 Vue Router 自动生成面包屑
      if (!this.$route) return [];

      const matched = this.$route.matched;
      if (!matched || matched.length === 0) return [];

      return matched
        .filter((route) => route.meta && route.meta.title)
        .map((route, index) => ({
          text: route.meta.title,
          to: index < matched.length - 1 ? route.path : undefined,
          disabled: index === matched.length - 1,
          icon: route.meta.icon,
        }));
    },
    refresh() {
      this.$emit('refresh');
    },
    setLoading(loading) {
      this.$emit('update:loading', loading);
    },
    setActiveTab(key) {
      this.currentTabKey = key;
      this.$emit('update:tabActiveKey', key);
    },
  },
};
</script>

<style scoped>
.jh-page-container {
  min-height: 100%;
  background: #f0f2f5;
}

.jh-page-container--fixed-header {
  padding-top: 0;
}

/* 头部样式 */
.jh-page-container__header {
  background: white;
  padding: 16px 24px;
  margin-bottom: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.jh-page-container__header--fixed {
  position: sticky;
  top: 0;
  z-index: 10;
}

.jh-page-container__breadcrumb {
  margin-bottom: 8px;
}

.jh-page-container__title-area {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
}

.jh-page-container__title-content {
  display: flex;
  align-items: center;
  flex: 1;
}

.jh-page-container__back-btn {
  flex-shrink: 0;
}

.jh-page-container__title-wrapper {
  flex: 1;
}

.jh-page-container__title {
  font-size: 20px;
  font-weight: 500;
  line-height: 32px;
  margin: 0;
  color: rgba(0, 0, 0, 0.85);
}

.jh-page-container__subtitle {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  margin-top: 4px;
}

.jh-page-container__description {
  display: block;
  margin-top: 4px;
}

.jh-page-container__extra {
  flex-shrink: 0;
  margin-left: 16px;
}

.jh-page-container__tabs {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 -24px;
  padding: 0 24px;
  border-top: 1px solid #f0f0f0;
}

.jh-page-container__tab-extra {
  flex-shrink: 0;
  margin-left: 16px;
}

.jh-page-container__progress {
  margin: 16px -24px -16px;
}

/* 内容样式 */
.jh-page-container__content {
  position: relative;
  min-height: 200px;
}

.jh-page-container__content--card {
  background: white;
  border-radius: 2px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  margin: 0 24px 24px;
}

.jh-page-container__content--fixed-header {
  /* 为固定头部预留空间 */
}

.jh-page-container__content--fixed-footer {
  padding-bottom: 80px;
}

.jh-page-container__loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.jh-page-container__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: rgba(0, 0, 0, 0.25);
}

.jh-page-container__watermark {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
}

/* 页脚样式 */
.jh-page-container__footer {
  background: white;
  padding: 16px 24px;
  margin-top: 16px;
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.08);
}

.jh-page-container__footer--fixed {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

/* 响应式 */
@media screen and (max-width: 768px) {
  .jh-page-container__header {
    padding: 12px 16px;
  }

  .jh-page-container__title-area {
    flex-direction: column;
    align-items: flex-start;
  }

  .jh-page-container__extra {
    margin-left: 0;
    margin-top: 12px;
    width: 100%;
  }

  .jh-page-container__content--card {
    margin: 0 16px 16px;
  }

  .jh-page-container__title {
    font-size: 18px;
  }
}
</style>
