<template>

  <div class="wrapper">

    <div>
      Switch Mode
      <select v-model="selectedMode">
        <option value="vue">Vue</option>
        <option value="native">Native</option>
      </select>
      <div>
        Number of Block(s) :
        <input v-model="blockCount" />
      </div>

      <div>
        Number of Element(s) in each block :
        <input v-model="elementCount" />
      </div>

      <div>
        Debug Average (ms) {{ debugAverage }}
      </div>
    </div>

    <template v-if="selectedMode === 'vue'">
      <div v-for="blockId in blockList" :key="blockId" class="block">
        <template v-for="elementId in blocks[blockId].elements">
          <div
            :key="elementId"
            :id="`element-${elementId}`"
            :style="elementStyle(elements[elementId])"
            class="element"
            @mousedown.prevent="mouseDownElement">
            <img src="~./test.jpg" />
          </div>
        </template>
      </div>
    </template>

    <template v-if="selectedMode === 'native'">
      <div id="nativeWrapper">
      </div>
    </template>

  </div>
  
</template>
<script lang="ts">
// { left : elements[elementId].x+'px', top : elements[elementId].y+'px' }
// elementStyle(elements[elementId])
import { Component, Watch, Vue } from 'vue-property-decorator';
import imageUrl from './test.jpg';

interface IBlock {
  id: string;
  elements: Array<IElement['id']>;
}

interface IBlocks {
  [key: string]: IBlock;
}

type IBlockList = Array<IBlock['id']>;

interface IElement {
  id: string;
  x: number;
  y: number;
}

interface IElements {
  [key: string]: IElement;
}

interface ICoord {
  x: number;
  y: number;
}

type IElementList = Array<IElement['id']>;

@Component({})

export default class DragDropElement extends Vue {

  private selectedMode: string = 'vue';

  private blocks: IBlocks  = {};
  private blockList: IBlockList = [];
  private elements: IElements = {};
  private elementList: IElementList = [];
  private blockCount: number = 1;
  private elementCount: number = 1;
  private chosenElement: IElement | undefined = undefined;
  private mouseDownCoord: ICoord | undefined = undefined;

  private performanceFlag: number = 0;
  private debugTime: number[] = [];

  get debugAverage() {
    const sum = this.debugTime
      .reduce( (total: number, val: number) => total + val, 0);
    return sum === 0 ? sum : sum / this.debugTime.length;
  }

  @Watch('blockCount', { immediate : true } )
  private onBlockCount() {
    this.initMode();
  }

  @Watch('elementCount', { immediate : true } )
  private onElementCount() {
    this.initMode();
  }

  @Watch('selectedMode', { immediate : true })
  private async onSelectMode( val: string ) {
    this.initMode();
  }

  private async initMode() {
    switch (this.selectedMode) {
      case 'vue' :
        this.generateElement();
        break;
      case 'native' :
        await this.$nextTick();
        this.nativeDragDropScript();
        break;
    }
  }

  private generateElement() {
    this.blocks = {};
    this.blockList = [];
    this.elements = {};
    this.elementList = [];
    for ( let i = 0; i < this.blockCount; i++ ) {
      const newBlockId = this.getId();
      this.blocks[newBlockId] = {
        id : newBlockId,
        elements : []
      };
      this.blockList.push( newBlockId );
      for ( let j = 0; j < this.elementCount; j++ ) {
        const newElementId = this.getId();
        this.elements[newElementId] = {
          id : newElementId,
          x : Math.round(Math.random() * 600),
          y : Math.round(Math.random() * 350)
        };
        this.elementList.push( newElementId );
        this.blocks[newBlockId].elements.push( newElementId );
      }
    }
  }

  private getId(): string {
    return Math.round(Math.random() * 1000000000).toString();
  }

  private elementStyle( element: IElement ) {
    return {
      left : element.x + 'px',
      top : element.y + 'px'
    };
  }

  private mouseDownElement( e: MouseEvent ) {
    const target = e.target as HTMLDivElement;
    const elementId = target && target.id.replace( 'element-', '' );
    this.mouseDownCoord = {
      x : e.pageX,
      y : e.pageY
    };
    this.chosenElement = Object.assign({}, this.elements[elementId] );
    document.addEventListener( 'mousemove', this.mouseMoveElement );
    document.addEventListener( 'mouseup', this.mouseUpElement );
    this.debugReset();
    this.debugInit();
  }

