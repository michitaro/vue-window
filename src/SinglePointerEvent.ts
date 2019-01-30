export function isTouchEvent(e: MouseEvent | TouchEvent): e is TouchEvent {
  return (window as any).TouchEvent && e instanceof TouchEvent
}

export class SinglePointerEvent {
  constructor(readonly e: MouseEvent | TouchEvent) {
  }

  stopPropagation() {
    this.e.stopPropagation()
  }

  preventDefault() {
    this.e.preventDefault()
  }

  get clientX(): number {
    if (isTouchEvent(this.e)) {
      return (this.e.type === 'touchend' ? this.e.changedTouches : this.e.touches).item(0)!.clientX
    } else {
      return this.e.clientX
    }
  }

  get clientY(): number {
    if (isTouchEvent(this.e)) {
      return (this.e.type === 'touchend' ? this.e.changedTouches : this.e.touches).item(0)!.clientY
    } else {
      return this.e.clientY
    }
  }

  get clientCoord() {
    return new V2(this.clientX, this.clientY)
  }

  static bindDown(
    target: HTMLElement,
    cb: (e: SinglePointerEvent) => void,
    cancel?: (e: SinglePointerEvent) => void, useCapture = false,
  ) {
    const mouse = (e: MouseEvent) => {
      cb(new SinglePointerEvent(e))
    }
    const touch = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        cb(new SinglePointerEvent(e))
      }
      if (e.touches.length > 1) {
        cancel && cancel(new SinglePointerEvent(e))
      }
    }
    target.addEventListener('mousedown', mouse, useCapture)
    target.addEventListener('touchstart', touch, useCapture)
    return () => {
      target.removeEventListener('mousedown', mouse, useCapture)
      target.removeEventListener('touchstart', touch, useCapture)
    }
  }

  static bindMove(target: HTMLElement | Document, cb: (e: SinglePointerEvent) => void, useCapture = false) {
    const mouse = (e: MouseEvent) => {
      cb(new SinglePointerEvent(e))
    }
    const touch = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        cb(new SinglePointerEvent(e))
      }
    }
    target.addEventListener('mousemove', mouse as any, useCapture)
    target.addEventListener('touchmove', touch as any, useCapture)
    return () => {
      target.removeEventListener('mousemove', mouse as any, useCapture)
      target.removeEventListener('touchmove', touch as any, useCapture)
    }
  }

  static bindUp(target: HTMLElement | Document, cb: (e: SinglePointerEvent) => void, useCapture = false) {
    const mouse = (e: MouseEvent) => {
      cb(new SinglePointerEvent(e))
    }
    const touch = (e: TouchEvent) => {
      if (e.touches.length === 0) {
        cb(new SinglePointerEvent(e))
      }
    }
    target.addEventListener('mouseup', mouse as any, useCapture)
    target.addEventListener('touchend', touch as any, useCapture)
    return () => {
      target.removeEventListener('mouseup', mouse as any, useCapture)
      target.removeEventListener('touchend', touch as any, useCapture)
    }
  }

  originalEvent({ mouse, touch }: Partial<{ mouse: (e: MouseEvent) => void, touch: (e: TouchEvent) => void }>) {
    if (isTouchEvent(this.e)) {
      touch && touch(this.e)
    } else {
      mouse && mouse(this.e)
    }
  }
}


export class V2 {
  constructor(public x: number, public y: number) { }
  clone() { return new V2(this.x, this.y) }
}