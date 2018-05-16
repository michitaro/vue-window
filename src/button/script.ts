import { WindowStyle, STYLE_KEY } from "../style"
import { Component, Vue, Prop, Inject } from "vue-property-decorator"

@Component
export class Button extends Vue {
    @Inject(STYLE_KEY)
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

    mousedown(e: MouseEvent) {
        e.preventDefault()
        this.active = true
        document.addEventListener('mouseup', e => this.active = false)
    }
}