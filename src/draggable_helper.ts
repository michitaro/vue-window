export class DraggableHelper {
    constructor(readonly handle: HTMLElement, readonly container: HTMLElement, readonly onMove?: () => void) {
        handle.addEventListener('mousedown', this.mousedown)
        handle.classList.add('draggable-handle')
    }

    teardown() {
        this.handle.removeEventListener('mousedown', this.mousedown)
        this.handle.classList.remove('draggable-handle')
    }

    private offsetX: number
    private offsetY: number

    private mousedown = (e: MouseEvent) => {
        // e.stopPropagation()
        e.preventDefault()
        const { left, top } = this.handle.getBoundingClientRect()
        this.offsetX = e.clientX - left
        this.offsetY = e.clientY - top
        document.addEventListener('mousemove', this.mousemove)
        document.addEventListener('mouseup', this.mouseup)
    }

    private mousemove = (e: MouseEvent) => {
        this.container.style.left = `${e.clientX - this.offsetX}px`
        this.container.style.top = `${e.clientY - this.offsetY}px`
        this.onMove && this.onMove()
    }

    private mouseup = (e: MouseEvent) => {
        document.removeEventListener('mousemove', this.mousemove)
        document.removeEventListener('mouseup', this.mouseup)
    }
}