export function naturalSize(el: HTMLElement) {
  const { width, height } = el.style
  el.style.width = 'auto'
  el.style.height = 'auto'
  const rect = getRect(el)
  el.style.width = width
  el.style.height = height
  return rect
}


export function getRect(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  const width = rect.width
  const height = rect.height
  const top = rect.top
  const left = rect.left
  const right = left + width
  const bottom = top + height
  return { width, height, top, left, bottom, right }
}