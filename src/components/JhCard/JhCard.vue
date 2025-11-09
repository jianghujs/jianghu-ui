<template>
  <div
    :class="cardClasses"
    :style="cardStyles"
  >
    <!-- 标题栏 -->
    <div
      v-if="hasHeader"
      :class="headerClasses"
    >
      <div class="jh-card-header-left">
        <!-- 标题 -->
        <div v-if="title" class="jh-card-title">
          {{ title }}
        </div>
        <!-- 标题插槽 -->
        <slot name="title"></slot>
        
        <!-- Tooltip 提示 -->
        <v-tooltip v-if="tooltip" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              small
              class="ml-2"
              v-bind="attrs"
              v-on="on"
            >
              mdi-help-circle-outline
            </v-icon>
          </template>
          <span>{{ tooltip }}</span>
        </v-tooltip>
      </div>

      <!-- 右侧额外内容 -->
      <div v-if="extra || $slots.extra" class="jh-card-extra">
        <slot name="extra">{{ extra }}</slot>
      </div>

      <!-- 折叠按钮 -->
      <v-btn
        v-if="collapsible"
        icon
        small
        class="ml-2"
        @click="toggleCollapse"
      >
        <v-icon>{{ isCollapsed ? 'mdi-chevron-down' : 'mdi-chevron-up' }}</v-icon>
      </v-btn>
    </div>

    <!-- 标题分割线 -->
    <v-divider v-if="hasHeader && headerBordered" />

    <!-- Tabs 标签页 -->
    <v-tabs
      v-if="tabs"
      v-model="activeTabKey"
      :vertical="tabs.tabPosition === 'left' || tabs.tabPosition === 'right'"
      :class="tabsClasses"
      @change="handleTabChange"
    >
      <v-tab
        v-for="tab in tabPanes"
        :key="tab.key"
      >
        {{ tab.tab }}
      </v-tab>
    </v-tabs>

    <!-- 卡片内容 -->
    <div
      v-show="!isCollapsed"
      :class="bodyClasses"
      :style="bodyStyles"
    >
      <!-- Tabs 内容 -->
      <template v-if="tabs">
        <v-tabs-items v-model="activeTabKey">
          <v-tab-item
            v-for="tab in tabPanes"
            :key="tab.key"
          >
            <slot :name="`tab-${tab.key}`">
              {{ tab.content }}
            </slot>
          </v-tab-item>
        </v-tabs-items>
      </template>

      <!-- 普通内容 -->
      <template v-else>
        <!-- Loading 状态 -->
        <div v-if="loading" class="jh-card-loading">
          <v-progress-circular
            indeterminate
            color="primary"
          />
        </div>

        <!-- 默认插槽内容 -->
        <slot v-else></slot>
      </template>
    </div>

    <!-- 底部操作区 -->
    <template v-if="actions && actions.length > 0">
      <v-divider />
      <div class="jh-card-actions">
        <div
          v-for="(action, index) in actions"
          :key="index"
          class="jh-card-action-item"
        >
          <component
            :is="action.component || 'div'"
            v-bind="action.props"
            @click="action.onClick"
          >
            <v-icon v-if="action.icon">{{ action.icon }}</v-icon>
            <span v-if="action.text">{{ action.text }}</span>
          </component>
          <v-divider
            v-if="index < actions.length - 1"
            vertical
            class="mx-2"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'JhCard',

  props: {
    // 标题
    title: {
      type: String,
      default: '',
    },

    // 副标题
    subTitle: {
      type: String,
      default: '',
    },

    // 提示信息
    tooltip: {
      type: String,
      default: '',
    },

    // 右上角额外内容
    extra: {
      type: String,
      default: '',
    },

    // 是否有边框
    bordered: {
      type: Boolean,
      default: true,
    },

    // 标题和内容之间是否有分割线
    headerBordered: {
      type: Boolean,
      default: false,
    },

    // 幽灵模式（无背景和padding）
    ghost: {
      type: Boolean,
      default: false,
    },

    // 是否可折叠
    collapsible: {
      type: Boolean,
      default: false,
    },

    // 默认是否折叠
    defaultCollapsed: {
      type: Boolean,
      default: false,
    },

    // 尺寸 small | default
    size: {
      type: String,
      default: 'default',
      validator: (value) => ['small', 'default'].includes(value),
    },

    // 加载状态
    loading: {
      type: Boolean,
      default: false,
    },

    // 底部操作按钮
    actions: {
      type: Array,
      default: () => [],
    },

    // 布局方式 center | default
    layout: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'center'].includes(value),
    },

    // Flex 方向 row | column
    direction: {
      type: String,
      default: 'row',
      validator: (value) => ['row', 'column'].includes(value),
    },

    // 分栏模式 vertical | horizontal
    split: {
      type: String,
      default: '',
      validator: (value) => ['', 'vertical', 'horizontal'].includes(value),
    },

    // 栅格占比
    colSpan: {
      type: [Number, String],
      default: 24,
    },

    // 栅格间距
    gutter: {
      type: [Number, Array],
      default: 0,
    },

    // 标签页配置
    tabs: {
      type: Object,
      default: null,
    },

    // 悬浮效果
    hoverable: {
      type: Boolean,
      default: false,
    },

    // 自定义样式
    bodyStyle: {
      type: Object,
      default: () => ({}),
    },

    // 自定义头部样式
    headStyle: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      isCollapsed: this.defaultCollapsed,
      activeTabKey: this.tabs?.activeKey || 0,
      tabPanes: [],
    };
  },

  computed: {
    // 是否有标题栏
    hasHeader() {
      return this.title || this.$slots.title || this.extra || this.$slots.extra || this.collapsible;
    },

    // 卡片样式类
    cardClasses() {
      return [
        'jh-card',
        {
          'jh-card--bordered': this.bordered,
          'jh-card--ghost': this.ghost,
          'jh-card--small': this.size === 'small',
          'jh-card--hoverable': this.hoverable,
          'jh-card--split-vertical': this.split === 'vertical',
          'jh-card--split-horizontal': this.split === 'horizontal',
          'jh-card--layout-center': this.layout === 'center',
        },
      ];
    },

    // 卡片样式
    cardStyles() {
      const styles = {};

      // 处理 colSpan
      if (this.colSpan !== 24) {
        if (typeof this.colSpan === 'number') {
          styles.flex = `0 0 ${(this.colSpan / 24) * 100}%`;
          styles.maxWidth = `${(this.colSpan / 24) * 100}%`;
        } else if (typeof this.colSpan === 'string') {
          if (this.colSpan.endsWith('%')) {
            styles.flex = `0 0 ${this.colSpan}`;
            styles.maxWidth = this.colSpan;
          } else if (this.colSpan.endsWith('px')) {
            styles.flex = `0 0 ${this.colSpan}`;
            styles.maxWidth = this.colSpan;
          }
        }
      }

      // 处理 gutter
      if (this.gutter) {
        if (Array.isArray(this.gutter)) {
          const [horizontal, vertical] = this.gutter;
          if (horizontal) styles.marginLeft = `${horizontal / 2}px`;
          if (horizontal) styles.marginRight = `${horizontal / 2}px`;
          if (vertical) styles.marginTop = `${vertical / 2}px`;
          if (vertical) styles.marginBottom = `${vertical / 2}px`;
        } else {
          styles.gap = `${this.gutter}px`;
        }
      }

      // Flex 方向
    //   if (this.direction) {
    //     styles.flexDirection = this.direction;
    //   }

      return styles;
    },

    // 标题栏样式类
    headerClasses() {
      return [
        'jh-card-header',
        {
          'jh-card-header--small': this.size === 'small',
        },
      ];
    },

    // 内容区样式类
    bodyClasses() {
      return [
        'jh-card-body',
        {
          'jh-card-body--small': this.size === 'small',
          'jh-card-body--ghost': this.ghost,
          'jh-card-body--center': this.layout === 'center',
        },
      ];
    },

    // 内容区样式
    bodyStyles() {
      return {
        ...this.bodyStyle,
        flexDirection: this.direction,
      };
    },

    // Tabs 样式类
    tabsClasses() {
      return [
        'jh-card-tabs',
        {
          'jh-card-tabs--card': this.tabs?.type === 'card',
        },
      ];
    },
  },

  watch: {
    'tabs.activeKey'(val) {
      this.activeTabKey = val;
    },
  },

  mounted() {
    // 收集 TabPane 子组件
    if (this.tabs && this.$slots.default) {
      this.collectTabPanes();
    }
  },

  methods: {
    // 切换折叠状态
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
      this.$emit('collapse', this.isCollapsed);
    },

    // 处理标签页切换
    handleTabChange(key) {
      this.activeTabKey = key;
      this.$emit('tab-change', key);
      if (this.tabs?.onChange) {
        this.tabs.onChange(key);
      }
    },

    // 收集 TabPane
    collectTabPanes() {
      const panes = [];
      const slots = this.$slots.default || [];
      
      slots.forEach((vnode, index) => {
        if (vnode.componentOptions && vnode.componentOptions.tag === 'jh-card-tab-pane') {
          const props = vnode.componentOptions.propsData || {};
          panes.push({
            key: props.tabKey || index,
            tab: props.tab || `Tab ${index + 1}`,
            content: vnode,
          });
        }
      });

      this.tabPanes = panes;
    },
  },
};
</script>

