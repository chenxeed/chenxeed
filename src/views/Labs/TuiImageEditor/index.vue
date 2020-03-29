<template>
  <div class="container">
    <div class="columns">
      <div class="column">TOAST UI IMAGE EDITOR USAGE SHOWCASE</div>
    </div>
    <div class="columns">
      <div class="column is-three-quarters">
        <div>A library to generate image editor build by <a href="https://github.com/nhnent" target="_blank">NHN Entertainment team</a>. Get the source <a href="https://github.com/nhnent/tui.image-editor" target="_blank">here</a>.</div>
        <div
          class="tui-image-editor-wrapper"
          ref="tuiImageEditor"></div>
      </div>
      <div class="column">
        <div class="notification">
          <div>Built-in Interface <input type="checkbox" v-model="withUI"></div>
          <div v-show="shouldShowAPIButton">
            <label>Custom API Button</label><br/>
            <button ref="btnUndo" class="button" @click="undo" disabled>Undo</button>
            <button ref="btnRedo" class="button" @click="redo" disabled>Redo</button>
            <button ref="btnCrop" class="button" @click="crop">Crop</button>
            <button ref="btnDraw" class="button" @click="draw">Draw</button>
          </div>
        </div>        <div>
          My take away of this library:
          <ol>
            <li>The library is a <b>class instance that expect an element as the container</b> for the editor.</li>
            <li>It has <b>built-in UI interface API</b> to setup the theme and icon used for the premade interface. Nice option to setup the image editor with less effort!</li>
            <li>We can create our own button or menu as well to make <b>custom interface with their API</b>. It's very nice since it gives flexibility for developer to create their own Editor UI. Below are the custom button menu created. Check their <a href="https://github.com/nhnent/tui.image-editor/blob/master/examples/example02-useApiDirect.html" target="_blank">example code</a> as well</li>
            <li>Appearantly it seems like we <b>cannot use both built-in UI and custom interface</b>. When I tried it, the built-in UI works but the custom interface button doesn't seems to work properly and triggering error.</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import * as testImage from './test.jpg';
import blackTheme from './black-theme';
import { Component, Watch, Vue } from 'vue-property-decorator';

// tslint:disable-next-line
const ImageEditor = require('tui-image-editor');


@Component({})

export default class TuiImageEditor extends Vue {

  public $refs: {
    tuiImageEditor: Element;
    btnUndo: Element;
    btnRedo: Element;
    btnDraw: Element;
  };

  public imageEditor: any;
  public withUI = false;
  public cropMode = false;
  public drawMode = false;


  get shouldShowAPIButton() {
    return !this.withUI;
  }

  @Watch( 'withUI' )
  public onWithUIChanged(val: boolean) {
    if ( val ) {
      this.initImageEditorWithUI();
    } else {
      this.initImageEditor();
    }
  }

  private mounted() {
    this.initImageEditor();
  }

  private undo() {
    this.imageEditor.undo();
  }

  private redo() {
    this.imageEditor.redo();
  }

  private crop() {
    if ( !this.cropMode ) {
      this.imageEditor.startDrawingMode('CROPPER');
      this.cropMode = true;
    } else {
      this.imageEditor
        .crop(this.imageEditor.getCropzoneRect())
        .then(() => {
          this.imageEditor.stopDrawingMode();
        });
      this.cropMode = false;
    }
  }

  private draw() {
    if ( !this.drawMode ) {
      this.imageEditor.startDrawingMode('FREE_DRAWING');
      this.drawMode = true;
    } else {
      this.imageEditor.stopDrawingMode();
      this.drawMode = false;
    }
  }

  private clearWrapper() {
    this.$refs.tuiImageEditor.innerHTML = '';
    this.$refs.tuiImageEditor.removeAttribute('style');
    this.$refs.tuiImageEditor.setAttribute('class', 'tui-image-editor-wrapper');
  }

  private initImageEditorWithUI() {
    this.clearWrapper();
    this.imageEditor = new ImageEditor( this.$refs.tuiImageEditor, {
      includeUI: {
        loadImage: {
          path: testImage,
          name: 'SampleImage'
        },
        theme: blackTheme, // or whiteTheme
        initMenu: 'filter',
        menuBarPosition: 'bottom'
      },
      cssMaxWidth: 500,
      cssMaxHeight: 500,
      selectionStyle: {
          cornerSize: 20,
          rotatingPointOffset: 70
      }
    });
  }

  private initImageEditor() {
    this.clearWrapper();
    const {
      btnUndo,
      btnRedo } = this.$refs;
    this.imageEditor = new ImageEditor( this.$refs.tuiImageEditor, {
      cssMaxWidth: 500,
      cssMaxHeight: 500,
      selectionStyle: {
          cornerSize: 20,
          rotatingPointOffset: 70
      }
    });
    this.imageEditor.loadImageFromURL( testImage, 'sample image' );
    // attach image editor event listener to manipulate the button
    this.imageEditor.on({
      undoStackChanged(length: number) {
        if (length) {
          btnUndo.removeAttribute('disabled');
        } else {
          btnUndo.setAttribute('disabled', '');
        }
      },
      redoStackChanged(length: number) {
        if (length) {
          btnRedo.removeAttribute('disabled');
        } else {
          btnRedo.setAttribute('disabled', '');
        }
      },
    });
  }
}
</script>
<style src="tui-image-editor/dist/tui-image-editor.css"></style>
<style lang="scss">
.tui-image-editor-wrapper {
  height: 800px !important;

  .tui-image-editor-canvas-container {
    margin: auto;
  }
}
</style>