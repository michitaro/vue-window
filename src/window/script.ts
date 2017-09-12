import { Vue, Component, Prop, Inject, Watch } from "vue-property-decorator"
import { DraggableHelper } from "../draggable_helper"
import { ResizableHelper } from "../resizable_helper"
import { WindowStyle } from "../style"
import MyButton from '../button.vue'
import ZIndex from '../z_index.vue'
import { naturalSize } from "../dom"


const instances: WindowType[] = []


@Component({
    components: { MyButton, ZIndex }
})
export class WindowType extends Vue {
    @Prop({ type: Boolean, default: true })
    isOpen: boolean

    @Prop({ type: String, default: '' })
    title: string

    @Prop({ type: Boolean, default: false })
    closeButton: boolean

    @Prop({ type: Boolean, default: false })
    resizable: boolean

    @Prop({ type: Boolean, default: true })
    raiseZIndexWhenOpen: boolean

    @Prop({ type: String, default: 'auto' })
    initialPosition: string

    @Prop({ type: Number, default: 0 })
    zGroup: number

    @Inject()
    windowStyle: WindowStyle

    draggableHelper: DraggableHelper
    resizableHelper: ResizableHelper

    mounted() {
        instances.push(this)
        this.isOpen && setPosition(this, this.initialPosition)
        this.draggableHelper = new DraggableHelper(this.titlebarElement(), this.windowElement())
        this.resizable && (this.resizableHelper = new ResizableHelper(this.windowElement()))
    }

    beforeDestroy() {
        this.resizableHelper && this.resizableHelper.teardown()
        this.draggableHelper.teardown()
        instances.splice(instances.indexOf(this), 1)
    }

    windowElement() {
        return this.$refs.window as HTMLElement
    }

    titlebarElement() {
        return this.$refs.titlebar as HTMLElement
    }

    get style() {
        return this.windowStyle
    }

    @Watch('resizable')
    private onResizableChange(resizable: boolean) {
        console.error("prop 'resizable' can't be changed")
    }

    @Watch('isOpen')
    private onIsOpenChange(isOpen: boolean) {
        if (isOpen && this.raiseZIndexWhenOpen)
            (this.$refs.zIndex as any).raise()
    }
}


function setPosition(w: WindowType, positionString: string) {
    const el = w.windowElement()
    const { width, height } = naturalSize(el)
    let left: number
    let top: number
    switch (positionString) {
        case 'auto':
            {
                let x = 20
                let y = 40
                let nTries = 0
                do {
                    if (instances.every(j => {
                        if (w == j)
                            return true
                        const { left, top } = j.windowElement().getBoundingClientRect()
                        return distance(left, top, x, y) > 4
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
    el.style.left = `${left}px`
    el.style.top = `${top}px`
}


function distance(x1: number, y1: number, x2: number, y2: number) {
    const dx = x1 - x2
    const dy = y1 - y2
    return Math.sqrt(dx * dx + dy * dy)
}