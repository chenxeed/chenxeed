<template>

  <div class="wrapper">

    <div>
      Number of Block(s) :
      <input v-model="blockCount" />
    </div>

    <div>
      Number of Element(s) in each block :
      <input v-model="elementCount" />
    </div>

    <div>
      Debug Average {{ debugAverage }}
    </div>

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
  </div>
  
</template>
<script lang="ts">
// { left : elements[elementId].x+'px', top : elements[elementId].y+'px' }
// elementStyle(elements[elementId])
import { Component, Watch, Vue } from 'vue-property-decorator';
import { performance } from 'perf_hooks';

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
    const sum = this.debugTime.reduce( (total: number, val: number) => total + val, 0);
    return sum === 0 ? sum : sum / this.debugTime.length;
  }

  @Watch('blockCount', { immediate : true } )
  private onBlockCount( val: number ) {
    this.generateElement();
  }

  @Watch('elementCount', { immediate : true } )
  private onElementCount( val: number ) {
    this.generateElement();
  }

  private generateElement() {
    this.blocks = {};
    this.blockList = [];
    this.elements = {};
    this.elementList = [];
    for ( let i = 0; i < this.blockCount; i++ ) {
      const newBlockId = this.getId();
      this.$set( this.blocks, newBlockId, {
        id : newBlockId,
        elements : []
      });
      this.blockList.push( newBlockId );
      for ( let j = 0; j < this.elementCount; j++ ) {
        const newElementId = this.getId();
        this.$set( this.elements, newElementId, {
          id : newElementId,
          x : Math.round(Math.random() * 600),
          y : Math.round(Math.random() * 350)
        });
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
    this.debugTime = [];
    this.performanceFlag = Date.now();
  }

  private mouseMoveElement( e: MouseEvent ) {
    this.debugTime.push( Date.now() - this.performanceFlag );
    this.performanceFlag = Date.now();
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

}
</script>

<style lang="scss" scoped>
.block {
  width: 800px;
  height: 500px;
  border: 1px solid black;
  margin: auto;
  position: relative;

  .element {
    position: absolute;

    img {
      width: 150px;
      pointer-events: none;
    }
  }
}
</style>
