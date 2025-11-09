<!-- 
  JhTreeSelect - 树形选择组件
  
  Props:
  - value: v-model 绑定的已选节点列表 Array
  - visible: 是否显示对话框 Boolean
  - mode: 'multiple' | 'single' - 多选或单选模式
  - title: 对话框标题 String
  - placeholder: 搜索框占位符 String
  - maxWidth: 对话框最大宽度 String
  - data: 树形数据 Array<TreeNode>
  - nodeKey: 节点唯一标识字段名 String (默认: 'id')
  - nodeLabel: 节点显示文本字段名 String (默认: 'label')
  - nodeChildren: 子节点字段名 String (默认: 'children')
  - allowSelectNode: 是否允许选择节点本身 Boolean (默认: false)
  - showSearch: 是否显示搜索框 Boolean (默认: true)
  - showSelectAll: 是否显示全选按钮 Boolean (默认: true, 仅多选模式)
  
  Events:
  - input: v-model 更新事件
  - update:visible: 显示状态更新事件
  - confirm: 确认选择事件
  - cancel: 取消选择事件
  
  TreeNode 数据结构:
  {
    id: String,           // 节点唯一标识
    label: String,       // 节点显示文本
    children: Array,      // 子节点数组
    [其他自定义字段]
  }
  
  Usage:
  <jh-tree-select
    v-model="selectedNodes"
    :visible.sync="isDialogShown"
    :data="treeData"
    mode="multiple"
    title="选择节点"
    @confirm="handleConfirm"
  ></jh-tree-select>
-->

