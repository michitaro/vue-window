import { Component, Inject, Prop, Vue, Watch } from "vue-property-decorator";
import { naturalSize } from "../dom";
import { DraggableHelper } from "../draggable_helper";
import { ResizableHelper } from "../resizable_helper";
import { WINDOW_STYLE_KEY, WindowStyle } from "../style";
import { windows } from '../windows';
import { ZElement } from "../z_element";
import MyButton from '../button/index.vue'

const instances: WindowType[] = []


interface Rect {
  left: number
  top: number
  width: number
  height: number
}


@Component({
  components: { MyButton }
})
export class WindowType extends Vue {
  @Prop({ type: Boolean, default: true })
  isOpen!: boolean

  @Prop({ type: String, default: '' })
  title!: string

  @Prop({ type: Boolean, default: false })
  closeButton!: boolean

  @Prop({ type: Boolean, default: false })
  resizable!: boolean

  @Prop({ type: Boolean, default: false })
  isScrollable!: boolean

  @Prop({ type: Number, default: 8 })
  padding?: number

  @Prop({ type: Boolean, default: true })
  activateWhenOpen!: boolean

  @Prop({ type: String })
  positionHint?: string

  @Prop({ type: Number, default: 0 })
  zGroup!: number

  @Prop({ default: 'visible' })
  overflow!: string

  @Inject(WINDOW_STYLE_KEY)
  windowStyle!: WindowStyle

  private zIndex = 'auto'

  draggableHelper?: DraggableHelper
  resizableHelper?: ResizableHelper

  zElement!: ZElement

  mounted() {
    instances.push(this)
    this.zElement = new ZElement(this.zGroup, zIndex => this.zIndex = `${zIndex}`)
    this.isOpen && this.onIsOpenChange(true)
    windows.add(this)
  }

  beforeDestroy() {
    windows.delete(this)
    this.zElement.unregister()
    this.resizableHelper && this.resizableHelper.teardown()
    this.draggableHelper && this.draggableHelper.teardown()
    instances.splice(instances.indexOf(this), 1)
  }

  windowElement() {
    return this.$refs.window as HTMLElement
  }

  titlebarElement() {
    return this.$refs.titlebar as HTMLElement
  }

  contentElement() {
    return this.$refs.content as HTMLElement
  }

  activate() {
    this.zElement.raise()
    this.$emit('activate')
  }

  get styleWindow() {
    return { ...this.windowStyle.window, zIndex: this.zIndex, overflow: this.overflow }
  }

  get styleTitlebar() {
    return this.windowStyle.titlebar
  }

  get styleContent() {
    const style = { ...this.windowStyle.content };

    if (this.resizable) {
      style.padding = '0';
    } else if (this.padding != undefined) {
      style.padding = `${this.padding}px`
    }

    if (this.isScrollable) {
      style.overflow = 'auto';
    }

    return style;
  }

  @Watch('resizable')
  onResizableChange(resizable: boolean) {
    console.error("prop 'resizable' can't be changed")
  }

  private openCount = 0

  @Watch('isOpen')
  onIsOpenChange(isOpen: boolean) {
    if (isOpen) {
      this.$nextTick(() => {
        if (this.openCount++ == 0) {
          this.setWindowRect(this)
          this.setInitialPosition()
        }
        this.resizable && this.onWindowResize()
        this.onWindowMove()
        this.draggableHelper = new DraggableHelper(this.titlebarElement(), this.windowElement(), {
          onMove: () => this.onWindowMove(),
          onMoveStart: () => this.$emit('move-start'),
          onMoveEnd: () => this.$emit('move-end'),
        })
        this.resizable && this.initResizeHelper()
      })
      this.activateWhenOpen && this.activate()
    }
  }

  @Watch('zGroup')
  onZGroupChange() {
    this.zElement.group = this.zGroup
  }

  fixPosition() {
    const w = this.windowElement()
    const rect = w.getBoundingClientRect()
    if (rect.left < 0) w.style.left = `0px`
    if (rect.top < 0) w.style.top = `0px`
    if (rect.right > window.innerWidth) w.style.left = `${window.innerWidth - rect.width}px`
    if (rect.bottom > window.innerHeight) w.style.top = `${window.innerHeight - rect.height}px`
  }

  @Prop({ type: Number })
  left?: number
  @Watch('left')
  onLeftChange(left: number) {
    this.setWindowRect({ left })
    this.onWindowMove(false)
  }

  @Prop({ type: Number })
  top?: number
  @Watch('top')
  onTopChange(top: number) {
    this.setWindowRect({ top })
    this.onWindowMove(false)
  }

  @Prop({ type: Number })
  width?: number
  @Watch('width')
  onWidthChange(width: number) {
    this.setWindowRect({ width })
    this.onWindowResize(false)
  }

  @Prop({ type: Number })
  height?: number
  @Watch('height')
  onHeightChange(height: number) {
    this.setWindowRect({ height })
    this.onWindowResize(false)
  }

