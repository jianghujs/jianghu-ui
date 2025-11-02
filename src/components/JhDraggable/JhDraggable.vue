<template>
  <v-app>
    <v-container fluid>
      <v-row class="draggable-container">
        <!-- 左侧组件库 -->
        <v-col v-if="showComponentLibrary" cols="12" md="3">
          <div class="title">{{ componentLibraryTitle }}</div>
          <draggable
            v-if="isDraggableLoaded"
            v-model="componentsInternal"
            :group="{ name: groupName, pull: 'clone', put: false }"
            :animation="animation"
            :drag-class="dragClass"
            :ghost-class="ghostClass"
            :chosen-class="chosenClass"
            @start="handleStart"
            @end="handleEnd"
          >
            <transition-group>
              <div
                class="draggable-item"
                v-for="item in componentsInternal"
                :key="item.id"
              >
                {{ item.name }}
              </div>
            </transition-group>
          </draggable>
        </v-col>

        <!-- 右侧设计区域 -->
        <v-col :cols="showComponentLibrary ? 12 : 12" :md="showComponentLibrary ? 9 : 12">
          <draggable
            v-if="isDraggableLoaded"
            v-model="designAreaInternal"
            :group="groupName"
            :animation="animation"
            :drag-class="dragClass"
            :ghost-class="ghostClass"
            :chosen-class="chosenClass"
            @start="handleStart"
            @end="handleEnd"
          >
            <transition-group>
              <div
                class="draggable-item"
                v-for="item in designAreaInternal"
                :key="item.id"
              >
                <slot name="item" :item="item">
                  {{ item.name }}
                </slot>
              </div>
            </transition-group>
          </draggable>

          <!-- 空状态提示 -->
          <v-row v-show="!designAreaInternal.length" class="ma-0 pa-0" style="width: 100%;">
            <v-card height="100" class="ma-12" width="100%" color="#f5f8fa" style="border: 1px dashed #333333">
              <draggable
                v-if="isDraggableLoaded"
                v-model="designAreaInternal"
                :group="groupName"
                :animation="animation"
                :drag-class="dragClass"
                :ghost-class="ghostClass"
                class="d-flex align-center justify-center"
                style="height: 100%;"
              >
                <v-card-text class="text-center title draggable-placeholder">
                  {{ emptyPlaceholder }}
                </v-card-text>
              </draggable>
            </v-card>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'JhDraggable',
  props: {
    // 组件库列表
    components: {
      type: Array,
      default: () => []
    },
    // 设计区域列表
    value: {
      type: Array,
      default: () => []
    },
    // 是否显示组件库
    showComponentLibrary: {
      type: Boolean,
      default: true
    },
    // 组件库标题
    componentLibraryTitle: {
      type: String,
      default: '组件'
    },
    // 分组名称
    groupName: {
      type: String,
      default: 'draggable-group'
    },
    // 动画时长
    animation: {
      type: Number,
      default: 300
    },
    // 拖拽中的样式类
    dragClass: {
      type: String,
      default: 'jh-drag-class'
    },
    // 占位样式类
    ghostClass: {
      type: String,
      default: 'jh-ghost-class'
    },
    // 选中样式类
    chosenClass: {
      type: String,
      default: 'jh-chosen-class'
    },
    // 空状态占位文本
    emptyPlaceholder: {
      type: String,
      default: '从左侧拖入或点选组件进行内容设计'
    }
  },
  data() {
    return {
      drag: false,
      componentsInternal: [],
      designAreaInternal: [],
      isDraggableLoaded: false
    };
  },
  watch: {
    components: {
      handler(val) {
        this.componentsInternal = [...val];
      },
      immediate: true,
      deep: true
    },
    value: {
      handler(val) {
        this.designAreaInternal = [...val];
      },
      immediate: true,
      deep: true
    },
    designAreaInternal: {
      handler(val) {
        this.$emit('input', val);
        this.$emit('change', val);
      },
      deep: true
    }
  },
  mounted() {
    // 检查 vuedraggable 是否已加载
    this.checkDraggableLibrary();
  },
  methods: {
    checkDraggableLibrary() {
      // 检查是否有 draggable 组件可用
      if (this.$options.components.draggable || window.vuedraggable) {
        this.isDraggableLoaded = true;
      } else {
        console.warn('Vue Draggable library is not loaded. Please include vuedraggable library.');
        // 提供一个降级方案，使用原生的 v-for
        this.isDraggableLoaded = false;
      }
    },
    handleStart() {
      this.drag = true;
      this.$emit('start');
    },
    handleEnd() {
      this.drag = false;
      this.ensureUniqueIds();
      this.$emit('end');
    },
    // 确保每个项目有唯一的 id
    ensureUniqueIds() {
      const allIds = [
        ...this.componentsInternal.map(item => item.id),
        ...this.designAreaInternal.map(item => item.id)
      ];
      let maxId = Math.max(...allIds);

      this.designAreaInternal.forEach(item => {
        if (this.componentsInternal.some(comp => comp.id === item.id)) {
          item.id = ++maxId;
        }
      });
    }
  }
};
</script>

<style scoped>
.draggable-container {
  margin: 10px;
}

.title {
  padding: 6px 12px;
  font-weight: 500;
  color: #333;
}

.draggable-item {
  padding: 6px 12px;
  margin: 0px 10px 6px 10px;
  border: solid 1px #eee;
  background-color: #f1f1f1;
  cursor: move;
  transition: background-color 0.2s;
}

.draggable-item:hover {
  background-color: #fdfdfd;
}

:deep(.jh-ghost-class) {
  background-color: #e3f2fd !important;
  opacity: 0.8 !important;
}

:deep(.jh-chosen-class) {
  background-color: #bbdefb !important;
  opacity: 1 !important;
}

:deep(.jh-drag-class) {
  background-color: #90caf9 !important;
  opacity: 0.9 !important;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2) !important;
}

.draggable-placeholder {
  color: #999;
  user-select: none;
}
</style>