<template>
  <v-dialog 
    :value="visible" 
    @input="handleDialogInput"
    :max-width="maxWidth" 
    persistent
    :fullscreen="isMobile"
  >
    <v-card>
      <!-- 标题栏 -->
      <v-card-title class="d-flex align-center pa-4">
        <span>{{ title }}</span>
        <v-spacer></v-spacer>
        <v-icon @click="handleClose">mdi-close</v-icon>
      </v-card-title>
      
      <v-card-text class="pa-0">
        <v-row no-gutters :style="contentStyle">
          <!-- 左侧：选择区 -->
          <v-col :cols="isMobile ? 12 : 7" class="border-right">
            <!-- 搜索和工具栏 -->
            <div class="px-3 pt-3" v-if="showSearch || (showSelectAll && mode === 'multiple')">
              <v-text-field
                v-if="showSearch"
                v-model="searchKeyword"
                :placeholder="placeholder"
                prepend-inner-icon="mdi-magnify"
                outlined
                dense
                hide-details
                clearable
                class="mb-3"
              ></v-text-field>
              
              <!-- 工具按钮 -->
              <div class="mb-3 d-flex flex-wrap" v-if="showSelectAll && mode === 'multiple'">
                <v-btn 
                  small 
                  outlined 
                  :disabled="filteredAllNodes.length === 0"
                  @click="handleBatchSelect"
                  class="mr-2 mb-2"
                >
                  <v-icon small left>mdi-checkbox-multiple-marked</v-icon>
                  {{ isAllSelected ? '取消全选' : '全选当前' }}
                </v-btn>
              </div>
            </div>
            
            <v-divider v-if="showSearch || (showSelectAll && mode === 'multiple')"></v-divider>
            
            <!-- 内容区域 -->
            <div :style="listStyle">
              <div class="px-3 py-2" style="height: 100%; overflow-y: auto;">
                <div v-if="loading" class="text-center py-8">
                  <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </div>
                
                <div v-else-if="filteredTreeData.length === 0" class="text-center grey--text py-8">
                  <v-icon size="48" color="grey lighten-1">mdi-file-tree</v-icon>
                  <div class="mt-2">未找到匹配的节点</div>
                </div>
                
                <div v-else>
                  <!-- 树形结构 - 递归渲染 -->
                  <tree-node
                    v-for="node in filteredTreeData"
                    :key="getNodeKey(node)"
                    :node="node"
                    :level="0"
                    :mode="mode"
                    :allow-select-node="allowSelectNode"
                    :expandedNodes="expandedNodes"
                    :tempSelectedNodes="tempSelectedNodes"
                    :nodeKey="nodeKey"
                    :nodeLabel="nodeLabel"
                    :nodeChildren="nodeChildren"
                    :searchKeyword="searchKeyword"
                    :isNodeSelected="isNodeSelected"
                    :isNodeChildrenSelected="isNodeChildrenSelected"
                    @toggle-expand="toggleNodeExpand"
                    @toggle-node="toggleNode"
                    @select-single-node="selectSingleNode"
                    @node-click="handleNodeClick"
                  ></tree-node>
                </div>
              </div>
            </div>
          </v-col>
          
          <!-- 右侧：已选区 -->
          <v-col :cols="isMobile ? 12 : 5" v-if="mode === 'multiple' && !isMobile">
            <div class="pa-3" style="height: 100%; display: flex; flex-direction: column;">
              <div class="d-flex align-center mb-3">
                <span class="text-subtitle-2">
                  已选: {{ tempSelectedNodes.length }}
                </span>
                <v-spacer></v-spacer>
                <v-btn text small color="primary" @click="clearSelection" :disabled="tempSelectedNodes.length === 0">
                  清除
                </v-btn>
              </div>
              
              <v-divider class="mb-3"></v-divider>
              
              <div class="flex-grow-1" style="overflow-y: auto;">
                <div v-if="tempSelectedNodes.length === 0" class="text-center py-8">
                  <v-icon size="64" color="grey lighten-2">mdi-checkbox-multiple-blank-outline</v-icon>
                  <div class="grey--text mt-2">暂无选中内容</div>
                </div>
                
                <div v-else>
                  <!-- 显示选中的节点 -->
                  <v-chip
                    v-for="node in tempSelectedNodes"
                    :key="getNodeKey(node)"
                    class="ma-1"
                    close
                    small
                    @click:close="removeNodeFromTemp(node)"
                  >
                    <v-icon left small>mdi-file-tree</v-icon>
                    {{ getNodeLabel(node) }}
                  </v-chip>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      
      <v-divider></v-divider>
      
      <!-- 底部操作栏 -->
      <v-card-actions class="pa-4">
        <div v-if="mode === 'multiple' && isMobile" class="text-caption">
          已选 {{ tempSelectedNodes.length }}
        </div>
        <v-spacer></v-spacer>
        <v-btn text @click="handleCancel">取消</v-btn>
        <v-btn 
          color="success" 
          @click="handleConfirm"
          :disabled="mode === 'single' && tempSelectedNodes.length === 0"
        >
          确定
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// 递归树节点组件
const TreeNode = {
  name: 'TreeNode',
  template: `
    <div class="mb-1">
      <!-- 节点 -->
      <div class="d-flex align-center py-2 tree-item" :style="{ paddingLeft: (level * 16) + 'px' }">
        <v-checkbox
          v-if="mode === 'multiple' && !allowSelectNode"
          :input-value="isNodeChildrenSelected(node)"
          @change="$emit('toggle-node', node)"
          @click.stop
          hide-details
          dense
          class="mr-2 mt-0"
        ></v-checkbox>
        <v-icon 
          class="mr-2" 
          small
          @click="$emit('toggle-expand', getNodeKey(node))"
          style="cursor: pointer;"
          v-if="hasChildren(node)"
        >
          {{ expandedNodes.includes(getNodeKey(node)) ? 'mdi-chevron-down' : 'mdi-chevron-right' }}
        </v-icon>
        <span v-else class="mr-2" style="width: 20px;"></span>
        <v-icon small class="mr-2" color="primary">mdi-file-tree</v-icon>
        <div class="flex-grow-1" @click="$emit('toggle-expand', getNodeKey(node))" style="cursor: pointer;">
          <div class="font-weight-medium">{{ getNodeLabel(node) }}</div>
          <div class="text-caption grey--text" v-if="hasChildren(node)">
            {{ getChildrenCount(node) }}个子节点
          </div>
        </div>
        <!-- 选择节点按钮 -->
        <v-btn
          v-if="allowSelectNode && mode === 'multiple'"
          x-small
          outlined
          color="primary"
          @click.stop="$emit('toggle-node', node)"
          class="ml-2"
        >
          <v-icon x-small left>mdi-check</v-icon>
          {{ isNodeSelected(node) ? '已选' : '选择' }}
        </v-btn>
        <v-radio
          v-else-if="allowSelectNode && mode === 'single'"
          :value="getNodeKey(node)"
          :input-value="selectedNodeKey"
          @click.stop="handleRadioClick(node)"
          hide-details
          dense
          class="ml-2 mt-0"
        ></v-radio>
      </div>
      
      <!-- 展开内容：子节点 -->
      <v-expand-transition>
        <div v-show="expandedNodes.includes(getNodeKey(node))">
          <!-- 子节点（递归） -->
          <tree-node
            v-for="child in getChildren(node)"
            :key="getNodeKey(child)"
            :node="child"
            :level="level + 1"
            :mode="mode"
            :allow-select-node="allowSelectNode"
            :expandedNodes="expandedNodes"
            :tempSelectedNodes="tempSelectedNodes"
            :nodeKey="nodeKey"
            :nodeLabel="nodeLabel"
            :nodeChildren="nodeChildren"
            :searchKeyword="searchKeyword"
            :isNodeSelected="isNodeSelected"
            :isNodeChildrenSelected="isNodeChildrenSelected"
            @toggle-expand="$emit('toggle-expand', $event)"
            @toggle-node="$emit('toggle-node', $event)"
            @select-single-node="$emit('select-single-node', $event)"
            @node-click="$emit('node-click', $event)"
          ></tree-node>
        </div>
      </v-expand-transition>
    </div>
  `,
  props: {
    node: {
      type: Object,
      required: true
    },
    level: {
      type: Number,
      default: 0
    },
    mode: String,
    allowSelectNode: Boolean,
    expandedNodes: Array,
    tempSelectedNodes: Array,
    nodeKey: String,
    nodeLabel: String,
    nodeChildren: String,
    searchKeyword: String,
    isNodeSelected: Function,
    isNodeChildrenSelected: Function
  },
  computed: {
    selectedNodeKey() {
      return this.tempSelectedNodes.length > 0 ? this.getNodeKey(this.tempSelectedNodes[0]) : null;
    }
  },
  methods: {
    getNodeKey(node) {
      return node[this.nodeKey];
    },
    getNodeLabel(node) {
      return node[this.nodeLabel] || '';
    },
    getChildren(node) {
      const children = node[this.nodeChildren] || [];
      if (!this.searchKeyword) {
        return children;
      }
      const keyword = this.searchKeyword.toLowerCase();
      return children.filter(child => 
        this.getNodeLabel(child).toLowerCase().includes(keyword) ||
        this.hasMatchingChildren(child, keyword)
      );
    },
    hasMatchingChildren(node, keyword) {
      const children = node[this.nodeChildren] || [];
      return children.some(child => 
        this.getNodeLabel(child).toLowerCase().includes(keyword) ||
        this.hasMatchingChildren(child, keyword)
      );
    },
    hasChildren(node) {
      const children = node[this.nodeChildren] || [];
      return children && children.length > 0;
    },
    getChildrenCount(node) {
      const children = node[this.nodeChildren] || [];
      return children ? children.length : 0;
    },
    handleRadioClick(node) {
      this.$emit('select-single-node', node);
    }
  }
};