  private setWindowRect({ width, height, top, left }: Partial<Rect>) {
    const w = this.windowElement()
    if (width != undefined) {
      w.style.width = `${width}px`
    }
    if (height != undefined) {
      const tHeight = contentSize(this.titlebarElement()).height
      w.style.height = `${height + tHeight}px`
    }
    if (left != undefined) {
      w.style.left = `${left}px`
    }
    if (top != undefined) {
      w.style.top = `${top}px`
    }
  }

  @Prop({ type: Number, default: 1 })
  minWidth!: number

  @Prop({ type: Number, default: 0 })
  minHeight!: number

  @Prop({ type: Number })
  maxWidth?: number

  @Prop({ type: Number })
  maxHeight?: number

  private initResizeHelper() {
    const { height: titlebarHeight } = naturalSize(this.titlebarElement())
    this.resizableHelper = new ResizableHelper(this.windowElement(), {
      onResize: () => this.onWindowResize(),
      onResizeStart: () => this.$emit('resize-start'),
      onResizeEnd: () => this.$emit('resize-end'),
      minWidth: this.minWidth,
      minHeight: this.minHeight + titlebarHeight,
      maxWidth: this.maxWidth,
      maxHeight: this.maxHeight ? this.maxHeight + titlebarHeight : undefined,
    })
  }

  private onWindowResize(emitUpdateEvent = true) {
    const w = this.windowElement()
    const t = this.titlebarElement()
    const c = this.contentElement()
    const { width: cW0, height: cH0 } = contentSize(c)
    const { width: wW, height: wH } = contentSize(w)
    const tH = contentSize(t).height
    const cW1 = wW - (c.offsetWidth - cW0)
    const cH1 = (wH - tH - (c.offsetHeight - cH0))
    c.style.width = `${cW1}px`
    c.style.height = `${cH1}px`
    fixPosition()
    this.$emit('resize', new WindowResizeEvent(cW1, cH1))
    if (emitUpdateEvent) {
      this.$emit('update:width', cW1)
      this.$emit('update:height', cH1)
    }
  }

  private onWindowMove(emitUpdateEvent = true) {
    this.fixPosition()
    const { left, top } = this.windowElement().getBoundingClientRect()
    if (emitUpdateEvent) {
      this.$emit('update:left', left)
      this.$emit('update:top', top)
    }
  }

  // todo: cleanup
  private setInitialPosition() {
    const el = this.windowElement()
    const { width, height } = naturalSize(el)
    let left: number
    let top: number
    if ((this.left !== undefined) != (this.top !== undefined)) {
      throw new Error(`Either of left or top is specified. Both must be set or not set.`)
    }
    if (typeof this.left == 'number') {
      left = this.left
      top = this.top as number
    }
    else {
      const positionString = this.positionHint || 'auto'
      switch (positionString) {
        case 'auto':
          {
            let x = 20
            let y = 50
            let nTries = 0
            do {
              if (instances.every(j => {
                if (!j.isOpen || this == j)
                  return true
                const p = leftTop(j)
                if (p == null)
                  return true
                const { left, top } = p
                return distance2(left, top, x, y) > 16
              })) {
                break
              }
              x = (x + 40) % (window.innerWidth - 200)
              y = (y + 40) % (window.innerHeight - 200)
            } while (++nTries < 100)
            left = x
            top = y
          }
          break
        case 'center':
          left = (window.innerWidth - width) / 2
          top = (window.innerHeight - height) / 2
          break
        default:
          try {
            const nums = positionString.split('/').map(Number)
            if (nums.length != 2)
              throw null
            const [x, y] = nums
            if (!isFinite(x) || !isFinite(y))
              throw null
            left = x >= 0 ? x : window.innerWidth - width + x
            top = y >= 0 ? y : window.innerHeight - height + y
          }
          catch (e) {
            throw new Error(`invalid position string: ${positionString}`)
          }
      }
    }
    el.style.left = `${left}px`
    el.style.top = `${top}px`
  }


  closeButtonClick() {
    this.$emit('closebuttonclick')
    this.$emit('update:isOpen', false)
  }
}


function css2num(s: string | null) {
  return s !== null ? parseFloat(s) : 0
}


function contentSize(el: HTMLElement) {
  const s = window.getComputedStyle(el)
  const width = Math.ceil([s.paddingLeft, s.width, s.paddingRight].map(css2num).reduce((a, b) => a + b))
  const height = Math.ceil([s.paddingTop, s.height, s.paddingBottom].map(css2num).reduce((a, b) => a + b))
  return { width, height }
}


export class WindowResizeEvent {
  constructor(readonly width: number, readonly height: number) { }
}


function leftTop(w: WindowType) {
  const el = w.windowElement()
  const left = parseFloat(el.style.left || 'NaN')
  const top = parseFloat(el.style.top || 'NaN')
  if (!isNaN(left) && !isNaN(top))
    return { left, top }
  return null
}


function distance2(x1: number, y1: number, x2: number, y2: number) {
  const dx = x1 - x2
  const dy = y1 - y2
  return dx * dx + dy * dy
}


export function fixPosition() {
  windows.forEach(w => {
    w.fixPosition()
  })
}


window.addEventListener('resize', e => fixPosition())