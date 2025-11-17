<template>
  <v-app>
    <v-container fluid class="pa-0">
      <div>
        <div class="jsoneditor-vue" :style="{height}"></div>
      </div>
    </v-container>
  </v-app>
</template>


<script>
export default {
  name: 'JhJsonEditor',
  props: {
    // 编辑器绑定的 JSON 数据，可以是字符串或对象
    value: {
      type: [String, Number, Object, Array],
      default: () => ({})
    },
    // 初始化时是否展开所有节点
    expandedOnStart: {
      type: Boolean,
      default: false
    },
    // 默认模式 tree | code | form | text | view
    mode: {
      type: String,
      default: "code"
    },
    // 可切换的模式集合
    modes: {
      type: Array,
      default: function () {
        return ["tree", "code", "form", "text", "view"];
      }
    },
    // 编辑器容器高度
    height: {
      type: String,
      default: 'calc(100vh - 240px)'
    },
  },
  watch: {
    value: {
      immediate: true,
      async handler(val) {
        if (!this.internalChange) {
          await this.setEditor();

          this.error = false;
          this.expandAll();
        }
      },
      deep: true
    }
  },
  data() {
    return {
      editor: null,
      error: false,
      internalChange: false,
      expandedModes: ["tree", "view", "form"],
    };
  },
  computed: {
    valueType() {
      return typeof this.value;
    },
    formatValue: {
      get() {
        // 如果值是字符串，并且值不为空，则返回JSON.parse(this.value)
        if (this.valueType === "string" && this.value) {
          try {
            return JSON.parse(this.value);
          } catch (e) {
            return this.value;
          }
        }
        return this.value;
      },
      set(val) {
        if (this.valueType === "string" || !this.value) {
          this.value = JSON.stringify(val);
        } else {
          this.value = val;
        }
      }
    },
  },
  mounted() {
    this.$emit("has-error", false);
    // 延迟初始化，等待 JSONEditor 库加载
    if (window.JSONEditor) {
      this.init();
    } else {
      console.warn('JSONEditor is not loaded. Please include JSONEditor library.');
    }
  },
  beforeDestroy() {
    if (this.editor) {
      this.editor.destroy();
    }
  },
  methods: {
    init() {
      let _this = this;

      let options = {
        mode: this.mode,
        modes: this.modes,
        themeColor: "#4caf50",
        onChange() {
          try {
            let json = _this.editor.get();
            _this.formatValue = json;
            _this.error = false;
            _this.$emit("has-error", false);
            _this.internalChange = true;
            _this.$emit("input", _this.value);
            _this.$nextTick(function () {
              _this.internalChange = false;
            });
          } catch (e) {
            _this.error = true;
            _this.$emit("has-error", true);
          }
        },
        onModeChange() {
          _this.expandAll();
        }
      };

      if (window.JSONEditor) {
        this.editor = new window.JSONEditor(
          _this.$el.querySelector(".jsoneditor-vue"),
          options,
          _this.formatValue
        );
      }
    },
    expandAll() {
      if (
        this.expandedOnStart &&
        this.editor &&
        this.expandedModes.includes(this.editor.getMode())
      ) {
        this.editor.expandAll();
      }
    },

    async setEditor() {
      if (this.editor) this.editor.set(this.formatValue);
    }
  }
};
</script>

<style scoped>
:deep(.jsoneditor-menu a.jsoneditor-poweredBy) {
  display: none !important;
}
:deep(.jsoneditor-menu) {
  background-color: #4caf50 !important;
  border-bottom: 1px solid #4caf50 !important;
}
:deep(.jsoneditor) {
  border: thin solid #4caf50 !important;
}
:deep(.jsoneditor-modal .pico-modal-header) {
  background: #4caf50 !important;
}
:deep(.jsoneditor-modal .jsoneditor-button-group.jsoneditor-button-group-value-asc input.jsoneditor-button-asc),
:deep(.jsoneditor-modal .jsoneditor-button-group.jsoneditor-button-group-value-desc input.jsoneditor-button-desc) {
  background: #4caf50 !important;
  border-color: #4caf50 !important;
}
</style>
