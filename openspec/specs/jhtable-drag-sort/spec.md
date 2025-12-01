# jhtable-drag-sort Specification

## Purpose
TBD - created by archiving change update-jhtable-protable-parity. Update Purpose after archive.
## Requirements
### Requirement: Row Drag Sort
JhTable MUST support拖动表格行来调整顺序，并通过事件暴露结果。

#### Scenario: handle-based row dragging
- **GIVEN** `dragSort = { type: 'handle', handleColumn: 'action' }`
- **WHEN** 用户在操作列的拖拽图标上拖动一行
- **THEN** JhTable MUST更新内部数据顺序并触发 `drag-sort` 事件，包含 `type: 'row'`, `oldIndex`, `newIndex`, `records`
- **AND** 如果传入 `request` 模式，组件 MUST在 `drag-sort` 事件中携带当前分页信息，交由业务端处理

### Requirement: Column Drag Sort & Persistence
JhTable MUST提供列拖拽，允许通过 `columnsState` 持久化顺序，与列显隐控制联动。

#### Scenario: drag column in setting panel
- **GIVEN** `dragSort = { type: 'column', columnPersistence: true }` 且用户打开列设置面板
- **WHEN** 用户拖动列顺序
- **THEN** JhTable MUST即时调整表格渲染顺序，并把新的顺序写入 `columnsState.persistenceKey` 对应的本地存储
- **AND** 重新加载页面后，应从存储中恢复列顺序