<style scoped>
/* 卡片容器 */
.jh-card {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 4px;
  transition: box-shadow 0.3s;
  position: relative;
  width: 100%;
}

/* 边框 */
.jh-card--bordered {
  border: 1px solid #e8e8e8;
}

/* 幽灵模式 */
.jh-card--ghost {
  background: transparent;
  border: none;
}

/* 悬浮效果 */
.jh-card--hoverable:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
  cursor: pointer;
}

/* 分栏模式 */
.jh-card--split-vertical,
.jh-card--split-horizontal {
  display: flex;
}

.jh-card--split-vertical {
  flex-direction: row;
}

.jh-card--split-horizontal {
  flex-direction: column;
}

.jh-card--split-vertical > .jh-card,
.jh-card--split-horizontal > .jh-card {
  border-radius: 0;
}

.jh-card--split-vertical > .jh-card:not(:last-child) {
  border-right: 1px solid #e8e8e8;
}

.jh-card--split-horizontal > .jh-card:not(:last-child) {
  border-bottom: 1px solid #e8e8e8;
}

/* 居中布局 */
.jh-card--layout-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 标题栏 */
.jh-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  min-height: 56px;
}

.jh-card-header--small {
  padding: 12px 16px;
  min-height: 48px;
}

.jh-card-header-left {
  display: flex;
  align-items: center;
  flex: 1;
}

.jh-card-title {
  font-size: 16px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  line-height: 1.5;
}

.jh-card-extra {
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
}

/* 内容区 */
.jh-card-body {
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.jh-card-body--small {
  padding: 16px;
}

.jh-card-body--ghost {
  padding: 0;
}

.jh-card-body--center {
  justify-content: center;
  align-items: center;
}

/* 加载状态 */
.jh-card-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
}

/* 操作区 */
.jh-card-actions {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 12px 0;
  background: #fafafa;
  border-top: 1px solid #e8e8e8;
}

.jh-card-action-item {
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.65);
  cursor: pointer;
  transition: color 0.3s;
}

.jh-card-action-item:hover {
  color: #1890ff;
}

/* Tabs */
.jh-card-tabs {
  border-bottom: 1px solid #e8e8e8;
}

.jh-card-tabs--card .v-tab {
  border: 1px solid #e8e8e8;
  border-bottom: none;
  background: #fafafa;
  margin-right: 2px;
}

.jh-card-tabs--card .v-tab--active {
  background: #ffffff;
}

/* 小尺寸 */
.jh-card--small .jh-card-title {
  font-size: 14px;
}

/* Divider */
.jh-card-divider {
  margin: 0;
}
</style>
