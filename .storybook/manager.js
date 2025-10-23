import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

const theme = create({
  base: 'light',
  brandTitle: 'JianghuJS UI',
  brandUrl: 'https://jianghujs.org',
  brandImage: null,
  brandTarget: '_self',
});

addons.setConfig({
  theme,
  panelPosition: 'right',
  showPanel: true,
});
