<template>
  <v-app>
    <v-container fluid class="pa-0">
      <div>
        <div :style="`overflow-y: auto; height: ${height}`">
          <div :id="editorId">
            <textarea style="display:none;">{{ value }}</textarea>
          </div>
        </div>
      </div>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'JhMarkdownEditor',
  props: {
    // 双向绑定的 Markdown 文本内容
    value: {
      type: String,
      default: ""
    },
    // 编辑器空状态提示
    placeholder: {
      type: String,
      default: "请输入内容..."
    },
    // 编辑器容器高度
    height: {
      type: String,
      default: 'calc(100vh - 400px)'
    },
    // 编辑器容器宽度百分比
    width: {
      type: Number,
      default: 100
    },
    // Editor.md 依赖库的静态资源路径
    editorPath: {
      type: String,
      default: '/public/plugins/editor.md/lib/'
    },
    // 自定义工具栏按钮列表
    toolbarIcons: {
      type: Array,
      default: () => [
        "undo", "redo", "|",
        "watch", "preview", "|",
        "h1", "h2", "h3", "h4", "h5",
        "bold", "del", "italic", "quote", "mark",
        "list-ul", "list-ol", "hr", "link",
        "|", "image", "code", "table"
      ]
    },
    // 是否只读模式（禁用编辑）
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      editor: null,
      isMDChange: false,
      editorId: `markdown-editor-${Math.random().toString(36).substr(2, 9)}`
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initEditorMd();
    });
  },
  beforeDestroy() {
    if (this.editor) {
      // 清理编辑器实例
      this.editor = null;
    }
  },
  watch: {
    value(newVal) {
      if (this.editor && !this.isMDChange) {
        this.editor.setMarkdown(newVal);
      }
      this.isMDChange = false;
    }
  },
  methods: {
    initEditorMd() {
      const that = this;
      const editorElement = document.getElementById(this.editorId);

      if (!editorElement) {
        console.warn('Editor container not found');
        return;
      }

      if (!window.editormd) {
        console.warn('Editor.md is not loaded. Please include Editor.md library.');
        return;
      }

      editorElement.innerHTML = `<textarea style="display:none;">${this.value || ""}</textarea>`;

      that.editor = window.editormd(this.editorId, {
        watch: !this.readonly,
        saveHTMLToTextarea: true,
        path: this.editorPath,
        toolbarIcons: this.toolbarIcons,
        placeholder: this.placeholder,
        readOnly: this.readonly,
        onchange: function () {
          that.handleMDChange();
        },
      });
    },

    handleMDChange() {
      this.isMDChange = true;
      const content = this.editor.getMarkdown();
      this.$emit('input', content);
      this.$emit('change', content);

      // 获取预览 HTML
      if (this.editor.getPreviewedHTML) {
        const contentForSeo = this.editor.getPreviewedHTML();
        this.$emit('content-for-seo', contentForSeo);
      }
    },

    // 公开方法
    getMarkdown() {
      return this.editor ? this.editor.getMarkdown() : this.value;
    },

    setMarkdown(content) {
      if (this.editor) {
        this.editor.setMarkdown(content);
      }
    },

    insertValue(text) {
      if (this.editor) {
        this.editor.insertValue(text);
      }
    }
  }
};
</script>

<style scoped>
:deep(.editormd),
:deep(.CodeMirror-gutters),
:deep(.editormd-toolbar),
:deep(.editormd .CodeMirror),
:deep(.editormd-menu > li.divider),
:deep(.editormd-menu > li > a:hover),
:deep(.editormd-menu > li > a.active) {
  border-color: #eff2f5 !important;
}

:deep(.CodeMirror-gutter) {
  background-color: #fff;
}

:deep(.CodeMirror-scroll) {
  overflow-x: hidden !important;
}

:deep(.editormd-dialog-close) {
  color: #3F4254 !important;
}

:deep(.editormd-preview-container ol.linenums li),
:deep(.editormd-html-preview ol.linenums li) {
  list-style-type: none;
}

:deep(.editormd-preview-container ol.linenums),
:deep(.editormd-html-preview ol.linenums) {
  color: #999;
  padding-left: 0;
}

:deep(.editormd) {
  margin-bottom: 0;
}
</style>
