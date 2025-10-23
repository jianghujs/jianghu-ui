# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

JianghuJS UI is a UI component library built with Vue 2.7 and Vuetify 2.x, documented with Storybook 7. The library is designed to be consumed via CDN for simplicity, avoiding complex build configurations.

## Essential Commands

### Development
```bash
npm install                  # Install dependencies
npm run storybook           # Start Storybook dev server on http://localhost:6006
npm run build-storybook     # Build static Storybook site to storybook-static/
npm run serve-storybook     # Serve built Storybook using http-server
```

### Testing the Test Project
The `test/jianghu-project/` directory contains a JianghuJS backend test project:
```bash
cd test/jianghu-project
npm install
# Copy config.local.example.js to config.local.js and configure database
npm run dev                 # Start the test backend server
```

## Architecture

### Component Structure
Each component follows this pattern:
```
src/components/JhComponentName/
├── JhComponentName.vue         # Component implementation
└── JhComponentName.stories.js  # Storybook stories/documentation
```

**Key Pattern:** Components are thin wrappers around Vuetify components. They:
- Accept simplified props that map to Vuetify props
- Use `<v-btn>`, `<v-card>`, `<v-data-table>`, etc. directly in templates
- Emit standard Vue events
- Do NOT include `<v-app>` in the component template (added by Storybook decorator)

### Storybook Configuration
- `.storybook/preview.js` wraps all stories in `<v-app><v-main><v-container>` decorator
- `.storybook/preview-head.html` loads CDN dependencies for preview (but local npm packages are used in dev)
- `.storybook/main.js` configures story locations and autodocs generation

### Entry Point
`src/index.js` exports all components with a Vue plugin install function for both Vue.use() and direct component imports.

## Component Development

### Adding a New Component

1. Create component directory: `src/components/JhNewComponent/`
2. Create Vue file: `JhNewComponent.vue`
   - Use PascalCase for component name
   - Wrap Vuetify component, not `<v-app>`
   - Define props with type, default, validator
   - Emit events with `this.$emit()`
3. Create stories file: `JhNewComponent.stories.js`
   - Export default with `title`, `component`, `tags: ['autodocs']`
   - Export named story objects with `args`
4. Export from `src/index.js`

### Component Template
```vue
<template>
  <v-component-name
    :prop="mappedProp"
    @event="handleEvent"
  >
    <slot>{{ label }}</slot>
  </v-component-name>
</template>

<script>
export default {
  name: 'JhComponentName',
  props: {
    propName: {
      type: String,
      default: '',
      validator: (v) => ['option1', 'option2'].includes(v),
    },
  },
  methods: {
    handleEvent(event) {
      this.$emit('event-name', event);
    },
  },
};
</script>
```

### Stories Template
```javascript
import JhComponentName from './JhComponentName.vue';

export default {
  title: 'Components/JhComponentName',
  component: JhComponentName,
  tags: ['autodocs'],
  argTypes: {
    propName: {
      control: 'select',
      options: ['option1', 'option2'],
    },
  },
};

export const Default = {
  args: {
    propName: 'option1',
  },
};

export const Variant = {
  args: {
    propName: 'option2',
  },
};
```

## Existing Components

### JhButton
Wrapper for `<v-btn>` with props: label, color, size, disabled, loading, outlined, text, block, rounded, prependIcon, appendIcon. Emits: click

### JhCard
Wrapper for `<v-card>` with props: title, subtitle, elevation, outlined, shaped, hover. Slots: title, subtitle, default, actions

### JhTable
Wrapper for `<v-data-table>` with props: headers, items, loading, search, dense, showSelect, singleSelect, itemsPerPage. Emits: row-click. Slots: header.{name}, item.{name}, top, no-data

### JhForm
Dynamic form builder with props: fields (array of field configs), initialData, lazyValidation, dense, outlined, showButtons. Emits: submit, reset

## Code Style

- 2 spaces indentation
- Component names: PascalCase
- Props: camelCase
- Events: kebab-case
- File names: PascalCase for components

## Technology Constraints

- Vue 2.7 (NOT Vue 3)
- Vuetify 2.x (NOT Vuetify 3)
- Storybook 7.x
- CDN deployment pattern (not npm package distribution)

## Test Project Structure

The `test/jianghu-project/` directory is a JianghuJS backend application (EggJS-based) that can be used to test UI components in a full-stack context. It includes:
- Standard JianghuJS project structure with `app/view/page/` for HTML pages
- JianghuJS components in `app/view/component/jianghuJs/`
- Database initialization in `sql/init.sql`
- Config in `config/config.default.js` and `config/config.local.js`
