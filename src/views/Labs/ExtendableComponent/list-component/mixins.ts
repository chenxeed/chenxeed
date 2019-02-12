import textMixin from './text/mixin';
import imageMixin from './image/mixin';

const baseMixin = {
  data: () => {
    return {
      addComponents: ['addText', 'addImage']
    };
  }
};

export default [baseMixin, textMixin, imageMixin];
