import textMixin from './text/mixin';
import imageMixin from './image/mixin';

const baseMixin = {
  data: () => {
    return {
      addComponents: ['EditorText', 'EditorImage']
    };
  }
};

export default [baseMixin, textMixin, imageMixin];
