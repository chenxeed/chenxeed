import textMixin from './text/mixin';

const baseMixin = {
  data: () => {
    return {
      addComponents: ['addText']
    };
  }
};

export default [baseMixin, textMixin];
