export function naturalSize(el: HTMLElement) {
    const { width, height } = el.style
    el.style.width = 'auto'
    el.style.height = 'auto'
    const rect = contentSize(el)
    el.style.width = width
    el.style.height = height
    return rect
}


export function contentSize(el: HTMLElement) {
    const style = window.getComputedStyle(el)
    const width = Number(style.width!.split('px')[0])
    const height = Number(style.height!.split('px')[0])
    const top = Number(style.top!.split('px')[0])
    const left = Number(style.left!.split('px')[0])
    const right = left + width
    const bottom = top + height
    return { width, height, top, left, bottom, right }
}