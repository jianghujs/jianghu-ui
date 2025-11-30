# 设计：JhTable ProTable Parity

## 现状回顾
- 数据通道：`items`（前端分页） + `request`（服务端）+ `pagination`；`headers` 用于列渲染，当前字段较轻（`text/value/width/copyable/ellipsis/slot`）。
- 交互：批量操作、列显示开关、筛选条（靠 `filterFields` 手动配置）、轮询/防抖、`rowSelection`/`actionColumn`。
- 缺失：列 schema 没有语义化信息，筛选与列配置脱节；表格本体不支持 inline edit；没有原生拖拽排序能力。

## 列 Schema 设计
1. **Value 描述**
   - 新增 `valueType: 'text' | 'digit' | 'money' | 'percent' | 'progress' | 'status' | 'date' | 'dateTime' | 'dateRange' | 'index' | 'code' | 'avatar' | 'json'...`。
   - `valueEnum: Record<string, { text: string; status?: 'success' | 'warning' | 'error' | 'default'; color?: string; icon?: string }>`，用于 valueType 为 status/tag 的默认渲染。
   - `valueFormatter(row)` 和 `valueProps` 可覆盖默认渲染。
2. **Search 元数据**
   - 列可声明 `search: false | { valueType?: string; formItemProps?: object; transform?: function; initialValue?: any }`。
   - `JhTable` 将 `headers` 中 `search !== false` 的列生成 `filterFields`，默认类型映射到 `JhQueryFilter` 的控件（select/dateRange/inputNumber 等）。
   - 新增 `autoSyncFilter`（默认 true）控制是否自动注入，保留手动 `filterFields` 的场景。
3. **实现要点**
   - 在渲染单元格时根据 valueType/valueEnum 选择默认组件（`v-chip`、`v-progress-linear`、`v-avatar` 等）。
   - 内部维护 `computedFilterFields`，合并用户传入的 `filterFields`。
   - 搜索表单提交后，通过 `transform`/`valueFormatter` 生成 `requestParams.filters`。

## 内联编辑设计
1. **配置结构**
   ```ts
   editable: false | {
     type?: 'single' | 'multiple';
     editableKeys?: (string | number)[];
     defaultEditableKeys?: (string | number)[];
     onSave?: (key, row, originRow) => Promise<boolean|void>;
     onCancel?: (key, row, originRow) => void;
     onDelete?: (key, row, originRow) => Promise<boolean|void>;
     actionRender?: (row, defaultDoms) => VNode[];
     recordCreatorProps?: false | { position?: 'top' | 'bottom'; record?: () => any; icon?: string; text?: string };
     formProps?: { layout?: 'vertical' | 'inline'; rules?: object };
   }
   ```
2. **编辑表单**
   - 通过 `JhFormFields` + `JhForm` 的 schema 描述（字段同列 `headers`），共享验证规则、`valueEnum`、`valueType`。
   - `editableKeys` 控制哪些行处于编辑状态；`defaultEditableKeys` 初始化值；受控模式下通过 `update:editableKeys` 通知外部。
   - 保存时优先调用 `editable.onSave`，若返回 `false`/`Promise.reject` 则保留编辑状态。
   - 自动与 `request` 数据源互动：保存成功后触发 `reload()` 或直接替换本地 `items`。
3. **操作区**
   - 默认渲染 “编辑/保存/取消/删除”按钮，可通过 `editable.actionRender` 自定义。
   - 兼容批量选择，编辑状态行不允许被勾选（与 ProTable 一致）。

## 拖拽排序设计
1. **配置**
   ```ts
   dragSort: false | {
     type?: 'row' | 'handle' | 'column';
     dragSortKey?: string;      // 列模式下必填
     handleColumn?: string;     // 行模式 + handle 专用
     columnPersistence?: boolean;
   }
   ```
2. **实现**
   - 行拖拽采用 `vuedraggable`（或类似轻量库）包裹 `<tbody>`；`type: 'handle'` 时自动生成拖拽图标列（或复用 action column）。
   - 列拖拽在列设置面板中实现 reorder，持久化至 `columnsState` 并在渲染 headers 时根据顺序排序。
   - 触发 `drag-sort` 事件，payload 包含 `type`, `oldIndex`, `newIndex`, `records`。
   - 与可编辑/选择模式兼容：拖拽时禁用文本选中，维护选中/编辑记录的跟随顺序。

## 兼容性 & 迁移
- 所有新增 props 默认关闭，不影响已有使用方式。
- `filterFields` 仍可手写，组件会将自动生成的字段与用户字段合并（以用户为准）。
- 文档提供 “旧 API vs 新 API” 对照示例。
- 若业务已自定义 inline edit 或拖拽，需要手动迁移到新版配置，但 component 将暴露底层事件（`editable-save`、`drag-sort`）方便桥接。
