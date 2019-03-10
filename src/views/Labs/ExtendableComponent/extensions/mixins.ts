import textMixin from './text/mixin';
import imageMixin from './image/mixin';
import historyMixin from './history/mixin';

const baseMixin = {
  data: () => {
    return {
      addComponents: ['EditorImage', 'EditorText'],
      toolComponents: ['ToolHistory']
    };
  }
};

export default [baseMixin, textMixin, imageMixin, historyMixin];
