import Vue from 'vue';

export default Vue.extend({
  data: () => {
    return {
      historyList: [],
      historyIndex: -1
    };
  },
  created() {
    this.$on('list-added', (params: any) => {
      const {newList, index, transactional} = params;
      if (transactional) {
        this.record('list-added', {
          newList,
          index
        });
      }
    });
    this.$on('list-modified', (params: any) => {
      const { before, after, transactional } = params;
      if ( transactional) {
        this.record('list-modified', { before, after });
      }
    });
    this.$on('list-removed', (params: any) => {
      const {removedList, index, transactional} = params;
      if (transactional) {
        this.record('list-removed', {
          removedList,
          index
        });
      }
    });
    document.addEventListener('keydown', (evt) => {
      const isInputNode = (dom: HTMLElement) => {
        const inputsNode = [ 'input', 'textarea', 'select', 'button' ];
        return inputsNode.indexOf(dom.nodeName.toLowerCase()) >= 0;
      };
      const target = evt.target as HTMLElement || evt.srcElement as HTMLElement;
      if ( target && isInputNode(target)) {
        return;
      }
      const cmdPressed = evt.metaKey || evt.ctrlKey;
      const shiftPressed = evt.shiftKey;

      switch (evt.keyCode) {
        case 90: // Z
          if (cmdPressed && shiftPressed) { // redo
            evt.preventDefault();
            this.redo();
          } else if (cmdPressed) { // undo
            evt.preventDefault();
            this.undo();
          }
          break;
        case 89: // Y
          if (cmdPressed) { // redo
            evt.preventDefault();
            this.redo();
          }
          break;
      }
    });
  },
  methods: {
    record(action: string, params: any) {
      const record = {
        action,
        params
      };
      (this.historyList as any[]).splice(this.historyIndex + 1);
      (this.historyList as any[]).push(record);
      this.historyIndex = this.historyList.length - 1;
    },
    undo() {
      if (this.historyIndex >= 0) {
        const history: any = this.historyList[this.historyIndex];
        switch (history.action) {
          case 'list-added': {
            const list = history.params.newList;
            (this as any).removeList(list.id);
            break;
          }
          case 'list-modified': {
            const list = history.params.before;
            (this as any).modifyList(list.id, list);
            break;
          }
          case 'list-removed': {
            const list = history.params.removedList;
            const index = history.params.index;
            (this as any).addList(list, index);
          }
        }
        this.historyIndex--;
      }
    },
    redo() {
      if (this.historyIndex < this.historyList.length - 1) {
        const history: any = this.historyList[this.historyIndex + 1];
        switch (history.action) {
          case 'list-added': {
            const list = history.params.newList;
            const index = history.params.index;
            (this as any).addList(list, index);
            break;
          }
          case 'list-modified': {
            const list = history.params.after;
            (this as any).modifyList(list.id, list);
            break;
          }
          case 'list-removed': {
            const list = history.params.removedList;
            (this as any).removeList(list.id);
          }
        }
        this.historyIndex++;
      }
    }
  }
});
