export type Options = {
    onMove?: () => void,
    onMoveStart?: () => void,
    onMoveEnd?: () => void,
}


export class DraggableHelper {
    constructor(readonly handle: HTMLElement, readonly container: HTMLElement, readonly options: Options = {}) {
        handle.addEventListener('mousedown', this.mousedown)
        handle.classList.add('draggable-handle')
    }

    teardown() {
        this.handle.removeEventListener('mousedown', this.mousedown)
        this.handle.classList.remove('draggable-handle')
    }

    private offsetX!: number
    private offsetY!: number

    private mousedown = (e: MouseEvent) => {
        // e.stopPropagation()
        e.preventDefault()
        const { left, top } = this.handle.getBoundingClientRect()
        this.offsetX = e.clientX - left
        this.offsetY = e.clientY - top
        this.options.onMoveStart && this.options.onMoveStart()
        document.addEventListener('mousemove', this.mousemove)
        document.addEventListener('mouseup', this.mouseup)
    }

    private mousemove = (e: MouseEvent) => {
        this.container.style.left = `${e.clientX - this.offsetX}px`
        this.container.style.top = `${e.clientY - this.offsetY}px`
        this.options.onMove && this.options.onMove()
    }

    private mouseup = (e: MouseEvent) => {
        this.options.onMoveEnd && this.options.onMoveEnd()
        document.removeEventListener('mousemove', this.mousemove)
        document.removeEventListener('mouseup', this.mouseup)
    }
}