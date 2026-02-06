import JhIcon from './JhIcon.vue';

export default {
  title: 'JhComponents/JhIcon',
  component: JhIcon,
  argTypes: {
    name: { control: 'text' },
    width: { control: 'number' },
    height: { control: 'number' },
    color: { control: 'color' },
    rotate: { control: 'number' },
    flip: { control: 'select', options: ['horizontal', 'vertical'] },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { JhIcon },
  template: '<jh-icon v-bind="$props" />',
});

export const Default = Template.bind({});
Default.args = {
  name: 'mdi:home',
  width: 24,
  height: 24,
  color: 'primary',
};

export const CustomSize = Template.bind({});
CustomSize.args = {
  name: 'mdi:account',
  width: 48,
  height: 48,
  color: 'success',
};

export const WithHexColor = Template.bind({});
WithHexColor.args = {
  name: 'mdi:heart',
  width: 32,
  height: 32,
  color: '#ff0000',
};
