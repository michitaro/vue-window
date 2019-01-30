import { WindowStyle, WINDOW_STYLE_KEY } from "../style"
import { Component, Vue, Prop, Inject } from "vue-property-decorator"
import { SinglePointerEvent } from '../SinglePointerEvent';

@Component
export class Button extends Vue {
  @Inject(WINDOW_STYLE_KEY)
  windowStyle!: WindowStyle

  @Prop({ type: Boolean, default: false })
  disabled!: boolean

  hover = false
  active = false

  get style() {
    let s = this.windowStyle.button
    this.hover && (s = { ...s, ...this.windowStyle.buttonHover })
    this.active && (s = { ...s, ...this.windowStyle.buttonActive })
    return s
  }

  mousedown(e: MouseEvent & TouchEvent) {
    e.preventDefault()
    this.active = true
    const unbindUp = SinglePointerEvent.bindUp(document, () => {
      this.active = false
      unbindUp()
    })
  }

  mouseup(e: MouseEvent & TouchEvent) {
    if (this.active) {
      this.$emit('click')
    }
  }
}