  private mouseMoveElement( e: MouseEvent ) {
    this.debugFlag();
    this.debugInit();
    if ( this.mouseDownCoord && this.chosenElement ) {
      const moveCoordinate = {
        x : e.pageX - this.mouseDownCoord.x,
        y : e.pageY - this.mouseDownCoord.y
      };
      this.elements[this.chosenElement.id].x = this.chosenElement.x + moveCoordinate.x;
      this.elements[this.chosenElement.id].y = this.chosenElement.y + moveCoordinate.y;
    }
  }

  private mouseUpElement( e: MouseEvent ) {
    this.mouseDownCoord = undefined;
    this.chosenElement = undefined;
    document.removeEventListener( 'mousemove', this.mouseMoveElement );
    document.removeEventListener( 'mouseup', this.mouseUpElement );
  }

  private debugReset() {
    this.debugTime = [];
  }

  private debugInit() {
    this.performanceFlag = Date.now();
  }

  private debugFlag() {
    this.debugTime.push( Date.now() - this.performanceFlag );
  }

  private nativeDragDropScript() {
    const vm = this;
    const wrapper = this.$el.querySelector('#nativeWrapper');
    if ( !wrapper ) {
      return;
    }
    // reset the wrapper before running the script
    wrapper.innerHTML = '';
    const blockCount = this.blockCount;
    const elementCount = this.elementCount;
    const initialCoord: {x?: number; y?: number; } = {};
    const chosenElement: {x?: number; y?: number; elm?: HTMLElement} = {};
    for ( let i = 0; i < blockCount; i++ ) {
      const newBlockId = this.getId();
      const blockDiv = document.createElement('div');
      blockDiv.setAttribute('class', 'block');
      blockDiv.id = 'block-' + newBlockId;
      wrapper.appendChild(blockDiv);
      for ( let j = 0; j < elementCount; j++ ) {
        const newElementId = this.getId();
        const elementDiv = document.createElement('div');
        const x = Math.round(Math.random() * 600);
        const y = Math.round(Math.random() * 350);
        elementDiv.id = 'element-' + newElementId;
        elementDiv.setAttribute('class', 'element');
        elementDiv.setAttribute('style', `left: ${x}px; top: ${y}px`);
        elementDiv.addEventListener('mousedown', onMouseDown);
        const image = document.createElement('img');
        image.src = imageUrl;
        elementDiv.appendChild(image);
        blockDiv.appendChild(elementDiv);
      }
    }

    function onMouseDown(e: MouseEvent) {
      e.preventDefault();
      const target = e.target as HTMLElement;
      if ( target.style.top && target.style.left ) {
        initialCoord.x = e.pageX;
        initialCoord.y = e.pageY;
        chosenElement.x = parseInt(target.style.left, 10);
        chosenElement.y = parseInt(target.style.top, 10);
        chosenElement.elm = target as HTMLElement;
        document.addEventListener( 'mousemove', onMouseMove );
        document.addEventListener( 'mouseup', onMouseUp );
      }
      vm.debugReset();
      vm.debugInit();
    }

    function onMouseMove(e: MouseEvent) {
      if ( initialCoord.x && initialCoord.y && chosenElement.elm && chosenElement.x && chosenElement.y ) {
        vm.debugFlag();
        vm.debugInit();
        const updateX = e.pageX - initialCoord.x;
        const updateY = e.pageY - initialCoord.y;
        chosenElement.elm.style.left = chosenElement.x + updateX + 'px';
        chosenElement.elm.style.top = chosenElement.y + updateY + 'px';
      }
    }

    function onMouseUp() {
      initialCoord.x = undefined;
      initialCoord.y = undefined;
      chosenElement.x = undefined;
      chosenElement.y = undefined;
      chosenElement.elm = undefined;
      document.removeEventListener( 'mousemove', onMouseMove );
      document.removeEventListener( 'mouseup', onMouseUp );
    }
  }

}
</script>

<style lang="scss">
.block {
  width: 800px;
  height: 500px;
  border: 1px solid black;
  margin: auto;
  position: relative;

  .element {
    position: absolute;
    border: 1px solid grey;

    img {
      width: 150px;
      pointer-events: none;
    }
  }
}
</style>
