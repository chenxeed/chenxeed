import textMixin from './text/mixin';
import imageMixin from './image/mixin';
import historyMixin from './history/mixin';

const baseMixin = {
  data: () => {
    return {
      addComponents: ['EditorText', 'EditorImage']
    };
  }
};

export default [baseMixin, textMixin, imageMixin, historyMixin];
