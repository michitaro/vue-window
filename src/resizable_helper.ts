import { naturalSize } from "./dom"


export class ResizableHelper {
    private handles: HandleBase[]

    constructor(readonly container: HTMLElement) {
        this.handles = HandleClasses.map(H => new H(container, this))
    }

    teardown() {
        this.handles.forEach(h => h.teardown())
    }
}


const HandleClasses: { new(container: HTMLElement, helper: ResizableHelper): HandleBase }[] = []


abstract class HandleBase {
    private handle: HTMLElement
    protected handleSize = 8

    constructor(readonly container: HTMLElement, readonly helper: ResizableHelper) {
        this.handle = this.createHandleElement()
        this.handle.addEventListener('mousedown', this.mousedown)
    }

    teardown() {
        this.handle.removeEventListener('mousedown', this.mousedown)
        this.handle.parentElement!.removeChild(this.handle)
    }

    protected x0: number
    protected y0: number
    protected left0: number
    protected top0: number
    protected width0: number
    protected height0: number

    protected minWidth: number
    protected minHeight: number
    protected maxLeft: number
    protected maxTop: number

    private mousedown = (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        const { width: naturalWidth, height: naturalHeight } = naturalSize(this.container)
        this.minWidth = naturalWidth
        this.minHeight = naturalHeight
        const { left, top, width, height, right, bottom } = this.container.getBoundingClientRect()
        this.x0 = e.clientX
        this.y0 = e.clientY
        this.left0 = left
        this.top0 = top
        this.width0 = width
        this.height0 = height
        this.maxLeft = right - naturalWidth
        this.maxTop = bottom - naturalHeight
        document.addEventListener('mousemove', this.mousemove)
        document.addEventListener('mouseup', this.mouseup)
    }

    protected abstract setPosition(e: MouseEvent): void;

    private mousemove = (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        this.setPosition(e)
        const { width, height, left, top } = this.container.getBoundingClientRect()
        this.container.style.width = `${Math.max(this.minWidth, width)}px`
        this.container.style.height = `${Math.max(this.minHeight, height)}px`
        this.container.style.left = `${Math.min(this.maxLeft, left)}px`
        this.container.style.top = `${Math.min(this.maxTop, top)}px`
    }

    private mouseup = (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        document.removeEventListener('mousemove', this.mousemove)
        document.removeEventListener('mouseup', this.mouseup)
    }

    protected abstract applyStyle(style: CSSStyleDeclaration): void

    private createHandleElement() {
        const div = document.createElement('div')
        const style = div.style
        // style.border = 'solid 1px red'
        // style.backgroundColor = 'rgba(0,0,0,0.25)'
        style.position = 'absolute'
        this.applyStyle(style)
        this.container.appendChild(div)
        return div
    }
}


HandleClasses.push(
    class BottomRight extends HandleBase {
        setPosition(e: MouseEvent) {
            this.container.style.width = `${this.width0 + e.clientX - this.x0}px`
            this.container.style.height = `${this.height0 + e.clientY - this.y0}px`
        }
        applyStyle(style: CSSStyleDeclaration) {
            style.width = `${2 * this.handleSize}px`
            style.height = `${2 * this.handleSize}px`
            style.right = `${- this.handleSize}px`
            style.bottom = `${- this.handleSize}px`
            style.cursor = 'nwse-resize'
        }
    },
    class Bottom extends HandleBase {
        setPosition(e: MouseEvent) {
            this.container.style.height = `${this.height0 + e.clientY - this.y0}px`
        }
        applyStyle(style: CSSStyleDeclaration) {
            style.right = `${this.handleSize}px`
            style.left = `${this.handleSize}px`
            style.height = `${2 * this.handleSize}px`
            style.bottom = `${- this.handleSize}px`
            style.cursor = 'ns-resize'
        }
    },
    class BottomLeft extends HandleBase {
        setPosition(e: MouseEvent) {
            this.container.style.left = `${this.left0 + e.clientX - this.x0}px`
            this.container.style.width = `${this.width0 - (e.clientX - this.x0)}px`
            this.container.style.height = `${this.height0 + e.clientY - this.y0}px`
        }
        applyStyle(style: CSSStyleDeclaration) {
            style.left = `${- this.handleSize}px`
            style.bottom = `${- this.handleSize}px`
            style.width = `${2 * this.handleSize}px`
            style.height = `${2 * this.handleSize}px`
            style.cursor = 'nesw-resize'
        }
    },
    class Left extends HandleBase {
        setPosition(e: MouseEvent) {
            this.container.style.left = `${this.left0 + e.clientX - this.x0}px`
            this.container.style.width = `${this.width0 - (e.clientX - this.x0)}px`
        }
        applyStyle(style: CSSStyleDeclaration) {
            style.left = `${- this.handleSize}px`
            style.bottom = `${this.handleSize}px`
            style.width = `${2 * this.handleSize}px`
            style.top = `${this.handleSize}px`
            style.cursor = 'ew-resize'
        }
    },
    class TopLeft extends HandleBase {
        setPosition(e: MouseEvent) {
            this.container.style.left = `${this.left0 + e.clientX - this.x0}px`
            this.container.style.width = `${this.width0 - (e.clientX - this.x0)}px`
            this.container.style.top = `${this.top0 + e.clientY - this.y0}px`
            this.container.style.height = `${this.height0 - (e.clientY - this.y0)}px`
        }
        applyStyle(style: CSSStyleDeclaration) {
            style.left = `${- this.handleSize}px`
            style.top = `${- this.handleSize}px`
            style.width = `${2 * this.handleSize}px`
            style.height = `${2 * this.handleSize}px`
            style.cursor = 'nwse-resize'
        }
    },
    class Top extends HandleBase {
        setPosition(e: MouseEvent) {
            this.container.style.top = `${this.top0 + e.clientY - this.y0}px`
            this.container.style.height = `${this.height0 - (e.clientY - this.y0)}px`
        }
        applyStyle(style: CSSStyleDeclaration) {
            style.left = `${this.handleSize}px`
            style.right = `${this.handleSize}px`
            style.height = `${2 * this.handleSize}px`
            style.top = `${- this.handleSize}px`
            style.cursor = 'ns-resize'
        }
    },
    class TopRight extends HandleBase {
        setPosition(e: MouseEvent) {
            this.container.style.top = `${this.top0 + e.clientY - this.y0}px`
            this.container.style.height = `${this.height0 - (e.clientY - this.y0)}px`
            this.container.style.width = `${this.width0 + e.clientX - this.x0}px`
        }
        applyStyle(style: CSSStyleDeclaration) {
            style.right = `${- this.handleSize}px`
            style.top = `${- this.handleSize}px`
            style.height = `${2 * this.handleSize}px`
            style.width = `${2 * this.handleSize}px`
            style.cursor = 'nesw-resize'
        }
    },
    class Right extends HandleBase {
        setPosition(e: MouseEvent) {
            this.container.style.width = `${this.width0 + e.clientX - this.x0}px`
        }
        applyStyle(style: CSSStyleDeclaration) {
            style.right = `${- this.handleSize}px`
            style.top = `${this.handleSize}px`
            style.bottom = `${this.handleSize}px`
            style.width = `${2 * this.handleSize}px`
            style.cursor = 'ew-resize'
        }
    },
)