export default {
  name: 'JhTreeSelect',
  components: {
    TreeNode
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    visible: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'multiple', // 'multiple' | 'single'
      validator: value => ['multiple', 'single'].includes(value)
    },
    title: {
      type: String,
      default: '选择节点'
    },
    placeholder: {
      type: String,
      default: '搜索节点'
    },
    maxWidth: {
      type: String,
      default: '1000px'
    },
    data: {
      type: Array,
      default: () => []
    },
    nodeKey: {
      type: String,
      default: 'id'
    },
    nodeLabel: {
      type: String,
      default: 'label'
    },
    nodeChildren: {
      type: String,
      default: 'children'
    },
    allowSelectNode: {
      type: Boolean,
      default: false
    },
    showSearch: {
      type: Boolean,
      default: true
    },
    showSelectAll: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isMobile: typeof window !== 'undefined' && window.innerWidth < 600,
      currentTab: 0,
      searchKeyword: '',
      tempSelectedNodes: [],
      expandedNodes: []
    };
  },
  computed: {
    contentStyle() {
      return this.isMobile ? 'height: calc(100vh - 120px);' : 'height: 600px;';
    },
    listStyle() {
      const baseHeight = this.showSearch || (this.showSelectAll && this.mode === 'multiple') 
        ? 'calc(100% - 140px)' 
        : 'calc(100% - 60px)';
      return `height: ${baseHeight};`;
    },
    filteredTreeData() {
      if (!this.searchKeyword) {
        return this.data;
      }
      const keyword = this.searchKeyword.toLowerCase();
      return this.filterTreeRecursive(this.data, keyword);
    },
    filteredAllNodes() {
      // 扁平化所有节点（包括子节点）
      const flatten = (nodes) => {
        let result = [];
        nodes.forEach(node => {
          result.push(node);
          const children = node[this.nodeChildren] || [];
          if (children.length > 0) {
            result = result.concat(flatten(children));
          }
        });
        return result;
      };
      const allNodes = flatten(this.data);
      if (!this.searchKeyword) {
        return allNodes;
      }
      const keyword = this.searchKeyword.toLowerCase();
      return allNodes.filter(node => 
        this.getNodeLabel(node).toLowerCase().includes(keyword)
      );
    },
    isAllSelected() {
      if (this.filteredAllNodes.length === 0) return false;
      return this.filteredAllNodes.every(node => this.isNodeSelected(node));
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler(val) {
        if (val) {
          this.initDialog();
        }
      }
    }
  },
  mounted() {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.handleResize);
    }
  },
  beforeDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleResize);
    }
  },
  methods: {
    handleResize() {
      this.isMobile = window.innerWidth < 600;
    },
    
    initDialog() {
      // 初始化临时选择列表
      this.tempSelectedNodes = [...(this.value || [])];
      this.searchKeyword = '';
      this.expandedNodes = [];
      
      // 自动展开有选中节点的父级
      this.autoExpandSelectedNodes();
      
      // 默认展开第一层节点
      if (this.data.length > 0) {
        this.expandedNodes = this.data.slice(0, 3).map(node => this.getNodeKey(node));
      }
    },
    
    autoExpandSelectedNodes() {
      // 自动展开有选中节点的路径
      const selectedKeys = new Set(this.tempSelectedNodes.map(node => this.getNodeKey(node)));
      
      const findPath = (nodes, targetKey, path = []) => {
        for (const node of nodes) {
          const key = this.getNodeKey(node);
          const currentPath = [...path, key];
          
          if (key === targetKey) {
            return currentPath;
          }
          
          const children = node[this.nodeChildren] || [];
          if (children.length > 0) {
            const found = findPath(children, targetKey, currentPath);
            if (found) return found;
          }
        }
        return null;
      };
      
      selectedKeys.forEach(key => {
        const path = findPath(this.data, key);
        if (path) {
          path.forEach(p => this.expandedNodes.push(p));
        }
      });
      
      // 去重
      this.expandedNodes = [...new Set(this.expandedNodes)];
    },
    
    /**
     * 递归过滤树形结构
     */
    filterTreeRecursive(tree, keyword) {
      const result = [];
      tree.forEach(node => {
        const matches = this.getNodeLabel(node).toLowerCase().includes(keyword);
        const children = node[this.nodeChildren] || [];
        const filteredChildren = children.length > 0 ? this.filterTreeRecursive(children, keyword) : [];
        const hasMatchingChildren = filteredChildren.length > 0;
        
        if (matches || hasMatchingChildren) {
          result.push({
            ...node,
            [this.nodeChildren]: filteredChildren
          });
        }
      });
      return result;
    },
    
    getNodeKey(node) {
      return node[this.nodeKey];
    },
    
    getNodeLabel(node) {
      return node[this.nodeLabel] || '';
    },
    
    isNodeSelected(node) {
      const key = this.getNodeKey(node);
      return this.tempSelectedNodes.some(n => this.getNodeKey(n) === key);
    },
    
    isNodeChildrenSelected(node) {
      const children = node[this.nodeChildren] || [];
      if (children.length === 0) return false;
      return children.every(child => this.isNodeSelected(child));
    },
    
    toggleNodeExpand(nodeKey) {
      const index = this.expandedNodes.indexOf(nodeKey);
      if (index > -1) {
        this.expandedNodes.splice(index, 1);
      } else {
        this.expandedNodes.push(nodeKey);
      }
    },
    
    toggleNode(node) {
      if (this.mode === 'single') {
        this.selectSingleNode(node);
        return;
      }
      
      const key = this.getNodeKey(node);
      const index = this.tempSelectedNodes.findIndex(n => this.getNodeKey(n) === key);
      
      if (index > -1) {
        this.tempSelectedNodes.splice(index, 1);
      } else {
        this.tempSelectedNodes.push(node);
      }
    },
    
    selectSingleNode(node) {
      this.tempSelectedNodes = [node];
    },
    
    handleNodeClick(node) {
      if (this.allowSelectNode) {
        this.toggleNode(node);
      } else {
        // 如果不允许选择节点本身，点击时展开/折叠
        this.toggleNodeExpand(this.getNodeKey(node));
      }
    },
    
    handleBatchSelect() {
      if (this.isAllSelected) {
        // 取消全选
        this.filteredAllNodes.forEach(node => {
          const key = this.getNodeKey(node);
          const index = this.tempSelectedNodes.findIndex(n => this.getNodeKey(n) === key);
          if (index > -1) {
            this.tempSelectedNodes.splice(index, 1);
          }
        });
      } else {
        // 全选
        this.filteredAllNodes.forEach(node => {
          if (!this.isNodeSelected(node)) {
            this.tempSelectedNodes.push(node);
          }
        });
      }
    },
    
    removeNodeFromTemp(node) {
      const key = this.getNodeKey(node);
      const index = this.tempSelectedNodes.findIndex(n => this.getNodeKey(n) === key);
      if (index > -1) {
        this.tempSelectedNodes.splice(index, 1);
      }
    },
    
    clearSelection() {
      this.tempSelectedNodes = [];
    },
    
    handleDialogInput(value) {
      this.$emit('update:visible', value);
    },
    
    handleClose() {
      this.handleCancel();
    },
    
    handleCancel() {
      this.$emit('update:visible', false);
      this.$emit('cancel');
    },
    
    handleConfirm() {
      // 触发事件
      this.$emit('input', this.tempSelectedNodes);
      this.$emit('update:visible', false);
      this.$emit('confirm', this.tempSelectedNodes);
    }
  }
};
</script>

<style scoped>
.border-right {
  border-right: 1px solid #e0e0e0;
}

.tree-item {
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.tree-item:hover {
  background-color: #f5f5f5;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>

