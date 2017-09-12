export function naturalSize(el: HTMLElement) {
    const { width, height } = el.style
    el.style.width = 'auto'
    el.style.height = 'auto'
    const rect = el.getBoundingClientRect()
    el.style.width = width
    el.style.height = height
    return rect
}